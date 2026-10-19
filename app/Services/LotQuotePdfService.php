<?php

namespace App\Services;

use App\Models\FieldAgent;
use App\Models\Lot;
use App\Models\VisitPass;
use App\Models\WhatsappConversation;
use Illuminate\Support\Str;

class LotQuotePdfService
{
    public function __construct(
        protected WhatsAppCloudApiService $whatsapp
    ) {}

    /**
     * Genera el Pasaporte QR VIP para la visita con David (Vereda Las Mercedes)
     * o Stella (Oficina Barrio Camoa) y notifica al asesor en terreno con teléfono protegido.
     */
    public function issueVisitPassAndNotifyFieldAgent(
        WhatsappConversation $conversation,
        string $buyerName,
        string $scheduledSlot,
        int $companions = 2,
        ?string $preferredDimensions = '8x20'
    ): VisitPass {
        $project = $conversation->project;

        // Asignar por defecto a David (Asesor en Terreno Vereda Las Mercedes - 3203146653)
        $fieldAgent = $project->fieldAgents()->where('role_type', 'terreno')->first()
            ?? FieldAgent::first();

        $lot = $project->lots()
            ->where('status', 'disponible')
            ->where('dimensions', $preferredDimensions ?: '8x20')
            ->first();

        $qrCode = 'QR-EST-' . strtoupper(Str::random(4));

        $visitPass = VisitPass::create([
            'qr_code' => $qrCode,
            'conversation_id' => $conversation->id,
            'project_id' => $project->id,
            'field_agent_id' => $fieldAgent->id,
            'lot_id' => $lot?->id,
            'buyer_full_name' => $buyerName ?: ($conversation->contact_name ?? 'Comprador Calificado'),
            'buyer_phone' => $conversation->wa_id,
            'companions_count' => $companions,
            'scheduled_at' => now()->addDay()->setHour(10)->setMinute(0),
        ]);

        $conversation->update([
            'lead_status' => 'visita_agendada',
            'assigned_field_agent_id' => $fieldAgent->id,
        ]);

        // 1. Notificar a David (3203146653) sin exponer el teléfono completo para blindar el 40%
        $maskedPhone = $conversation->masked_phone;
        $agentAlert = "🎟️ *NUEVA VISITA PROGRAMADA — PROYECTO LA ESTRELLA*\n\n"
            . "• *Pase QR:* {$qrCode}\n"
            . "• *Comprador:* {$visitPass->buyer_full_name} ({$maskedPhone})\n"
            . "• *Acompañantes:* {$companions}\n"
            . "• *Interés:* Lote {$preferredDimensions} (Separación \$500.000)\n"
            . "• *Horario:* {$scheduledSlot} (Vereda Las Mercedes)\n\n"
            . "👉 Al recibirlo en portería, escanea su código *{$qrCode}* desde tu App Móvil para activar el bloqueo de lote.";

        $this->whatsapp->sendTextMessage($fieldAgent->phone_whatsapp, $agentAlert);

        // 2. Registrar mensaje de sistema en el Monitor de Laravel
        $conversation->messages()->create([
            'direction' => 'outbound',
            'sender_type' => 'system_qr',
            'message_type' => 'document',
            'body' => "🎟️ Pasaporte VIP {$qrCode} emitido para visita con {$fieldAgent->name} ({$scheduledSlot}). Planos controlados Etapa 1 adjuntos.",
            'tokens_used' => 0,
        ]);

        return $visitPass;
    }
}
