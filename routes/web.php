<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminSubmissionController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;


// ============================
//      HALAMAN UTAMA
// ============================

// Route Halaman Utama (Welcome)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

// ============================
//      HALAMAN PUBLIK
// ============================

// TENTANG KAMI
Route::get('/tentang-kami', function () {
    return Inertia::render('About');
})->middleware(['auth'])->name('about');

// HALAMAN DONASI (Formulir Donasi)
Route::get('/donasi', function () {
    return Inertia::render('Donasi'); // Merender Donasi.jsx (Formulir)
})->middleware(['auth'])->name('donasi');

// HALAMAN LAPORAN (Daftar Proyek & Statistik)
Route::get('/laporan', function () {
    return Inertia::render('Laporan'); // Merender Laporan.jsx
})->middleware(['auth'])->name('laporan');

// === KONFIRMASI PEMBAYARAN (RUTE BARU) ===
Route::get('/konfirmasi-pembayaran', function (Request $request) {
    return Inertia::render('KonfirmasiPembayaran', [
        // Inilah yang membuat data "Nopal" dan "5000" masuk ke halaman konfirmasi
        'name' => $request->query('name'),
        'amount' => $request->query('amount'),
        'payment_method' => $request->query('payment_method'),
    ]);
})->middleware(['auth'])->name('konfirmasi.pembayaran');


// ============================
//  ROUTE DASHBOARD & PROFILE
// ============================

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

// ============================
//      ROUTE Dashboard ADMIN
// ============================
Route::middleware(['auth', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

    // Dashboard
    Route::get('/dashboardadmin', [AdminUserController::class, 'dashboard'])
        ->name('dashboardadmin');

    // Users CRUD
    Route::post('/users', [AdminUserController::class, 'store'])
        ->name('users.store');

    Route::put('/users/{user}', [AdminUserController::class, 'update'])
        ->name('users.update');

    Route::delete('/users/{user}', [AdminUserController::class, 'destroy'])
        ->name('users.destroy');

    // Submissions
    Route::put('/submissions/{submission}/update-status',
        [AdminSubmissionController::class, 'updateStatus'])
        ->name('submissions.update-status');

    Route::get('/submissions/{submission}',
        [AdminSubmissionController::class, 'show'])
        ->name('submissions.show');
});


