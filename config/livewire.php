<?php

return [

    'class_namespace' => 'App\\Livewire',

    'view_path' => resource_path('views/livewire'),

    'layout' => 'components.layouts.app',

    'lazy_placeholder' => null,

    'temporary_file_upload' => [
        'disk' => 'local',
        'rules' => ['file', 'max:51200'], // 50MB
        'directory' => 'livewire-tmp',
        'middleware' => null,
        'preview_mimes' => [
            'png', 'gif', 'bmp', 'svg', 'wav', 'mp4',
            'mov', 'avi', 'wmv', 'mp3', 'm4a',
            'jpeg', 'mpga', 'webp', 'wma', 'jpg',
        ],
        'max_upload_time' => 15,
        'cleanup' => true,
    ],

    'render_on_redirect' => false,

    'back_button_cache' => false,

    'smart_redirect' => true,

];
