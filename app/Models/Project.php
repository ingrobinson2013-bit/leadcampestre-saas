<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'location_city',
        'location_vereda',
        'highway_reference',
        'ai_agent_name',
        'keyword_trigger',
        'meta_campaign_id',
        'separation_amount_cop',
        'min_down_payment_percent',
        'down_payment_days',
        'max_financing_months',
        'partner_commission_percent',
        'legal_metadata',
        'is_active',
    ];

    protected $casts = [
        'legal_metadata' => 'array',
        'is_active' => 'boolean',
        'separation_amount_cop' => 'decimal:2',
        'partner_commission_percent' => 'decimal:2',
    ];

    public function lots(): HasMany
    {
        return $this->hasMany(Lot::class);
    }

    public function fieldAgents(): HasMany
    {
        return $this->hasMany(FieldAgent::class);
    }

    public function conversations(): HasMany
    {
        return $this->hasMany(WhatsappConversation::class);
    }

    public function visitPasses(): HasMany
    {
        return $this->hasMany(VisitPass::class);
    }
}
