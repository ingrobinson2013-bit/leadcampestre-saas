<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lot extends Model
{
    protected $fillable = [
        'project_id',
        'stage',
        'code',
        'dimensions',
        'area_m2',
        'price_cop',
        'down_payment_40_cop',
        'monthly_installment_18m_cop',
        'status',
        'locked_until',
    ];

    protected $casts = [
        'price_cop' => 'decimal:2',
        'down_payment_40_cop' => 'decimal:2',
        'monthly_installment_18m_cop' => 'decimal:2',
        'locked_until' => 'datetime',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
