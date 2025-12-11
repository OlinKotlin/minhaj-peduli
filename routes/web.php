<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
// PASTIKAN IMMPORT INI ADA:
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\AdminController;

/*
|--------------------------------------------------------------------------
| Web Routes (USER / PUBLIK)
|--------------------------------------------------------------------------
| Bagian ini sudah OK, berfungsi untuk publik dan Donasi.
*/

// Halaman Beranda
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

// Halaman Tentang
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

// Halaman List Donasi
Route::get('/donasi', function () {
    return Inertia::render('Donasi');
})->name('donasi');

// Halaman Detail Donasi
Route::get('/donasi/{id}', function ($id) {
    return Inertia::render('DetailDonasi', ['id' => $id]);
})->name('donasi.detail');

// Halaman Form Donasi
Route::get('/donasi/{id}/form', function ($id) {
    $nominal = request()->query('nominal', 0);
    return Inertia::render('FormDonasi', [
        'id' => $id,
        'nominal' => $nominal
    ]);
})->name('donasi.form');

// Halaman Pembayaran Donasi
Route::get('/donasi/{id}/pembayaran', function ($id) {
    return Inertia::render('PembayaranDonasi', [
        'id' => $id,
        'data' => request()->all()
    ]);
})->name('donasi.pembayaran');

// Halaman Konfirmasi Pembayaran
Route::get('/donasi/{id}/konfirmasi', function ($id) {
    return Inertia::render('KonfirmasiPembayaran', [
        'id' => $id,
        'data' => request()->all()
    ]);
})->name('donasi.konfirmasi');


/*
|--------------------------------------------------------------------------
| Admin Routes (OTENTIKASI & DASHBOARD ADMIN)
|--------------------------------------------------------------------------
| Bagian ini telah diubah total untuk mengimplementasikan otentikasi Admin.
*/

// --- 1. RUTE OTENTIKASI ADMIN (TANPA MIDDLEWARE 'auth') ---
Route::prefix('admin')->group(function () {
    // Tampilkan halaman Login Admin (Blade View: auth/admin_login.blade.php)
    Route::get('/login', [AuthenticatedSessionController::class, 'createAdmin'])
        ->name('admin.login');

    // Proses Login Admin (POST)
    Route::post('/login', [AuthenticatedSessionController::class, 'storeAdmin'])
        ->name('admin.login.post');

    // Proses Logout Admin (POST)
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroyAdmin'])
        ->name('admin.logout');
});


// --- 2. RUTE DASHBOARD & PAGES ADMIN (DIBATASI OLEH MIDDLEWARE 'auth:admin') ---
// Middleware 'auth:admin' memastikan hanya Admin yang sudah login yang bisa mengakses
Route::middleware(['auth:admin', 'verified'])->prefix('admin')->name('admin.')->group(function () {

    // Dashboard (Memanggil Controller untuk Inertia Render)
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');

    // Donasi Masuk
    Route::get('/donations', [AdminController::class, 'donations'])->name('donations');

    // Kelola Program
    Route::get('/programs', [AdminController::class, 'programs'])->name('programs');

    // Data Donatur
    Route::get('/donatur', [AdminController::class, 'donatur'])->name('donatur');

    // Settings
    Route::get('/settings', [AdminController::class, 'settings'])->name('settings');
});

require __DIR__.'/auth.php';


// Route Login
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

// Route Register (BARU)
Route::get('/register', function () {
    return Inertia::render('Auth/Register');
})->name('register');

// Route Halaman Lupa Password
Route::get('/forgot-password', function () {
    return Inertia::render('Auth/ForgotPassword', [
        'status' => session('status'),
    ]);
})->name('password.request');

// Route untuk menampilkan halaman Dashboard
Route::get('/admin/dashboard', function () {
    // Pastikan path 'Admin/Dashboard' sesuai dengan lokasi file Dashboard.jsx kamu
    return Inertia::render('Admin/Dashboard');
})->name('admin.dashboard');
