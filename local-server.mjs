import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'storage', 'local_db.json');
const PUBLIC_DIR = path.join(__dirname, 'public');

const initialDb = {
    schema_version: 5,
    projects: [
        {
            id: 'la-estrella',
            name: 'Proyecto La Estrella',
            short_name: 'Estrella',
            location: 'Villavicencio - Meta, Vereda Las Mercedes (a 10m Vía Villavicencio–Acacías)',
            office_address: 'Calle 19 # 40-89, Barrio Camoa (Frente al CC Primavera Urbana)',
            ai_agent_name: 'Valentina Ríos',
            daily_ad_budget_cop: 30000,
            total_hectares: 35,
            delivery_months: '8 a 9 meses',
            price_range: '$27M · $32M · $42M',
            blueprint_summary: {
                updated_at: '18 Octubre 2026',
                total_lots: 1530,
                available_lots: 569,
                sold_lots: 961,
                stages: [
                    { stage: 1, name: 'Etapa 1 · Lago Central & Vía Nacional', total: 432, available: 102, sold: 330, typical_area: '190 m² (y especiales 200–780 m²)', pdf: '/assets/la-estrella/plano-etapa-1.pdf', png: '/assets/la-estrella/plano-etapa-1.png' },
                    { stage: 2, name: 'Etapa 2 · Zona Plana Central', total: 525, available: 298, sold: 227, typical_area: '152 m² (y esquineros 191–405 m²)', pdf: '/assets/la-estrella/plano-etapa-2.pdf', png: '/assets/la-estrella/plano-etapa-2.png' },
                    { stage: 3, name: 'Etapa 3 · Caño Corcobado & Reserva', total: 573, available: 169, sold: 404, typical_area: '114 m² y 152 m² (borde ambiental)', pdf: '/assets/la-estrella/plano-etapa-3.pdf', png: '/assets/la-estrella/plano-etapa-3.png' }
                ]
            },
            stats: {
                total_leads: 2737,
                lead_nuevo: 1627,
                calificado: 898,
                cita_agendada: 5,
                no_asistio: 10,
                archivo_inactividad: 131,
                visito_proyecto: 8,
                en_negociacion: 0,
                separo_lote: 2,
                venta_cerrada: 2,
                perdido: 34
            }
        },
        {
            id: 'reserva-llano',
            name: 'Reserva del Llano',
            short_name: 'Reserva Llano',
            location: 'Acacías - Meta, Kilómetro 4 Vía Guamal',
            office_address: 'Calle 19 # 40-89, Barrio Camoa, Villavicencio',
            ai_agent_name: 'Valentina Ríos',
            daily_ad_budget_cop: 25000,
            total_hectares: 18,
            delivery_months: '10 meses',
            price_range: '$48M · $55M · $68M',
            stats: {
                total_leads: 412,
                lead_nuevo: 210,
                calificado: 145,
                cita_agendada: 4,
                no_asistio: 3,
                archivo_inactividad: 32,
                visito_proyecto: 5,
                en_negociacion: 2,
                separo_lote: 3,
                venta_cerrada: 2,
                perdido: 6
            }
        },
        {
            id: 'mirador-restrepo',
            name: 'Mirador de Restrepo',
            short_name: 'Restrepo',
            location: 'Restrepo - Meta, Vereda Caney Alto',
            office_address: 'Calle 19 # 40-89, Barrio Camoa, Villavicencio',
            ai_agent_name: 'Valentina Ríos',
            daily_ad_budget_cop: 20000,
            total_hectares: 22,
            delivery_months: '12 meses',
            price_range: '$38M · $45M · $60M',
            stats: {
                total_leads: 195,
                lead_nuevo: 98,
                calificado: 64,
                cita_agendada: 3,
                no_asistio: 2,
                archivo_inactividad: 18,
                visito_proyecto: 3,
                en_negociacion: 1,
                separo_lote: 2,
                venta_cerrada: 1,
                perdido: 3
            }
        }
    ],
    lots: [
        // ETAPA 1 (Plano Octubre 18 de 2026: Lotes típicos 190m² y especiales frente al Lago / Vía Nacional)
        { id: 1, project_id: 'la-estrella', stage: 1, code: 'E1-L74', lot_num: '74', area_m2: 190, dimensions: '190 m² (Etapa 1)', price_cop: 32000000, separation_cop: 500000, initial_40_cop: 12800000, monthly_18_cop: 1066667, status: 'available', buyer: null, features: 'Etapa 1 · Vía Interna 7m (Disponible en Plano)', x: 42, y: 28 },
        { id: 2, project_id: 'la-estrella', stage: 1, code: 'E1-L79', lot_num: '79', area_m2: 220.22, dimensions: '220.22 m² (Esquinero E1)', price_cop: 42000000, separation_cop: 500000, initial_40_cop: 16800000, monthly_18_cop: 1400000, status: 'available', buyer: null, features: 'Etapa 1 · Esquinero Vía Acceso (Disponible en Plano)', x: 54, y: 34 },
        { id: 3, project_id: 'la-estrella', stage: 1, code: 'E1-L80', lot_num: '80', area_m2: 190, dimensions: '190 m² (Etapa 1)', price_cop: 32000000, separation_cop: 500000, initial_40_cop: 12800000, monthly_18_cop: 1066667, status: 'available', buyer: null, features: 'Etapa 1 · Manzana Central (Disponible en Plano)', x: 51, y: 36 },
        { id: 4, project_id: 'la-estrella', stage: 1, code: 'E1-L111', lot_num: '111', area_m2: 190, dimensions: '190 m² (Etapa 1)', price_cop: 32000000, separation_cop: 500000, initial_40_cop: 12800000, monthly_18_cop: 1066667, status: 'available', buyer: null, features: 'Etapa 1 · Cerca a Lago Central (Disponible)', x: 35, y: 31 },
        { id: 5, project_id: 'la-estrella', stage: 1, code: 'E1-L121', lot_num: '121', area_m2: 190, dimensions: '190 m² (Etapa 1)', price_cop: 32000000, separation_cop: 500000, initial_40_cop: 12800000, monthly_18_cop: 1066667, status: 'available', buyer: null, features: 'Etapa 1 · Corredor Central (Disponible)', x: 48, y: 39 },
        { id: 6, project_id: 'la-estrella', stage: 1, code: 'E1-L203', lot_num: '203', area_m2: 190, dimensions: '190 m² (Etapa 1)', price_cop: 32000000, separation_cop: 500000, initial_40_cop: 12800000, monthly_18_cop: 1066667, status: 'available', buyer: null, features: 'Etapa 1 · Vista al Lago (Disponible)', x: 24, y: 33 },
        { id: 7, project_id: 'la-estrella', stage: 1, code: 'E1-L240', lot_num: '240', area_m2: 321.12, dimensions: '321.12 m² (Especial Lago)', price_cop: 42000000, separation_cop: 500000, initial_40_cop: 16800000, monthly_18_cop: 1400000, status: 'available', buyer: null, features: 'Etapa 1 · Frente al Lago Principal (Disponible)', x: 64, y: 58 },
        { id: 8, project_id: 'la-estrella', stage: 1, code: 'E1-L01', lot_num: '1', area_m2: 172.74, dimensions: '172.74 m² (Portería)', price_cop: 32000000, separation_cop: 500000, initial_40_cop: 12800000, monthly_18_cop: 1066667, status: 'sold', buyer: 'marygarciaria50', features: 'Etapa 1 · Portería Norte (Vendido ●)', x: 28, y: 21 },
        { id: 9, project_id: 'la-estrella', stage: 1, code: 'E1-L03', lot_num: '3', area_m2: 190, dimensions: '190 m² (Etapa 1)', price_cop: 32000000, separation_cop: 500000, initial_40_cop: 12800000, monthly_18_cop: 1066667, status: 'reserved', buyer: 'Adelaida Ortiz', features: 'Etapa 1 · Vía Acceso (Separado)', x: 31, y: 23 },

        // ETAPA 2 (Plano Octubre 18 de 2026: Lotes típicos 152m² - 298 Disponibles)
        { id: 10, project_id: 'la-estrella', stage: 2, code: 'E2-L61', lot_num: '61', area_m2: 320.99, dimensions: '320.99 m² (Especial E2)', price_cop: 42000000, separation_cop: 500000, initial_40_cop: 16800000, monthly_18_cop: 1400000, status: 'available', buyer: null, features: 'Etapa 2 · Esquinero Vía Principal (Disponible)', x: 76, y: 59 },
        { id: 11, project_id: 'la-estrella', stage: 2, code: 'E2-L161', lot_num: '161', area_m2: 152, dimensions: '152 m² (Etapa 2)', price_cop: 32000000, separation_cop: 500000, initial_40_cop: 12800000, monthly_18_cop: 1066667, status: 'available', buyer: null, features: 'Etapa 2 · Manzana Media Vía 7m (Disponible)', x: 18, y: 39 },
        { id: 12, project_id: 'la-estrella', stage: 2, code: 'E2-L170', lot_num: '170', area_m2: 152, dimensions: '152 m² (Etapa 2)', price_cop: 32000000, separation_cop: 500000, initial_40_cop: 12800000, monthly_18_cop: 1066667, status: 'available', buyer: null, features: 'Etapa 2 · Zona Plana Central (Disponible)', x: 28, y: 45 },
        { id: 13, project_id: 'la-estrella', stage: 2, code: 'E2-L212', lot_num: '212', area_m2: 239.82, dimensions: '239.82 m² (Cabecera E2)', price_cop: 42000000, separation_cop: 500000, initial_40_cop: 16800000, monthly_18_cop: 1400000, status: 'available', buyer: null, features: 'Etapa 2 · Cabecera Amplia (Disponible)', x: 11, y: 39 },
        { id: 14, project_id: 'la-estrella', stage: 2, code: 'E2-L268', lot_num: '268', area_m2: 248.46, dimensions: '248.46 m² (Especial E2)', price_cop: 42000000, separation_cop: 500000, initial_40_cop: 16800000, monthly_18_cop: 1400000, status: 'available', buyer: null, features: 'Etapa 2 · Doble Frente Vía 7m (Disponible)', x: 10, y: 44 },
        { id: 15, project_id: 'la-estrella', stage: 2, code: 'E2-L322', lot_num: '322', area_m2: 242.55, dimensions: '242.55 m² (Especial E2)', price_cop: 42000000, separation_cop: 500000, initial_40_cop: 16800000, monthly_18_cop: 1400000, status: 'available', buyer: null, features: 'Etapa 2 · Lote Esquinero (Disponible)', x: 11, y: 49 },
        { id: 16, project_id: 'la-estrella', stage: 2, code: 'E2-L490', lot_num: '490', area_m2: 152, dimensions: '152 m² (Etapa 2)', price_cop: 32000000, separation_cop: 500000, initial_40_cop: 12800000, monthly_18_cop: 1066667, status: 'available', buyer: null, features: 'Etapa 2 · Franja Sur Despejada (Disponible)', x: 12, y: 65 },
        { id: 17, project_id: 'la-estrella', stage: 2, code: 'E2-L08', lot_num: '8', area_m2: 152, dimensions: '152 m² (Etapa 2)', price_cop: 32000000, separation_cop: 500000, initial_40_cop: 12800000, monthly_18_cop: 1066667, status: 'sold', buyer: 'Elias Urrego', features: 'Etapa 2 · Vía de Acceso (Vendido ●)', x: 20, y: 36 },

        // ETAPA 3 (Plano Octubre 18 de 2026: Lotes típicos 114m² y 152m² junto a Caño Corcobado - 169 Disponibles)
        { id: 18, project_id: 'la-estrella', stage: 3, code: 'E3-L26', lot_num: '26', area_m2: 308.32, dimensions: '308.32 m² (Esquinero E3)', price_cop: 42000000, separation_cop: 500000, initial_40_cop: 16800000, monthly_18_cop: 1400000, status: 'available', buyer: null, features: 'Etapa 3 · Esquinero Vía Acceso (Disponible)', x: 25, y: 63 },
        { id: 19, project_id: 'la-estrella', stage: 3, code: 'E3-L110', lot_num: '110', area_m2: 114, dimensions: '114 m² (Etapa 3)', price_cop: 27000000, separation_cop: 500000, initial_40_cop: 10800000, monthly_18_cop: 900000, status: 'available', buyer: null, features: 'Etapa 3 · Lote Campestre 114m² (Disponible)', x: 31, y: 58 },
        { id: 20, project_id: 'la-estrella', stage: 3, code: 'E3-L122', lot_num: '122', area_m2: 114, dimensions: '114 m² (Etapa 3)', price_cop: 27000000, separation_cop: 500000, initial_40_cop: 10800000, monthly_18_cop: 900000, status: 'available', buyer: null, features: 'Etapa 3 · Manzana Central 114m² (Disponible)', x: 42, y: 63 },
        { id: 21, project_id: 'la-estrella', stage: 3, code: 'E3-L202', lot_num: '202', area_m2: 152, dimensions: '152 m² (Etapa 3)', price_cop: 32000000, separation_cop: 500000, initial_40_cop: 12800000, monthly_18_cop: 1066667, status: 'available', buyer: null, features: 'Etapa 3 · Sector Oriental 152m² (Disponible)', x: 68, y: 78 },
        { id: 22, project_id: 'la-estrella', stage: 3, code: 'E3-L222', lot_num: '222', area_m2: 245, dimensions: '245 m² (Especial E3)', price_cop: 42000000, separation_cop: 500000, initial_40_cop: 16800000, monthly_18_cop: 1400000, status: 'available', buyer: null, features: 'Etapa 3 · Frente Vía Interna 7m (Disponible)', x: 26, y: 56 },
        { id: 23, project_id: 'la-estrella', stage: 3, code: 'E3-L308', lot_num: '308', area_m2: 114, dimensions: '114 m² (Etapa 3)', price_cop: 27000000, separation_cop: 500000, initial_40_cop: 10800000, monthly_18_cop: 900000, status: 'available', buyer: null, features: 'Etapa 3 · Cerca Cesión Ambiental Caño Corcobado', x: 34, y: 50 },
        { id: 24, project_id: 'la-estrella', stage: 3, code: 'E3-L523', lot_num: '523', area_m2: 114, dimensions: '114 m² (Etapa 3)', price_cop: 27000000, separation_cop: 500000, initial_40_cop: 10800000, monthly_18_cop: 900000, status: 'sold', buyer: 'marygarciaria50 (Lote 2)', features: 'Etapa 3 · Mirador Caño Corcobado (Vendido ●)', x: 28, y: 36 },
    ],
    // ALL 10 REAL KANBAN COLUMNS FROM USER'S PANCAKE CRM SCREENSHOTS:
    // 1. lead_nuevo | 2. calificado | 3. cita_agendada | 4. no_asistio | 5. archivo_inactividad
    // 6. visito_proyecto | 7. en_negociacion | 8. separo_lote | 9. venta_cerrada | 10. perdido
    leads: [
        // Col 1: Lead Nuevo
        {
            id: 1,
            project_id: 'la-estrella',
            project_label: 'Estrella',
            buyer_name: 'HEIDY 💗',
            buyer_phone: '+573123934018',
            masked_phone: '+57312***4018',
            city: 'Villavicencio',
            purpose: 'PARA VIVIR',
            preferred_area: 120,
            lot_code: 'E1-L02',
            kanban_stage: 'lead_nuevo',
            status_label: 'Lead Nuevo',
            asesor_id: 'david@nodia.com',
            fecha_cita: '',
            nota: 'Acaba de hacer clic en el botón del anuncio de Meta Ads.',
            pass_code: 'EST-2026-4018',
            gps_unlocked: false,
            ai_active: true,
            last_auto_tag: 'Captado de Meta Ads → Lead Nuevo',
            messages: [
                { id: 101, sender: 'buyer', text: 'PARA VIVIR', time: '11:20 AM', batched: false },
                {
                    id: 102,
                    sender: 'ai',
                    text: 'Perfecto Heidy, muchas personas están buscando salir del ruido y construir su casa en una zona tranquila pero cerca de Villavicencio 🏡\n\n*Tamaños e Inversión (Vereda Las Mercedes, a 10m vía Acacías):*\n• *6x20 (120m²):* $27.000.000\n• *8x20 (160m²):* $32.000.000\n• *10x20 (200m²):* $42.000.000\n\nSeparas con *$500.000*, 40% inicial y 60% a *18 meses sin interés*.\n¿A qué hora te queda bien que te llame y desde qué ciudad nos visitarías?',
                    time: '11:20 AM',
                    meta: 'Router 0 Tokens · Auto-Tag: Lead Nuevo',
                    media: '/assets/la-estrella/frame_6.jpg',
                    media_caption: 'Vista aérea real Etapa 1 y 2 · Proyecto La Estrella'
                }
            ]
        },
        // Col 2: Calificado
        {
            id: 2,
            project_id: 'la-estrella',
            project_label: 'Estrella',
            buyer_name: 'Napoleón Corredor',
            buyer_phone: '+573143352589',
            masked_phone: '+57314***2589',
            city: 'Bogotá D.C.',
            purpose: 'PARA INVERTIR',
            preferred_area: 160,
            lot_code: 'E1-L04',
            kanban_stage: 'calificado',
            status_label: 'Calificado',
            asesor_id: 'david@nodia.com',
            fecha_cita: '',
            nota: 'Busca lote 8x20 ($32M) para inversión. Tiene el 40% inicial disponible.',
            pass_code: 'EST-2026-2589',
            gps_unlocked: false,
            ai_active: true,
            last_auto_tag: 'Valentina IA detectó presupuesto e interés → Movido a Calificado',
            messages: [
                { id: 201, sender: 'buyer', text: 'Voy desde Bogotá. Me interesa el lote de 8x20 de $32 millones, tengo la inicial lista.', time: '10:05 AM', batched: false },
                { id: 202, sender: 'ai', text: 'Excelente visión Napoleón 📈 En *8x20 (160m²)* de *$32.000.000*, separas hoy con *$500.000* y el 60% restante queda en 18 cuotas de *$1.066.667 sin interés*.\n\n¿Te queda mejor visitarnos con *David* este *Sábado a las 10:00 AM* o el *Domingo a las 11:00 AM*?', time: '10:05 AM', meta: 'Valentina IA · Auto-Tag → Calificado' }
            ]
        },
        {
            id: 3,
            project_id: 'la-estrella',
            project_label: 'Estrella',
            buyer_name: '💗 Maria Teresa',
            buyer_phone: '+573202538014',
            masked_phone: '+57320***8014',
            city: 'Villavicencio',
            purpose: 'PARA RECREACIÓN',
            preferred_area: 160,
            lot_code: 'E2-L07',
            kanban_stage: 'calificado',
            status_label: 'Calificado',
            asesor_id: 'stella@nodia.com',
            fecha_cita: '',
            nota: 'Quiere revisar tradición y escrituras en oficina de Barrio Camoa.',
            pass_code: 'EST-2026-8014',
            gps_unlocked: false,
            ai_active: true,
            last_auto_tag: 'Valentina IA → Calificado',
            messages: [
                { id: 301, sender: 'buyer', text: '¿Tienen oficina en Villavicencio para ver los documentos?', time: '9:30 AM', batched: false },
                { id: 302, sender: 'ai', text: '¡Claro que sí María Teresa! Nuestra oficina está en la *Calle 19 # 40-89, Barrio Camoa (frente al CC Primavera)* con *Stella*. ¿Te agendamos para mañana?', time: '9:30 AM', meta: 'Valentina IA · Auto-Tag → Calificado' }
            ]
        },
        // Col 3: Cita Agendada
        {
            id: 4,
            project_id: 'la-estrella',
            project_label: 'Estrella',
            buyer_name: 'Martha',
            buyer_phone: '+573212337645',
            masked_phone: '+57321***7645',
            city: 'Villavicencio',
            purpose: 'PARA VIVIR',
            preferred_area: 200,
            lot_code: 'E2-L09',
            kanban_stage: 'cita_agendada',
            status_label: 'Cita Agendada',
            asesor_id: 'david@nodia.com',
            fecha_cita: '06/09/2026 10:00 AM',
            nota: 'Cita confirmada con David en Vereda Las Mercedes.',
            pass_code: 'EST-2026-7645',
            gps_unlocked: false,
            ai_active: true,
            last_auto_tag: 'Valentina IA agendó visita → Cita Agendada + QR Emitido',
            messages: [
                { id: 401, sender: 'buyer', text: 'Confirmo cita para el sábado a las 10:00 AM con mi esposo.', time: '6:15 PM', batched: false },
                { id: 402, sender: 'ai', text: '¡Listo Martha! 🎉 Tu cita quedó agendada con *David (3203146653)* en Vereda Las Mercedes con tu Pasaporte QR `EST-2026-7645`.', time: '6:15 PM', meta: 'Valentina IA · Auto-Tag → Cita Agendada' }
            ]
        },
        {
            id: 5,
            project_id: 'la-estrella',
            project_label: 'Estrella',
            buyer_name: 'andrezrivera0912',
            buyer_phone: '+573114772590',
            masked_phone: '+57311***2590',
            city: 'Bogotá D.C.',
            purpose: 'PARA INVERTIR',
            preferred_area: 160,
            lot_code: 'E1-L04',
            kanban_stage: 'cita_agendada',
            status_label: 'Cita Agendada',
            asesor_id: 'david@nodia.com',
            fecha_cita: '06/09/2026 10:00 AM',
            nota: 'Viaja desde Bogotá para ver Etapa 1.',
            pass_code: 'EST-2026-2590',
            gps_unlocked: false,
            ai_active: true,
            last_auto_tag: 'Valentina IA → Cita Agendada',
            messages: [
                { id: 501, sender: 'buyer', text: 'Nos vemos el sábado a las 10am en el terreno.', time: 'Ayer', batched: false }
            ]
        },
        // Col 4: No asistio
        {
            id: 6,
            project_id: 'la-estrella',
            project_label: 'Estrella',
            buyer_name: 'Cristhian Barreto',
            buyer_phone: '+573226477911',
            masked_phone: '+57322***7911',
            city: 'Bogotá D.C.',
            purpose: 'PARA INVERTIR',
            preferred_area: 160,
            lot_code: 'E1-L04',
            kanban_stage: 'no_asistio',
            status_label: 'No asistio',
            asesor_id: 'david@nodia.com',
            fecha_cita: '22/08/2026 03:00 PM',
            nota: 'No alcanzó a llegar por cierre en la vía al Llano. Reprogramar.',
            pass_code: 'EST-2026-7911',
            gps_unlocked: false,
            ai_active: true,
            last_auto_tag: 'Valentina IA detectó inasistencia → No asistio',
            messages: [
                { id: 601, sender: 'buyer', text: 'Qué pena, hubo cierre en la vía al Llano y no alcancé a llegar.', time: '22 Ago', batched: false }
            ]
        },
        // Col 5: Archivo por Inactividad
        {
            id: 7,
            project_id: 'la-estrella',
            project_label: 'Estrella',
            buyer_name: 'cindycuevas854',
            buyer_phone: '+573106665412',
            masked_phone: '+57310***5412',
            city: 'Bogotá D.C.',
            purpose: 'PARA RECREACIÓN',
            preferred_area: 120,
            lot_code: 'E1-L02',
            kanban_stage: 'archivo_inactividad',
            status_label: 'Archivo por Inactividad',
            asesor_id: 'david@nodia.com',
            fecha_cita: '23/05/2026 03:00 PM',
            nota: 'Sin respuesta tras seguimiento.',
            pass_code: 'EST-2026-5412',
            gps_unlocked: false,
            ai_active: false,
            last_auto_tag: 'Auto-archivo 72h sin respuesta',
            messages: [
                { id: 701, sender: 'buyer', text: 'Info por favor', time: '23 May', batched: false }
            ]
        },
        // Col 6: Visito Proyecto (From 2nd screenshot!)
        {
            id: 8,
            project_id: 'la-estrella',
            project_label: 'Estrella',
            buyer_name: 'José Guzmán Grú...',
            buyer_phone: '+573212013688',
            masked_phone: '+57321***3688',
            city: 'Villavicencio',
            purpose: 'PARA VIVIR',
            preferred_area: 160,
            lot_code: 'E1-L04',
            kanban_stage: 'visito_proyecto',
            status_label: 'Visito Proyecto',
            asesor_id: 'david@nodia.com',
            fecha_cita: '16/08/2026 12:00 PM',
            nota: 'Visitó en terreno con David. Le gustó la ubicación a 10m de la vía.',
            pass_code: 'EST-2026-3688',
            gps_unlocked: true,
            ai_active: true,
            last_auto_tag: 'QR Escaneado por David → Visito Proyecto',
            messages: [
                { id: 801, sender: 'buyer', text: 'Acabamos de salir del terreno con David, nos gustó mucho el lote de 160m2.', time: '16 Ago', batched: false },
                { id: 802, sender: 'ai', text: '¡Qué alegría don José! 🏡 Recuerde que puede congelar la ubicación de su lote *E1-L04 (160m²)* hoy mismo con solo *$500.000 COP*. ¿Desea que le envíe los datos de separación o prefiere acercarse donde *Stella* en Barrio Camoa?', time: '16 Ago', meta: 'Valentina IA · Auto-Tag → Visito Proyecto' }
            ]
        },
        {
            id: 9,
            project_id: 'la-estrella',
            project_label: 'Estrella',
            buyer_name: 'marinaforero984',
            buyer_phone: '+573154163109',
            masked_phone: '+57315***3109',
            city: 'Acacías',
            purpose: 'PARA INVERTIR',
            preferred_area: 120,
            lot_code: 'E1-L02',
            kanban_stage: 'visito_proyecto',
            status_label: 'Visito Proyecto',
            asesor_id: 'david@nodia.com',
            fecha_cita: '21/08/2026 02:00 PM',
            nota: 'Visitó Etapa 1 con David.',
            pass_code: 'EST-2026-3109',
            gps_unlocked: true,
            ai_active: true,
            last_auto_tag: 'QR Escaneado → Visito Proyecto',
            messages: [
                { id: 901, sender: 'buyer', text: 'Ya conocimos el proyecto hoy a las 2pm.', time: '21 Ago', batched: false }
            ]
        },
        // Col 7: En Negociacion
        {
            id: 10,
            project_id: 'la-estrella',
            project_label: 'Estrella',
            buyer_name: 'Mauricio Rincón',
            buyer_phone: '+573114908821',
            masked_phone: '+57311***8821',
            city: 'Bogotá D.C.',
            purpose: 'PARA INVERTIR',
            preferred_area: 160,
            lot_code: 'E1-L04',
            kanban_stage: 'en_negociacion',
            status_label: 'En Negociacion',
            asesor_id: 'david@nodia.com',
            fecha_cita: '24/10/2026 10:00 AM',
            nota: 'Revisando plan de pagos con cesantías + 18 cuotas de $1.066.667.',
            pass_code: 'EST-2026-8821',
            gps_unlocked: true,
            ai_active: true,
            last_auto_tag: 'Valentina IA detectó negociación de inicial/cesantías → En Negociacion',
            messages: [
                { id: 1001, sender: 'buyer', text: 'Estamos cuadrando con mi esposa para pagar el 40% inicial con las cesantías y separar hoy.', time: '2:10 PM', batched: false },
                { id: 1002, sender: 'ai', text: '¡Excelente decisión Mauricio! 🎉 Aceptamos tus cesantías para completar el *40% inicial ($12.800.000)* en los próximos 30 días, y hoy solo aseguras el lote con *$500.000 COP*.', time: '2:10 PM', meta: 'Valentina IA · Auto-Tag → En Negociacion' }
            ]
        },
        // Col 8: Separo Lote (From 2nd screenshot: Adelaida Ortiz & JORGE FARIAS!)
        {
            id: 11,
            project_id: 'la-estrella',
            project_label: 'Estrella',
            buyer_name: 'Adelaida Ortiz',
            buyer_phone: '+573177342959',
            masked_phone: '+57317***2959',
            city: 'Bogotá D.C.',
            purpose: 'PARA INVERTIR',
            preferred_area: 160,
            lot_code: 'E1-L03',
            kanban_stage: 'separo_lote',
            status_label: 'Separo Lote',
            asesor_id: 'david@nodia.com',
            fecha_cita: '31/03/2026 12:00 AM',
            nota: '31/03 separa 2 lotes ($1.000.000 COP abonados).',
            pass_code: 'EST-2026-2959',
            gps_unlocked: true,
            ai_active: true,
            last_auto_tag: 'Valentina IA detectó pago de separación → Separo Lote',
            messages: [
                { id: 1101, sender: 'buyer', text: 'Ya realicé la separación de los 2 lotes en Etapa 1.', time: '31 Mar', batched: false },
                { id: 1102, sender: 'ai', text: '¡Felicitaciones Adelaida! 🎉 Tus 2 lotes quedaron bloqueados a tu nombre y tu código QR `EST-2026-2959` respalda toda tu operación.', time: '31 Mar', meta: 'Valentina IA · Auto-Tag → Separo Lote' }
            ]
        },
        {
            id: 12,
            project_id: 'la-estrella',
            project_label: 'Estrella',
            buyer_name: 'JORGE FARIAS',
            buyer_phone: '+573172179837',
            masked_phone: '+57317***9837',
            city: 'Villavicencio',
            purpose: 'PARA VIVIR',
            preferred_area: 120,
            lot_code: 'E1-L06',
            kanban_stage: 'separo_lote',
            status_label: 'Separo Lote',
            asesor_id: 'david@nodia.com',
            fecha_cita: '29/08/2026 10:00 AM',
            nota: 'Separó lote E1-L06 con $500.000 COP.',
            pass_code: 'EST-2026-9837',
            gps_unlocked: true,
            ai_active: true,
            last_auto_tag: 'Valentina IA → Separo Lote',
            messages: [
                { id: 1201, sender: 'buyer', text: 'Ya dejé los $500.000 de separación del lote.', time: '29 Ago', batched: false }
            ]
        },
        // Col 9: Venta Cerrada (From 2nd screenshot: marygarciaria50 & Elias Urrego!)
        {
            id: 13,
            project_id: 'la-estrella',
            project_label: 'Estrella',
            buyer_name: 'marygarciaria50',
            buyer_phone: '+573214927311',
            masked_phone: '+57321***7311',
            city: 'Bogotá D.C.',
            purpose: 'PARA INVERTIR',
            preferred_area: 190,
            lot_code: 'E1-L01',
            kanban_stage: 'venta_cerrada',
            status_label: 'Venta Cerrada',
            asesor_id: 'david@nodia.com',
            fecha_cita: '30/03/2026 02:00 PM',
            nota: 'Separa 2x Lote 31/03/2026 · Promesa firmada y 40% inicial pagado.',
            pass_code: 'EST-2026-7311',
            gps_unlocked: true,
            ai_active: false,
            last_auto_tag: 'Promesa + 40% Inicial completado → Venta Cerrada',
            messages: [
                { id: 1301, sender: 'buyer', text: 'Ya firmamos promesa de compraventa y completamos el 40% inicial de los 2 lotes.', time: '31 Mar', batched: false },
                { id: 1302, sender: 'ai', text: '¡Bienvenida oficialmente a la familia *Proyecto La Estrella*, Mary! 🌟 Tu compra de 2 lotes está en firme y respaldada en nuestra oficina de Barrio Camoa.', time: '31 Mar', meta: 'Valentina IA · Auto-Tag → Venta Cerrada' }
            ]
        },
        {
            id: 14,
            project_id: 'la-estrella',
            project_label: 'Estrella',
            buyer_name: 'Elias Urrego',
            buyer_phone: '+573105532384',
            masked_phone: '+57310***2384',
            city: 'Villavicencio',
            purpose: 'PARA VIVIR',
            preferred_area: 152,
            lot_code: 'E2-L08',
            kanban_stage: 'venta_cerrada',
            status_label: 'Venta Cerrada',
            asesor_id: 'david@nodia.com',
            fecha_cita: '31/03/2026 12:00 AM',
            nota: 'separo lote 31/03/2026 · Venta cerrada.',
            pass_code: 'EST-2026-2384',
            gps_unlocked: true,
            ai_active: false,
            last_auto_tag: 'Venta Cerrada',
            messages: [
                { id: 1401, sender: 'buyer', text: 'Promesa firmada en oficina Camoa.', time: '31 Mar', batched: false }
            ]
        },
        // Col 10: Perdido (From 2nd screenshot: alonpetor & Gloria!)
        {
            id: 15,
            project_id: 'la-estrella',
            project_label: 'Estrella',
            buyer_name: 'alonpetor',
            buyer_phone: '+573114994012',
            masked_phone: '+57311***4012',
            city: 'Bogotá D.C.',
            purpose: 'PARA INVERTIR',
            preferred_area: 120,
            lot_code: 'E1-L74',
            kanban_stage: 'perdido',
            status_label: 'Perdido',
            asesor_id: 'david@nodia.com',
            fecha_cita: '',
            nota: 'Buscaba casa ya construida para entrega inmediata.',
            pass_code: 'EST-2026-4012',
            gps_unlocked: false,
            ai_active: false,
            last_auto_tag: 'Valentina IA detectó descarte → Perdido',
            messages: [
                { id: 1501, sender: 'buyer', text: 'Busco una casa ya construida para mudarme este mes, gracias.', time: '15 Ago', batched: false }
            ]
        },
        {
            id: 16,
            project_id: 'la-estrella',
            project_label: 'Estrella',
            buyer_name: 'Gloria',
            buyer_phone: '+573213860944',
            masked_phone: '+57321***0944',
            city: 'Bogotá D.C.',
            purpose: 'PARA RECREACIÓN',
            preferred_area: 120,
            lot_code: 'E1-L74',
            kanban_stage: 'perdido',
            status_label: 'Perdido',
            asesor_id: 'david@nodia.com',
            fecha_cita: '',
            nota: 'Fuera de zona geográfica.',
            pass_code: 'EST-2026-0944',
            gps_unlocked: false,
            ai_active: false,
            last_auto_tag: 'Valentina IA → Perdido',
            messages: [
                { id: 1601, sender: 'buyer', text: 'Pensé que quedaba en Medellín, gracias.', time: '12 Ago', batched: false }
            ]
        }
    ]
};

const STAGE_META = {
    lead_nuevo: { title: 'Lead Nuevo', color: 'bg-slate-700 text-slate-100' },
    calificado: { title: 'Calificado', color: 'bg-yellow-400 text-slate-950' },
    cita_agendada: { title: 'Cita Agendada', color: 'bg-purple-600 text-white' },
    no_asistio: { title: 'No asistio', color: 'bg-rose-400 text-slate-950' },
    archivo_inactividad: { title: 'Archivo por Inactividad', color: 'bg-red-600 text-white' },
    visito_proyecto: { title: 'Visito Proyecto', color: 'bg-blue-600 text-white' },
    en_negociacion: { title: 'En Negociacion', color: 'bg-orange-600 text-white' },
    separo_lote: { title: 'Separo Lote', color: 'bg-emerald-600 text-white' },
    venta_cerrada: { title: 'Venta Cerrada', color: 'bg-teal-600 text-white' },
    perdido: { title: 'Perdido', color: 'bg-slate-800 text-slate-300' },
};

let pgPool = null;
let redisClient = null;
let infraStatus = {
    postgres: 'local-json',
    redis: 'local-memory',
    pg_host: process.env.DB_HOST || 'local',
    redis_host: process.env.REDIS_HOST || 'local',
    synced_at: null
};

async function syncToInfra(data) {
    try {
        if (redisClient) {
            await redisClient.set('leadcampestre:state:v5', JSON.stringify(data), 'EX', 86400);
            await redisClient.set('leadcampestre:heartbeat', new Date().toISOString(), 'EX', 3600);
            infraStatus.redis = 'connected (Redis 7)';
        }
        if (pgPool) {
            await pgPool.query(
                `INSERT INTO leadcampestre_state (id, schema_version, payload, updated_at)
                 VALUES (1, $1, $2::jsonb, NOW())
                 ON CONFLICT (id) DO UPDATE SET schema_version = EXCLUDED.schema_version, payload = EXCLUDED.payload, updated_at = NOW()`,
                [data.schema_version || 5, JSON.stringify(data)]
            );
            for (const p of (data.projects || [])) {
                await pgPool.query(
                    `INSERT INTO projects (id, name, short_name, location, commission_pct, data, updated_at)
                     VALUES ($1, $2, $3, $4, $5, $6::jsonb, NOW())
                     ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, short_name = EXCLUDED.short_name, location = EXCLUDED.location, commission_pct = EXCLUDED.commission_pct, data = EXCLUDED.data, updated_at = NOW()`,
                    [p.id, p.name, p.short_name, p.location, 0, JSON.stringify(p)]
                );
            }
            for (const l of (data.lots || [])) {
                await pgPool.query(
                    `INSERT INTO lots (id, project_id, code, area_m2, price_cop, status, buyer, data)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb)
                     ON CONFLICT (id) DO UPDATE SET code = EXCLUDED.code, area_m2 = EXCLUDED.area_m2, price_cop = EXCLUDED.price_cop, status = EXCLUDED.status, buyer = EXCLUDED.buyer, data = EXCLUDED.data`,
                    [l.id, l.project_id, l.code, Math.round(l.area_m2 || 152), l.price_cop, l.status, l.buyer, JSON.stringify(l)]
                );
            }
            for (const lead of (data.leads || [])) {
                await pgPool.query(
                    `INSERT INTO leads (id, project_id, buyer_name, buyer_phone, kanban_stage, status_label, asesor_id, fecha_cita, nota, pass_code, data, updated_at)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb, NOW())
                     ON CONFLICT (id) DO UPDATE SET kanban_stage = EXCLUDED.kanban_stage, status_label = EXCLUDED.status_label, asesor_id = EXCLUDED.asesor_id, fecha_cita = EXCLUDED.fecha_cita, nota = EXCLUDED.nota, data = EXCLUDED.data, updated_at = NOW()`,
                    [lead.id, lead.project_id, lead.buyer_name, lead.buyer_phone, lead.kanban_stage, lead.status_label, lead.asesor_id || '', lead.fecha_cita || '', lead.nota || '', lead.pass_code || '', JSON.stringify(lead)]
                );
            }
            infraStatus.postgres = 'connected (PostgreSQL 17)';
            infraStatus.synced_at = new Date().toISOString();
        }
    } catch (err) {
        console.error('Infra sync warning:', err.message);
    }
}

async function initInfra() {
    if (process.env.DB_HOST) {
        try {
            const pgMod = await import('pg');
            const Pool = pgMod.default?.Pool || pgMod.Pool;
            pgPool = new Pool({
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT || 5432),
                database: process.env.DB_DATABASE || 'leadcampestre',
                user: process.env.DB_USERNAME || 'postgres',
                password: process.env.DB_PASSWORD || 'Ashley2023',
            });
            await pgPool.query(`
                CREATE TABLE IF NOT EXISTS leadcampestre_state (
                    id INT PRIMARY KEY,
                    schema_version INT NOT NULL DEFAULT 5,
                    payload JSONB NOT NULL,
                    updated_at TIMESTAMPTZ DEFAULT NOW()
                );
                CREATE TABLE IF NOT EXISTS projects (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    short_name TEXT,
                    location TEXT,
                    commission_pct NUMERIC DEFAULT 0,
                    data JSONB,
                    updated_at TIMESTAMPTZ DEFAULT NOW()
                );
                CREATE TABLE IF NOT EXISTS lots (
                    id INT PRIMARY KEY,
                    project_id TEXT NOT NULL,
                    code TEXT NOT NULL,
                    area_m2 INT,
                    price_cop BIGINT,
                    status TEXT,
                    buyer TEXT,
                    data JSONB
                );
                CREATE TABLE IF NOT EXISTS leads (
                    id BIGINT PRIMARY KEY,
                    project_id TEXT NOT NULL,
                    buyer_name TEXT,
                    buyer_phone TEXT,
                    kanban_stage TEXT,
                    status_label TEXT,
                    asesor_id TEXT,
                    fecha_cita TEXT,
                    nota TEXT,
                    pass_code TEXT,
                    data JSONB,
                    updated_at TIMESTAMPTZ DEFAULT NOW()
                );
            `);
            const res = await pgPool.query('SELECT payload, schema_version FROM leadcampestre_state WHERE id = 1');
            if (res.rows.length > 0 && res.rows[0].schema_version === 5) {
                fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
                fs.writeFileSync(DB_PATH, JSON.stringify(res.rows[0].payload, null, 2), 'utf8');
                infraStatus.postgres = 'connected (PostgreSQL 17)';
            } else {
                const current = loadDb();
                await syncToInfra(current);
            }
            console.log('✅ Connected & Migrated PostgreSQL 17 at', process.env.DB_HOST);
        } catch (e) {
            console.error('PostgreSQL init error:', e.message);
            infraStatus.postgres = 'error: ' + e.message;
        }
    }
    if (process.env.REDIS_HOST) {
        try {
            const RedisMod = await import('ioredis');
            const Redis = RedisMod.default || RedisMod;
            redisClient = new Redis({
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT || 6379),
                password: process.env.REDIS_PASSWORD || 'Ashley2023',
                lazyConnect: false
            });
            await redisClient.ping();
            infraStatus.redis = 'connected (Redis 7)';
            console.log('✅ Connected to Redis 7 at', process.env.REDIS_HOST);
            await syncToInfra(loadDb());
        } catch (e) {
            console.error('Redis init error:', e.message);
            infraStatus.redis = 'error: ' + e.message;
        }
    }
}

function loadDb() {
    try {
        if (fs.existsSync(DB_PATH)) {
            const parsed = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
            if (parsed.schema_version === 5) {
                return parsed;
            }
        }
    } catch (e) {
        console.error('Resetting DB to schema v5:', e);
    }
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(initialDb, null, 2), 'utf8');
    return initialDb;
}

function saveDb(data) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    syncToInfra(data);
}

/**
 * MOTOR DE AUTO-ETIQUETADO INTELIGENTE DE VALENTINA RÍOS (Auto-Tagging & Kanban Stage Progression)
 * Analiza lo que escribe el comprador en WhatsApp, mueve automáticamente la tarjeta en el Kanban,
 * asigna asesor_id, fecha_cita y actualiza la Nota del CRM.
 */
function autoClassifyAndReply(messageText, lead) {
    const clean = messageText.trim();
    const upper = clean.toUpperCase();
    const lower = clean.toLowerCase();
    let autoMovedTo = null;

    // 1. Botones Iniciales de Anuncio (Router 0 Tokens -> Lead Nuevo / Calificado)
    if (['PARA VIVIR', 'PARA INVERTIR', 'PARA RECREACIÓN', 'PARA RECREACION'].includes(upper)) {
        lead.purpose = upper;
        return {
            text: `Perfecto ${lead.buyer_name.split(' ')[0]} 🌟 Esta zona en *Villavicencio (Vereda Las Mercedes, a 10m de la vía nacional)* tiene alta valorización.\n\n*Disponibilidad Oficial (Planos Octubre 18 de 2026):*\n• *Etapa 3 (114m² y 152m² · Caño Corcobado):* desde $27.000.000 (169 disponibles)\n• *Etapa 2 (152m² · Zona Plana Central):* $32.000.000 (298 disponibles)\n• *Etapa 1 (190m² y Especiales Lago):* $32M a $42M (102 disponibles)\n\nSeparas con *$500.000*, 40% inicial y 60% a *18 meses sin interés*.\n¿A qué hora te queda bien que te llame?`,
            meta: 'Router 0 Tokens · Auto-Tag: Lead Nuevo',
            tokens: 0,
            auto_stage: lead.kanban_stage,
            media: '/assets/la-estrella/plano-etapa-1.png',
            media_caption: 'Plano Oficial Actualizado Etapa 1 · Proyecto La Estrella'
        };
    }

    // 1B. Consulta por Planos o Disponibilidad por Etapa (Etapa 1, 2 o 3)
    if (lower.includes('plano') || lower.includes('disponible') || lower.includes('etapa 1') || lower.includes('etapa 2') || lower.includes('etapa 3')) {
        if (lead.kanban_stage === 'lead_nuevo') {
            lead.kanban_stage = 'calificado';
            lead.status_label = STAGE_META.calificado.title;
            lead.last_auto_tag = '🤖 Valentina IA envió planos actualizados → Calificado';
        }
        const stageNum = lower.includes('etapa 2') ? 2 : lower.includes('etapa 3') ? 3 : 1;
        return {
            text: `¡Claro que sí ${lead.buyer_name.split(' ')[0]}! Te comparto el *Plano Oficial Actualizado (Corte 18 Octubre 2026)* de **Etapa ${stageNum}** 🗺️:\n\n• **Etapa 1 (Lotes 190m² · Lago Central):** 102 lotes disponibles (ej. L74, L79, L80, L111, L203, L240)\n• **Etapa 2 (Lotes 152m² · Zona Plana):** 298 lotes disponibles (ej. L61, L161, L170, L212, L268, L490)\n• **Etapa 3 (Lotes 114m² y 152m² · Caño Corcobado):** 169 lotes disponibles (ej. L26, L110, L122, L202, L308)\n\n*(Los lotes en blanco están disponibles; los de punto rojo ● ya fueron vendidos).* ¿Cuál etapa te gustaría reservar con *$500.000*?`,
            meta: `Valentina IA · Plano Oficial Etapa ${stageNum} Enviado`,
            tokens: 48,
            auto_stage: lead.kanban_stage,
            media: `/assets/la-estrella/plano-etapa-${stageNum}.png`,
            media_caption: `Plano Actualizado La Estrella Etapa ${stageNum} (Oct 18, 2026)`
        };
    }

    // 2. Detección de "Venta Cerrada / Firma de Promesa + 40% Inicial"
    if (lower.includes('firme promesa') || lower.includes('firmamos promesa') || lower.includes('pague el 40%') || lower.includes('pagué el 40%') || lower.includes('complete la inicial') || lower.includes('completé la inicial')) {
        lead.kanban_stage = 'venta_cerrada';
        lead.status_label = STAGE_META.venta_cerrada.title;
        lead.nota = 'Promesa firmada y 40% de cuota inicial completada.';
        lead.last_auto_tag = '🤖 Valentina IA movió automáticamente a: Venta Cerrada';
        return {
            text: `¡Felicitaciones por tu lote en *Proyecto La Estrella*, ${lead.buyer_name.split(' ')[0]}! 🥂🎉\n\nTu promesa de compraventa y tu *40% de cuota inicial* han quedado registrados con tu código QR *${lead.pass_code}*. ¡Bienvenido como propietario!`,
            meta: 'Valentina IA · Auto-Tag → Venta Cerrada',
            tokens: 48,
            auto_stage: 'venta_cerrada'
        };
    }

    // 3. Detección de "Separó Lote ($500.000 COP)"
    if (lower.includes('500.000') || lower.includes('500 mil') || lower.includes('quinientos mil') || lower.includes('separar hoy') || lower.includes('ya separe') || lower.includes('ya separé') || lower.includes('transferi la separacion') || lower.includes('llevo los 500')) {
        lead.kanban_stage = 'separo_lote';
        lead.status_label = STAGE_META.separo_lote.title;
        lead.nota = 'Separó lote con $500.000 COP (30 días para completar el 40% inicial).';
        lead.last_auto_tag = '🤖 Valentina IA movió automáticamente a: Separo Lote ($500k)';
        return {
            text: `¡Excelente noticia ${lead.buyer_name.split(' ')[0]}! 🎉 He cambiado tu estado en el sistema a *Separó Lote* y bloqueé tu ubicación con los *$500.000 COP*.\n\nRecuerda que tienes *30 días* para completar el *40% inicial* en nuestra oficina del Barrio Camoa con *Stella (stella@nodia.com)*.`,
            meta: 'Valentina IA · Auto-Tag → Separo Lote ($500k)',
            tokens: 48,
            auto_stage: 'separo_lote'
        };
    }

    // 4. Detección de "En Negociación" (Cesantías, haciendo cuentas, propuesta de pago)
    if (lower.includes('cesantias') || lower.includes('cesantías') || lower.includes('haciendo cuentas') || lower.includes('hablando con mi esposa') || lower.includes('cuota inicial') || lower.includes('negociar')) {
        lead.kanban_stage = 'en_negociacion';
        lead.status_label = STAGE_META.en_negociacion.title;
        lead.nota = 'En negociación de plan de pagos (40% inicial / cesantías + 18 cuotas sin interés).';
        lead.last_auto_tag = '🤖 Valentina IA movió automáticamente a: En Negociacion';
        return {
            text: `¡Perfecto ${lead.buyer_name.split(' ')[0]}! Sí recibimos tus *cesantías* para completar el *40% de cuota inicial* (tienes 30 días de plazo tras separar con *$500.000*).\n\nEl *60% restante* te queda directo a *18 meses con 0% de interés*. ¿Separamos tu ubicación hoy mismo?`,
            meta: 'Valentina IA · Auto-Tag → En Negociacion',
            tokens: 48,
            auto_stage: 'en_negociacion'
        };
    }

    // 5. Detección de "Visitó Proyecto"
    if (lower.includes('ya estamos en el terreno') || lower.includes('ya visite') || lower.includes('ya visité') || lower.includes('estuve con david') || lower.includes('acabamos de ver el lote')) {
        lead.kanban_stage = 'visito_proyecto';
        lead.status_label = STAGE_META.visito_proyecto.title;
        lead.gps_unlocked = true;
        lead.nota = 'Visitó el proyecto en Vereda Las Mercedes con David.';
        lead.last_auto_tag = '🤖 Valentina IA movió automáticamente a: Visito Proyecto';
        return {
            text: `¡Qué gusto que hayas conocido el terreno con *David* en Vereda Las Mercedes, ${lead.buyer_name.split(' ')[0]}! 🏡\n\nPara asegurar el lote que más te gustó hoy solo necesitas *$500.000 COP* de separación. ¿Cuál de las opciones te gustó más: *6x20 ($27M)*, *8x20 ($32M)* o *10x20 ($42M)*?`,
            meta: 'Valentina IA · Auto-Tag → Visito Proyecto',
            tokens: 48,
            auto_stage: 'visito_proyecto'
        };
    }

    // 6. Detección de "Cita Agendada"
    if (lower.includes('sabado') || lower.includes('sábado') || lower.includes('domingo') || lower.includes('mañana a las') || lower.includes('agendar') || lower.includes('confirmo cita') || lower.includes('quiero ir')) {
        lead.kanban_stage = 'cita_agendada';
        lead.status_label = STAGE_META.cita_agendada.title;
        lead.fecha_cita = 'Sábado 10:00 AM';
        lead.asesor_id = 'david@nodia.com';
        lead.nota = 'Cita agendada automáticamente por Valentina Ríos con David.';
        lead.last_auto_tag = '🤖 Valentina IA movió automáticamente a: Cita Agendada (david@nodia.com)';
        return {
            text: `¡Agendado ${lead.buyer_name.split(' ')[0]}! 📅 Te esperamos este *Sábado a las 10:00 AM* en Vereda Las Mercedes con nuestro encargado *David (david@nodia.com · 3203146653)*.\n\nPresenta tu Pasaporte QR *${lead.pass_code}* al llegar para liberar el pin GPS exacto.`,
            meta: 'Valentina IA · Auto-Tag → Cita Agendada',
            tokens: 48,
            auto_stage: 'cita_agendada'
        };
    }

    // 7. Detección de "No Asistió"
    if (lower.includes('no pude ir') || lower.includes('no alcance a llegar') || lower.includes('no alcancé') || lower.includes('trancon') || lower.includes('trancón')) {
        lead.kanban_stage = 'no_asistio';
        lead.status_label = STAGE_META.no_asistio.title;
        lead.nota = 'No pudo asistir a la cita. Pendiente reprogramar.';
        lead.last_auto_tag = '🤖 Valentina IA movió automáticamente a: No asistio';
        return {
            text: `¡No te preocupes ${lead.buyer_name.split(' ')[0]}! Entendemos perfectamente. ¿Te gustaría que reprogramemos tu visita con *David* para el próximo *Sábado a las 10:00 AM* o *Domingo a las 11:00 AM*?`,
            meta: 'Valentina IA · Auto-Tag → No asistio',
            tokens: 48,
            auto_stage: 'no_asistio'
        };
    }

    // 8. Detección de "Perdido"
    if (lower.includes('no me interesa') || lower.includes('ya compre') || lower.includes('ya compré') || lower.includes('busco casa construida')) {
        lead.kanban_stage = 'perdido';
        lead.status_label = STAGE_META.perdido.title;
        lead.ai_active = false;
        lead.nota = 'Descartado automáticamente por Valentina IA.';
        lead.last_auto_tag = '🤖 Valentina IA movió automáticamente a: Perdido';
        return {
            text: `Muchas gracias por tu tiempo ${lead.buyer_name.split(' ')[0]}. Si en el futuro buscas invertir en lotes campestres en Villavicencio, aquí estaremos para servirte.`,
            meta: 'Valentina IA · Auto-Tag → Perdido',
            tokens: 48,
            auto_stage: 'perdido'
        };
    }

    // 9. Por defecto: Si estaba en "Lead Nuevo" y responde ciudad, presupuesto o preguntas -> Pasa automáticamente a "Calificado"!
    if (lead.kanban_stage === 'lead_nuevo') {
        lead.kanban_stage = 'calificado';
        lead.status_label = STAGE_META.calificado.title;
        lead.nota = 'Calificado automáticamente por Valentina Ríos: ' + clean.slice(0, 60);
        lead.last_auto_tag = '🤖 Valentina IA calificó al comprador → Movido a Calificado';
        autoMovedTo = 'calificado';
    }

    return {
        text: `¡Excelente ${lead.buyer_name.split(' ')[0]}! En *Proyecto La Estrella* (a 10m de la vía Villavicencio–Acacías) entregas escritura pública por porcentaje sobre 35 hectáreas y servicios en 8–9 meses.\n\nSeparas hoy con *$500.000 COP* y financias el 60% a *18 meses sin interés*. ¿Te agendamos visita con *David* este *Sábado a las 10:00 AM* o el *Domingo a las 11:00 AM*?`,
        meta: autoMovedTo ? 'Valentina IA · Auto-Tag → Calificado' : 'Valentina Ríos QLoRA (48 palabras)',
        tokens: 48,
        auto_stage: autoMovedTo
    };
}

function renderQuoteHtml(lead, lot, project) {
    const fmt = (n) => '$ ' + Number(n).toLocaleString('es-CO');
    return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Cotización Oficial & Pasaporte QR - ${lead.pass_code}</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<style>
  body { font-family: 'Outfit', sans-serif; }
  .mono { font-family: 'JetBrains Mono', monospace; }
  @media print { .no-print { display: none !important; } body { background: white !important; padding: 0 !important; } }
</style>
</head>
<body class="bg-slate-950 text-slate-900 p-4 md:p-10 min-h-screen">
  <div class="max-w-4xl mx-auto mb-5 flex justify-between items-center no-print bg-slate-900/90 border border-white/10 p-4 rounded-2xl backdrop-blur-xl">
    <a href="/" class="inline-flex items-center gap-2 text-sm font-bold text-[#bef264] hover:underline">← Volver a LeadCampestre OS</a>
    <button onclick="window.print()" class="px-6 py-2.5 rounded-xl bg-[#bef264] hover:bg-lime-300 text-slate-950 font-extrabold text-sm shadow-lg transition cursor-pointer">🖨️ Imprimir / Guardar PDF</button>
  </div>
  <div class="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden">
    <div class="bg-[#020617] text-white p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b-4 border-[#bef264] relative overflow-hidden">
      <img src="/assets/la-estrella/frame_9.jpg" class="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity" />
      <div class="relative z-10">
        <span class="px-3 py-1 rounded-full bg-[#bef264]/20 border border-[#bef264]/40 text-[#bef264] text-xs font-extrabold uppercase tracking-widest">Reserva & Cotización Oficial 2026</span>
        <h1 class="text-3xl md:text-4xl font-black mt-2 tracking-tight">${project.name}</h1>
        <p class="text-slate-300 text-sm mt-1">📍 ${project.location}</p>
        <p class="text-slate-400 text-xs mt-1">🏢 Oficina: ${project.office_address}</p>
      </div>
      <div class="bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-[#bef264]/30 text-right relative z-10">
        <div class="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Pasaporte QR Anti-Puenteo</div>
        <div class="text-xl font-black text-[#bef264] mono mt-0.5">${lead.pass_code}</div>
        <div class="text-[11px] text-slate-300 mt-1">Estado CRM: ${lead.status_label}</div>
      </div>
    </div>
    <div class="p-8 md:p-10 space-y-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
        <div><div class="text-[10px] uppercase font-bold text-slate-400">Comprador</div><div class="text-sm font-extrabold text-slate-900 mt-0.5">${lead.buyer_name}</div></div>
        <div><div class="text-[10px] uppercase font-bold text-slate-400">WhatsApp</div><div class="text-sm font-bold text-slate-900 mono mt-0.5">${lead.buyer_phone}</div></div>
        <div><div class="text-[10px] uppercase font-bold text-slate-400">Lote</div><div class="text-sm font-black text-emerald-700 mt-0.5">${lot.code} (${lot.dimensions})</div></div>
        <div><div class="text-[10px] uppercase font-bold text-slate-400">Asesor</div><div class="text-sm font-bold text-slate-900 mt-0.5">${lead.asesor_id}</div></div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="p-4 rounded-2xl border border-slate-200"><div class="text-xs text-slate-500">Valor Total</div><div class="text-xl font-black mono mt-1">${fmt(lot.price_cop)}</div></div>
        <div class="p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/50"><div class="text-xs text-emerald-800 font-bold">1. Separación Hoy</div><div class="text-xl font-black text-emerald-700 mono mt-1">${fmt(lot.separation_cop)}</div></div>
        <div class="p-4 rounded-2xl border border-slate-200"><div class="text-xs text-slate-500">2. Inicial (40% - 30 días)</div><div class="text-xl font-black mono mt-1">${fmt(lot.initial_40_cop)}</div></div>
        <div class="p-4 rounded-2xl border border-amber-300 bg-amber-50/60"><div class="text-xs text-amber-900 font-bold">3. 18 Cuotas (0% Interés)</div><div class="text-xl font-black text-amber-700 mono mt-1">${fmt(lot.monthly_18_cop)}</div></div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function renderAppHtml() {
    return fs.readFileSync(path.join(PUBLIC_DIR, 'app.html'), 'utf8');
}

const MIME_TYPES = {
    '.mp4': 'video/mp4',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.json': 'application/json',
};

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === 'GET' && url.pathname.startsWith('/assets/')) {
        const safePath = path.normalize(url.pathname).replace(/^(\.\.(\/|\\|$))+/, '');
        const filePath = path.join(PUBLIC_DIR, safePath);
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';
            const stat = fs.statSync(filePath);

            if (ext === '.mp4' && req.headers.range) {
                const parts = req.headers.range.replace(/bytes=/, '').split('-');
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
                const chunkSize = (end - start) + 1;
                const file = fs.createReadStream(filePath, { start, end });
                res.writeHead(206, {
                    'Content-Range': `bytes ${start}-${end}/${stat.size}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunkSize,
                    'Content-Type': contentType,
                });
                file.pipe(res);
                return;
            }

            res.writeHead(200, {
                'Content-Type': contentType,
                'Content-Length': stat.size,
                'Cache-Control': 'public, max-age=3600'
            });
            fs.createReadStream(filePath).pipe(res);
            return;
        }
    }

    if (req.method === 'GET' && url.pathname === '/api/state') {
        const db = loadDb();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(db));
    }

    if (req.method === 'GET' && url.pathname.startsWith('/quote/')) {
        const passCode = url.pathname.replace('/quote/', '').trim();
        const db = loadDb();
        const lead = db.leads.find(l => l.pass_code === passCode) || db.leads[0];
        const lot = db.lots.find(x => x.code === lead.lot_code) || db.lots[2];
        const project = db.projects.find(p => p.id === lead.project_id) || db.projects[0];
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(renderQuoteHtml(lead, lot, project));
    }

    if (req.method === 'POST' && url.pathname === '/api/lead-stage') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const { leadId, stage } = JSON.parse(body || '{}');
            const db = loadDb();
            const lead = db.leads.find(l => l.id === Number(leadId));
            if (lead && stage && STAGE_META[stage]) {
                lead.kanban_stage = stage;
                lead.status_label = STAGE_META[stage].title;
                lead.last_auto_tag = '✋ Movido manualmente a: ' + STAGE_META[stage].title;
                saveDb(db);
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(db));
        });
        return;
    }

    if (req.method === 'POST' && url.pathname === '/api/lead-field') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const { leadId, field, value } = JSON.parse(body || '{}');
            const db = loadDb();
            const lead = db.leads.find(l => l.id === Number(leadId));
            if (lead && ['asesor_id', 'fecha_cita', 'nota', 'lot_code', 'preferred_area', 'city'].includes(field)) {
                lead[field] = value;
                saveDb(db);
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(db));
        });
        return;
    }

    if (req.method === 'POST' && url.pathname === '/api/remarketing-noshow') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const db = loadDb();
            const nowTime = new Date().toLocaleTimeString('es-CO', { hour: 'numeric', minute: '2-digit' });
            db.leads.filter(l => l.kanban_stage === 'no_asistio').forEach(l => {
                l.kanban_stage = 'cita_agendada';
                l.status_label = 'Cita Agendada';
                l.fecha_cita = 'Sábado 10:00 AM (Reprogramado)';
                l.nota = 'Reactivado por Valentina IA con foto dron de Portería.';
                l.last_auto_tag = '🤖 Valentina IA reactivó de No asistio → Cita Agendada';
                l.messages.push({
                    id: Date.now() + Math.random(),
                    sender: 'ai',
                    text: `Hola ${l.buyer_name.split(' ')[0]} 👋 Te comparto el avance en dron de nuestra portería en *Proyecto La Estrella*.\n\nReprogramé tu Pasaporte QR *${l.pass_code}* con *David (david@nodia.com)* para este *Sábado a las 10:00 AM*.`,
                    time: nowTime,
                    meta: 'Valentina IA · Auto-Tag → Cita Agendada',
                    media: '/assets/la-estrella/frame_3.jpg',
                    media_caption: 'Portería en Obra · Vereda Las Mercedes'
                });
            });
            saveDb(db);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(db));
        });
        return;
    }

    if (req.method === 'POST' && url.pathname === '/api/new-project') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const { name, short_name, location, commission_pct, total_hectares } = JSON.parse(body || '{}');
            const db = loadDb();
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            db.projects.push({
                id: slug,
                name,
                short_name,
                location,
                office_address: 'Calle 19 # 40-89, Barrio Camoa, Villavicencio',
                ai_agent_name: 'Valentina Ríos',
                commission_pct,
                daily_ad_budget_cop: 30000,
                total_hectares,
                delivery_months: '8 a 9 meses',
                price_range: '$30M · $40M',
                stats: { total_leads: 1, lead_nuevo: 1, calificado: 0, cita_agendada: 0, no_asistio: 0, archivo_inactividad: 0, visito_proyecto: 0, en_negociacion: 0, separo_lote: 0, venta_cerrada: 0, perdido: 0 }
            });
            saveDb(db);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(db));
        });
        return;
    }

    if (req.method === 'POST' && url.pathname === '/api/message') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const { leadId, sender, messages, media, media_caption } = JSON.parse(body || '{}');
            const db = loadDb();
            const lead = db.leads.find(l => l.id === Number(leadId));
            if (lead && Array.isArray(messages) && messages.length > 0) {
                const nowTime = new Date().toLocaleTimeString('es-CO', { hour: 'numeric', minute: '2-digit' });
                const combinedText = messages.join(' — ');
                if (sender === 'buyer') {
                    lead.messages.push({
                        id: Date.now(),
                        sender: 'buyer',
                        text: combinedText,
                        time: nowTime,
                        batched: messages.length > 1,
                        batch_count: messages.length
                    });
                    if (lead.ai_active) {
                        const aiReply = autoClassifyAndReply(combinedText, lead);
                        lead.messages.push({
                            id: Date.now() + 1,
                            sender: 'ai',
                            text: aiReply.text,
                            time: nowTime,
                            meta: aiReply.meta,
                            media: aiReply.media || null,
                            media_caption: aiReply.media_caption || null
                        });
                    }
                } else {
                    lead.messages.push({
                        id: Date.now(),
                        sender: 'ai',
                        text: combinedText,
                        time: nowTime,
                        meta: 'Asesor Comercial (Manual)',
                        media: media || null,
                        media_caption: media_caption || null
                    });
                }
                saveDb(db);
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(db));
        });
        return;
    }

    if (req.method === 'POST' && url.pathname === '/api/new-lead') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const { project_id = 'la-estrella', name, phone, city = 'Bogotá D.C.', asesor_id = 'david@nodia.com', kanban_stage = 'lead_nuevo', purpose = 'PARA INVERTIR' } = JSON.parse(body || '{}');
            const db = loadDb();
            const proj = db.projects.find(p => p.id === project_id) || db.projects[0];
            const nowTime = new Date().toLocaleTimeString('es-CO', { hour: 'numeric', minute: '2-digit' });
            const suffix = String(Math.floor(1000 + Math.random() * 9000));
            const newLead = {
                id: Date.now(),
                project_id: proj.id,
                project_label: proj.short_name,
                buyer_name: name,
                buyer_phone: phone,
                masked_phone: phone.slice(0, 6) + '***' + phone.slice(-4),
                city,
                purpose,
                preferred_area: 160,
                lot_code: 'E1-L04',
                kanban_stage,
                status_label: STAGE_META[kanban_stage]?.title || 'Lead Nuevo',
                asesor_id,
                fecha_cita: kanban_stage === 'cita_agendada' ? 'Sábado 10:00 AM' : '',
                nota: 'Captado desde anuncio Meta Ads (' + purpose + ')',
                pass_code: 'EST-2026-' + suffix,
                gps_unlocked: false,
                ai_active: true,
                last_auto_tag: '🤖 Captado y etiquetado por Router 0 Tokens',
                messages: [
                    { id: Date.now() + 1, sender: 'buyer', text: purpose, time: nowTime, batched: false }
                ]
            };
            const routerReply = autoClassifyAndReply(purpose, newLead);
            newLead.messages.push({
                id: Date.now() + 2,
                sender: 'ai',
                text: routerReply.text,
                time: nowTime,
                meta: routerReply.meta,
                media: routerReply.media || null,
                media_caption: routerReply.media_caption || null
            });
            db.leads.unshift(newLead);
            saveDb(db);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(db));
        });
        return;
    }

    if (req.method === 'POST' && url.pathname === '/api/toggle-ai') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const { leadId } = JSON.parse(body || '{}');
            const db = loadDb();
            const lead = db.leads.find(l => l.id === Number(leadId));
            if (lead) {
                lead.ai_active = !lead.ai_active;
                saveDb(db);
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(db));
        });
        return;
    }

    if (req.method === 'POST' && url.pathname === '/api/lot-status') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const { lotId } = JSON.parse(body || '{}');
            const db = loadDb();
            const lot = db.lots.find(l => l.id === Number(lotId));
            if (lot) {
                const order = ['available', 'reserved', 'sold'];
                const next = order[(order.indexOf(lot.status) + 1) % order.length];
                lot.status = next;
                lot.buyer = next === 'available' ? null : (lot.buyer || 'Separado $500k');
                saveDb(db);
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(db));
        });
        return;
    }

    if (req.method === 'POST' && url.pathname === '/api/checkin') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const { passCode } = JSON.parse(body || '{}');
            const db = loadDb();
            const lead = db.leads.find(l => l.pass_code === passCode);
            if (lead) {
                lead.gps_unlocked = true;
                lead.kanban_stage = 'visito_proyecto';
                lead.status_label = 'Visito Proyecto';
                lead.last_auto_tag = '📲 QR Escaneado por David → Visito Proyecto';
                saveDb(db);
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(db));
        });
        return;
    }

    // Meta WhatsApp Cloud API Verification (GET) & Incoming Message / n8n Webhook (POST)
    if (url.pathname === '/api/webhooks/whatsapp') {
        if (req.method === 'GET') {
            const mode = url.searchParams.get('hub.mode');
            const token = url.searchParams.get('hub.verify_token');
            const challenge = url.searchParams.get('hub.challenge');
            const expectedToken = process.env.WHATSAPP_VERIFY_TOKEN || 'leadcampestre_verify_2026';
            if (mode === 'subscribe' && token === expectedToken) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(challenge || 'OK');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'ready', webhook: '/api/webhooks/whatsapp', verify_token: expectedToken }));
            }
            return;
        }
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                try {
                    const payload = JSON.parse(body || '{}');
                    const db = loadDb();
                    const nowTime = new Date().toLocaleTimeString('es-CO', { hour: 'numeric', minute: '2-digit' });
                    // Support both direct n8n payload { phone, name, text, project_id } and Meta Cloud API format
                    const msgEntry = payload?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
                    const contactEntry = payload?.entry?.[0]?.changes?.[0]?.value?.contacts?.[0];
                    const phone = payload.phone || (msgEntry?.from ? '+' + msgEntry.from : '+573000000000');
                    const name = payload.name || contactEntry?.profile?.name || 'Lead WhatsApp';
                    const text = payload.text || msgEntry?.text?.body || msgEntry?.button?.text || 'Hola quiero info del lote';
                    const projectId = payload.project_id || 'la-estrella';

                    let lead = db.leads.find(l => l.buyer_phone.replace(/\D/g, '') === phone.replace(/\D/g, ''));
                    if (!lead) {
                        const proj = db.projects.find(p => p.id === projectId) || db.projects[0];
                        lead = {
                            id: Date.now(),
                            project_id: proj.id,
                            project_label: proj.short_name,
                            buyer_name: name,
                            buyer_phone: phone,
                            masked_phone: phone.slice(0, 6) + '***' + phone.slice(-4),
                            city: 'Por definir',
                            purpose: 'POR DEFINIR',
                            preferred_area: 160,
                            lot_code: 'E1-L04',
                            kanban_stage: 'lead_nuevo',
                            status_label: 'Lead Nuevo',
                            asesor_id: 'david@nodia.com',
                            fecha_cita: '',
                            nota: 'Captado en vivo por Webhook WhatsApp',
                            pass_code: 'EST-2026-' + String(Math.floor(1000 + Math.random() * 9000)),
                            gps_unlocked: false,
                            ai_active: true,
                            last_auto_tag: '🤖 Captado por Webhook WhatsApp',
                            messages: []
                        };
                        db.leads.unshift(lead);
                    }
                    lead.messages.push({ id: Date.now(), sender: 'buyer', text, time: nowTime, batched: false });
                    let aiReply = null;
                    if (lead.ai_active) {
                        aiReply = autoClassifyAndReply(text, lead);
                        lead.messages.push({
                            id: Date.now() + 1,
                            sender: 'ai',
                            text: aiReply.text,
                            time: nowTime,
                            meta: aiReply.meta,
                            media: aiReply.media || null,
                            media_caption: aiReply.media_caption || null
                        });
                    }
                    saveDb(db);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ ok: true, lead_id: lead.id, kanban_stage: lead.kanban_stage, status_label: lead.status_label, last_auto_tag: lead.last_auto_tag, ai_reply: aiReply }));
                } catch (e) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ ok: false, error: e.message }));
                }
            });
            return;
        }
    }

    if (req.method === 'GET' && url.pathname === '/api/health') {
        const db = loadDb();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            ok: true,
            service: 'LeadCampestre OS v4',
            infra: infraStatus,
            counts: {
                projects: (db.projects || []).length,
                lots: (db.lots || []).length,
                leads: (db.leads || []).length
            }
        }));
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderAppHtml());
});

const PORT = Number(process.env.PORT || 3050);
const HOST = process.env.HOST || '0.0.0.0';
initInfra().finally(() => {
    server.listen(PORT, HOST, () => {
        console.log(`LeadCampestre OS v4 (10-Column Kanban + Auto-Tagging IA) running at http://${HOST}:${PORT}`);
    });
});


