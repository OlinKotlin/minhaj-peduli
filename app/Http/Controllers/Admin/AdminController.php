<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use App\Models\Program;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Menampilkan Dashboard dengan Data Statistik Asli
     */
    public function dashboard()
    {
        // 1. Mengambil Statistik Asli dari Database
        $stats = [
            'total_donation'    => 'Rp ' . number_format(Donation::where('status', 'paid')->sum('nominal'), 0, ',', '.'),
            'need_verification' => Donation::where('status', 'pending')->count(),
            'total_donatur'     => Donation::where('status', 'paid')->distinct('name')->count(),
            'program_active'    => Program::count(),
        ];

        // 2. Mengambil 5 Donasi Terbaru untuk Tabel Dashboard
        $recentDonations = Donation::with('program')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($donation) {
                return [
                    'id'         => $donation->id,
                    'invoice_no' => $donation->invoice_no,
                    'name'       => $donation->name,
                    'nominal'    => $donation->nominal,
                    'amount'     => 'Rp ' . number_format($donation->nominal, 0, ',', '.'),
                    'program'    => $donation->program->title ?? '-',
                    'status'     => $donation->status,
                    'date'       => $donation->created_at->format('d/m/Y'),
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentDonations' => $recentDonations
        ]);
    }

    /**
     * FUNGSI BARU: Menampilkan Detail Donasi Berdasarkan ID
     */
    public function showDonation($id)
    {
        $donation = Donation::with('program')->findOrFail($id);

        return Inertia::render('Admin/DonasiDetail', [
            'donation' => [
                'id'          => $donation->id,
                'invoice_no'  => $donation->invoice_no,
                'name'        => $donation->name,
                'email'       => $donation->email,
                'phone'       => $donation->phone,
                'nominal'     => $donation->nominal,
                'unique_code' => $donation->unique_code,
                'amount'      => 'Rp ' . number_format($donation->nominal, 0, ',', '.'),
                'program'     => $donation->program,
                'status'      => $donation->status,
                'notes'       => $donation->notes,
                'date'        => $donation->created_at->format('d/m/Y H:i'),
            ]
        ]);
    }

    /**
     * FUNGSI BARU: Memproses Tombol Terima/Tolak (Update Status)
     */
    public function updateDonationStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:paid,failed,pending'
        ]);

        $donation = Donation::findOrFail($id);
        $donation->update([
            'status' => $request->status
        ]);

        return redirect()->back()->with('message', 'Status donasi berhasil diperbarui');
    }

    // --- Halaman Lainnya ---

    public function donations()
    {
        $donations = Donation::with('program')->latest()->paginate(10);
        return Inertia::render('Admin/Donations', ['donations' => $donations]);
    }

    public function programs() { return Inertia::render('Admin/Program'); }
    public function donatur() { return Inertia::render('Admin/Donatur'); }
    public function settings() { return Inertia::render('Admin/Settings'); }
}
