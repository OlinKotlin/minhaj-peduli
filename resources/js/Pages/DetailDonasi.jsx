// resources/js/Pages/DetailDonasi.jsx

import { Head, Link, router } from '@inertiajs/react'; // Import 'router' dari Inertia
import { MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

// Fungsi helper untuk memformat angka menjadi Rupiah (Rp X.XXX.XXX)
const formatRupiah = (number) => {
    // Pastikan number adalah angka sebelum diformat
    const num = Number(number);
    if (isNaN(num)) return "Rp 0";

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(num);
};


// Menerima 'program' sebagai props dari Laravel, BUKAN 'id'
export default function DetailDonasi({ auth, program }) {
    // State untuk menangkap input nominal donasi
    const [nominal, setNominal] = useState('');

    // Fungsi untuk menangani klik tombol "Donasi Sekarang"
    const handleDonationClick = () => {
        const nominalValue = Number(nominal);

        // 1. Validasi Input Nominal
        if (!nominalValue || nominalValue < 10000 || isNaN(nominalValue)) {
            // Tampilkan peringatan jika nominal kosong, nol, atau kurang dari 10000
            alert("Mohon masukkan nominal donasi minimal Rp 10.000 untuk melanjutkan.");
            return;
        }

        // 2. Lanjutkan ke halaman form donasi jika valid
        router.visit(route('donasi.form', {
            id: program.id,
            nominal: nominalValue
        }));
    };

    // Data yang siap ditampilkan (menggunakan data dinamis dari props)
    const collected = formatRupiah(program.collected_amount); // Diambil dari accessor Laravel
    const target = formatRupiah(program.target_amount);      // Diambil dari Model Program
    const percentage = program.percentage;                    // Diambil dari accessor Laravel

    return (
        <>
            <Head title={program.title} />

            <div className="min-h-screen bg-[#dcfce7] text-slate-800 font-sans">

                {/* --- Navbar (Tidak Berubah) --- */}
                <nav className="flex justify-between items-center px-6 py-4 bg-green-100 shadow-sm sticky top-0 z-50">
                    <div className="text-2xl font-bold text-green-700 italic">
                        Minhaj<span className="text-green-900">Peduli</span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm font-semibold">
                        <Link href="/" className="text-gray-600 hover:text-green-700 transition">Beranda</Link>
                        <Link href={route('about')} className="text-gray-600 hover:text-green-700 transition">Tentang</Link>
                        <Link href={route('donasi')} className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition shadow-md">
                            Donasi
                        </Link>
                        {auth?.user && (
                            <Link href={route('dashboard')} className="ml-4 rounded-md border border-green-600 px-3 py-1 text-green-700 hover:bg-green-50">
                                Dashboard
                            </Link>
                        )}
                    </div>
                </nav>

                {/* --- Main Content --- */}
                <div className="max-w-6xl mx-auto px-6 py-10">

                    {/* Breadcrumb / Back Button */}
                    <Link href={route('donasi')} className="inline-flex items-center text-green-700 hover:text-green-900 font-semibold mb-6 transition">
                        <ArrowLeft size={20} className="mr-2" /> Kembali ke Daftar Donasi
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

                        {/* --- Kiri: Detail Info --- */}
                        <div className="lg:col-span-2">
                            {/* Gambar Utama */}
                            <div className="rounded-3xl overflow-hidden shadow-lg mb-8 h-80 md:h-[400px]">
                                <img
                                    src={program.image_path} // PENGGUNAAN KEY DINAMIS DARI DB
                                    alt={program.title}
                                    className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                                />
                            </div>

                            {/* Judul & Short Desc */}
                            <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-4 font-serif">
                                {program.title}
                            </h1>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed font-medium">
                                {program.desc_short}
                            </p>

                            <hr className="border-green-300 mb-8" />

                            {/* Long Description */}
                            <div className="bg-white/50 p-6 rounded-2xl border border-green-100">
                                <h2 className="text-xl font-bold text-green-800 mb-4 border-l-4 border-green-500 pl-3">
                                    Detail Program

                                </h2>
                                <div className="text-gray-800 space-y-4 leading-relaxed text-justify whitespace-pre-line">
                                    {program.desc_long}
                                </div>
                            </div>
                        </div>

                        {/* --- Kanan: Card Donasi --- */}
                        <div className="lg:col-span-1 sticky top-24">
                            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center relative overflow-hidden">

                                <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>

                                {/* Circular Progress Bar - MENGGUNAKAN DATA DINAMIS */}
                                <div className="relative w-40 h-40 mx-auto mb-6 mt-4">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="80" cy="80" r="70"
                                            stroke="#e5e7eb" strokeWidth="10" fill="transparent"
                                        />
                                        <circle
                                            cx="80" cy="80" r="70"
                                            stroke="#16a34a" // green-600
                                            strokeWidth="10"
                                            fill="transparent"
                                            strokeDasharray={440}
                                            // PENGGUNAAN VARIABEL DINAMIS 'percentage'
                                            strokeDashoffset={440 - (440 * percentage) / 100}
                                            strokeLinecap="round"
                                            className="transition-all duration-1000 ease-out"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-3xl font-bold text-blue-800">{percentage}%</span>
                                    </div>
                                </div>

                                {/* Text Stats - MENGGUNAKAN DATA DINAMIS */}
                                <div className="mb-6">
                                    <p className="text-gray-600 text-sm font-medium">Donasi Terkumpul:</p>
                                    <p className="text-2xl font-bold text-green-700">{collected}</p>
                                    <p className="text-xs text-gray-500 mt-1">dari target donasi {target}</p>
                                </div>

                                {/* Input Nominal */}
                                <div className="mb-4 text-left">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-900 font-bold">Rp</span>
                                        </div>
                                        <input
                                            type="number"
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm font-medium transition shadow-inner"
                                            placeholder="Masukkan Nominal Donasi"
                                            value={nominal}
                                            onChange={(e) => setNominal(e.target.value)}
                                        />
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-1 ml-2 italic">*Minimal donasi Rp 10.000</p>
                                </div>

                                {/* Button Action: Menggunakan BUTTON dengan onClick Handler */}
                                <button
                                    onClick={handleDonationClick} // Panggil fungsi validasi
                                    className="block w-full bg-[#16a34a] hover:bg-green-700 text-white text-lg font-bold py-3 px-4 rounded-full shadow-lg transform active:scale-95 transition duration-200"
                                >
                                    Donasi Sekarang
                                </button>

                            </div>
                        </div>

                    </div>
                </div>

                {/* --- Footer (Tidak Berubah) --- */}
                <footer className="w-full mt-10">
                    <div className="bg-green-50 py-10 px-6 text-green-900">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
                            {/* Kiri */}
                            <div className="flex flex-col justify-start md:w-1/3">
                                <h2 className="text-3xl font-bold italic text-green-700 mb-2">MinhajPeduli</h2>
                                <p className="text-lg font-medium text-green-800">Pondok Pesantren AL-Minhaj</p>
                            </div>
                            {/* Kanan */}
                            <div className="flex flex-col md:flex-row gap-8 md:gap-16 md:w-2/3 md:justify-end">
                                <div>
                                    <h3 className="text-xl font-bold mb-4 text-green-900">Alamat</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <MapPin className="w-6 h-6 text-green-700 mr-3 mt-1 shrink-0" />
                                            <span className="text-green-800 leading-relaxed">
                                                Desa kuripan Kel.Kuripan<br />Kec. Ciseeng, Bogor, Jawa Barat
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-4 text-green-900">Hubungi Kami</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center">
                                            <Mail className="w-6 h-6 text-green-700 mr-3" />
                                            <a href="mailto:AlMinhaj@gmail.com" className="text-green-800 hover:text-green-600 transition">AlMinhaj@gmail.com</a>
                                        </li>
                                        <li className="flex items-center">
                                            <Phone className="w-6 h-6 text-green-700 mr-3" />
                                            <a href="tel:082108210821" className="text-green-800 hover:text-green-600 transition">082108210821</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white py-4 text-center border-t border-green-200">
                        <p className="text-sm text-gray-700 font-medium flex items-center justify-center">
                            <span className="text-lg mr-1">©</span> 2025 MINHAJ PEDULI. ALL RIGHTS RESERVED.
                        </p>
                    </div>
                </footer>

            </div>
        </>
    );
}
