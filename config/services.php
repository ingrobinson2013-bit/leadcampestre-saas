<?php

return [
    'whatsapp' => [
        'access_token' => env('WHATSAPP_ACCESS_TOKEN', env('WHATSAPP_TOKEN')),
        'phone_number_id' => env('WHATSAPP_PHONE_NUMBER_ID'),
        'verify_token' => env('WHATSAPP_VERIFY_TOKEN', 'leadcampestre_verify_2026'),
        'api_version' => env('WHATSAPP_API_VERSION', 'v21.0'),
        'central_number' => env('WHATSAPP_CENTRAL_NUMBER', '573108904512'),
    ],
    'custom_llm' => [
        'endpoint' => env('CUSTOM_LLM_ENDPOINT'), // Ej: https://api.runpod.ai/v2/.../openai o DeepInfra / Groq
        'api_key' => env('CUSTOM_LLM_API_KEY'),
        'model' => env('CUSTOM_LLM_MODEL', 'valentina_la_estrella_qlora_v1'),
    ],
    'telegram' => [
        'bot_token' => env('TELEGRAM_BOT_TOKEN'),
        'default_chat_id' => env('TELEGRAM_CHAT_ID'),
    ],
];
