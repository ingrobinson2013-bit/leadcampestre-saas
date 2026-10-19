<?php

use App\Http\Controllers\BoldWebhookController;
use App\Services\FastApiClient;
use App\Services\PaymentGatewayService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json(['status' => 'healthy', 'timestamp' => now()]);
});

Route::post('/ai/recommend-plan', function (Request $request, FastApiClient $aiClient) {
    $species = $request->input('species', 'dog');
    $ageMonths = (int) $request->input('age_months', 12);
    $conditions = (array) $request->input('health_conditions', []);
    $budget = $request->input('budget_tier', 'medium');

    return response()->json($aiClient->recommendPlan($species, $ageMonths, $conditions, $budget));
});

// Webhook Oficial Meta WhatsApp Cloud API (Multi-Tenant Router & Triage)
Route::get('/webhook/whatsapp', [\App\Http\Controllers\WhatsAppWebhookController::class, 'verify']);
Route::post('/webhook/whatsapp', [\App\Http\Controllers\WhatsAppWebhookController::class, 'handle']);

// Webhook Telegram Bot (Beeper del Veterinario - Zero-Typing Doctor & HITL)
Route::post('/webhook/telegram', [\App\Http\Controllers\TelegramWebhookController::class, 'handle']);

// Webhooks Oficiales Multi-Tenant (Wompi & Bold) con validación de firmas, Health Wallet (10%) y Carnet Digital
Route::post('/webhooks/bold', [BoldWebhookController::class, 'handle']);
Route::post('/webhooks/wompi', [BoldWebhookController::class, 'handle']);
Route::post('/webhooks/payment', [BoldWebhookController::class, 'handle']);

Route::post('/webhooks/payment/{gateway}', function (Request $request, string $gateway, PaymentGatewayService $paymentService) {
    if ($request->has('customer_data.pet_id') && $request->has('customer_data.plan_id')) {
        $subscription = $paymentService->handleSuccessfulPayment($request->all(), $gateway);
        return response()->json(['status' => 'processed', 'subscription_id' => $subscription->id]);
    }
    return app(BoldWebhookController::class)->handle(
        $request,
        app(\App\Services\BoldPaymentService::class),
        app(\App\Services\HealthWalletService::class),
        app(\App\Services\BenefitLedgerService::class)
    );
});

// Copilot IA Clínico (Gemini 2.5 Flash)
Route::post('/admin/{slug}/ai/chat', [App\Http\Controllers\VetAdmin\AiAssistantController::class, 'chat'])->middleware('throttle:ai-chat');
