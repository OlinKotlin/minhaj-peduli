<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// --- TAMBAHKAN BAGIAN INI ---
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');
// ----------------------------

Route::get('/donasi', function () {
    return Inertia::render('Donasi');
})->name('donasi');

// Route Halaman Detail Donasi (BARU)
Route::get('/donasi/{id}', function ($id) {
    // Kita kirim ID ke component React agar bisa memfilter data
    return Inertia::render('DetailDonasi', ['id' => $id]);
})->name('donasi.detail');

// Route Halaman Formulir Donasi (BARU)
Route::get('/donasi/{id}/form', function ($id) {
    // Mengambil nominal dari query string (misal: ?nominal=50000)
    $nominal = request()->query('nominal', 0);
    return Inertia::render('FormDonasi', [
        'id' => $id,
        'nominal' => $nominal
    ]);
})->name('donasi.form');

// Route Halaman Pembayaran Donasi (BARU)
Route::get('/donasi/{id}/pembayaran', function ($id) {
    // Menangkap data yang dikirim dari form
    return Inertia::render('PembayaranDonasi', [
        'id' => $id,
        'data' => request()->all() // Mengirim semua query params (nama, email, nominal, dll)
    ]);
})->name('donasi.pembayaran');

// Route Halaman Konfirmasi Pembayaran (BARU)
Route::get('/donasi/{id}/konfirmasi', function ($id) {
    return Inertia::render('KonfirmasiPembayaran', [
        'id' => $id,
        'data' => request()->all() // Mengirim data (nama, invoice, nominal, dll)
    ]);
})->name('donasi.konfirmasi');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// ... sisa kode route lainnya (profile, auth, dll)
require __DIR__.'/auth.php';
