<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response; // Penting untuk type hint Inertia::render

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view (Pengguna Biasa).
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    // ... (store dan destroy untuk pengguna biasa tidak diubah) ...

    // =======================================================
    // --- METODE BARU UNTUK ADMIN (MENGGUNAKAN GUARD 'admin') ---
    // =======================================================

    /**
     * Tampilkan halaman Login Admin (Inertia/React).
     * * [PERBAIKAN UTAMA: Mengganti return view() dengan Inertia::render()]
     */
    public function createAdmin(): Response
    {
        // GANTI INI: return view('auth.admin_login');

        // MENGGUNAKAN INI:
        return Inertia::render('Auth/AdminLogin');
    }

    /**
     * Tangani permintaan otentikasi Admin.
     */
    public function storeAdmin(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        // Coba login menggunakan 'admin' guard
        if (Auth::guard('admin')->attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();

            // Redirect ke rute admin.dashboard setelah berhasil
            return redirect()->intended(route('admin.dashboard', absolute: false));
        }

        // Jika gagal
        return back()->withInput()->with('error', 'Kredensial Admin tidak cocok.');
    }

    /**
     * Hancurkan sesi otentikasi Admin.
     */
    public function destroyAdmin(Request $request): RedirectResponse
    {
        // Logout dari 'admin' guard
        Auth::guard('admin')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Redirect kembali ke halaman login Admin
        return redirect()->route('admin.login');
    }
}
