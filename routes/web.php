<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\DonationController;
use App\Models\Program;
use App\Models\Donation;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes (USER / PUBLIK)
|--------------------------------------------------------------------------
*/

// Halaman Beranda (Welcome)
Route::get('/', function () {
    $programs = Program::with('donations')
        ->orderBy('id', 'asc')
        ->limit(4)
        ->get()
        ->map(function ($program) {
            $collected_amount = $program->donations->where('status', 'paid')->sum('nominal');
            $target_amount = $program->target_amount;

            $percentage = 0;
            if ($target_amount > 0) {
                $percentage = min(100, round(($collected_amount / $target_amount) * 100));
            }

            return [
                'id' => $program->id,
                'title' => $program->title,
                'target_amount' => $target_amount,
                'collected_amount' => $collected_amount,
                'percentage' => $percentage,
                'image_path' => $program->image_path ?? '/images/default.png',
            ];
        });

    $totalCollectedAmount = Donation::where('status', 'paid')->sum('nominal');
    $totalDonaturCount = Donation::where('status', 'paid')->distinct('name')->count();
    $totalProgramCount = Program::count();

    $totalStats = [
        'program_count' => $totalProgramCount,
        'collected_amount' => $totalCollectedAmount,
        'total_donatur' => $totalDonaturCount,
    ];

    return Inertia::render('Welcome', [
        'programsData' => $programs,
        'totalStats' => $totalStats,
        'auth' => Auth::user() ? ['user' => Auth::user()] : null,
    ]);
})->name('welcome');

// Halaman Tentang
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

// Halaman Laporan
Route::get('/laporan', function () {
    return Inertia::render('Laporan');
})->name('laporan');

// Halaman List Donasi (INDEX)
Route::get('/donasi', [DonationController::class, 'index'])->name('donasi');

// =========================================================================
// RUTE TRANSAKSI DONASI
// =========================================================================

Route::get('/donasi/form/{id}/{nominal}', function ($id, $nominal) {
    return inertia('FormDonasi', ['id' => $id, 'nominal' => $nominal]);
})->name('donasi.form');

Route::post('/donasi/{id}/store', [DonationController::class, 'storeDonation'])->name('donasi.store');

Route::get('/donasi/{id}/pembayaran', [DonationController::class, 'paymentForm'])->name('donasi.pembayaran');

Route::get('/donasi/{id}/konfirmasi', function ($id) {
    return Inertia::render('KonfirmasiPembayaran', [
        'id' => $id,
        'data' => request()->all()
    ]);
})->name('donasi.konfirmasi');

// Rute Detail Donasi (Public)
Route::get('/donasi/{id}', [DonationController::class, 'show'])->name('donasi.show');


/*
|--------------------------------------------------------------------------
| Admin Routes (OTENTIKASI & DASHBOARD ADMIN)
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'createAdmin'])->name('admin.login');
    Route::post('/login', [AuthenticatedSessionController::class, 'storeAdmin'])->name('admin.login.post');
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroyAdmin'])->name('admin.logout');
});

// GROUP ADMIN (Membutuhkan Login)
Route::middleware(['auth:admin', 'verified'])->prefix('admin')->name('admin.')->group(function () {

    // --- RUTE EDIT, UPDATE & HAPUS PROGRAM (DITAMBAHKAN) ---
    Route::get('/programs/{id}/edit', [AdminController::class, 'editProgram'])->name('donasi.edit');
    Route::put('/programs/{id}', [AdminController::class, 'updateProgram'])->name('programs.update');
    Route::delete('/programs/{id}', [AdminController::class, 'destroyProgram'])->name('donasi.destroy');
    // ----------------------------------------------

    // Dashboard & Menu Utama
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/donations', [AdminController::class, 'donations'])->name('donations');

    // --- [MODIFIKASI: PENAMBAHAN FITUR DETAIL DONASI & EXPORT] ---

    // Rute untuk ekspor donasi ke CSV
    Route::get('/donations/export', [AdminController::class, 'exportDonations'])->name('donations.export');

    // 1. Rute untuk melihat detail donasi berdasarkan ID
    Route::get('/donations/{id}', [AdminController::class, 'showDonation'])->name('donations.show');

    // 2. Rute untuk memproses tombol Terima/Tolak (Update Status)
    Route::post('/donations/{id}/update-status', [AdminController::class, 'updateDonationStatus'])->name('donations.update-status');

    // 3. Rute untuk mengoreksi nominal donasi (Fitur Baru)
    Route::post('/donations/{id}/update-nominal', [AdminController::class, 'updateNominal'])->name('donations.update-nominal');

    // 4. Rute untuk Update Profil Admin (Fitur Baru dari Settings)
    Route::put('/settings/profile', [AdminController::class, 'updateProfile'])->name('settings.update-profile');

    // 5. Rute untuk Update Password Admin (Fitur Baru)
    Route::put('/settings/password', [AdminController::class, 'updatePassword'])->name('settings.update-password');

    // 6. Rute untuk Tambah Program Baru (Fitur Baru)
    Route::post('/programs', [AdminController::class, 'storeProgram'])->name('programs.store');

    // ----------------------------------------------------

    Route::get('/programs', [AdminController::class, 'programs'])->name('programs');
    Route::get('/donatur', [AdminController::class, 'donatur'])->name('donatur');
    Route::get('/settings', [AdminController::class, 'settings'])->name('settings');
});

// Auth Routes (Login/Register User Biasa)
require __DIR__.'/auth.php';

Route::get('/login', fn () => Inertia::render('Auth/Login'))->name('login');
Route::get('/register', fn () => Inertia::render('Auth/Register'))->name('register');
Route::get('/forgot-password', fn () => Inertia::render('Auth/ForgotPassword', ['status' => session('status')]))->name('password.request');
