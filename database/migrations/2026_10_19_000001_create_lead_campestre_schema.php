<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Projects (Tenants: Parcelaciones / Desarrollos de Lotes)
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Ej: Proyecto La Estrella
            $table->string('slug')->unique(); // Ej: la-estrella
            $table->string('location_city')->default('Villavicencio - Meta');
            $table->string('location_vereda')->default('Vereda Las Mercedes');
            $table->string('highway_reference')->nullable(); // A 10m de la vía nacional Villavicencio-Acacías
            $table->string('ai_agent_name')->default('Valentina Ríos');
            $table->string('keyword_trigger')->default('ESTRELLA'); // Para enrutamiento en 1 solo número WABA
            $table->string('meta_campaign_id')->nullable()->index();
            $table->decimal('separation_amount_cop', 15, 2)->default(500000); // $500.000 COP
            $table->integer('min_down_payment_percent')->default(40); // 40% inicial
            $table->integer('down_payment_days')->default(30); // 30 días para completar el 40%
            $table->integer('max_financing_months')->default(18); // 60% restante hasta 18 meses sin interés
            $table->decimal('partner_commission_percent', 5, 2)->default(40.00); // Tu 40% de participación/comisión
            $table->json('legal_metadata')->nullable(); // Tradición 35 Ha, proindiviso, POT Sub-Urbano, planos Etapas 1-3
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 2. Users (SuperAdmin Socio 40%, Coordinador de Pauta Solo Lectura, Asesores)
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->nullable()->constrained('projects')->nullOnDelete();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('role')->default('super_admin'); // super_admin, ad_coordinator, field_agent
            $table->rememberToken();
            $table->timestamps();
        });

        // 3. Field Agents (Asesores en Terreno y Oficina: David y Stella)
        Schema::create('field_agents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects')->cascadeOnDelete();
            $table->string('name'); // Ej: David (Terreno) o Stella (Oficina Barrio Camoa)
            $table->string('role_type')->default('terreno'); // terreno | oficina
            $table->string('phone_whatsapp'); // Ej: 573203146653
            $table->string('location_point')->nullable(); // Vereda Las Mercedes / Calle 19 # 40-89 Barrio Camoa
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 4. Lots (Inventario Georreferenciado por Etapas 1, 2, 3)
        Schema::create('lots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects')->cascadeOnDelete();
            $table->string('stage')->default('Etapa 1'); // Etapa 1, Etapa 2, Etapa 3
            $table->string('code'); // Ej: E1-L01
            $table->string('dimensions'); // 6x20, 8x20, 10x20
            $table->integer('area_m2'); // 120, 160, 200
            $table->decimal('price_cop', 15, 2); // 27000000, 32000000, 42000000
            $table->decimal('down_payment_40_cop', 15, 2); // 10800000, 12800000, 16800000
            $table->decimal('monthly_installment_18m_cop', 15, 2); // 900000, 1066667, 1400000
            $table->enum('status', ['disponible', 'bloqueado_48h', 'separado', 'financiado', 'vendido'])->default('disponible');
            $table->timestamp('locked_until')->nullable();
            $table->timestamps();

            $table->index(['project_id', 'status']);
        });

        // 5. WhatsApp Conversations (Monitor en Vivo + Estado de Valentina Ríos)
        Schema::create('whatsapp_conversations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects')->cascadeOnDelete();
            $table->string('wa_id')->index(); // Teléfono del comprador E.164 (ej: 573114908821)
            $table->string('contact_name')->nullable();
            $table->string('origin_city')->nullable(); // Ej: Bogotá, Villavicencio, Acacías
            $table->enum('purchase_intent', ['vivir', 'invertir', 'recreacion', 'sin_definir'])->default('sin_definir');
            $table->enum('lead_status', [
                'nuevo',
                'perfilando',
                'opciones_presentadas',
                'visita_agendada',
                'en_terreno_qr',
                'alerta_puenteo',
                'separado',
                'descartado_cross_sell'
            ])->default('nuevo');
            $table->string('preferred_lot_dimensions')->nullable(); // 6x20, 8x20, 10x20
            $table->decimal('declared_initial_cop', 15, 2)->nullable();
            $table->string('source_ad_id')->nullable(); // ID del anuncio CTWA del coordinador
            $table->string('source_ad_name')->nullable();
            $table->boolean('ai_enabled')->default(true); // true = Valentina Ríos IA | false = Control Humano Socio 40%
            $table->integer('interaction_count')->default(0); // Regla Valentina: llevar a cita en máx 5 interacciones
            $table->foreignId('assigned_field_agent_id')->nullable()->constrained('field_agents')->nullOnDelete();
            $table->timestamp('ctwa_free_window_until')->nullable(); // Ventana gratis de 72h de Meta
            $table->timestamp('last_message_at')->nullable();
            $table->timestamps();
        });

        // 6. WhatsApp Messages (Historial del Chat + Telemetría de Ahorro de Tokens)
        Schema::create('whatsapp_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained('whatsapp_conversations')->cascadeOnDelete();
            $table->string('wamid')->nullable()->index();
            $table->enum('direction', ['inbound', 'outbound']);
            $table->enum('sender_type', ['client', 'router_zero_tokens', 'ai_valentina', 'admin_socio', 'system_qr']);
            $table->string('message_type')->default('text'); // text, audio, document, interactive
            $table->text('body');
            $table->string('media_url')->nullable();
            $table->integer('tokens_used')->default(0); // 0 en Router, ~48 en QLoRA
            $table->boolean('was_debounced')->default(false);
            $table->timestamps();
        });

        // 7. Visit Passes QR (El Seguro Anti-Puenteo del 40% con David y Stella)
        Schema::create('visit_passes', function (Blueprint $table) {
            $table->id();
            $table->string('qr_code')->unique(); // Ej: QR-EST-409
            $table->foreignId('conversation_id')->constrained('whatsapp_conversations')->cascadeOnDelete();
            $table->foreignId('project_id')->constrained('projects')->cascadeOnDelete();
            $table->foreignId('field_agent_id')->constrained('field_agents')->cascadeOnDelete();
            $table->foreignId('lot_id')->nullable()->constrained('lots')->nullOnDelete();
            $table->string('buyer_full_name');
            $table->string('buyer_phone');
            $table->integer('companions_count')->default(1);
            $table->dateTime('scheduled_at'); // Lunes a Domingo 7:00 AM - 5:00 PM
            $table->timestamp('checked_in_at')->nullable(); // Cuando David escanea el QR en Vereda Las Mercedes
            $table->string('agent_feedback')->nullable();
            $table->string('buyer_audit_reply')->nullable(); // Respuesta del comprador a la encuesta de 2h después
            $table->boolean('bypass_alert_detected')->default(false); // true si hay intento de puenteo
            $table->timestamps();
        });

        // 8. Tablas nativas de infraestructura Laravel (Sessions, Cache, Jobs)
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });

        Schema::create('cache', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->mediumText('value');
            $table->integer('expiration');
        });

        Schema::create('cache_locks', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->string('owner');
            $table->integer('expiration');
        });

        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('queue')->index();
            $table->longText('payload');
            $table->unsignedTinyInteger('attempts');
            $table->unsignedInteger('reserved_at')->nullable();
            $table->unsignedInteger('available_at');
            $table->unsignedInteger('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jobs');
        Schema::dropIfExists('cache_locks');
        Schema::dropIfExists('cache');
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('visit_passes');
        Schema::dropIfExists('whatsapp_messages');
        Schema::dropIfExists('whatsapp_conversations');
        Schema::dropIfExists('lots');
        Schema::dropIfExists('field_agents');
        Schema::dropIfExists('users');
        Schema::dropIfExists('projects');
    }
};
