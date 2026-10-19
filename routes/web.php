<?php

use App\Http\Controllers\CommandCenterController;
use App\Http\Controllers\WhatsAppWebhookController;
use Illuminate\Support\Facades\Route;

// Vista Principal Interactiva de LeadCampestre OS (Proyecto La Estrella)
Route::get('/', function () {
    return response()->file(base_path('mockup-leadcampestre.html'));
});

// API Interna para el Monitor de Chats en Vivo, Masterplan SVG y Escáner QR de David
Route::prefix('api/command-center')->group(function () {
    Route::get('/state', [CommandCenterController::class, 'state']);
    Route::post('/conversations/{conversation}/toggle-ai', [CommandCenterController::class, 'toggleAi']);
    Route::post('/conversations/{conversation}/send', [CommandCenterController::class, 'sendManualMessage']);
    Route::post('/qr-checkin', [CommandCenterController::class, 'scanQrCheckIn']);
    Route::post('/lots/{lot}/lock', [CommandCenterController::class, 'lockLot']);
});

// Webhook Oficial de Meta Cloud API (1 Solo Número WABA Multi-Proyecto + Router 0 Tokens + Debouncer 5s)
Route::get('/api/webhooks/whatsapp', [WhatsAppWebhookController::class, 'verify']);
Route::post('/api/webhooks/whatsapp', [WhatsAppWebhookController::class, 'handle']);
