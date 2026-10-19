<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class WhatsappConversation extends Model
{
    protected $fillable = [
        'project_id',
        'wa_id',
        'contact_name',
        'origin_city',
        'purchase_intent',
        'lead_status',
        'preferred_lot_dimensions',
        'declared_initial_cop',
        'source_ad_id',
        'source_ad_name',
        'ai_enabled',
        'interaction_count',
        'assigned_field_agent_id',
        'ctwa_free_window_until',
        'last_message_at',
    ];

    protected $casts = [
        'ai_enabled' => 'boolean',
        'declared_initial_cop' => 'decimal:2',
        'ctwa_free_window_until' => 'datetime',
        'last_message_at' => 'datetime',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function fieldAgent(): BelongsTo
    {
        return $this->belongsTo(FieldAgent::class, 'assigned_field_agent_id');
    }

    public function messages(): HasMany
    {
        return $this->hasMany(WhatsappMessage::class, 'conversation_id');
    }

    public function latestVisitPass(): HasOne
    {
        return $this->hasOne(VisitPass::class, 'conversation_id')->latestOfMany();
    }

    /**
     * Enmascara el teléfono cuando el Coordinador de Pauta ve el panel en modo Solo Lectura.
     */
    public function getMaskedPhoneAttribute(): string
    {
        $clean = preg_replace('/[^0-9]/', '', $this->wa_id);
        if (strlen($clean) < 7) {
            return '***';
        }
        return '+' . substr($clean, 0, 5) . ' *** ' . substr($clean, -4);
    }
}
