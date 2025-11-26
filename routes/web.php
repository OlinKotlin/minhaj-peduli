<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request; // Pastikan Request diimport
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
