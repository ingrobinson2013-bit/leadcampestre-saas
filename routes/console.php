<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// ==========================================
// AUTOMATIZACIÓN SAAS: TAREAS CRON PROGRAMADAS
// ==========================================

// 1. Auditoría Diaria de Suscripciones Próximas a Vencer y Mora (A las 6:00 AM)
Schedule::command('avi:check-expiring-subscriptions --days=7')
    ->dailyAt('06:00')
    ->withoutOverlapping()
    ->onOneServer();

// 2. Alertas Preventivas de Vacunas y Desparasitaciones (A las 8:30 AM)
Schedule::command('avi:send-preventive-reminders')
    ->dailyAt('08:30')
    ->withoutOverlapping()
    ->onOneServer();

// 3. Prospección Automática y Despacho de Membresías a Veterinarias (Todos los días a las 9:00 AM - 50 Prospectos Diarios)
Schedule::command('avi:prospectos-scan-and-send --limit=50 --scan')
    ->dailyAt('09:00')
    ->withoutOverlapping()
    ->appendOutputTo(storage_path('logs/avi-cron-dispatch.log'))
    ->onOneServer();

