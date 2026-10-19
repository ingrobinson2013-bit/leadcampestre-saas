<?php

namespace App\Providers\Filament;

use App\Models\Tenant;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Support\Enums\MaxWidth;
use Filament\Widgets;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\AuthenticateSession;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class VetAdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('vet-admin')
            ->path('filament-vet-admin')
            ->tenant(Tenant::class, slugAttribute: 'slug')
            ->tenantMenu(false)
            ->maxContentWidth(MaxWidth::Full)
            ->sidebarWidth('18.5rem')
            ->sidebarCollapsibleOnDesktop(false)
            ->login()
            ->brandName(fn () => \Filament\Facades\Filament::getTenant()?->name ?? 'Portal Veterinario')
            ->brandLogo(fn () => view('filament.vet-admin.logo'))
            ->brandLogoHeight('2.85rem')
            ->favicon('/brand/favicons/favicon.svg')
            ->font('Inter')
            ->darkMode(true)
            ->defaultAvatarProvider(\App\AvatarProviders\ClinicAvatarProvider::class)
            ->colors([
                'primary' => Color::Blue,
                'info' => Color::Cyan,
                'success' => Color::Emerald,
                'warning' => Color::Amber,
                'danger' => Color::Rose,
                'gray' => Color::Slate,
            ])
            ->renderHook(
                'panels::head.end',
                fn () => view('filament.vet-admin.custom-styles')
            )
            ->renderHook(
                'panels::body.start',
                fn () => view('filament.vet-admin.components.impersonation-banner')
            )
            ->renderHook(
                'panels::topbar.start',
                fn () => view('filament.vet-admin.components.topbar-start')
            )
            ->renderHook(
                'panels::user-menu.before',
                fn () => view('filament.vet-admin.components.topbar-end')
            )
            ->renderHook(
                'panels::sidebar.footer',
                fn () => view('filament.vet-admin.components.saas-plan-sidebar-badge')
            )
            ->discoverResources(in: app_path('Filament/VetAdmin/Resources'), for: 'App\\Filament\\VetAdmin\\Resources')
            ->discoverPages(in: app_path('Filament/VetAdmin/Pages'), for: 'App\\Filament\\VetAdmin\\Pages')
            ->pages([
                \App\Filament\VetAdmin\Pages\Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/VetAdmin/Widgets'), for: 'App\\Filament\\VetAdmin\\Widgets')
            ->widgets([
                \App\Filament\VetAdmin\Widgets\SaasSubscriptionStatusWidget::class,
                \App\Filament\VetAdmin\Widgets\ClinicOperationsToolbarWidget::class,
                \App\Filament\VetAdmin\Widgets\VetStatsOverviewWidget::class,
                \App\Filament\VetAdmin\Widgets\ExpiringSubscriptionsWidget::class,
                \App\Filament\VetAdmin\Widgets\RecentRedemptionsFeedWidget::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
