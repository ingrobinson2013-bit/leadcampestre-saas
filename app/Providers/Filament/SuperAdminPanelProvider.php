<?php

namespace App\Providers\Filament;

use App\Filament\SuperAdmin\Widgets\SuperAdminStatsOverviewWidget;
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

class SuperAdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->id('super-admin')
            ->path('super-admin')
            ->login()
            ->brandName('AviPetApp')
            ->brandLogo(fn () => view('filament.super-admin.components.brand-logo'))
            ->brandLogoHeight('2.5rem')
            ->favicon('/brand/favicons/favicon.svg?v=20261017')
            ->font('Inter')
            ->colors([
                'primary' => Color::Violet,
                'success' => Color::Teal,
                'warning' => Color::Amber,
                'danger' => Color::Red,
                'info' => Color::Cyan,
                'gray' => Color::Slate,
            ])
            ->renderHook(
                'panels::topbar.start',
                fn () => view('filament.super-admin.components.topbar-start')
            )
            ->renderHook(
                'panels::user-menu.before',
                fn () => view('filament.super-admin.components.topbar-end')
            )
            ->renderHook(
                'panels::sidebar.footer',
                fn () => view('filament.super-admin.components.sidebar-footer')
            )
            ->maxContentWidth(MaxWidth::Full)
            ->sidebarWidth('19.5rem')
            ->sidebarCollapsibleOnDesktop()
            // Disable Filament resource & page auto-discovery so full React + Inertia routes handle the panel
            // ->discoverResources(in: app_path('Filament/SuperAdmin/Resources'), for: 'App\\Filament\\SuperAdmin\\Resources')
            // ->discoverPages(in: app_path('Filament/SuperAdmin/Pages'), for: 'App\\Filament\\SuperAdmin\\Pages')
            // ->discoverWidgets(in: app_path('Filament/SuperAdmin/Widgets'), for: 'App\\Filament\\SuperAdmin\\Widgets')
            ->pages([
            ])
            ->widgets([
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
