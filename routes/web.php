<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes (USER / PUBLIK)
|--------------------------------------------------------------------------
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
| Admin Routes (DASHBOARD ADMIN)
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->group(function () {

    // Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    // Donasi Masuk
    Route::get('/donations', function () {
        return Inertia::render('Admin/Donations');
    })->name('admin.donations');

    // Kelola Program
    Route::get('/programs', function () {
        return Inertia::render('Admin/Programs'); // Pastikan file Program.jsx ada/sesuai
    })->name('admin.programs');

    // Data Donatur (INI YANG MENYEBABKAN ERROR)
    // Pastikan ->name('admin.donatur') sesuai dengan yang dipanggil di Layout
    Route::get('/donatur', function () {
        return Inertia::render('Admin/Donatur');
    })->name('admin.donatur');  // <--- SEBELUMNYA MUNGKIN 'admin.donors'

    // Settings (Placeholder)
    Route::get('/settings', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.settings');

    // Kelola Program (Pastikan render 'Admin/Program') -> Nama file tunggal
    Route::get('/programs', function () {
        return Inertia::render('Admin/Program');
    })->name('admin.programs');

    // Settings (Pastikan render 'Admin/Settings')
    Route::get('/settings', function () {
        return Inertia::render('Admin/Settings');
    })->name('admin.settings');
});

require __DIR__.'/auth.php';
