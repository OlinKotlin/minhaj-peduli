<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute; // PENTING: Import ini

class Program extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'desc_short',
        'desc_long',
        'target_amount',
        'image_path',
    ];

    // Relasi: Satu Program memiliki banyak Donasi
    public function donations()
    {
        return $this->hasMany(Donation::class);
    }

    // ==============================================================
    // ACCESSOR 1: collected_amount
    // (Menghitung total donasi yang sudah dibayar)
    // ==============================================================
    protected function collectedAmount(): Attribute
    {
        return Attribute::make(
            get: function () {
                // Menjumlahkan kolom 'amount' HANYA yang 'is_paid' = true
                return $this->donations()->where('is_paid', true)->sum('amount');
            },
        )->shouldCache();
    }

    // ==============================================================
    // ACCESSOR 2: percentage
    // (Menghitung persentase dari target)
    // ==============================================================
    protected function percentage(): Attribute
    {
        return Attribute::make(
            get: function () {
                // Mencegah Division by Zero jika targetnya nol
                if ($this->target_amount <= 0) {
                    return 0;
                }

                // Rumus: (Terkumpul / Target) * 100
                $percentage = ($this->collected_amount / $this->target_amount) * 100;

                // Membatasi maksimal 100% dan membulatkan
                return min(100, round($percentage));
            },
        )->shouldCache();
    }
}
