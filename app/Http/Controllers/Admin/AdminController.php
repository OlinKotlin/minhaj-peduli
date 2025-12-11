<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Tampilkan Halaman Dashboard Admin Inertia (Dashboard.jsx)
     */
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard', [
            // Kirim data yang dibutuhkan Dashboard di sini
            'stats' => [
                'total_donasi' => 'Rp 15.450.000',
                'donatur_baru' => 128,
            ],
        ]);
    }

    public function donations()
    {
        return Inertia::render('Admin/Donations');
    }

    public function programs()
    {
        return Inertia::render('Admin/Program');
    }

    public function donatur()
    {
        return Inertia::render('Admin/Donatur');
    }

    public function settings()
    {
        return Inertia::render('Admin/Settings');
    }
}
