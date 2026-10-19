<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FieldAgent extends Model
{
    protected $fillable = [
        'project_id',
        'name',
        'role_type',
        'phone_whatsapp',
        'location_point',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function visitPasses(): HasMany
    {
        return $this->hasMany(VisitPass::class);
    }
}
