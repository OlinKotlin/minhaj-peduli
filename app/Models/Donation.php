<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    use HasFactory;

    /**
     * Daftar kolom yang bisa diisi (Mass Assignable).
     * Sudah disesuaikan dengan kebutuhan Dashboard & Detail Donasi.
     */
    protected $fillable = [
        'program_id',
        'invoice_no',       // Nomor Invoice (contoh: INV-2023001)
        'name',             // Nama Donatur
        'email',            // Email Donatur
        'phone',            // WhatsApp Donatur
        'notes',            // Doa atau Catatan
        'nominal',          // Jumlah Donasi utama
        'unique_code',      // Kode unik (1-999)
        'status',           // Status: 'pending', 'paid', 'failed'
        'payment_method',   // (Opsional) Bank Transfer, QRIS, dll
        'proof_of_payment'  // (Opsional) Path gambar bukti transfer
    ];

    /**
     * Casting tipe data agar aman saat diolah.
     * Mengubah string angka menjadi integer murni.
     */
    protected $casts = [
        'nominal' => 'integer',
        'unique_code' => 'integer',
        'program_id' => 'integer',
    ];

    /**
     * RELASI DATABASE
     * Satu donasi terhubung ke satu program.
     */
    public function program()
    {
        return $this->belongsTo(Program::class);
    }
}
