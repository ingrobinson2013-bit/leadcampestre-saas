<!DOCTYPE html>
<html lang="es-CO" class="h-full scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="theme-color" content="#080B20">
    @php
        $gaId = env('GOOGLE_TAG_ID', 'G-YRPKPVXZ2T') ?: env('GOOGLE_ANALYTICS_ID', 'G-YRPKPVXZ2T');
        $gtmId = env('GOOGLE_TAG_MANAGER_ID');
        $cfToken = env('CLOUDFLARE_ANALYTICS_TOKEN');

        $host = request()->getHost();
        $cleanHost = strtolower(trim($host));
        $hostNoWww = preg_replace('/^www\./', '', $cleanHost);
        $baseDomain = env('APP_BASE_DOMAIN', 'avipetapp.com');
        $isBaseDomain = in_array($hostNoWww, ['localhost', '127.0.0.1', $baseDomain]) || str_contains($cleanHost, 'easypanel.host');

        $isBioLabHost = str_starts_with($hostNoWww, 'biolab.');
        $isBioLabPage = $isBioLabHost || request()->is('biolab*') || request()->is('producto/dermo-gut-superboost*');

        $tenantSlug = request()->route('slug') ?? request()->route('subdomain') ?? session('current_tenant_slug');
        $currentTenant = null;

        if (!$isBioLabPage) {
            if ($tenantSlug) {
                $currentTenant = \App\Models\Tenant::where('slug', $tenantSlug)
                    ->orWhere('domain', 'LIKE', "%{$tenantSlug}%")
                    ->first();
            }

            if (!$currentTenant && !$isBaseDomain) {
                $currentTenant = \App\Models\Tenant::where('domain', $cleanHost)
                    ->orWhere('domain', $hostNoWww)
                    ->first();

                if (!$currentTenant && str_ends_with($cleanHost, '.' . $baseDomain)) {
                    $sub = str_replace('.' . $baseDomain, '', $hostNoWww);
                    if (!in_array($sub, ['www', 'biolab'])) {
                        $currentTenant = \App\Models\Tenant::where('slug', $sub)->first();
                    }
                }
            }
        }

        $isPublicLanding = request()->is('/') && !$currentTenant && !$isBioLabPage;
        $canonicalUrl = $isBioLabPage
            ? ($isBioLabHost ? 'https://biolab.avipetapp.com/dermo-gut-superboost' : 'https://avipetapp.com/biolab/dermo-gut-superboost')
            : 'https://avipetapp.com/';
    @endphp
    @if($isPublicLanding)
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="description" content="AviPetApp ayuda a tu clínica veterinaria a gestionar planes de salud para mascotas, emitir carnets digitales con código QR, organizar la relación con tus clientes y aprovechar herramientas con IA desde una sola plataforma. Prueba 15 días gratis.">
    <meta name="keywords" content="avipetapp, software con ia para veterinarias, software veterinaria colombia, planes de salud para mascotas, membresias veterinarias, software para clinicas veterinarias, carnet digital mascotas qr, fidelizacion clientes veterinaria, saas veterinario colombia">
    <meta name="author" content="AviPetApp">
    <meta name="application-name" content="AviPetApp">
    <meta name="apple-mobile-web-app-title" content="AviPetApp">
    <link rel="canonical" href="{{ $canonicalUrl }}">
    <link rel="alternate" hreflang="es-CO" href="{{ $canonicalUrl }}">
    <link rel="alternate" hreflang="es" href="{{ $canonicalUrl }}">
    <link rel="alternate" hreflang="x-default" href="{{ $canonicalUrl }}">

    <!-- Open Graph / WhatsApp / Facebook / LinkedIn -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ $canonicalUrl }}">
    <meta property="og:title" content="AviPetApp — Software con IA para veterinarias | Planes de salud para mascotas">
    <meta property="og:description" content="Planes de salud, clientes e IA en una sola plataforma. Gestiona membresías preventivas, carnet digital con código QR y seguimiento inteligente en tu clínica veterinaria.">
    <meta property="og:image" content="https://avipetapp.com/brand/favicons/og-image-1200x630.png">
    <meta property="og:image:secure_url" content="https://avipetapp.com/brand/favicons/og-image-1200x630.png">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="AviPetApp — Software con IA para veterinarias">
    <meta property="og:site_name" content="AviPetApp">
    <meta property="og:locale" content="es_CO">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="AviPetApp — Software con IA para veterinarias | Planes de salud para mascotas">
    <meta name="twitter:description" content="Planes de salud, clientes e IA en una sola plataforma para clínicas veterinarias. Prueba 15 días gratis.">
    <meta name="twitter:image" content="https://avipetapp.com/brand/favicons/og-image-1200x630.png">

    <!-- Schema.org JSON-LD Enriquecido para Google Search, Sitelinks & Google AI Overview (GEO) -->
    <script type="application/ld+json">
    {
      "@@context": "https://schema.org",
      "@@graph": [
        {
          "@@type": "WebSite",
          "@@id": "https://avipetapp.com/#website",
          "name": "AviPetApp",
          "alternateName": ["AviPetApp — Software con IA para veterinarias", "avipetapp.com"],
          "url": "https://avipetapp.com/",
          "inLanguage": "es-CO",
          "publisher": {
            "@@id": "https://avipetapp.com/#organization"
          }
        },
        {
          "@@type": "WebPage",
          "@@id": "https://avipetapp.com/#webpage",
          "url": "https://avipetapp.com/",
          "name": "AviPetApp — Software con IA para veterinarias | Planes de salud para mascotas",
          "description": "AviPetApp ayuda a tu clínica veterinaria a gestionar planes de salud para mascotas, emitir carnets digitales con código QR, organizar la relación con tus clientes y aprovechar herramientas con IA desde una sola plataforma.",
          "isPartOf": {
            "@@id": "https://avipetapp.com/#website"
          },
          "about": {
            "@@id": "https://avipetapp.com/#software"
          },
          "datePublished": "2026-10-01T08:00:00-05:00",
          "dateModified": "{{ now()->toIso8601String() }}",
          "inLanguage": "es-CO",
          "primaryImageOfPage": {
            "@@type": "ImageObject",
            "url": "https://avipetapp.com/brand/favicons/og-image-1200x630.png",
            "width": 1200,
            "height": 630
          }
        },
        {
          "@@type": "Organization",
          "@@id": "https://avipetapp.com/#organization",
          "name": "AviPetApp",
          "alternateName": ["AviPetApp", "Software con IA para veterinarias"],
          "slogan": "Más inteligencia. Más bienestar. Más futuro.",
          "url": "https://avipetapp.com/",
          "description": "AviPetApp es una plataforma tecnológica con IA para clínicas veterinarias que buscan digitalizar servicios, comercializar planes de salud para mascotas y mejorar la relación con sus clientes desde una sola plataforma.",
          "logo": {
            "@@type": "ImageObject",
            "@@id": "https://avipetapp.com/#logo",
            "url": "https://avipetapp.com/brand/favicons/favicon-512.png",
            "contentUrl": "https://avipetapp.com/brand/favicons/favicon-512.png",
            "width": 512,
            "height": 512,
            "caption": "AviPetApp — Software con IA para veterinarias"
          },
          "image": "https://avipetapp.com/brand/favicons/og-image-1200x630.png",
          "contactPoint": {
            "@@type": "ContactPoint",
            "telephone": "+573235813942",
            "email": "contacto@avipetapp.com",
            "contactType": "sales",
            "areaServed": ["CO", "LATAM"],
            "availableLanguage": "Spanish"
          }
        },
        {
          "@@type": "SoftwareApplication",
          "@@id": "https://avipetapp.com/#software",
          "name": "AviPetApp — Software con IA para veterinarias",
          "alternateName": "AviPetApp",
          "operatingSystem": "Web, Cloud, iOS, Android",
          "applicationCategory": "BusinessApplication, HealthApplication",
          "offers": {
            "@@type": "AggregateOffer",
            "lowPrice": "50000",
            "highPrice": "489000",
            "priceCurrency": "COP",
            "offerCount": "4"
          },
          "aggregateRating": {
            "@@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "38"
          },
          "featureList": [
            "Gestión de planes de salud para mascotas y membresías preventivas",
            "Carnet digital interactivo con código QR en celular y WhatsApp",
            "Terminal de canje de beneficios en recepción en 1 clic",
            "Herramientas de seguimiento con Inteligencia Artificial supervisada",
            "Simulador financiero y actuarial de costos veterinarios"
          ],
          "description": "Planes de salud, clientes e IA en una sola plataforma para clínicas veterinarias en Colombia y Latinoamérica.",
          "url": "https://avipetapp.com/",
          "image": "https://avipetapp.com/brand/favicons/og-image-1200x630.png"
        },
        {
          "@@type": "BreadcrumbList",
          "@@id": "https://avipetapp.com/#breadcrumb",
          "itemListElement": [
            {
              "@@type": "ListItem",
              "position": 1,
              "name": "AviPetApp",
              "item": "https://avipetapp.com/"
            },
            {
              "@@type": "ListItem",
              "position": 2,
              "name": "Blog para Clínicas Veterinarias",
              "item": "https://avipetapp.com/blog"
            }
          ]
        },
        {
          "@@type": "FAQPage",
          "@@id": "https://avipetapp.com/#faq",
          "mainEntity": [
            {
              "@@type": "Question",
              "name": "¿Qué es AviPetApp y cómo funciona para las clínicas veterinarias?",
              "acceptedAnswer": {
                "@@type": "Answer",
                "text": "AviPetApp es un software con IA para veterinarias que ayuda a tu clínica a gestionar planes de salud para mascotas, emitir carnets digitales con código QR, organizar la relación con tus clientes y aprovechar herramientas inteligentes desde una sola plataforma."
              }
            },
            {
              "@@type": "Question",
              "name": "¿En qué momento se paga el servicio de AviPetApp?",
              "acceptedAnswer": {
                "@@type": "Answer",
                "text": "Siempre es mes anticipado (prepago), garantizando cero deudas acumuladas. Tienes 15 días gratis para probar la plataforma sin tarjeta de crédito. Luego puedes recargar paquetes prepago de 10 mascotas por $50.000 COP o activar tu mensualidad plana desde $99.000 COP."
              }
            },
            {
              "@@type": "Question",
              "name": "¿Tengo que reemplazar mi software actual de historia clínica veterinaria?",
              "acceptedAnswer": {
                "@@type": "Answer",
                "text": "No. AviPetApp convive con tu software actual de historia clínica o inventarios. Es una plataforma especializada en planes de salud para mascotas, carnets digitales con código QR y fidelización de clientes."
              }
            },
            {
              "@@type": "Question",
              "name": "¿AviPetApp cobra comisión por cada plan de salud vendido en la clínica?",
              "acceptedAnswer": {
                "@@type": "Answer",
                "text": "No. El 100% del dinero cobrado a tus clientes va directo a las cuentas o medios de pago de tu veterinaria. No retenemos comisiones por transacción."
              }
            }
          ]
        }
      ]
    }
    </script>
    @elseif($isBioLabPage)
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="description" content="Suplemento biotecnológico 3 en 1 en polvo para perros y gatos. Con Micro-Proteína Novel de Hermetia illucens y Ácido Láurico natural. Corta la picazón, hongos, caída de pelo y regula la digestión. 100% libre de gluten, pollo y res. Envíos gratis y pago contraentrega en toda Colombia.">
    <meta name="keywords" content="dermo gut superboost, avipet biolab, suplemento dermatitis perros, picazon perros y gatos, hermetia illucens mascotas, acido laurico perros, prebioticos perros y gatos, suplemento hipoalergenico mascotas colombia">
    <meta name="author" content="AVIPET BioLab®">
    <link rel="canonical" href="{{ $canonicalUrl }}">
    <link rel="alternate" hreflang="es-CO" href="{{ $canonicalUrl }}">

    <!-- Open Graph / WhatsApp Business / Meta Catalog -->
    <meta property="og:type" content="product">
    <meta property="og:url" content="{{ $canonicalUrl }}">
    <meta property="og:title" content="Dermo &amp; Gut Superboost (250g) | Alivio de Dermatitis, Picazón y Digestión — AVIPET BioLab®">
    <meta property="og:description" content="Suplemento biotecnológico 3 en 1 en polvo para perros y gatos. Con Micro-Proteína Novel de Hermetia illucens y Ácido Láurico natural. Corta la picazón, hongos, caída de pelo y regula la digestión. 100% libre de gluten, pollo y res. Envíos gratis y pago contraentrega en toda Colombia.">
    <meta property="og:image" content="https://avipetapp.com/images/biolab/banner-hero-oficial.jpg">
    <meta property="og:image:secure_url" content="https://avipetapp.com/images/biolab/banner-hero-oficial.jpg">
    <meta property="og:image:alt" content="AVIPET BioLab® — Dermo &amp; Gut Superboost (250g)">
    <meta property="og:site_name" content="AVIPET BioLab®">
    <meta property="og:locale" content="es_CO">
    <meta property="product:price:amount" content="69900">
    <meta property="product:price:currency" content="COP">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Dermo &amp; Gut Superboost (250g) | Alivio de Dermatitis, Picazón y Digestión — AVIPET BioLab®">
    <meta name="twitter:description" content="Suplemento biotecnológico 3 en 1 en polvo para perros y gatos. 100% libre de gluten, pollo y res. Envíos gratis y pago contraentrega en toda Colombia.">
    <meta name="twitter:image" content="https://avipetapp.com/images/biolab/banner-hero-oficial.jpg">

    <!-- Schema.org JSON-LD Product + AggregateOffer + AggregateRating + FAQPage -->
    <script type="application/ld+json">
    {
      "@@context": "https://schema.org",
      "@@graph": [
        {
          "@@type": "Product",
          "@@id": "https://avipetapp.com/biolab/dermo-gut-superboost#product",
          "name": "AVIPET BioLab® — Dermo & Gut Superboost (250g)",
          "description": "Suplemento biotecnológico 3 en 1 en polvo para perros y gatos. Con Micro-Proteína Novel de Hermetia illucens y Ácido Láurico natural. Corta la picazón, hongos, caída de pelo y regula la digestión. 100% libre de gluten, pollo y res.",
          "sku": "AVIPET-BIOLAB-DGS-250G",
          "mpn": "BIOLAB-DGS-250",
          "image": [
            "https://avipetapp.com/images/biolab/empaque-frente-250g.jpg",
            "https://avipetapp.com/images/biolab/empaque-frente-reverso.jpg",
            "https://avipetapp.com/images/biolab/banner-hero-oficial.jpg",
            "https://avipetapp.com/images/biolab/afiche-beneficios-dermatitis.jpg"
          ],
          "brand": {
            "@@type": "Brand",
            "name": "AVIPET BioLab®"
          },
          "aggregateRating": {
            "@@type": "AggregateRating",
            "ratingValue": "4.9",
            "bestRating": "5.0",
            "ratingCount": "148"
          },
          "offers": {
            "@@type": "AggregateOffer",
            "url": "{{ $canonicalUrl }}",
            "priceCurrency": "COP",
            "lowPrice": "69900",
            "highPrice": "169900",
            "offerCount": "3",
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition"
          }
        },
        {
          "@@type": "FAQPage",
          "@@id": "https://avipetapp.com/biolab/dermo-gut-superboost#faq",
          "mainEntity": [
            {
              "@@type": "Question",
              "name": "¿En cuánto tiempo veré resultados en mi mascota?",
              "acceptedAnswer": {
                "@@type": "Answer",
                "text": "Días 3 a 7: Notarás heces más firmes, menos gases y reducción del mal aliento gracias a la fibra prebiótica y la clorofila. Semanas 2 a 3: Disminución notable del enrojecimiento en piel, menor picazón y reducción del lamido de patas por el efecto del Ácido Láurico y la cúrcuma. Semana 4 en adelante: Frenado de la caída excesiva de pelo y crecimiento de pelaje nuevo, fuerte y brillante."
              }
            },
            {
              "@@type": "Question",
              "name": "¿Sirve tanto para perros como para gatos?",
              "acceptedAnswer": {
                "@@type": "Answer",
                "text": "¡Sí! Su perfil de aminoácidos esenciales y ácidos grasos está formulado para la fisiología digestiva y cutánea tanto de perros como de gatos de todas las razas y edades (a partir de los 3 meses de vida)."
              }
            },
            {
              "@@type": "Question",
              "name": "¿Se lo puedo dar si mi perro toma medicamentos o come concentrado medicado?",
              "acceptedAnswer": {
                "@@type": "Answer",
                "text": "Totalmente. Al ser un suplemento nutricional 100% natural libre de alérgenos y fármacos químicos, actúa como coadyuvante perfecto junto a cualquier dieta veterinaria o tratamiento clínico sin generar interacciones."
              }
            },
            {
              "@@type": "Question",
              "name": "¿Cómo funciona el envío y el pago contraentrega?",
              "acceptedAnswer": {
                "@@type": "Answer",
                "text": "Despachamos a toda Colombia. Solo registras tus datos de entrega y pagas en efectivo o transferencia únicamente cuando el transportador te entregue el paquete en la puerta de tu casa."
              }
            }
          ]
        }
      ]
    }
    </script>
    @else
    <meta name="robots" content="noindex, nofollow">
    @endif

    @if($gaId)
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id={{ $gaId }}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '{{ $gaId }}');
    </script>
    @endif
    @if($gtmId)
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','{{ $gtmId }}');</script>
    @endif
    @if($cfToken)
    <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "{{ $cfToken }}"}'></script>
    @endif

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    @php
        if ($isBioLabPage) {
            $clinicPageTitle = 'Dermo & Gut Superboost (250g) | Alivio de Dermatitis, Picazón y Digestión — AVIPET BioLab®';
            $favIcon = '/images/biolab/logo-avipet-biolab.jpg';
        } elseif ($isPublicLanding) {
            $clinicPageTitle = 'AviPetApp — Software con IA para veterinarias | Planes de salud para mascotas';
            $favIcon = '/brand/favicons/favicon.svg';
        } elseif (request()->is('super-admin*')) {
            $clinicPageTitle = 'Centro de control · AviPetApp Superadmin';
            $favIcon = '/brand/favicons/favicon.svg';
        } elseif ($currentTenant) {
            $favIcon = $currentTenant->branding['logo_url'] ?? '/brand/favicons/favicon.svg';
            $clinicPageTitle = $currentTenant->name . ' · AviPetApp';
        } else {
            $favIcon = '/brand/favicons/favicon.svg';
            $clinicPageTitle = 'AviPetApp — Software con IA para veterinarias';
        }
    @endphp
    <title inertia>{{ $clinicPageTitle }}</title>
    @if(!$currentTenant && !$isBioLabPage)
    <!-- Favicons Oficiales AviPetApp Optimizados para Google Search (Google-Favicon múltiplos de 48px) -->
    <link rel="icon" href="/favicon.ico?v=20261017" sizes="48x48">
    <link rel="icon" type="image/svg+xml" href="/brand/favicons/favicon.svg?v=20261017">
    <link rel="icon" type="image/png" sizes="48x48" href="/brand/favicons/favicon-48.png?v=20261017">
    <link rel="icon" type="image/png" sizes="192x192" href="/brand/favicons/favicon-192.png?v=20261017">
    <link rel="icon" type="image/png" sizes="512x512" href="/brand/favicons/favicon-512.png?v=20261017">
    <link rel="icon" type="image/png" sizes="32x32" href="/brand/favicons/favicon-32.png?v=20261017">
    <link rel="icon" type="image/png" sizes="16x16" href="/brand/favicons/favicon-16.png?v=20261017">
    <link rel="shortcut icon" href="/favicon.ico?v=20261017">
    <link rel="apple-touch-icon" sizes="180x180" href="/brand/favicons/favicon-180.png?v=20261017">
    <link rel="manifest" href="/site.webmanifest">
    @else
    <link rel="icon" href="{{ $favIcon }}">
    <link rel="shortcut icon" href="{{ $favIcon }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ $favIcon }}">
    @endif

    @viteReactRefresh
    @vite(['resources/js/app.tsx'])
    @inertiaHead
</head>
<body class="h-full font-sans antialiased bg-[#F4F7FC] text-[#15213B] selection:bg-[#6D28D9] selection:text-white">
    @if($isPublicLanding)
        @php ob_start(); @endphp
        @inertia
        @php
            $inertiaHtml = ob_get_clean();
            $seoPrerender = view('partials.seo_landing_prerender')->render();
            echo preg_replace_callback(
                '/(<div id="app"[^>]*>)<\/div>/',
                fn($matches) => $matches[1] . $seoPrerender . '</div>',
                $inertiaHtml,
                1
            );
        @endphp
    @elseif($isBioLabPage)
        @php ob_start(); @endphp
        @inertia
        @php
            $inertiaHtml = ob_get_clean();
            $seoBioLabPrerender = view('partials.seo_biolab_prerender')->render();
            echo preg_replace_callback(
                '/(<div id="app"[^>]*>)<\/div>/',
                fn($matches) => $matches[1] . $seoBioLabPrerender . '</div>',
                $inertiaHtml,
                1
            );
        @endphp
    @else
        @inertia
    @endif
</body>
</html>
