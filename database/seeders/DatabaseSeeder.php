<?php

namespace Database\Seeders;

use App\Models\FieldAgent;
use App\Models\Lot;
use App\Models\Project;
use App\Models\User;
use App\Models\VisitPass;
use App\Models\WhatsappConversation;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Crear el Proyecto Principal: Proyecto La Estrella (Villavicencio - Meta)
        $laEstrella = Project::create([
            'name' => 'Proyecto La Estrella',
            'slug' => 'la-estrella',
            'location_city' => 'Villavicencio - Meta',
            'location_vereda' => 'Vereda Las Mercedes',
            'highway_reference' => 'A 10 metros de la vía nacional Villavicencio - Acacías',
            'ai_agent_name' => 'Valentina Ríos',
            'keyword_trigger' => 'ESTRELLA',
            'separation_amount_cop' => 500000,
            'min_down_payment_percent' => 40,
            'down_payment_days' => 30,
            'max_financing_months' => 18,
            'partner_commission_percent' => 40.00,
            'legal_metadata' => [
                'deed_type' => 'Escritura pública por porcentaje (Proindiviso)',
                'registered_area' => '35 hectáreas registradas libre de embargo',
                'pot_classification' => 'Sub-Urbano (Predial al día)',
                'desenglobe_rule' => 'Al alcanzar el 50% de las viviendas construidas ($3.000.000 honorarios)',
                'infrastructure_delivery' => '8 a 9 meses (Agua potable, energía, drenaje, fibra óptica, pozo séptico industrial)',
                'annual_maintenance_cop' => 200000,
                'stage_maps' => [
                    'etapa_1' => 'https://drive.google.com/file/d/1MLr6SdQXqVMl0sB6EqFXoSr7iiHSmWiV/view?usp=sharing',
                    'etapa_2' => 'https://drive.google.com/file/d/1QbykFWTWgULMNyeDs1LcJTf3zHIjK_oZ/view?usp=sharing',
                    'etapa_3' => 'https://drive.google.com/file/d/1I9HXTIXYGlep-nVvvZu-EafYl79GMI6p/view?usp=sharing',
                ],
            ],
            'is_active' => true,
        ]);

        // 2. Usuarios del Sistema (Socio 40% vs. Coordinador de Pauta Solo Lectura)
        User::create([
            'project_id' => $laEstrella->id,
            'name' => 'Socio Comercial (40% Comisión)',
            'email' => 'socio@leadcampestre.com',
            'password' => Hash::make('Estrella2026*'),
            'role' => 'super_admin',
        ]);

        User::create([
            'project_id' => $laEstrella->id,
            'name' => 'Coordinador de Pauta (Auditoría)',
            'email' => 'coordinador@leadcampestre.com',
            'password' => Hash::make('Pauta2026*'),
            'role' => 'ad_coordinator',
        ]);

        // 3. Asesores Reales: David (Terreno Vereda Las Mercedes) y Stella (Oficina Barrio Camoa)
        $david = FieldAgent::create([
            'project_id' => $laEstrella->id,
            'name' => 'David (Asesor en Terreno)',
            'role_type' => 'terreno',
            'phone_whatsapp' => '573203146653',
            'location_point' => 'Vereda Las Mercedes (A 10m vía Villavicencio-Acacías)',
            'is_active' => true,
        ]);

        FieldAgent::create([
            'project_id' => $laEstrella->id,
            'name' => 'Stella (Oficina Barrio Camoa)',
            'role_type' => 'oficina',
            'phone_whatsapp' => '573203146653',
            'location_point' => 'Calle 19 # 40-89, Barrio Camoa - Frente al CC Primavera',
            'is_active' => true,
        ]);

        // 4. Lotes Oficiales de Proyecto La Estrella (6x20 $27M, 8x20 $32M, 10x20 $42M)
        $lotsConfig = [
            ['stage' => 'Etapa 1', 'code' => 'E1-01', 'dimensions' => '6x20',  'area_m2' => 120, 'price_cop' => 27000000, 'down_payment_40_cop' => 10800000, 'monthly_installment_18m_cop' => 900000,  'status' => 'disponible'],
            ['stage' => 'Etapa 1', 'code' => 'E1-02', 'dimensions' => '8x20',  'area_m2' => 160, 'price_cop' => 32000000, 'down_payment_40_cop' => 12800000, 'monthly_installment_18m_cop' => 1066667, 'status' => 'disponible'],
            ['stage' => 'Etapa 1', 'code' => 'E1-03', 'dimensions' => '10x20', 'area_m2' => 200, 'price_cop' => 42000000, 'down_payment_40_cop' => 16800000, 'monthly_installment_18m_cop' => 1400000, 'status' => 'disponible'],
            ['stage' => 'Etapa 2', 'code' => 'E2-01', 'dimensions' => '8x20',  'area_m2' => 160, 'price_cop' => 32000000, 'down_payment_40_cop' => 12800000, 'monthly_installment_18m_cop' => 1066667, 'status' => 'separado'],
            ['stage' => 'Etapa 3', 'code' => 'E3-01', 'dimensions' => '10x20', 'area_m2' => 200, 'price_cop' => 42000000, 'down_payment_40_cop' => 16800000, 'monthly_installment_18m_cop' => 1400000, 'status' => 'financiado'],
        ];

        foreach ($lotsConfig as $lotData) {
            Lot::create(array_merge(['project_id' => $laEstrella->id], $lotData));
        }

        // 5. Conversación Real de Ejemplo con Valentina Ríos y Pase QR para David
        $conv = WhatsappConversation::create([
            'project_id' => $laEstrella->id,
            'wa_id' => '573114908821',
            'contact_name' => 'Mauricio Rincón',
            'origin_city' => 'Bogotá',
            'purchase_intent' => 'invertir',
            'lead_status' => 'visita_agendada',
            'preferred_lot_dimensions' => '8x20',
            'declared_initial_cop' => 12800000,
            'source_ad_id' => 'ctwa_estrella_ad3',
            'source_ad_name' => 'Video Dron Vía Acacías #03',
            'ai_enabled' => true,
            'interaction_count' => 3,
            'assigned_field_agent_id' => $david->id,
            'ctwa_free_window_until' => now()->addHours(64),
            'last_message_at' => now(),
        ]);

        $conv->messages()->createMany([
            [
                'direction' => 'inbound',
                'sender_type' => 'client',
                'body' => 'PARA INVERTIR',
                'tokens_used' => 0,
            ],
            [
                'direction' => 'outbound',
                'sender_type' => 'router_zero_tokens',
                'body' => "Excelente que lo veas como inversión 📈\n\nEsta zona está entrando en crecimiento sub-urbano y la valorización es estratégica.\n\n¿Desde qué ciudad nos visitarías?",
                'tokens_used' => 0,
            ],
            [
                'direction' => 'inbound',
                'sender_type' => 'client',
                'body' => 'Voy desde Bogotá con mi esposa. Me interesa el de 8x20 de $32 millones, podemos ir este sábado a las 10:00 am.',
                'tokens_used' => 0,
            ],
            [
                'direction' => 'outbound',
                'sender_type' => 'ai_valentina',
                'body' => "Quedas agendado para el sábado a las 10:00 am en el Proyecto La Estrella, vereda Las Mercedes.\n\n🎟️ Te adjunto tu Pasaporte VIP QR-EST-409. Nuestro asesor en terreno David te acompañará personalmente.",
                'tokens_used' => 48,
                'was_debounced' => true,
            ],
        ]);

        VisitPass::create([
            'qr_code' => 'QR-EST-409',
            'conversation_id' => $conv->id,
            'project_id' => $laEstrella->id,
            'field_agent_id' => $david->id,
            'lot_id' => Lot::where('code', 'E1-02')->first()?->id,
            'buyer_full_name' => 'Mauricio Rincón',
            'buyer_phone' => '573114908821',
            'companions_count' => 2,
            'scheduled_at' => now()->next('Saturday')->setHour(10)->setMinute(0),
        ]);
    }
}
