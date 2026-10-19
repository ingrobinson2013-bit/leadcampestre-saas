<?php

namespace App\Providers;

use App\Events\AppointmentScheduledEvent;
use App\Events\BenefitRedeemedEvent;
use App\Events\PatientEnrolledEvent;
use App\Listeners\AuditRedemptionLogListener;
use App\Listeners\NotifyClinicNewEnrollmentListener;
use App\Listeners\SendRedemptionReceiptListener;
use App\Listeners\SendWelcomeNotificationListener;
use App\Listeners\SyncGoogleCalendarListener;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Forzar HTTPS en producción y detrás de proxies de EasyPanel
        if (config('app.env') === 'production' || app()->environment('production') || request()->header('X-Forwarded-Proto') === 'https' || !empty(request()->server('HTTP_X_FORWARDED_PROTO'))) {
            URL::forceScheme('https');
        }

        // ==========================================
        // ARQUITECTURA ASÍNCRONA & EVENT-DRIVEN SAAS
        // ==========================================

        // 1. Paciente Afiliado (Bienvenida + Notificación a Clínica)
        Event::listen(
            PatientEnrolledEvent::class,
            SendWelcomeNotificationListener::class
        );
        Event::listen(
            PatientEnrolledEvent::class,
            NotifyClinicNewEnrollmentListener::class
        );

        // 2. Beneficio Canjeado (Comprobante + Auditoría Inmutable Forense)
        Event::listen(
            BenefitRedeemedEvent::class,
            SendRedemptionReceiptListener::class
        );
        Event::listen(
            BenefitRedeemedEvent::class,
            AuditRedemptionLogListener::class
        );

        // 3. Cita Médica Agendada (Sincronización en segundo plano con Google Calendar)
        Event::listen(
            AppointmentScheduledEvent::class,
            SyncGoogleCalendarListener::class
        );

        // ==========================================
        // RATE LIMITING & SEGURIDAD SAAS
        // ==========================================
        \Illuminate\Support\Facades\RateLimiter::for('ai-chat', function (\Illuminate\Http\Request $request) {
            return \Illuminate\Cache\RateLimiting\Limit::perMinute(20)->by($request->user()?->id ?: $request->ip());
        });

        \Illuminate\Support\Facades\RateLimiter::for('storefront-enrollment', function (\Illuminate\Http\Request $request) {
            return \Illuminate\Cache\RateLimiting\Limit::perMinute(10)->by($request->ip());
        });

        // ==========================================
        // MODEL OBSERVERS & MÁQUINA DE ESTADOS
        // ==========================================
        \App\Models\Subscription::observe(\App\Observers\SubscriptionObserver::class);
        \App\Models\Tenant::observe(\App\Observers\TenantObserver::class);
    }
}
