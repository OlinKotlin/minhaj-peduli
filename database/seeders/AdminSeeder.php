<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin; // Import Model Admin Anda
use Illuminate\Support\Facades\Hash; // Penting untuk mengenkripsi password

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pastikan Anda mengimpor Model Admin di bagian atas
        Admin::create([
            'name' => 'Super Admin',
            'email' => 'admin@minhaj.com', // Email ini yang akan Anda gunakan untuk login
            'password' => Hash::make('password'), // Password: 'password' (enkripsi)
            'email_verified_at' => now(),
        ]);

        // Anda bisa menambahkan admin lain jika perlu:
        // Admin::create([
        //     'name' => 'Marketing Admin',
        //     'email' => 'marketing@minhaj.com',
        //     'password' => Hash::make('rahasia'),
        // ]);
    }
}
