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
            // Menggunakan status='paid' dan kolom 'nominal' untuk konsistensi
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
    // Menggunakan kolom 'name' atau 'email' yang pasti ada
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

// Halaman Laporan (BARU DITAMBAHKAN)
Route::get('/laporan', function () {
    return Inertia::render('Laporan');
})->name('laporan');

// Halaman List Donasi (INDEX) - Menggunakan Controller
Route::get('/donasi', [DonationController::class, 'index'])->name('donasi');

// =========================================================================
// RUTE TRANSAKSI DONASI
// =========================================================================

// RUTE FORM DONASI
Route::get('/donasi/form/{id}/{nominal}', function ($id, $nominal) {
    return inertia('FormDonasi', ['id' => $id, 'nominal' => $nominal]);
})->name('donasi.form');

// 1. Rute POST untuk MENYIMPAN data donatur (Memanggil storeDonation)
Route::post('/donasi/{id}/store', [DonationController::class, 'storeDonation'])->name('donasi.store');

// 2. Rute GET untuk menampilkan halaman Pembayaran (Memanggil paymentForm)
Route::get('/donasi/{id}/pembayaran', [DonationController::class, 'paymentForm'])->name('donasi.pembayaran');

// RUTE KONFIRMASI PEMBAYARAN
Route::get('/donasi/{id}/konfirmasi', function ($id) {
    return Inertia::render('KonfirmasiPembayaran', [
        'id' => $id,
        'data' => request()->all()
    ]);
})->name('donasi.konfirmasi');


// Rute Detail Donasi (SHOW)
Route::get('/donasi/{id}', [DonationController::class, 'show'])->name('donasi.show');


/*
|--------------------------------------------------------------------------
| Admin Routes (OTENTIKASI & DASHBOARD ADMIN)
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'createAdmin'])
        ->name('admin.login');
    Route::post('/login', [AuthenticatedSessionController::class, 'storeAdmin'])
        ->name('admin.login.post');
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroyAdmin'])
        ->name('admin.logout');
});

Route::middleware(['auth:admin', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/donations', [AdminController::class, 'donations'])->name('donations');
    Route::get('/programs', [AdminController::class, 'programs'])->name('programs');
    Route::get('/donatur', [AdminController::class, 'donatur'])->name('donatur');
    Route::get('/settings', [AdminController::class, 'settings'])->name('settings');
});

require __DIR__.'/auth.php';


// Route Login
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

// Route Register
Route::get('/register', function () {
    return Inertia::render('Auth/Register');
})->name('register');

// Route Halaman Lupa Password
Route::get('/forgot-password', function () {
    return Inertia::render('Auth/ForgotPassword', [
        'status' => session('status'),
    ]);
})->name('password.request');
