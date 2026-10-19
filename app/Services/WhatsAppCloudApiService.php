<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppCloudApiService
{
    protected string $accessToken;
    protected string $phoneNumberId;
    protected string $apiVersion;

    public function __construct()
    {
        $this->accessToken = (string) config('services.whatsapp.access_token', '');
        $this->phoneNumberId = (string) config('services.whatsapp.phone_number_id', '');
        $this->apiVersion = (string) config('services.whatsapp.api_version', 'v21.0');
    }

    protected function endpoint(): string
    {
        return "https://graph.facebook.com/{$this->apiVersion}/{$this->phoneNumberId}/messages";
    }

    public function markAsRead(string $messageId): void
    {
        if (empty($this->accessToken) || empty($this->phoneNumberId)) {
            return;
        }

        Http::withToken($this->accessToken)->post($this->endpoint(), [
            'messaging_product' => 'whatsapp',
            'status' => 'read',
            'message_id' => $messageId,
        ]);
    }

    public function sendTextMessage(string $toPhone, string $text): ?string
    {
        if (empty($this->accessToken) || empty($this->phoneNumberId)) {
            Log::info("[WhatsApp Simulado -> {$toPhone}]: {$text}");
            return 'wamid.sim_' . uniqid();
        }

        $response = Http::withToken($this->accessToken)->post($this->endpoint(), [
            'messaging_product' => 'whatsapp',
            'recipient_type' => 'individual',
            'to' => $toPhone,
            'type' => 'text',
            'text' => ['preview_url' => false, 'body' => $text],
        ]);

        return $response->json('messages.0.id');
    }

    public function sendDocument(string $toPhone, string $documentUrl, string $filename, string $caption = ''): ?string
    {
        if (empty($this->accessToken) || empty($this->phoneNumberId)) {
            Log::info("[WhatsApp PDF/QR -> {$toPhone}]: {$filename} ({$documentUrl})");
            return 'wamid.doc_' . uniqid();
        }

        $response = Http::withToken($this->accessToken)->post($this->endpoint(), [
            'messaging_product' => 'whatsapp',
            'to' => $toPhone,
            'type' => 'document',
            'document' => [
                'link' => $documentUrl,
                'filename' => $filename,
                'caption' => $caption,
            ],
        ]);

        return $response->json('messages.0.id');
    }
}
