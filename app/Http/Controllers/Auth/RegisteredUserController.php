<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),

            // CATATAN: Kalau form pendaftaran ini KHUSUS buat bikin akun Admin,
            // buka komentar (hapus tanda //) pada baris di bawah ini:
            // 'role' => 'admin',
        ]);

        event(new Registered($user));

        Auth::login($user);

        // LOGIKA REDIRECT SETELAH DAFTAR
        // Kalau akun yang baru dibuat adalah admin, lempar ke dashboard
        if ($user->role === 'admin') {
            return redirect('/admin/dashboard');
        }

        // PERBAIKAN: Kalau user biasa, lempar ke beranda web utama
        // Pakai redirect('/') lebih aman daripada route('welcome')
        return redirect('/');
    }
}
