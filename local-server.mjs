import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'storage', 'local_db.json');
const PUBLIC_DIR = path.join(__dirname, 'public');

const initialDb = {
    schema_version: 4,
    projects: [
        {
            id: 'la-estrella',
            name: 'Proyecto La Estrella',
            short_name: 'Estrella',
            location: 'Villavicencio - Meta, Vereda Las Mercedes (a 10m Vía Villavicencio–Acacías)',
            office_address: 'Calle 19 # 40-89, Barrio Camoa (Frente al CC Primavera Urbana)',
            ai_agent_name: 'Valentina Ríos',
            commission_pct: 40.0,
            daily_ad_budget_cop: 30000,
            total_hectares: 35,
            delivery_months: '8 a 9 meses',
            price_range: '$27M · $32M · $42M',
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
            commission_pct: 40.0,
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
            commission_pct: 35.0,
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
        { id: 1, project_id: 'la-estrella', stage: 1, code: 'E1-L01', area_m2: 120, dimensions: '6x20 m', price_cop: 27000000, separation_cop: 500000, initial_40_cop: 10800000, monthly_18_cop: 900000, status: 'sold', buyer: 'marygarciaria50', features: 'Esquinero · Portería', x: 18, y: 68 },
        { id: 2, project_id: 'la-estrella', stage: 1, code: 'E1-L02', area_m2: 120, dimensions: '6x20 m', price_cop: 27000000, separation_cop: 500000, initial_40_cop: 10800000, monthly_18_cop: 900000, status: 'available', buyer: null, features: 'Frente a Vía Afirmado', x: 28, y: 65 },
        { id: 3, project_id: 'la-estrella', stage: 1, code: 'E1-L03', area_m2: 160, dimensions: '8x20 m', price_cop: 32000000, separation_cop: 500000, initial_40_cop: 12800000, monthly_18_cop: 1066667, status: 'reserved', buyer: 'Adelaida Ortiz', features: 'Top Seller · Cerca Portería', x: 38, y: 62 },
        { id: 4, project_id: 'la-estrella', stage: 1, code: 'E1-L04', area_m2: 160, dimensions: '8x20 m', price_cop: 32000000, separation_cop: 500000, initial_40_cop: 12800000, monthly_18_cop: 1066667, status: 'available', buyer: null, features: 'Vista a la Cordillera', x: 48, y: 59 },
        { id: 5, project_id: 'la-estrella', stage: 1, code: 'E1-L05', area_m2: 200, dimensions: '10x20 m', price_cop: 42000000, separation_cop: 500000, initial_40_cop: 16800000, monthly_18_cop: 1400000, status: 'available', buyer: null, features: 'Doble Frente · Arborizado', x: 58, y: 56 },
        { id: 6, project_id: 'la-estrella', stage: 1, code: 'E1-L06', area_m2: 120, dimensions: '6x20 m', price_cop: 27000000, separation_cop: 500000, initial_40_cop: 10800000, monthly_18_cop: 900000, status: 'reserved', buyer: 'JORGE FARIAS', features: 'A 20m Vía Principal', x: 68, y: 53 },
        { id: 7, project_id: 'la-estrella', stage: 2, code: 'E2-L07', area_m2: 160, dimensions: '8x20 m', price_cop: 32000000, separation_cop: 500000, initial_40_cop: 12800000, monthly_18_cop: 1066667, status: 'available', buyer: null, features: 'Zona Plana Central', x: 25, y: 48 },
        { id: 8, project_id: 'la-estrella', stage: 2, code: 'E2-L08', area_m2: 160, dimensions: '8x20 m', price_cop: 32000000, separation_cop: 500000, initial_40_cop: 12800000, monthly_18_cop: 1066667, status: 'sold', buyer: 'Elias Urrego', features: 'Vía Interna 8m', x: 37, y: 45 },
        { id: 9, project_id: 'la-estrella', stage: 2, code: 'E2-L09', area_m2: 200, dimensions: '10x20 m', price_cop: 42000000, separation_cop: 500000, initial_40_cop: 16800000, monthly_18_cop: 1400000, status: 'available', buyer: null, features: 'Especial Casa Quinta', x: 49, y: 42 },
        { id: 10, project_id: 'la-estrella', stage: 2, code: 'E2-L10', area_m2: 200, dimensions: '10x20 m', price_cop: 42000000, separation_cop: 500000, initial_40_cop: 16800000, monthly_18_cop: 1400000, status: 'available', buyer: null, features: 'Vista Panorámica Piedemonte', x: 61, y: 39 },
        { id: 11, project_id: 'la-estrella', stage: 3, code: 'E3-L11', area_m2: 120, dimensions: '6x20 m', price_cop: 27000000, separation_cop: 500000, initial_40_cop: 10800000, monthly_18_cop: 900000, status: 'available', buyer: null, features: 'Cerca a Sendero Natural', x: 30, y: 31 },
        { id: 12, project_id: 'la-estrella', stage: 3, code: 'E3-L12', area_m2: 160, dimensions: '8x20 m', price_cop: 32000000, separation_cop: 500000, initial_40_cop: 12800000, monthly_18_cop: 1066667, status: 'available', buyer: null, features: 'Brisa de Montaña', x: 44, y: 29 },
        { id: 13, project_id: 'la-estrella', stage: 3, code: 'E3-L13', area_m2: 200, dimensions: '10x20 m', price_cop: 42000000, separation_cop: 500000, initial_40_cop: 16800000, monthly_18_cop: 1400000, status: 'available', buyer: null, features: 'Lote VIP Mayor Valorización', x: 58, y: 27 },
        { id: 14, project_id: 'la-estrella', stage: 3, code: 'E3-L14', area_m2: 200, dimensions: '10x20 m', price_cop: 42000000, separation_cop: 500000, initial_40_cop: 16800000, monthly_18_cop: 1400000, status: 'sold', buyer: 'marygarciaria50 (Lote 2)', features: 'Esquinero Reserva Forestal', x: 70, y: 25 },
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
        // Col 9: Venta Cerrada / Comisión (From 2nd screenshot: marygarciaria50 & Elias Urrego!)
        {
            id: 13,
            project_id: 'la-estrella',
            project_label: 'Estrella',
            buyer_name: 'marygarciaria50',
            buyer_phone: '+573214927311',
            masked_phone: '+57321***7311',
            city: 'Bogotá D.C.',
            purpose: 'PARA INVERTIR',
            preferred_area: 200,
            lot_code: 'E1-L01',
            kanban_stage: 'venta_cerrada',
            status_label: 'Venta Cerrada / Comisi...',
            asesor_id: 'david@nodia.com',
            fecha_cita: '30/03/2026 02:00 PM',
            nota: 'Separa 2x Lote 31/03/2026 · Promesa firmada y 40% inicial pagado.',
            pass_code: 'EST-2026-7311',
            gps_unlocked: true,
            ai_active: false,
            last_auto_tag: 'Promesa + 40% Inicial completado → Venta Cerrada / Comisión 40% Causada',
            messages: [
                { id: 1301, sender: 'buyer', text: 'Ya firmamos promesa de compraventa y completamos el 40% inicial de los 2 lotes.', time: '31 Mar', batched: false },
                { id: 1302, sender: 'ai', text: '¡Bienvenida oficialmente a la familia *Proyecto La Estrella*, Mary! 🌟 Tu compra de 2 lotes está en firme y tu comisión de socio (40%) ha sido liquidada.', time: '31 Mar', meta: 'Valentina IA · Auto-Tag → Venta Cerrada / Comisión' }
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
            preferred_area: 160,
            lot_code: 'E2-L08',
            kanban_stage: 'venta_cerrada',
            status_label: 'Venta Cerrada / Comisi...',
            asesor_id: 'david@nodia.com',
            fecha_cita: '31/03/2026 12:00 AM',
            nota: 'separo lote 31/03/2026 · Venta cerrada.',
            pass_code: 'EST-2026-2384',
            gps_unlocked: true,
            ai_active: false,
            last_auto_tag: 'Venta Cerrada / Comisión 40%',
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
            lot_code: 'E1-L02',
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
            lot_code: 'E1-L02',
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
    venta_cerrada: { title: 'Venta Cerrada / Comisi...', color: 'bg-teal-600 text-white' },
    perdido: { title: 'Perdido', color: 'bg-slate-800 text-slate-300' },
};

function loadDb() {
    try {
        if (fs.existsSync(DB_PATH)) {
            const parsed = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
            if (parsed.schema_version === 4) {
                return parsed;
            }
        }
    } catch (e) {
        console.error('Resetting DB to schema v4:', e);
    }
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(initialDb, null, 2), 'utf8');
    return initialDb;
}

function saveDb(data) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
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
            text: `Perfecto ${lead.buyer_name.split(' ')[0]} 🌟 Esta zona en *Villavicencio (Vereda Las Mercedes, a 10m de la vía nacional)* tiene alta valorización.\n\n*Tamaños e Inversión:*\n• *6x20 (120m²):* $27.000.000\n• *8x20 (160m²):* $32.000.000\n• *10x20 (200m²):* $42.000.000\n\nSeparas con *$500.000*, 40% inicial y 60% a *18 meses sin interés*.\n¿A qué hora te queda bien que te llame?`,
            meta: 'Router 0 Tokens · Auto-Tag: Lead Nuevo',
            tokens: 0,
            auto_stage: lead.kanban_stage,
            media: '/assets/la-estrella/frame_6.jpg',
            media_caption: 'Vista aérea real Etapa 1 y 2 · Proyecto La Estrella'
        };
    }

    // 2. Detección de "Venta Cerrada / Firma de Promesa + 40% Inicial"
    if (lower.includes('firme promesa') || lower.includes('firmamos promesa') || lower.includes('pague el 40%') || lower.includes('pagué el 40%') || lower.includes('complete la inicial') || lower.includes('completé la inicial')) {
        lead.kanban_stage = 'venta_cerrada';
        lead.status_label = STAGE_META.venta_cerrada.title;
        lead.nota = 'Promesa firmada y 40% de cuota inicial completada. Comisión 40% causada.';
        lead.last_auto_tag = '🤖 Valentina IA movió automáticamente a: Venta Cerrada / Comisión';
        return {
            text: `¡Felicitaciones por tu lote en *Proyecto La Estrella*, ${lead.buyer_name.split(' ')[0]}! 🥂🎉\n\nTu promesa de compraventa y tu *40% de cuota inicial* han quedado registrados con tu código QR *${lead.pass_code}*. ¡Bienvenido como propietario!`,
            meta: 'Valentina IA · Auto-Tag → Venta Cerrada / Comisión',
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
    return `<!DOCTYPE html>
<html lang="es" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LeadCampestre OS · 10-Stage Kanban CRM & Auto-Tagger IA</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Outfit', sans-serif; }
    .mono { font-family: 'JetBrains Mono', monospace; }
    ::-webkit-scrollbar { width: 7px; height: 7px; }
    ::-webkit-scrollbar-track { background: rgba(15, 23, 42, 0.5); border-radius: 9999px; }
    ::-webkit-scrollbar-thumb { background: rgba(190, 242, 100, 0.35); border-radius: 9999px; }
    ::-webkit-scrollbar-thumb:hover { background: #bef264; }
  </style>
</head>
<body class="bg-[#020617] text-slate-100 antialiased selection:bg-[#bef264] selection:text-slate-950 min-h-screen flex overflow-x-hidden">

  <!-- =====================================================================
       LEFT ENTERPRISE SIDEBAR (Con Selector Multi-Proyecto)
       ===================================================================== -->
  <aside class="w-[265px] bg-[#050B16] border-r border-white/[0.07] flex flex-col shrink-0 h-screen sticky top-0 z-40 select-none">
    
    <div class="h-16 px-4 flex items-center justify-between border-b border-white/[0.07]">
      <div class="flex items-center gap-3 min-w-0">
        <div class="w-10 h-10 rounded-2xl bg-[#bef264] text-slate-950 flex items-center justify-center shadow-[0_0_25px_rgba(190,242,100,0.4)] shrink-0">
          <i data-lucide="leaf" class="w-5 h-5 fill-current"></i>
        </div>
        <div class="min-w-0">
          <div class="flex items-center gap-1.5">
            <span class="font-black text-sm tracking-tight text-white truncate">LEADCAMPESTRE</span>
            <span class="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#bef264]/15 text-[#bef264] border border-[#bef264]/30">OS</span>
          </div>
          <p class="text-[10.5px] text-slate-400 truncate">Multi-Project PropTech CRM</p>
        </div>
      </div>
    </div>

    <!-- MULTI-PROJECT SELECTOR DROPDOWN -->
    <div class="p-3.5 border-b border-white/[0.07] bg-slate-950/60 space-y-2">
      <div class="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
        <span>Proyecto Activo</span>
        <button onclick="openNewProjectModal()" class="text-[#bef264] hover:underline flex items-center gap-0.5 cursor-pointer">
          <i data-lucide="plus" class="w-3 h-3"></i> Nuevo Proyecto
        </button>
      </div>

      <select id="project-selector" onchange="changeProject(this.value)" class="w-full bg-slate-900 border border-[#bef264]/40 hover:border-[#bef264] rounded-xl px-3 py-2.5 text-xs font-extrabold text-white focus:outline-none cursor-pointer shadow-[0_0_15px_rgba(190,242,100,0.1)]">
        <option value="la-estrella">⭐ Proyecto La Estrella (Villavicencio)</option>
        <option value="reserva-llano">🌴 Reserva del Llano (Acacías)</option>
        <option value="mirador-restrepo">🏞️ Mirador de Restrepo (Meta)</option>
        <option value="all">🌎 Todos los Proyectos (Consolidado)</option>
      </select>

      <div class="p-2.5 rounded-xl bg-slate-900/90 border border-white/[0.06] flex items-center justify-between text-[11px]">
        <span id="sidebar-proj-loc" class="text-slate-300 truncate">Estrella · $27M · $32M · $42M</span>
        <span id="sidebar-proj-comm" class="px-2 py-0.5 rounded bg-[#bef264]/15 text-[#bef264] font-mono font-bold text-[10px] shrink-0">Socio 40%</span>
      </div>
    </div>

    <!-- Navigation Links -->
    <nav class="flex-1 overflow-y-auto px-3 py-2.5 space-y-1">
      <div class="px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">CRM & Auto-Etiquetado IA</div>

      <button onclick="setTab('kanban')" id="nav-kanban" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all">
        <i data-lucide="kanban" class="w-4 h-4 shrink-0"></i>
        <span class="flex-1 text-left">CRM Kanban (10 Etapas)</span>
        <span id="sidebar-kanban-count" class="text-[9px] font-black px-2 py-0.5 rounded-full bg-purple-500/25 text-purple-300 border border-purple-500/30">2,737</span>
      </button>

      <button onclick="setTab('inbox')" id="nav-inbox" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all">
        <i data-lucide="bot" class="w-4 h-4 shrink-0"></i>
        <span class="flex-1 text-left">Inbox & Auto-Tagger IA</span>
        <span class="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Auto+Manual</span>
      </button>

      <button onclick="setTab('overview')" id="nav-overview" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all">
        <i data-lucide="layout-dashboard" class="w-4 h-4 shrink-0"></i>
        <span class="flex-1 text-left">Resumen & Video Dron</span>
        <span class="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#bef264]/20 text-[#bef264]">Dron HD</span>
      </button>

      <button onclick="setTab('lots')" id="nav-lots" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all">
        <i data-lucide="map-pinned" class="w-4 h-4 shrink-0"></i>
        <span class="flex-1 text-left">Masterplan Aéreo & Lotes</span>
        <span class="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">Etapas 1-3</span>
      </button>

      <div class="px-3 pt-3 pb-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Terreno & Blindaje 40%</div>

      <button onclick="setTab('checkin')" id="nav-checkin" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all">
        <i data-lucide="qr-code" class="w-4 h-4 shrink-0"></i>
        <span class="flex-1 text-left">Portería QR · David & Stella</span>
        <span class="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">Anti-Puenteo</span>
      </button>

      <button onclick="setTab('landing')" id="nav-landing" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all">
        <i data-lucide="globe" class="w-4 h-4 shrink-0"></i>
        <span class="flex-1 text-left">Landing Pública La Estrella</span>
        <span class="text-[9px] font-black px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">Web B2C</span>
      </button>
    </nav>

    <div class="p-3.5 border-t border-white/[0.07] bg-[#030710]">
      <div class="p-3 rounded-2xl bg-slate-900/90 border border-white/[0.08] space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Modo de Acceso</span>
          <span id="sidebar-role-badge" class="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#bef264]/20 text-[#bef264]">Socio 40%</span>
        </div>
        <button onclick="toggleRole()" class="w-full py-2 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-[11px] font-bold text-slate-200 transition flex items-center justify-center gap-1.5 cursor-pointer">
          <i data-lucide="eye" class="w-3.5 h-3.5 text-[#bef264]"></i>
          <span id="role-switch-label">Ver como Coordinador Ads</span>
        </button>
      </div>
    </div>
  </aside>

  <!-- =====================================================================
       MAIN WORKSPACE AREA
       ===================================================================== -->
  <div class="flex-1 flex flex-col min-w-0 min-h-screen">

    <!-- TOP STICKY GLASS BAR -->
    <header class="py-3 sticky top-0 z-30 bg-[#020617]/90 backdrop-blur-xl border-b border-white/[0.07] px-6 flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3 min-w-0">
        <div>
          <div class="flex items-center gap-2.5">
            <h2 id="header-title" class="text-lg font-black text-white tracking-tight">Proyecto La Estrella</h2>
            <span id="header-project-pill" class="px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold bg-[#bef264]/15 text-[#bef264] border border-[#bef264]/30">
              Estrella · 35 Ha
            </span>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Auto-Etiquetado IA Activo
            </span>
          </div>
          <p id="header-subtitle" class="text-xs text-slate-400 truncate mt-0.5">Valentina Ríos etiqueta y mueve los leads automáticamente según la conversación, o puedes arrastrarlos manualmente.</p>
        </div>
      </div>

      <!-- Live Auto-Tag Notification Toast -->
      <div id="auto-tag-toast" class="hidden items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950 border border-[#bef264] text-xs font-bold text-[#bef264] shadow-[0_0_25px_rgba(190,242,100,0.3)]">
        <i data-lucide="sparkles" class="w-4 h-4"></i>
        <span id="auto-tag-toast-text">Valentina IA actualizó el estado del lead</span>
      </div>

      <div class="flex items-center gap-2.5 shrink-0">
        <button onclick="openNewLeadModal()" class="px-4 py-2 rounded-xl bg-[#bef264] hover:bg-lime-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(190,242,100,0.3)] transition flex items-center gap-2 cursor-pointer">
          <i data-lucide="plus-circle" class="w-4 h-4"></i>
          <span>Crear Contacto / Simular Anuncio</span>
        </button>
      </div>
    </header>

    <!-- CONTENT CONTAINER -->
    <main class="flex-1 p-6 max-w-[1780px] w-full mx-auto space-y-6">

      <!-- =================================================================
           VIEW 1: CRM KANBAN DE 10 COLUMNAS (Automático por Bot + Manual Drag & Drop)
           ================================================================= -->
      <div id="view-kanban" class="space-y-4">

        <!-- Top CRM Toolbar -->
        <div class="bg-slate-900/90 border border-white/[0.08] rounded-3xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-3">
            <div class="flex items-center gap-2 pr-3 border-r border-white/10">
              <i data-lucide="kanban" class="w-5 h-5 text-[#bef264]"></i>
              <span class="text-base font-black text-white">Contacto · Kanban</span>
              <span id="crm-total-pill" class="px-2.5 py-0.5 rounded-full text-xs font-mono font-black bg-[#bef264]/15 text-[#bef264]">2,737</span>
            </div>

            <!-- View Mode Toggle: Kanban vs Tabla -->
            <div class="flex items-center bg-slate-950 p-1 rounded-xl border border-white/10 text-xs">
              <button onclick="setCrmViewMode('kanban')" id="crm-mode-kanban" class="px-3.5 py-1.5 rounded-lg bg-[#bef264] text-slate-950 font-black flex items-center gap-1.5 cursor-pointer">
                <i data-lucide="kanban" class="w-3.5 h-3.5"></i> Kanban (10 Etapas)
              </button>
              <button onclick="setCrmViewMode('table')" id="crm-mode-table" class="px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white font-bold flex items-center gap-1.5 cursor-pointer">
                <i data-lucide="table" class="w-3.5 h-3.5"></i> Tabla (2,737)
              </button>
            </div>

            <!-- Filter by Asesor -->
            <select id="crm-asesor-filter" onchange="renderKanbanAndTable()" class="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 focus:outline-none cursor-pointer">
              <option value="all">👤 Todos los Empleados (david@nodia.com / stella@nodia.com)</option>
              <option value="david@nodia.com">👷‍♂️ david@nodia.com (Terreno Las Mercedes)</option>
              <option value="stella@nodia.com">🏢 stella@nodia.com (Oficina Barrio Camoa)</option>
            </select>
          </div>

          <div class="flex flex-wrap items-center gap-2.5">
            <input id="crm-search-input" oninput="renderKanbanAndTable()" type="text" placeholder="🔍 Buscar cliente, +573... o nota" class="bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white w-60 focus:outline-none focus:border-[#bef264]" />

            <button onclick="triggerRemarketingNoShow()" class="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition">
              <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
              <span>Reactivar "No asistio" con Dron IA</span>
            </button>
          </div>
        </div>

        <!-- Banner explaining Auto + Manual Kanban -->
        <div class="bg-slate-900/60 border border-white/[0.06] rounded-2xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div class="flex items-center gap-2 text-slate-300">
            <span class="px-2 py-0.5 rounded bg-[#bef264]/20 text-[#bef264] font-black text-[10px] uppercase">Doble Control</span>
            <span><strong>1. Automático:</strong> Valentina Ríos mueve la tarjeta según lo que hable el cliente en WhatsApp. <strong>2. Manual:</strong> Arrastra cualquier tarjeta con el mouse o cámbiale el selector <code>Estado</code>.</span>
          </div>
          <span class="text-[11px] text-[#bef264] font-bold">Desliza horizontalmente para ver las 10 columnas →</span>
        </div>

        <!-- 10-COLUMN HORIZONTAL SCROLLING KANBAN BOARD (Exact match to Pancake CRM's 10 columns!) -->
        <div id="crm-kanban-container" class="flex gap-4 overflow-x-auto pb-4 items-start min-h-[650px]"></div>

        <!-- TABLE CONTAINER -->
        <div id="crm-table-container" class="hidden bg-slate-900/90 border border-white/[0.08] rounded-3xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-slate-950 border-b border-white/10 text-[10.5px] font-black uppercase tracking-wider text-slate-400">
                  <th class="p-4">Contacto</th>
                  <th class="p-4">Phone Number</th>
                  <th class="p-4">Proyecto</th>
                  <th class="p-4">Estado (Manual / Auto IA)</th>
                  <th class="p-4">asesor_id</th>
                  <th class="p-4">fecha_cita</th>
                  <th class="p-4">Última Acción Bot IA</th>
                  <th class="p-4">Nota</th>
                  <th class="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody id="crm-table-body" class="divide-y divide-white/[0.06]"></tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- =================================================================
           VIEW 2: INBOX & AUTO-TAGGER IA (Prueba aquí cómo el Bot etiqueta en automático)
           ================================================================= -->
      <div id="view-inbox" class="hidden">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[700px]">

          <!-- LEFT COL (3): LISTA DE LEADS CON SU ETIQUETA KANBAN ACTUAL -->
          <div class="lg:col-span-3 bg-slate-900/90 border border-white/[0.08] rounded-3xl flex flex-col overflow-hidden">
            <div class="p-4 border-b border-white/[0.07] flex items-center justify-between">
              <span class="text-xs font-black uppercase tracking-wider text-slate-300">Conversaciones Activas</span>
              <button onclick="openNewLeadModal()" class="text-xs font-bold text-[#bef264] hover:underline cursor-pointer">+ Nuevo</button>
            </div>
            <div id="leads-list" class="divide-y divide-white/[0.06] overflow-y-auto flex-1 max-h-[630px]"></div>
          </div>

          <!-- CENTER COL (5): CHAT CON AUTO-ETIQUETADO EN VIVO -->
          <div class="lg:col-span-5 bg-slate-900/90 border border-white/[0.08] rounded-3xl flex flex-col overflow-hidden relative">
            <div class="p-4 border-b border-white/[0.07] bg-slate-950/60 flex items-center justify-between gap-3">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#bef264] to-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0" id="chat-avatar">HE</div>
                <div class="min-w-0">
                  <div class="flex items-center gap-2">
                    <h3 id="chat-buyer-name" class="text-sm font-black text-white truncate">HEIDY 💗</h3>
                    <span id="chat-purpose-badge" class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#bef264]/15 text-[#bef264] border border-[#bef264]/30">Estrella</span>
                  </div>
                  <div class="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span id="chat-buyer-phone" class="mono text-slate-300">+573123934018</span>
                    <span>·</span>
                    <span id="chat-asesor-pill" class="text-amber-300 font-semibold">david@nodia.com</span>
                  </div>
                </div>
              </div>

              <button onclick="toggleLeadAi()" id="btn-toggle-ai" class="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition cursor-pointer shrink-0">
                🤖 Auto-Tagger Activo
              </button>
            </div>

            <!-- Selector Manual + Indicador de Auto-Etiquetado -->
            <div class="px-4 py-2.5 bg-slate-950/90 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <div class="flex items-center gap-2">
                <span class="text-slate-400 font-semibold">Etiqueta Kanban (Manual o Auto):</span>
                <select id="chat-stage-select" onchange="changeLeadStage(activeLeadId, this.value)" class="bg-slate-900 border border-[#bef264]/50 rounded-lg px-2.5 py-1 text-xs font-black text-[#bef264] cursor-pointer">
                  <option value="lead_nuevo">1. Lead Nuevo</option>
                  <option value="calificado">2. Calificado</option>
                  <option value="cita_agendada">3. Cita Agendada</option>
                  <option value="no_asistio">4. No asistio</option>
                  <option value="archivo_inactividad">5. Archivo por Inactividad</option>
                  <option value="visito_proyecto">6. Visito Proyecto</option>
                  <option value="en_negociacion">7. En Negociacion</option>
                  <option value="separo_lote">8. Separo Lote</option>
                  <option value="venta_cerrada">9. Venta Cerrada / Comisión</option>
                  <option value="perdido">10. Perdido</option>
                </select>
              </div>
              <span id="debounce-indicator" class="text-emerald-400 font-bold text-[10.5px]">
                ⚡ Bot etiqueta en automático
              </span>
            </div>

            <!-- Messages Stream -->
            <div id="chat-messages" class="flex-1 p-5 space-y-4 overflow-y-auto max-h-[410px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950"></div>

            <!-- BOTONES PARA PROBAR EL AUTO-ETIQUETADO DE VALENTINA RÍOS EN 1 CLIC -->
            <div class="p-3.5 bg-slate-950 border-t border-white/[0.07] space-y-2.5">
              <div class="text-[10px] font-black uppercase tracking-wider text-[#bef264] flex items-center gap-1.5">
                <i data-lucide="wand-2" class="w-3.5 h-3.5"></i>
                <span>Simular mensaje del cliente (Mira cómo Valentina lo mueve sola en el Kanban):</span>
              </div>
              <div class="flex flex-wrap items-center gap-1.5">
                <button onclick="simulateQuickBuyer('Vengo de Bogotá, me interesa el lote de 8x20 de $32 millones')" class="px-2.5 py-1 rounded-lg bg-yellow-500/15 hover:bg-yellow-500/25 text-yellow-300 border border-yellow-500/30 text-[10.5px] font-bold cursor-pointer">1️⃣ → Auto-Calificar</button>
                <button onclick="simulateQuickBuyer('Quiero agendar cita este Sábado a las 10:00 AM con David')" class="px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-[10.5px] font-bold cursor-pointer">2️⃣ → Auto-Agendar Cita</button>
                <button onclick="simulateQuickBuyer('Ya visité el terreno hoy con David y vimos el lote')" class="px-2.5 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 text-[10.5px] font-bold cursor-pointer">3️⃣ → Auto-Visitó Proyecto</button>
                <button onclick="simulateQuickBuyer('Estamos haciendo cuentas para pagar el 40% inicial con cesantías')" class="px-2.5 py-1 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/40 text-[10.5px] font-bold cursor-pointer">4️⃣ → Auto-En Negociación</button>
                <button onclick="simulateQuickBuyer('Mañana llevo los $500.000 para separar hoy el lote')" class="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[10.5px] font-bold cursor-pointer">5️⃣ → Auto-Separó Lote ($500k)</button>
                <button onclick="simulateQuickBuyer('Ya firmamos promesa y pagué el 40% de la cuota inicial')" class="px-2.5 py-1 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 text-[10.5px] font-bold cursor-pointer">6️⃣ → Auto-Venta Cerrada</button>
              </div>

              <div class="flex gap-2">
                <input id="chat-input" type="text" placeholder="Escribe como comprador para probar el auto-etiquetado..." class="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#bef264]" onkeydown="if(event.key==='Enter') sendBuyerMessage()" />
                <button onclick="sendBuyerMessage()" class="px-3.5 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/40 text-purple-200 text-xs font-extrabold transition cursor-pointer shrink-0">
                  Simular Cliente
                </button>
                <button onclick="sendHumanMessage()" class="px-3.5 py-2.5 rounded-xl bg-[#bef264] hover:bg-lime-300 text-slate-950 text-xs font-black transition cursor-pointer shrink-0">
                  Responder Tú
                </button>
              </div>
            </div>
          </div>

          <!-- RIGHT COL (4): FICHA CRM EDITABLE + PASAPORTE QR -->
          <div class="lg:col-span-4 space-y-4">
            <div class="bg-slate-900/90 border border-white/[0.08] rounded-3xl p-5 space-y-3.5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-black uppercase tracking-wider text-slate-300">Campos CRM del Contacto</span>
                <span id="crm-last-autotag" class="text-[10px] font-bold text-[#bef264] bg-[#bef264]/10 px-2.5 py-0.5 rounded-full border border-[#bef264]/30">Auto-Tag IA</span>
              </div>

              <div class="space-y-2.5 text-xs">
                <div class="grid grid-cols-3 items-center gap-2">
                  <span class="text-slate-400 font-semibold">asesor_id:</span>
                  <select id="crm-edit-asesor" onchange="updateLeadField('asesor_id', this.value)" class="col-span-2 bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-xs font-bold text-yellow-300 cursor-pointer">
                    <option value="david@nodia.com">david@nodia.com (Terreno)</option>
                    <option value="stella@nodia.com">stella@nodia.com (Oficina Camoa)</option>
                  </select>
                </div>

                <div class="grid grid-cols-3 items-center gap-2">
                  <span class="text-slate-400 font-semibold">fecha_cita:</span>
                  <input id="crm-edit-cita" onchange="updateLeadField('fecha_cita', this.value)" type="text" class="col-span-2 bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-semibold" />
                </div>

                <div class="grid grid-cols-3 items-start gap-2">
                  <span class="text-slate-400 font-semibold pt-2">Nota CRM:</span>
                  <textarea id="crm-edit-nota" onchange="updateLeadField('nota', this.value)" rows="2" class="col-span-2 bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-slate-200"></textarea>
                </div>
              </div>
            </div>

            <!-- Pasaporte QR Visual -->
            <div class="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/50 border border-[#bef264]/35 rounded-3xl p-5 space-y-4 shadow-xl">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-black uppercase tracking-widest text-[#bef264]">Pasaporte VIP Anti-Puenteo</span>
                  <h4 class="text-sm font-black text-white mt-0.5">Comisión 40% Protegida</h4>
                </div>
                <span id="qr-code-badge" class="px-3 py-1 rounded-xl bg-[#bef264] text-slate-950 font-mono text-xs font-black">EST-2026-4018</span>
              </div>

              <div class="grid grid-cols-2 gap-2.5">
                <a id="btn-open-pdf" href="/quote/EST-2026-4018" target="_blank" class="py-2.5 px-3 rounded-xl bg-[#bef264] hover:bg-lime-300 text-slate-950 font-black text-xs text-center transition flex items-center justify-center gap-1.5">
                  <i data-lucide="file-text" class="w-4 h-4"></i> Cotización PDF + QR
                </a>
                <button onclick="setTab('kanban')" class="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/10 transition flex items-center justify-center gap-1.5 cursor-pointer">
                  <i data-lucide="kanban" class="w-4 h-4 text-[#bef264]"></i> Ver en Kanban
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- =================================================================
           VIEW 3: RESUMEN EJECUTIVO & VIDEO DRON REAL
           ================================================================= -->
      <div id="view-overview" class="hidden space-y-6">
        <section class="relative rounded-[2rem] overflow-hidden border border-white/15 bg-slate-950 shadow-2xl min-h-[280px] flex items-center">
          <video autoPlay loop muted playsInline poster="/assets/la-estrella/frame_9.jpg" class="absolute inset-0 w-full h-full object-cover opacity-45 scale-105">
            <source src="/assets/la-estrella/hero-video.mp4" type="video/mp4" />
          </video>
          <div class="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/85 to-transparent"></div>
          <div class="relative z-10 p-8 max-w-2xl space-y-4">
            <span class="px-3.5 py-1 rounded-full bg-[#bef264]/15 border border-[#bef264]/30 text-[11px] font-black uppercase tracking-widest text-[#bef264]">Proyecto La Estrella · Preventa 2026</span>
            <h1 class="text-3xl md:text-5xl font-black text-white tracking-tight">Tu Tierra Futura en <span class="text-[#bef264]">Villavicencio.</span></h1>
            <p class="text-sm text-slate-300">Vereda Las Mercedes (a 10m Vía Villavicencio–Acacías). Lotes de 120m² ($27M), 160m² ($32M) y 200m² ($42M) con financiación directa a 18 meses 0% interés.</p>
          </div>
        </section>
      </div>

      <!-- =================================================================
           VIEW 4: MASTERPLAN AÉREO & INVENTARIO INTERACTIVO
           ================================================================= -->
      <div id="view-lots" class="hidden space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-7 bg-slate-900/90 border border-white/[0.08] rounded-3xl p-5 space-y-4">
            <h3 class="text-lg font-black text-white">Masterplan Interactivo sobre Ortofoto Dron · 35 Hectáreas</h3>
            <div class="relative rounded-2xl overflow-hidden border border-white/15 aspect-[16/11] bg-slate-950">
              <img src="/assets/la-estrella/frame_9.jpg" class="w-full h-full object-cover" />
              <div id="aerial-lot-pins" class="absolute inset-0"></div>
            </div>
          </div>
          <div class="lg:col-span-5 bg-slate-900/90 border border-white/[0.08] rounded-3xl p-5">
            <h3 class="text-sm font-black uppercase tracking-wider text-white mb-4">Inventario por Etapas</h3>
            <div id="lots-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[560px] overflow-y-auto pr-1"></div>
          </div>
        </div>
      </div>

      <!-- =================================================================
           VIEW 5: TERMINAL PORTERÍA QR (David & Stella)
           ================================================================= -->
      <div id="view-checkin" class="hidden">
        <div class="bg-slate-900/90 border border-[#bef264]/30 rounded-3xl p-6 space-y-5">
          <h3 class="text-lg font-black text-white">Validación de Pasaportes QR en Portería (Al escanear pasa automático a "Visito Proyecto")</h3>
          <div id="checkin-list" class="space-y-3"></div>
        </div>
      </div>

      <!-- =================================================================
           VIEW 6: LANDING PÚBLICA LA ESTRELLA
           ================================================================= -->
      <div id="view-landing" class="hidden">
        <div class="rounded-[2.5rem] overflow-hidden border border-white/15 bg-[#020617] shadow-2xl">
          <div class="relative min-h-[450px] flex items-center justify-center text-center p-8 overflow-hidden">
            <video autoPlay loop muted playsInline class="absolute inset-0 w-full h-full object-cover opacity-55">
              <source src="/assets/la-estrella/hero-video.mp4" type="video/mp4" />
            </video>
            <div class="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent"></div>
            <div class="relative z-10 max-w-3xl space-y-4">
              <h1 class="text-5xl md:text-7xl font-black text-white tracking-tighter">Naturaleza <span class="text-[#bef264]">Reinventada</span></h1>
              <p class="text-lg text-slate-300">Proyecto La Estrella · Villavicencio, Vereda Las Mercedes · 0% Interés a 18 Meses</p>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>

  <!-- =====================================================================
       MODAL 1: SIMULAR NUEVO LEAD / CREAR CONTACTO
       ===================================================================== -->
  <div id="modal-new-lead" class="hidden fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
    <div class="bg-slate-900 border border-white/15 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
      <div class="flex justify-between items-center">
        <h3 class="text-base font-black text-white">Nuevo Contacto CRM / Simular Anuncio</h3>
        <button onclick="closeNewLeadModal()" class="text-slate-400 hover:text-white cursor-pointer">✕</button>
      </div>
      <div class="space-y-3 text-xs">
        <div>
          <label class="text-slate-400 block mb-1 font-bold">Proyecto Destino</label>
          <select id="new-lead-project" class="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-[#bef264] font-bold"></select>
        </div>
        <div>
          <label class="text-slate-400 block mb-1 font-bold">Nombre del Cliente</label>
          <input id="new-lead-name" type="text" value="Carlos Andrés Rodríguez" class="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white" />
        </div>
        <div class="grid grid-cols-2 gap-2.5">
          <div>
            <label class="text-slate-400 block mb-1 font-bold">Phone Number</label>
            <input id="new-lead-phone" type="text" value="+573147729011" class="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white mono" />
          </div>
          <div>
            <label class="text-slate-400 block mb-1 font-bold">Asesor Asignado</label>
            <select id="new-lead-asesor" class="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-amber-300 font-bold">
              <option value="david@nodia.com">david@nodia.com</option>
              <option value="stella@nodia.com">stella@nodia.com</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2.5">
          <div>
            <label class="text-slate-400 block mb-1 font-bold">Etapa Kanban Inicial</label>
            <select id="new-lead-stage" class="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-white font-bold">
              <option value="lead_nuevo">Lead Nuevo</option>
              <option value="calificado">Calificado</option>
              <option value="cita_agendada">Cita Agendada</option>
              <option value="visito_proyecto">Visito Proyecto</option>
              <option value="en_negociacion">En Negociacion</option>
              <option value="separo_lote">Separo Lote</option>
              <option value="venta_cerrada">Venta Cerrada / Comisión</option>
            </select>
          </div>
          <div>
            <label class="text-slate-400 block mb-1 font-bold">Botón Anuncio Meta</label>
            <select id="new-lead-purpose" class="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-[#bef264] font-bold">
              <option value="PARA INVERTIR">PARA INVERTIR</option>
              <option value="PARA VIVIR">PARA VIVIR</option>
              <option value="PARA RECREACIÓN">PARA RECREACIÓN</option>
            </select>
          </div>
        </div>
      </div>
      <div class="flex justify-end gap-2 pt-2">
        <button onclick="closeNewLeadModal()" class="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer">Cancelar</button>
        <button onclick="createNewLead()" class="px-5 py-2.5 rounded-xl bg-[#bef264] text-slate-950 text-xs font-black cursor-pointer">Crear Contacto →</button>
      </div>
    </div>
  </div>

  <!-- =====================================================================
       MODAL 2: CREAR NUEVO PROYECTO INMOBILIARIO
       ===================================================================== -->
  <div id="modal-new-project" class="hidden fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
    <div class="bg-slate-900 border border-white/15 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
      <div class="flex justify-between items-center">
        <h3 class="text-base font-black text-white">Crear Nuevo Proyecto Campestre</h3>
        <button onclick="closeNewProjectModal()" class="text-slate-400 hover:text-white cursor-pointer">✕</button>
      </div>
      <div class="space-y-3 text-xs">
        <div>
          <label class="text-slate-400 block mb-1 font-bold">Nombre del Proyecto</label>
          <input id="np-name" type="text" placeholder="Ej. Hacienda San Miguel" class="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white" />
        </div>
        <div>
          <label class="text-slate-400 block mb-1 font-bold">Etiqueta Corta en Kanban</label>
          <input id="np-short" type="text" placeholder="Ej. San Miguel" class="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white" />
        </div>
        <div>
          <label class="text-slate-400 block mb-1 font-bold">Ubicación / Vereda</label>
          <input id="np-loc" type="text" placeholder="Ej. Cumaral - Meta" class="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white" />
        </div>
      </div>
      <div class="flex justify-end gap-2 pt-2">
        <button onclick="closeNewProjectModal()" class="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer">Cancelar</button>
        <button onclick="createNewProject()" class="px-5 py-2.5 rounded-xl bg-[#bef264] text-slate-950 text-xs font-black cursor-pointer">Guardar Proyecto →</button>
      </div>
    </div>
  </div>

  <script>
    let state = null;
    let activeProjectId = 'la-estrella';
    let activeLeadId = 1;
    let currentTab = 'kanban';
    let crmViewMode = 'kanban';
    let currentRole = 'partner';
    let draggedLeadId = null;

    // Exact 10 Columns from User's Pancake CRM Screenshots
    const KANBAN_COLUMNS = [
      { key: 'lead_nuevo', title: 'Lead Nuevo', header_bg: 'bg-slate-700 text-white border-slate-600', pill_bg: 'bg-slate-700 text-slate-100' },
      { key: 'calificado', title: 'Calificado', header_bg: 'bg-yellow-400 text-slate-950 border-yellow-300', pill_bg: 'bg-yellow-400 text-slate-950' },
      { key: 'cita_agendada', title: 'Cita Agendada', header_bg: 'bg-purple-600 text-white border-purple-500', pill_bg: 'bg-purple-600 text-white' },
      { key: 'no_asistio', title: 'No asistio', header_bg: 'bg-rose-400 text-slate-950 border-rose-300', pill_bg: 'bg-rose-400 text-slate-950' },
      { key: 'archivo_inactividad', title: 'Archivo por Inactividad', header_bg: 'bg-red-600 text-white border-red-500', pill_bg: 'bg-red-600 text-white' },
      { key: 'visito_proyecto', title: 'Visito Proyecto', header_bg: 'bg-blue-600 text-white border-blue-500', pill_bg: 'bg-blue-600 text-white' },
      { key: 'en_negociacion', title: 'En Negociacion', header_bg: 'bg-orange-600 text-white border-orange-500', pill_bg: 'bg-orange-600 text-white' },
      { key: 'separo_lote', title: 'Separo Lote', header_bg: 'bg-[#2b7a0b] text-white border-green-600', pill_bg: 'bg-[#2b7a0b] text-white' },
      { key: 'venta_cerrada', title: 'Venta Cerrada / Comisi...', header_bg: 'bg-[#0d7480] text-white border-teal-500', pill_bg: 'bg-[#0d7480] text-white' },
      { key: 'perdido', title: 'Perdido', header_bg: 'bg-slate-800 text-slate-200 border-slate-700', pill_bg: 'bg-slate-800 text-slate-200' },
    ];

    function showToast(text) {
      const toast = document.getElementById('auto-tag-toast');
      const label = document.getElementById('auto-tag-toast-text');
      if (!toast || !label) return;
      label.textContent = text;
      toast.classList.remove('hidden');
      toast.classList.add('flex');
      setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.remove('flex');
      }, 4500);
    }

    async function fetchState() {
      const res = await fetch('/api/state');
      state = await res.json();
      populateProjectSelector();
      renderAll();
    }

    function populateProjectSelector() {
      const sel = document.getElementById('project-selector');
      const modalSel = document.getElementById('new-lead-project');
      if (!sel || !state) return;

      sel.innerHTML = state.projects.map(p => \`<option value="\${p.id}">⭐ \${p.name}</option>\`).join('') +
        '<option value="all">🌎 Todos los Proyectos (Consolidado)</option>';
      sel.value = activeProjectId;

      if (modalSel) {
        modalSel.innerHTML = state.projects.map(p => \`<option value="\${p.id}">⭐ \${p.name}</option>\`).join('');
      }
    }

    function changeProject(projId) {
      activeProjectId = projId;
      const proj = state.projects.find(p => p.id === projId);
      if (proj) {
        document.getElementById('header-title').textContent = proj.name;
        document.getElementById('header-project-pill').textContent = proj.short_name + ' · ' + proj.total_hectares + ' Ha';
        document.getElementById('sidebar-proj-loc').textContent = proj.short_name + ' · ' + proj.price_range;
        document.getElementById('sidebar-proj-comm').textContent = 'Socio ' + proj.commission_pct + '%';
        document.getElementById('sidebar-kanban-count').textContent = Number(proj.stats.total_leads).toLocaleString('es-CO');
        document.getElementById('crm-total-pill').textContent = Number(proj.stats.total_leads).toLocaleString('es-CO');
      } else {
        document.getElementById('header-title').textContent = 'Todos los Proyectos (Consolidado)';
        document.getElementById('header-project-pill').textContent = state.projects.length + ' Proyectos';
      }
      renderAll();
    }

    function getProjectLeads() {
      if (!state) return [];
      return state.leads.filter(l => activeProjectId === 'all' ? true : l.project_id === activeProjectId);
    }

    function setTab(tab) {
      currentTab = tab;
      ['kanban', 'inbox', 'overview', 'lots', 'checkin', 'landing'].forEach(t => {
        const viewEl = document.getElementById('view-' + t);
        if (viewEl) viewEl.classList.toggle('hidden', t !== tab);
        const navEl = document.getElementById('nav-' + t);
        if (navEl) {
          navEl.className = t === tab
            ? 'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-black bg-[#bef264] text-slate-950 shadow-[0_0_20px_rgba(190,242,100,0.3)] transition-all cursor-pointer'
            : 'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer';
        }
      });
      lucide.createIcons();
    }

    function setCrmViewMode(mode) {
      crmViewMode = mode;
      document.getElementById('crm-kanban-container').classList.toggle('hidden', mode !== 'kanban');
      document.getElementById('crm-table-container').classList.toggle('hidden', mode !== 'table');
      document.getElementById('crm-mode-kanban').className = mode === 'kanban'
        ? 'px-3.5 py-1.5 rounded-lg bg-[#bef264] text-slate-950 font-black flex items-center gap-1.5 cursor-pointer'
        : 'px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white font-bold flex items-center gap-1.5 cursor-pointer';
      document.getElementById('crm-mode-table').className = mode === 'table'
        ? 'px-3.5 py-1.5 rounded-lg bg-[#bef264] text-slate-950 font-black flex items-center gap-1.5 cursor-pointer'
        : 'px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white font-bold flex items-center gap-1.5 cursor-pointer';
      lucide.createIcons();
    }

    // Drag & Drop Manual Movement
    function onDragStartLead(ev, leadId) {
      draggedLeadId = leadId;
      ev.dataTransfer.setData('text/plain', String(leadId));
    }
    function onDragOverCol(ev) {
      ev.preventDefault();
    }
    async function onDropCol(ev, targetStage) {
      ev.preventDefault();
      const id = draggedLeadId || Number(ev.dataTransfer.getData('text/plain'));
      if (id) {
        await changeLeadStage(id, targetStage);
      }
    }

    async function changeLeadStage(leadId, newStage) {
      const res = await fetch('/api/lead-stage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, stage: newStage })
      });
      state = await res.json();
      const col = KANBAN_COLUMNS.find(c => c.key === newStage);
      showToast('✋ Movido manualmente a: ' + (col ? col.title : newStage));
      renderAll();
    }

    async function updateLeadField(field, value) {
      const res = await fetch('/api/lead-field', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: activeLeadId, field, value })
      });
      state = await res.json();
      showToast('✓ Campo ' + field + ' actualizado');
      renderAll();
    }

    async function triggerRemarketingNoShow() {
      const res = await fetch('/api/remarketing-noshow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: activeProjectId })
      });
      state = await res.json();
      showToast('🤖 Valentina IA envió foto dron a "No asistio" y los movió a "Cita Agendada"');
      renderAll();
    }

    function renderKanbanAndTable() {
      const board = document.getElementById('crm-kanban-container');
      const tbody = document.getElementById('crm-table-body');
      if (!board || !state) return;

      const search = (document.getElementById('crm-search-input')?.value || '').toLowerCase();
      const asesorFilter = document.getElementById('crm-asesor-filter')?.value || 'all';
      const proj = state.projects.find(p => p.id === activeProjectId);

      const leads = getProjectLeads().filter(l => {
        if (asesorFilter !== 'all' && l.asesor_id !== asesorFilter) return false;
        if (search) {
          const hay = (l.buyer_name + ' ' + l.buyer_phone + ' ' + l.pass_code + ' ' + (l.nota || '')).toLowerCase();
          if (!hay.includes(search)) return false;
        }
        return true;
      });

      board.innerHTML = KANBAN_COLUMNS.map(col => {
        const colLeads = leads.filter(l => l.kanban_stage === col.key);
        const histCount = proj && proj.stats && typeof proj.stats[col.key] !== 'undefined'
          ? proj.stats[col.key]
          : colLeads.length;

        return \`
          <div ondragover="onDragOverCol(event)" ondrop="onDropCol(event, '\${col.key}')" class="w-[295px] shrink-0 bg-slate-900/85 border border-white/[0.08] rounded-2xl flex flex-col overflow-hidden min-h-[630px]">
            <!-- Column Header matching Pancake CRM -->
            <div class="px-3.5 py-3 font-black text-xs flex items-center justify-between border-b \${col.header_bg}">
              <span>\${col.title} / \${histCount}</span>
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-black/25 font-mono">\${colLeads.length}</span>
            </div>

            <!-- Cards Container -->
            <div class="p-2.5 space-y-2.5 flex-1 overflow-y-auto max-h-[630px]">
              \${colLeads.map(l => {
                const phone = currentRole === 'coordinator' ? l.masked_phone : l.buyer_phone;
                return \`
                  <div draggable="true" ondragstart="onDragStartLead(event, \${l.id})" class="bg-slate-950 hover:bg-slate-950/90 border border-white/10 hover:border-[#bef264]/60 rounded-2xl p-3.5 space-y-2 shadow-lg transition group cursor-grab active:cursor-grabbing">
                    
                    <div class="flex items-center justify-between gap-2 pb-1.5 border-b border-white/[0.06]">
                      <span class="font-extrabold text-xs text-white truncate">\${l.buyer_name}</span>
                      <div class="flex items-center gap-1 shrink-0">
                        <button onclick="selectLeadAndOpenInbox(\${l.id})" title="Ver Chat y Probar Auto-Etiquetado IA" class="px-2 py-1 rounded-lg bg-[#bef264]/15 hover:bg-[#bef264] text-[#bef264] hover:text-slate-950 text-[10px] font-black transition cursor-pointer flex items-center gap-1">
                          <i data-lucide="bot" class="w-3 h-3"></i> Chat IA
                        </button>
                        <a href="/quote/\${l.pass_code}" target="_blank" title="Pasaporte QR" class="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 transition">
                          <i data-lucide="qr-code" class="w-3.5 h-3.5"></i>
                        </a>
                      </div>
                    </div>

                    <div class="space-y-1.5 text-[11px]">
                      <div class="grid grid-cols-12 items-center gap-1">
                        <span class="col-span-4 text-slate-400 text-[10px]">Phone Nu...</span>
                        <div class="col-span-8 bg-slate-900 border border-white/[0.06] rounded-lg px-2 py-1 flex items-center gap-1.5 mono text-[10.5px] text-sky-300 font-semibold truncate">
                          <span>📞</span> <span>\${phone}</span>
                        </div>
                      </div>

                      <div class="grid grid-cols-12 items-center gap-1">
                        <span class="col-span-4 text-slate-400 text-[10px]">Proyecto</span>
                        <div class="col-span-8 bg-slate-900 border border-white/[0.06] rounded-lg px-2 py-1">
                          <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">\${l.project_label || 'Estrella'}</span>
                        </div>
                      </div>

                      <div class="grid grid-cols-12 items-center gap-1">
                        <span class="col-span-4 text-slate-400 text-[10px]">Estado</span>
                        <div class="col-span-8">
                          <select onchange="changeLeadStage(\${l.id}, this.value)" class="w-full rounded-lg px-2 py-1 text-[10px] font-black cursor-pointer \${col.pill_bg}">
                            \${KANBAN_COLUMNS.map(c => \`<option value="\${c.key}" \${c.key === l.kanban_stage ? 'selected' : ''} class="bg-slate-900 text-white">\${c.title}</option>\`).join('')}
                          </select>
                        </div>
                      </div>

                      <div class="grid grid-cols-12 items-center gap-1">
                        <span class="col-span-4 text-slate-400 text-[10px]">asesor_id</span>
                        <div class="col-span-8 bg-slate-900 border border-white/[0.06] rounded-lg px-2 py-1">
                          <span class="px-2 py-0.5 rounded bg-yellow-400 text-slate-950 font-extrabold text-[10px]">\${l.asesor_id || 'david@nodia.com'}</span>
                        </div>
                      </div>

                      <div class="grid grid-cols-12 items-center gap-1">
                        <span class="col-span-4 text-slate-400 text-[10px]">fecha_cita</span>
                        <div class="col-span-8 bg-slate-900 border border-white/[0.06] rounded-lg px-2 py-1 text-[10.5px] font-semibold text-slate-200 truncate">
                          \${l.fecha_cita || '—'}
                        </div>
                      </div>

                      <div class="grid grid-cols-12 items-start gap-1">
                        <span class="col-span-4 text-slate-400 text-[10px] pt-1">Nota</span>
                        <div class="col-span-8 bg-slate-900 border border-white/[0.06] rounded-lg px-2 py-1 text-[10px] text-slate-300 line-clamp-2">
                          \${l.nota || '—'}
                        </div>
                      </div>
                    </div>

                    <div class="pt-1.5 border-t border-white/[0.05] flex items-center justify-between text-[9.5px]">
                      <span class="text-emerald-400 truncate max-w-[180px]" title="\${l.last_auto_tag || ''}">🤖 \${l.last_auto_tag || 'Auto-Tag Activo'}</span>
                      <span class="font-mono text-[#bef264] font-bold">\${l.lot_code}</span>
                    </div>
                  </div>
                \`;
              }).join('')}
            </div>
          </div>
        \`;
      }).join('');

      if (tbody) {
        tbody.innerHTML = leads.map(l => {
          const phone = currentRole === 'coordinator' ? l.masked_phone : l.buyer_phone;
          return \`
            <tr class="hover:bg-white/[0.03] transition">
              <td class="p-4 font-bold text-white">\${l.buyer_name}</td>
              <td class="p-4 mono text-sky-300">\${phone}</td>
              <td class="p-4"><span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10.5px]">\${l.project_label || 'Estrella'}</span></td>
              <td class="p-4">
                <select onchange="changeLeadStage(\${l.id}, this.value)" class="bg-slate-950 border border-white/15 rounded-lg px-2.5 py-1 text-xs font-bold text-[#bef264]">
                  \${KANBAN_COLUMNS.map(c => \`<option value="\${c.key}" \${c.key === l.kanban_stage ? 'selected' : ''}>\${c.title}</option>\`).join('')}
                </select>
              </td>
              <td class="p-4"><span class="px-2 py-0.5 rounded bg-yellow-400 text-slate-950 font-extrabold text-[10.5px]">\${l.asesor_id}</span></td>
              <td class="p-4 text-slate-300">\${l.fecha_cita || '—'}</td>
              <td class="p-4 text-emerald-400 text-[11px]">\${l.last_auto_tag || '—'}</td>
              <td class="p-4 text-slate-400 max-w-xs truncate">\${l.nota || ''}</td>
              <td class="p-4 text-right">
                <button onclick="selectLeadAndOpenInbox(\${l.id})" class="px-3 py-1.5 rounded-lg bg-[#bef264] text-slate-950 font-black text-xs cursor-pointer">Probar Bot IA</button>
              </td>
            </tr>
          \`;
        }).join('');
      }
      lucide.createIcons();
    }

    function selectLeadAndOpenInbox(id) {
      activeLeadId = id;
      setTab('inbox');
      renderAll();
    }

    function toggleRole() {
      currentRole = currentRole === 'partner' ? 'coordinator' : 'partner';
      const badge = document.getElementById('sidebar-role-badge');
      const label = document.getElementById('role-switch-label');
      if (currentRole === 'coordinator') {
        badge.textContent = 'Solo Lectura';
        label.textContent = 'Volver a Socio Master 40%';
      } else {
        badge.textContent = 'Socio 40%';
        label.textContent = 'Ver como Coordinador Ads';
      }
      renderAll();
    }

    function renderLeadsList() {
      const container = document.getElementById('leads-list');
      if (!container || !state) return;
      container.innerHTML = getProjectLeads().map(l => {
        const isSelected = l.id === activeLeadId;
        const phone = currentRole === 'coordinator' ? l.masked_phone : l.buyer_phone;
        const col = KANBAN_COLUMNS.find(c => c.key === l.kanban_stage) || KANBAN_COLUMNS[0];
        return \`
          <div onclick="activeLeadId=\${l.id}; renderAll();" class="p-3.5 cursor-pointer transition \${isSelected ? 'bg-[#bef264]/10 border-l-4 border-l-[#bef264]' : 'hover:bg-white/[0.03]'}">
            <div class="flex justify-between items-start gap-2">
              <div class="font-extrabold text-xs text-white truncate">\${l.buyer_name}</div>
              <span class="px-2 py-0.5 rounded text-[9.5px] font-black shrink-0 \${col.pill_bg}">\${col.title}</span>
            </div>
            <div class="text-[11px] text-slate-400 mono mt-1">\${phone} · <span class="text-amber-300">\${l.project_label}</span></div>
            <div class="text-[10px] text-emerald-400 truncate mt-1">🤖 \${l.last_auto_tag || ''}</div>
          </div>
        \`;
      }).join('');
    }

    function renderActiveChat() {
      const leads = getProjectLeads();
      const lead = leads.find(l => l.id === activeLeadId) || leads[0] || state.leads[0];
      if (!lead) return;
      const phone = currentRole === 'coordinator' ? lead.masked_phone : lead.buyer_phone;

      document.getElementById('chat-avatar').textContent = lead.buyer_name.replace(/[^a-zA-Z ]/g, '').split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2) || 'LC';
      document.getElementById('chat-buyer-name').textContent = lead.buyer_name;
      document.getElementById('chat-purpose-badge').textContent = lead.project_label + ' · ' + lead.purpose;
      document.getElementById('chat-buyer-phone').textContent = phone;
      document.getElementById('chat-asesor-pill').textContent = lead.asesor_id || 'david@nodia.com';
      document.getElementById('chat-stage-select').value = lead.kanban_stage;

      document.getElementById('crm-edit-asesor').value = lead.asesor_id || 'david@nodia.com';
      document.getElementById('crm-edit-cita').value = lead.fecha_cita || '';
      document.getElementById('crm-edit-nota').value = lead.nota || '';
      document.getElementById('crm-last-autotag').textContent = lead.last_auto_tag || 'Auto-Tag Activo';

      document.getElementById('qr-code-badge').textContent = lead.pass_code;
      document.getElementById('btn-open-pdf').href = '/quote/' + lead.pass_code;

      const msgContainer = document.getElementById('chat-messages');
      msgContainer.innerHTML = lead.messages.map(m => {
        if (m.sender === 'buyer') {
          return \`
            <div class="flex flex-col items-start max-w-[85%]">
              <span class="text-[10px] text-slate-400 mb-1">👤 Comprador · \${m.time}</span>
              <div class="bg-slate-800/90 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-2.5 text-xs text-slate-100 whitespace-pre-line shadow">\${m.text}</div>
            </div>
          \`;
        } else {
          return \`
            <div class="flex flex-col items-end ml-auto max-w-[88%]">
              <span class="text-[10px] text-[#bef264] font-bold mb-1">🤖 \${m.meta || 'Valentina Ríos'} · \${m.time}</span>
              <div class="bg-gradient-to-br from-emerald-950/90 to-slate-900 border border-[#bef264]/35 rounded-2xl rounded-tr-sm px-4 py-3 text-xs text-slate-100 whitespace-pre-line leading-relaxed shadow-lg">
                \${m.media ? \`
                  <div class="mb-2.5 rounded-xl overflow-hidden border border-white/15">
                    <img src="\${m.media}" class="w-full h-36 object-cover" />
                    <div class="bg-black/70 px-2.5 py-1 text-[10px] text-[#bef264] font-semibold">\${m.media_caption || ''}</div>
                  </div>
                \` : ''}
                \${m.text}
              </div>
            </div>
          \`;
        }
      }).join('');
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }

    function renderLots() {
      const pinsContainer = document.getElementById('aerial-lot-pins');
      if (pinsContainer) {
        pinsContainer.innerHTML = state.lots.map(lot => {
          const pinBg = lot.status === 'available'
            ? 'bg-[#bef264] text-slate-950 border-white'
            : lot.status === 'reserved'
              ? 'bg-amber-400 text-slate-950 border-white'
              : 'bg-rose-600 text-white border-white/60';
          return \`
            <button onclick="cycleLotStatus(\${lot.id})" style="left: \${lot.x}%; top: \${lot.y}%;" class="absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl border-2 font-mono text-[10px] font-black transition transform hover:scale-125 cursor-pointer \${pinBg}">
              \${lot.code}
            </button>
          \`;
        }).join('');
      }
      const grid = document.getElementById('lots-grid');
      if (!grid) return;
      grid.innerHTML = state.lots.map(lot => \`
        <div onclick="cycleLotStatus(\${lot.id})" class="p-3.5 rounded-2xl border border-white/10 bg-slate-950 cursor-pointer">
          <div class="flex justify-between font-mono font-black text-xs text-white"><span>\${lot.code}</span><span class="text-[#bef264]">$\${lot.price_cop/1000000}M</span></div>
          <div class="text-[11px] text-slate-400 mt-1">\${lot.dimensions} · \${lot.buyer || 'Disponible'}</div>
        </div>
      \`).join('');
    }

    function renderCheckin() {
      const container = document.getElementById('checkin-list');
      if (!container) return;
      container.innerHTML = getProjectLeads().map(l => \`
        <div class="p-4 rounded-2xl bg-slate-950 border border-white/10 flex justify-between items-center gap-4">
          <div>
            <span class="px-2 py-0.5 rounded bg-[#bef264] text-slate-950 font-mono text-xs font-black">\${l.pass_code}</span>
            <span class="font-bold text-sm text-white ml-2">\${l.buyer_name}</span>
            <span class="text-xs text-slate-400 ml-2">Estado actual: <strong class="text-[#bef264]">\${l.status_label}</strong></span>
          </div>
          <button onclick="checkinPass('\${l.pass_code}')" class="px-4 py-2 rounded-xl bg-[#bef264] text-slate-950 font-black text-xs cursor-pointer">
            📲 Escanear QR con David (Mover a "Visito Proyecto")
          </button>
        </div>
      \`).join('');
    }

    function renderAll() {
      if (!state) return;
      renderKanbanAndTable();
      renderLeadsList();
      renderActiveChat();
      renderLots();
      renderCheckin();
      lucide.createIcons();
    }

    function simulateQuickBuyer(text) {
      document.getElementById('chat-input').value = text;
      sendBuyerMessage();
    }

    async function sendBuyerMessage() {
      const input = document.getElementById('chat-input');
      const text = input.value.trim();
      if (!text) return;
      input.value = '';

      const prevLead = state.leads.find(l => l.id === activeLeadId);
      const prevStage = prevLead ? prevLead.kanban_stage : null;

      const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: activeLeadId, sender: 'buyer', messages: [text] })
      });
      state = await res.json();
      const updatedLead = state.leads.find(l => l.id === activeLeadId);
      if (updatedLead && updatedLead.kanban_stage !== prevStage) {
        const col = KANBAN_COLUMNS.find(c => c.key === updatedLead.kanban_stage);
        showToast('🤖 Valentina IA auto-etiquetó a ' + updatedLead.buyer_name + ' → ' + (col ? col.title : updatedLead.kanban_stage));
      }
      renderAll();
    }

    async function sendHumanMessage() {
      const input = document.getElementById('chat-input');
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: activeLeadId, sender: 'human', messages: [text] })
      });
      state = await res.json();
      renderAll();
    }

    async function toggleLeadAi() {
      const res = await fetch('/api/toggle-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: activeLeadId })
      });
      state = await res.json();
      renderAll();
    }

    async function cycleLotStatus(lotId) {
      const res = await fetch('/api/lot-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lotId })
      });
      state = await res.json();
      renderAll();
    }

    async function checkinPass(passCode) {
      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passCode })
      });
      state = await res.json();
      showToast('📲 QR Escaneado por David → Movido automáticamente a "Visito Proyecto"');
      renderAll();
    }

    function openNewLeadModal() { document.getElementById('modal-new-lead').classList.remove('hidden'); }
    function closeNewLeadModal() { document.getElementById('modal-new-lead').classList.add('hidden'); }

    async function createNewLead() {
      const project_id = document.getElementById('new-lead-project').value;
      const name = document.getElementById('new-lead-name').value.trim() || 'Nuevo Comprador';
      const phone = document.getElementById('new-lead-phone').value.trim() || '+573100000000';
      const asesor_id = document.getElementById('new-lead-asesor').value;
      const kanban_stage = document.getElementById('new-lead-stage').value;
      const purpose = document.getElementById('new-lead-purpose').value;
      const res = await fetch('/api/new-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id, name, phone, city: 'Bogotá D.C.', asesor_id, kanban_stage, purpose })
      });
      state = await res.json();
      activeProjectId = project_id;
      activeLeadId = state.leads[0].id;
      closeNewLeadModal();
      populateProjectSelector();
      showToast('✨ Nuevo contacto creado y auto-etiquetado por Valentina IA');
      renderAll();
    }

    function openNewProjectModal() { document.getElementById('modal-new-project').classList.remove('hidden'); }
    function closeNewProjectModal() { document.getElementById('modal-new-project').classList.add('hidden'); }

    async function createNewProject() {
      const name = document.getElementById('np-name').value.trim() || 'Nuevo Proyecto Campestre';
      const short_name = document.getElementById('np-short').value.trim() || name.split(' ')[0];
      const location = document.getElementById('np-loc').value.trim() || 'Meta, Colombia';
      const res = await fetch('/api/new-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, short_name, location, commission_pct: 40, total_hectares: 25 })
      });
      state = await res.json();
      const created = state.projects[state.projects.length - 1];
      activeProjectId = created.id;
      closeNewProjectModal();
      populateProjectSelector();
      changeProject(activeProjectId);
    }

    setTab('kanban');
    fetchState();
  </script>
</body>
</html>`;
}

const MIME_TYPES = {
    '.mp4': 'video/mp4',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
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
            if (lead && ['asesor_id', 'fecha_cita', 'nota'].includes(field)) {
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
            const { leadId, sender, messages } = JSON.parse(body || '{}');
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
                        meta: 'Socio Master 40% (Manual)'
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

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderAppHtml());
});

const PORT = Number(process.env.PORT || 3050);
const HOST = process.env.HOST || '0.0.0.0';
server.listen(PORT, HOST, () => {
    console.log(`LeadCampestre OS v4 (10-Column Kanban + Auto-Tagging IA) running at http://${HOST}:${PORT}`);
});

