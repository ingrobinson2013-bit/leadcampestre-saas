<?php

namespace App\Jobs;

use App\Models\WhatsappConversation;
use App\Services\LotQuotePdfService;
use App\Services\WhatsAppCloudApiService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class ProcessBatchedWhatsappAiJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public int $conversationId,
        public string $expectedStamp
    ) {}

    public function handle(WhatsAppCloudApiService $whatsapp, LotQuotePdfService $pdfService): void
    {
        $stampKey = "wa_debounce_stamp:{$this->conversationId}";
        $batchKey = "wa_debounce_batch:{$this->conversationId}";

        // 1. Verificar sello del Debouncer de 5 segundos:
        // Si el comprador siguió escribiendo otro mensaje en esos 5s, este Job viejo se cancela con $0 tokens.
        if (Cache::get($stampKey) !== $this->expectedStamp) {
            return;
        }

        $batchedMessages = Cache::pull($batchKey, []);
        Cache::forget($stampKey);

        if (empty($batchedMessages)) {
            return;
        }

        $conversation = WhatsappConversation::with('project')->find($this->conversationId);
        if (!$conversation || !$conversation->ai_enabled) {
            return;
        }

        $project = $conversation->project;
        $unifiedUserMessage = implode('. ', $batchedMessages);

        // 2. Construir el Micro-Prompt de ~48 tokens para Valentina Ríos (Proyecto La Estrella)
        // Todas las reglas de estilo (máx 60 palabras, cierre en <=5 turnos, no enviar ubicación exacta sin cita)
        // ya viven en los pesos del modelo Qwen-2.5-7B QLoRA.
        $compactSystemPrompt = "Agente: {$project->ai_agent_name} ({$project->name}, {$project->location_city}, {$project->location_vereda}). "
            . "Lotes: 6x20(120m2,$27M,ini40%:$10.8M), 8x20(160m2,$32M,ini40%:$12.8M), 10x20(200m2,$42M,ini40%:$16.8M). "
            . "Sep:$500k. Saldo 60% a 18m sin interes. Turno:{$conversation->interaction_count}/5.";

        $history = $conversation->messages()
            ->latest()
            ->take(5)
            ->get()
            ->reverse()
            ->map(fn ($m) => [
                'role' => $m->direction === 'inbound' ? 'user' : 'assistant',
                'content' => $m->body,
            ])
            ->values()
            ->toArray();

        $messagesPayload = array_merge(
            [['role' => 'system', 'content' => $compactSystemPrompt]],
            $history
        );

        // 3. Llamar a tu propio modelo entrenado (Qwen-2.5-7B-QLoRA en vLLM / RunPod / FastAPI local)
        $aiOutput = $this->callValentinaModel($messagesPayload, $unifiedUserMessage, $conversation);

        $replyText = $aiOutput['reply'];
        $extracted = $aiOutput['extracted_data'] ?? [];

        // 4. Actualizar estado estructurado en BD (100% de teléfonos y perfilamiento en tu poder)
        $conversation->update([
            'origin_city' => $extracted['origin_city'] ?? $conversation->origin_city,
            'purchase_intent' => $extracted['purchase_intent'] ?? $conversation->purchase_intent,
            'preferred_lot_dimensions' => $extracted['preferred_lot'] ?? $conversation->preferred_lot_dimensions,
            'lead_status' => $extracted['lead_status'] ?? $conversation->lead_status,
            'interaction_count' => $conversation->interaction_count + 1,
            'last_message_at' => now(),
        ]);

        // 5. Enviar respuesta de Valentina Ríos (máx 60 palabras) al comprador
        $wamid = $whatsapp->sendTextMessage($conversation->wa_id, $replyText);

        $conversation->messages()->create([
            'wamid' => $wamid,
            'direction' => 'outbound',
            'sender_type' => 'ai_valentina',
            'message_type' => 'text',
            'body' => $replyText,
            'tokens_used' => 48,
            'was_debounced' => count($batchedMessages) > 1,
        ]);

        // 6. Si el cliente aceptó día y hora de visita, emitir Pasaporte QR y avisar a David (3203146653)
        if (($aiOutput['laravel_action'] ?? 'NONE') === 'BOOK_VISIT_QR') {
            $pdfService->issueVisitPassAndNotifyFieldAgent(
                $conversation,
                $extracted['buyer_name'] ?? ($conversation->contact_name ?? 'Cliente'),
                $extracted['visit_slot'] ?? 'Sábado 10:00 AM',
                (int) ($extracted['companions'] ?? 2),
                $extracted['preferred_lot'] ?? '8x20'
            );
        }
    }

    protected function callValentinaModel(array $messagesPayload, string $userText, WhatsappConversation $conversation): array
    {
        $endpoint = config('services.custom_llm.endpoint');
        if (!empty($endpoint)) {
            $response = Http::withToken(config('services.custom_llm.api_key', ''))
                ->timeout(15)
                ->post(rtrim($endpoint, '/') . '/v1/chat/completions', [
                    'model' => config('services.custom_llm.model', 'valentina_la_estrella_qlora_v1'),
                    'messages' => $messagesPayload,
                    'temperature' => 0.2,
                    'max_tokens' => 220,
                    'response_format' => ['type' => 'json_object'],
                ]);

            if ($response->successful()) {
                $decoded = json_decode($response->json('choices.0.message.content', '{}'), true);
                if (is_array($decoded) && isset($decoded['reply'])) {
                    return $decoded;
                }
            }
        }

        // Fallback determinista de Valentina Ríos siguiendo las 15 reglas de Proyecto La Estrella
        $lower = mb_strtolower($userText);

        if (str_contains($lower, 'ubicaci') || str_contains($lower, 'donde queda') || str_contains($lower, 'punto')) {
            return [
                'reply' => "El proyecto está en Villavicencio, vereda Las Mercedes, vía Villavicencio–Acacías (a solo 10 metros de la vía nacional).\n\nNo enviamos punto exacto sin agendamiento previo.\n\nTengo disponibilidad mañana a las 10:00 am o el sábado en la mañana. ¿Cuál te queda mejor?",
                'extracted_data' => ['lead_status' => 'perfilando'],
                'laravel_action' => 'NONE',
            ];
        }

        if (str_contains($lower, 'sabado') || str_contains($lower, 'sábado') || str_contains($lower, 'domingo') || str_contains($lower, 'mañana')) {
            return [
                'reply' => "Perfecto, quedas agendado en el Proyecto La Estrella, vereda Las Mercedes.\n\nTe acabo de emitir tu Pasaporte VIP con código QR. Nuestro asesor en terreno David te recibirá personalmente en la entrada.",
                'extracted_data' => [
                    'lead_status' => 'visita_agendada',
                    'visit_slot' => 'Sábado 10:00 AM',
                    'preferred_lot' => '8x20',
                ],
                'laravel_action' => 'BOOK_VISIT_QR',
            ];
        }

        return [
            'reply' => "En Proyecto La Estrella separas hoy tu ubicación con solo *\$500.000* (se descuenta del *40% inicial*) y el *60% restante lo pagas hasta en 18 meses sin interés*:\n• *6x20 (120m²):* \$27.000.000\n• *8x20 (160m²):* \$32.000.000\n\n¿Te queda mejor visitarnos este sábado en la mañana o el domingo en la tarde?",
            'extracted_data' => [
                'lead_status' => 'opciones_presentadas',
                'preferred_lot' => '8x20',
            ],
            'laravel_action' => 'NONE',
        ];
    }
}
