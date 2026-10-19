<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessBatchedWhatsappAiJob;
use App\Models\Project;
use App\Models\WhatsappConversation;
use App\Services\WhatsAppCloudApiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class WhatsAppWebhookController extends Controller
{
    /**
     * Verificación GET de Meta Cloud API.
     */
    public function verify(Request $request): Response|JsonResponse
    {
        $mode = $request->query('hub_mode') ?: $request->query('hub.mode');
        $token = $request->query('hub_verify_token') ?: $request->query('hub.verify_token');
        $challenge = $request->query('hub_challenge') ?: $request->query('hub.challenge');

        if ($mode === 'subscribe' && $token === config('services.whatsapp.verify_token', 'leadcampestre_verify_2026')) {
            return response($challenge, 200)->header('Content-Type', 'text/plain');
        }

        return response()->json(['error' => 'Invalid verify token'], 403);
    }

    /**
     * Recepción POST de mensajes en 1 solo número WABA + Router Cero-Tokens + Debouncer 5s.
     */
    public function handle(Request $request, WhatsAppCloudApiService $whatsapp): JsonResponse
    {
        $value = data_get($request->all(), 'entry.0.changes.0.value');
        $message = data_get($value, 'messages.0');

        if (!$message) {
            return response()->json(['status' => 'status_update_ignored']);
        }

        $senderPhone = (string) ($message['from'] ?? '');
        $wamid = (string) ($message['id'] ?? '');
        $contactName = data_get($value, 'contacts.0.profile.name', 'Interesado');
        $adSourceId = data_get($message, 'referral.source_id');
        $adHeadline = data_get($message, 'referral.headline');

        $userText = trim(
            data_get($message, 'text.body')
            ?? data_get($message, 'interactive.button_reply.title')
            ?? ''
        );

        if (!$senderPhone || !$userText) {
            return response()->json(['status' => 'empty_message']);
        }

        $whatsapp->markAsRead($wamid);

        // 1. Detectar Proyecto en el número único WABA (Por defecto: Proyecto La Estrella)
        $project = Project::where('meta_campaign_id', $adSourceId)
            ->orWhereRaw("? LIKE CONCAT('%', keyword_trigger, '%')", [$userText])
            ->first() ?? Project::first();

        // 2. Crear o recuperar conversación (100% de teléfonos capturados desde el segundo 0)
        $conversation = WhatsappConversation::firstOrCreate(
            ['wa_id' => $senderPhone],
            [
                'project_id' => $project->id,
                'contact_name' => $contactName,
                'source_ad_id' => $adSourceId,
                'source_ad_name' => $adHeadline ?: 'Campaña Meta CTWA Coordinador',
                'ai_enabled' => true,
                'ctwa_free_window_until' => now()->addHours(72), // 72h GRATIS de Meta Click-to-WhatsApp
                'last_message_at' => now(),
            ]
        );

        // Guardar mensaje entrante del comprador
        $conversation->messages()->create([
            'wamid' => $wamid,
            'direction' => 'inbound',
            'sender_type' => 'client',
            'message_type' => $message['type'] ?? 'text',
            'body' => $userText,
            'tokens_used' => 0,
        ]);

        // 3. ROUTER CERO-TOKENS (Regla #4 del Prompt de Valentina Ríos: Botones de Inicio del Anuncio)
        // Si el cliente presiona "PARA VIVIR", "PARA INVERTIR" o "PARA RECREACIÓN", Laravel responde
        // instantáneamente con la plantilla exacta de Valentina Ríos gastando 0 TOKENS de IA.
        $normalized = mb_strtoupper($userText);
        $zeroTokenResponse = match (true) {
            str_contains($normalized, 'PARA VIVIR') => [
                'intent' => 'vivir',
                'reply' => "Excelente decisión 🏡\n\nAquí encuentras tranquilidad real, terreno plano y libertad total de construcción.\n\n¿Desde qué ciudad vendrías a conocer el proyecto?",
            ],
            str_contains($normalized, 'PARA INVERTIR') => [
                'intent' => 'invertir',
                'reply' => "Excelente que lo veas como inversión 📈\n\nEsta zona está entrando en crecimiento sub-urbano y la valorización es estratégica.\n\n¿Desde qué ciudad nos visitarías?",
            ],
            str_contains($normalized, 'PARA RECREAC') => [
                'intent' => 'recreacion',
                'reply' => "Perfecto 🌴\n\nMuchos buscan este lugar para descanso real, naturaleza y río cercano.\n\n¿Desde qué ciudad vendrías a conocerlo?",
            ],
            default => null,
        };

        if ($zeroTokenResponse && $conversation->ai_enabled) {
            $conversation->update([
                'purchase_intent' => $zeroTokenResponse['intent'],
                'lead_status' => 'perfilando',
                'last_message_at' => now(),
            ]);

            $outWamid = $whatsapp->sendTextMessage($senderPhone, $zeroTokenResponse['reply']);
            $conversation->messages()->create([
                'wamid' => $outWamid,
                'direction' => 'outbound',
                'sender_type' => 'router_zero_tokens',
                'message_type' => 'text',
                'body' => $zeroTokenResponse['reply'],
                'tokens_used' => 0,
            ]);

            return response()->json(['status' => 'handled_by_zero_token_router']);
        }

        // 4. DEBOUNCER DE 5 SEGUNDOS (Evita que 3 mensajes seguidos te cobren 3 veces como en Botcake)
        $batchKey = "wa_debounce_batch:{$conversation->id}";
        $stampKey = "wa_debounce_stamp:{$conversation->id}";

        $currentBatch = Cache::get($batchKey, []);
        $currentBatch[] = $userText;
        $newStamp = Str::uuid()->toString();

        Cache::put($batchKey, $currentBatch, 60);
        Cache::put($stampKey, $newStamp, 60);

        ProcessBatchedWhatsappAiJob::dispatch($conversation->id, $newStamp)
            ->delay(now()->addSeconds(5));

        return response()->json(['status' => 'debouncing_5_seconds']);
    }
}
