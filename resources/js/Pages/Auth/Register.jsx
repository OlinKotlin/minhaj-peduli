import { Head, Link, useForm } from '@inertiajs/react';

// Catatan: Asumsi komponen kustom seperti InputError, TextInput, Checkbox,
// dan PrimaryButton sudah terdefinisi/di-import dengan benar di project aslinya.
// Di sini kita menggunakan elemen HTML standar (input, button) dengan styling Tailwind.

export default function Register() {
    // Inisialisasi useForm dari Inertia.js untuk Pendaftaran
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', // Ditambahkan untuk alur pendaftaran standar
        email: '',
        password: '',
        password_confirmation: '', // Ditambahkan untuk konfirmasi password
        phone_number: '', // Sesuai permintaan dari desain gambar
    });

    const submit = (e) => {
        e.preventDefault();
        // Mengirim data ke route 'register' di Laravel
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    // Variabel warna kustom (disesuaikan dari desain welcome dan login page)
    const MINHAJ_PRIMARY = "bg-green-600";
    const MINHAJ_BG = "bg-green-50";
    const MINHAJ_CARD_BORDER = "border-green-300";
    const MINHAJ_CTA = "bg-green-600 text-white hover:bg-green-700"; // Mengubah CTA agar tombol utama lebih menonjol

    return (
        <>
            <Head title="Daftar Akun" />

            <div className={`min-h-screen ${MINHAJ_BG} text-slate-800 flex flex-col`}>

                {/* Header/Top Bar */}
                <div className={`${MINHAJ_PRIMARY} text-white`}>
                    <div className="mx-auto max-w-6xl px-6 py-3">
                        <div className="font-serif font-semibold">MinhajPeduli</div>
                    </div>
                </div>

                {/* Konten Utama - Register Card - Flex-grow untuk mengisi ruang tengah */}
                <div className="flex-grow flex flex-col items-center justify-start pt-16 pb-20 px-4">

                    {/* Logo/Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div className={`w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden border ${MINHAJ_CARD_BORDER}`}>
                            <img src="/images/logo-minhaj.png" alt="Logo Minhaj" className="w-14 h-14 object-contain" />
                        </div>
                        <h1 className="mt-2 text-xl font-serif font-bold text-green-800">Pondok Pesantren AL Minhaj</h1>
                    </div>

                    {/* Register Form Card */}
                    <div className={`w-full max-w-md p-8 bg-white rounded-lg shadow-xl border-4 ${MINHAJ_CARD_BORDER}`}>

                        <div className="flex flex-col items-center">
                            {/* Ikon Pengguna Sesuai Desain */}
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-700">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold mb-6 text-center text-slate-800">Buat akun anda</h2>
                        </div>

                        {/* FORM START */}
                        <form onSubmit={submit} className="space-y-4">

                            {/* Nama Lengkap (Ditambahkan untuk alur standar) */}
                            <div>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Nama Lengkap"
                                    value={data.name}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                    autoComplete="name"
                                    autoFocus={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <div className="text-sm text-red-600 mt-1">{errors.name}</div>}
                            </div>

                            {/* Email Input */}
                            <div>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    value={data.email}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors.email && <div className="text-sm text-red-600 mt-1">{errors.email}</div>}
                            </div>

                            {/* Password Input */}
                            <div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={data.password}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                {errors.password && <div className="text-sm text-red-600 mt-1">{errors.password}</div>}
                            </div>

                            {/* Password Confirmation (Ditambahkan untuk alur standar) */}
                            <div>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    placeholder="Konfirmasi password"
                                    value={data.password_confirmation}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                                {errors.password_confirmation && <div className="text-sm text-red-600 mt-1">{errors.password_confirmation}</div>}
                            </div>

                            {/* Nomor Telepon Input (Sesuai Desain Gambar) */}
                            <div>
                                <input
                                    id="phone_number"
                                    type="tel"
                                    name="phone_number"
                                    placeholder="Nomor telepon"
                                    value={data.phone_number}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                    onChange={(e) => setData('phone_number', e.target.value)}
                                />
                                {errors.phone_number && <div className="text-sm text-red-600 mt-1">{errors.phone_number}</div>}
                            </div>

                            {/* Tombol Daftar Akun */}
                            <button
                                type="submit"
                                className={`w-full ${MINHAJ_CTA} font-medium py-2 rounded-md shadow-sm transition disabled:opacity-50`}
                                disabled={processing}
                            >
                                Daftar akun
                            </button>
                        </form>
                        {/* FORM END */}

                        {/* Link Masuk */}
                        <div className="mt-4 text-center text-sm">
                            Sudah punya akun?
                            <Link href={route('login')} className="text-green-700 hover:underline font-medium">
                                Masuk disini
                            </Link>
                        </div>
                    </div>
                    {/* End Register Form Card */}
                </div>

                {/* Footer (Full Width) */}
                <footer className={`${MINHAJ_PRIMARY} text-white p-6 mt-auto`}>
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                        <div className="text-left">
                            <p>Lorem ipsum dolor sit amet, consectetur</p>
                            <p>adipiscing elit, sed do</p>
                        </div>
                        <div className="text-right">
                            <p className="font-medium">192849047012759</p>
                            <p>minhaj@gmail.com</p>
                            <p>Ciseeng, bogor, jawa barat</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
