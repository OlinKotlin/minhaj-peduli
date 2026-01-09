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
        $stats = [
            'total_donation'    => 'Rp ' . number_format(Donation::where('status', 'paid')->sum('nominal'), 0, ',', '.'),
            'need_verification' => Donation::where('status', 'pending')->count(),
            'total_donatur'     => Donation::where('status', 'paid')->distinct('name')->count(),
            'program_active'    => Program::count(),
        ];

        $recentDonations = Donation::with('program')
            ->where('status', 'paid')
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
     * Menampilkan Detail Donasi Berdasarkan ID
     */
    public function showDonation($id)
    {
        $donation = Donation::with('program')->findOrFail($id);

        // Hanya perbolehkan melihat detail jika status sudah paid
        if ($donation->status !== 'paid') {
            return redirect()->route('admin.donations')
                ->with('error', 'Hanya donasi yang sudah terbayar yang dapat dilihat.');
        }

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
     * FUNGSI DIPERBAIKI: Memproses Tombol Terima/Tolak
     */
    public function updateDonationStatus(Request $request, $id)
    {
        // Validasi status
        $validated = $request->validate([
            'status' => 'required|in:paid,failed,pending'
        ]);

        // Cari donasi berdasarkan ID
        $donation = Donation::findOrFail($id);

        // Update status
        $donation->update(['status' => $validated['status']]);

        // Jika menjadi paid, arahkan ke daftar donasi terbayar
        if ($validated['status'] === 'paid') {
            return redirect()->route('admin.donations')
                ->with('success', 'Donasi telah ditandai sebagai PAID dan dimasukkan ke Daftar Donasi Masuk.');
        }

        // Kembali ke halaman sebelumnya untuk status selain paid
        return back()->with('success', 'Status donasi berhasil diperbarui menjadi ' . strtoupper($validated['status']));
    }
    public function donations()
    {
        // Daftar pending untuk verifikasi
        $pending = Donation::with('program')
            ->where('status', 'pending')
            ->latest()
            ->paginate(10)
            ->through(function ($donation) {
                return [
                    'id'         => $donation->id,
                    'invoice_no' => $donation->invoice_no,
                    'name'       => $donation->name,
                    'phone'      => $donation->phone,
                    'nominal'    => $donation->nominal,
                    'program'    => $donation->program,
                    'date'       => $donation->created_at->format('d/m/Y'),
                ];
            });

        // Daftar paid untuk arsip / detail
        $paid = Donation::with('program')
            ->where('status', 'paid')
            ->latest()
            ->paginate(10)
            ->through(function ($donation) {
                return [
                    'id'         => $donation->id,
                    'invoice_no' => $donation->invoice_no,
                    'name'       => $donation->name,
                    'phone'      => $donation->phone,
                    'nominal'    => $donation->nominal,
                    'program'    => $donation->program,
                    'date'       => $donation->created_at->format('d/m/Y'),
                ];
            });

        return Inertia::render('Admin/Donations', [
            'pendingDonations' => $pending,
            'paidDonations' => $paid,
        ]);
    }

    public function programs() { return Inertia::render('Admin/Program'); }
    public function donatur() { return Inertia::render('Admin/Donatur'); }
    public function settings() { return Inertia::render('Admin/Settings'); }
}
