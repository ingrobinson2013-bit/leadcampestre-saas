<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VisitPass extends Model
{
    protected $fillable = [
        'qr_code',
        'conversation_id',
        'project_id',
        'field_agent_id',
        'lot_id',
        'buyer_full_name',
        'buyer_phone',
        'companions_count',
        'scheduled_at',
        'checked_in_at',
        'agent_feedback',
        'buyer_audit_reply',
        'bypass_alert_detected',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'checked_in_at' => 'datetime',
        'bypass_alert_detected' => 'boolean',
    ];

    public function conversation(): BelongsTo
    {
        return $this->belongsTo(WhatsappConversation::class, 'conversation_id');
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function fieldAgent(): BelongsTo
    {
        return $this->belongsTo(FieldAgent::class);
    }

    public function lot(): BelongsTo
    {
        return $this->belongsTo(Lot::class);
    }
}
