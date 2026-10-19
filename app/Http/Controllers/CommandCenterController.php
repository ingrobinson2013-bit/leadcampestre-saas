<?php

namespace App\Http\Controllers;

use App\Models\Lot;
use App\Models\Project;
use App\Models\VisitPass;
use App\Models\WhatsappConversation;
use App\Services\WhatsAppCloudApiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CommandCenterController extends Controller
{
    /**
     * Endpoint JSON en tiempo real para el Monitor de Chats, Mapa de Lotes y Vista Coordinador.
     */
    public function state(Request $request): JsonResponse
    {
        $role = $request->query('role', 'super_admin'); // super_admin | ad_coordinator
        $project = Project::with(['lots', 'fieldAgents'])->first();

        $conversations = WhatsappConversation::with(['messages', 'fieldAgent', 'latestVisitPass'])
            ->latest('last_message_at')
            ->get()
            ->map(function (WhatsappConversation $c) use ($role) {
                return [
                    'id' => $c->id,
                    'contact_name' => $c->contact_name,
                    'phone' => $role === 'super_admin' ? $c->wa_id : $c->masked_phone,
                    'origin_city' => $c->origin_city,
                    'purchase_intent' => $c->purchase_intent,
                    'lead_status' => $c->lead_status,
                    'preferred_lot_dimensions' => $c->preferred_lot_dimensions,
                    'declared_initial_cop' => $c->declared_initial_cop,
                    'source_ad_name' => $c->source_ad_name,
                    'ai_enabled' => $c->ai_enabled,
                    'interaction_count' => $c->interaction_count,
                    'messages' => $c->messages,
                    'visit_pass' => $c->latestVisitPass,
                ];
            });

        return response()->json([
            'project' => $project,
            'conversations' => $conversations,
            'visit_passes' => VisitPass::with(['fieldAgent', 'lot'])->latest()->get(),
        ]);
    }

    /**
     * Pausar o reactivar a Valentina Ríos (Human Takeover) desde el panel de Laravel.
     */
    public function toggleAi(WhatsappConversation $conversation): JsonResponse
    {
        $conversation->update(['ai_enabled' => !$conversation->ai_enabled]);

        return response()->json([
            'ai_enabled' => $conversation->ai_enabled,
        ]);
    }

    /**
     * Enviar mensaje manual como Socio Admin (pausa automáticamente la IA).
     */
    public function sendManualMessage(
        Request $request,
        WhatsappConversation $conversation,
        WhatsAppCloudApiService $whatsapp
    ): JsonResponse {
        $text = trim((string) $request->input('body', ''));
        if (!$text) {
            return response()->json(['error' => 'Mensaje vacío'], 422);
        }

        $conversation->update([
            'ai_enabled' => false,
            'last_message_at' => now(),
        ]);

        $wamid = $whatsapp->sendTextMessage($conversation->wa_id, $text);

        $msg = $conversation->messages()->create([
            'wamid' => $wamid,
            'direction' => 'outbound',
            'sender_type' => 'admin_socio',
            'message_type' => 'text',
            'body' => $text,
            'tokens_used' => 0,
        ]);

        return response()->json(['message' => $msg]);
    }

    /**
     * Escaneo del Pase QR por David en Vereda Las Mercedes.
     */
    public function scanQrCheckIn(Request $request): JsonResponse
    {
        $qrCode = trim((string) $request->input('qr_code', ''));
        $pass = VisitPass::where('qr_code', $qrCode)->firstOrFail();

        $pass->update(['checked_in_at' => now()]);
        $pass->conversation->update(['lead_status' => 'en_terreno_qr']);

        return response()->json([
            'status' => 'checked_in',
            'visit_pass' => $pass,
        ]);
    }

    /**
     * Bloquear un lote por 48 horas desde el mapa SVG o desde el celular de David.
     */
    public function lockLot(Lot $lot): JsonResponse
    {
        $lot->update([
            'status' => 'bloqueado_48h',
            'locked_until' => now()->addHours(48),
        ]);

        return response()->json([
            'status' => 'locked',
            'lot' => $lot,
        ]);
    }
}
