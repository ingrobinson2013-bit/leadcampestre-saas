<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->trustProxies(at: '*');
        $middleware->validateCsrfTokens(except: [
            'registro-clinica',
            'afiliar',
            'v/*/afiliar',
            'logout',
            'admin/logout',
            'admin/*/logout',
            'super-admin/logout',
            'super-admin/*',
            'admin/*/ai/chat',
            'admin/*/ai/triage',
            'admin/*/ai/*',
            'admin/*/pets/*/photo',
            'admin/*/pets/*',
            'admin/*/benefit-definitions*',
            'admin/*/subscriptions/*/approve-payment',
            'admin/*/subscriptions/*/send-reminder',
            'admin/*/subscriptions/*/send-preventive',
            'api/*',
        ]);
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\HttpException $e, \Illuminate\Http\Request $request) {
            if ($e->getStatusCode() === 419) {
                if (str_contains($request->path(), 'logout')) {
                    \Illuminate\Support\Facades\Auth::logout();
                    $request->session()->invalidate();
                    $request->session()->regenerateToken();
                    return redirect(str_contains($request->path(), 'super-admin') ? '/super-admin/login' : '/admin/login');
                }
                return redirect()->back()->with('error', 'Tu sesión se actualizó. Por favor intenta de nuevo.');
            }
        });
    })->create();
