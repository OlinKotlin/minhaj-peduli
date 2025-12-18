<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable, synchronized with the Controller.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'program_id',
        'invoice_no',    // <-- DITAMBAHKAN (Wajib)
        'name',          // <-- DIGANTI dari 'donatur_name'
        'email',         // <-- DITAMBAHKAN (Wajib)
        'phone',         // <-- DITAMBAHKAN (Wajib)
        'notes',         // <-- DITAMBAHKAN (Wajib)
        'nominal',       // <-- DIGANTI dari 'amount'
        'unique_code',   // <-- DITAMBAHKAN (Wajib)
        'status',        // <-- DIGANTI dari 'is_paid'
    ];

    // Relasi: Banyak Donasi dimiliki oleh satu Program
    public function program()
    {
        return $this->belongsTo(Program::class);
    }
}
