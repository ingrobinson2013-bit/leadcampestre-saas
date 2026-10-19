<?php

return [

    'default' => env('FILESYSTEM_DISK', 'public'),

    'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('app/private'),
            'serve' => true,
            'throw' => false,
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => env('APP_URL') . '/storage',
            'visibility' => 'public',
            'throw' => false,
        ],

        'r2' => [
            'driver' => 's3',
            'key' => env('CLOUDFLARE_R2_ACCESS_KEY_ID', '04b8a225258383790f4be649ad5bf06b'),
            'secret' => env('CLOUDFLARE_R2_SECRET_ACCESS_KEY', 'c73f5ce7cffd9d210ddfcbadf339db5225572cce653a649a5a77c1f86ac2badd'),
            'region' => 'auto',
            'bucket' => env('CLOUDFLARE_R2_BUCKET', 'avi-plan-assets'),
            'url' => env('CLOUDFLARE_R2_URL', 'https://pub-9b11349c37334765ad3e31861c78458f.r2.dev'),
            'endpoint' => env('CLOUDFLARE_R2_ENDPOINT', 'https://2413fc82c40ce4e9e45392c3186b4cd0.r2.cloudflarestorage.com'),
            'use_path_style_endpoint' => env('CLOUDFLARE_R2_USE_PATH_STYLE_ENDPOINT', false),
            'visibility' => 'public',
            'throw' => false,
        ],

        's3' => [
            'driver' => 's3',
            'key' => env('AWS_ACCESS_KEY_ID', 'placeholder-key'),
            'secret' => env('AWS_SECRET_ACCESS_KEY', 'placeholder-secret'),
            'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
            'bucket' => env('AWS_BUCKET', 'avi-saas-media'),
            'url' => env('AWS_URL'),
            'endpoint' => env('AWS_ENDPOINT'),
            'use_path_style_endpoint' => env('AWS_USE_PATH_STYLE_ENDPOINT', false),
            'throw' => false,
        ],

    ],

    'links' => [
        public_path('storage') => storage_path('app/public'),
    ],

];
