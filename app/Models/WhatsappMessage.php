<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WhatsappMessage extends Model
{
    protected $fillable = [
        'conversation_id',
        'wamid',
        'direction',
        'sender_type',
        'message_type',
        'body',
        'media_url',
        'tokens_used',
        'was_debounced',
    ];

    protected $casts = [
        'was_debounced' => 'boolean',
    ];

    public function conversation(): BelongsTo
    {
        return $this->belongsTo(WhatsappConversation::class, 'conversation_id');
    }
}
