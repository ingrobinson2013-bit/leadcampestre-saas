<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Bold Pasarela de Pagos (Colombia)
    |--------------------------------------------------------------------------
    | Credenciales globales para recaudo SaaS y fallback B2C
    */
    'api_key' => env('BOLD_API_KEY', ''),
    'secret_key' => env('BOLD_SECRET_KEY', ''),
    'identity_key' => env('BOLD_IDENTITY_KEY', ''),
    'environment' => env('BOLD_ENVIRONMENT', 'sandbox'), // sandbox | production
    'api_url' => env('BOLD_API_URL', 'https://integrations.api.bold.co/online/link/v1'),
    'default_payment_link' => env('BOLD_DEFAULT_PAYMENT_LINK', ''),
];
