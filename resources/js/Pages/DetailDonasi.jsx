import { Head, Link, router, useForm } from '@inertiajs/react';
// Perbaikan: Pastikan menggunakan 'lucide-react'
import { MapPin, Phone, Mail, ArrowLeft, Check, X } from 'lucide-react';
import { useState } from 'react';

const formatRupiah = (number) => {
    const num = Number(number);
    if (isNaN(num)) return "Rp 0";
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(num);
};

export default function DetailDonasi({ auth, program, donation }) {
    const [nominal, setNominal] = useState('');

    // 1. Inisialisasi useForm untuk pengiriman data
    const { post, processing } = useForm();

    // 2. Fungsi Handler untuk Admin Update Status (Menggunakan Native Confirm)
    const handleUpdateStatus = (newStatus) => {
        const isPaid = newStatus === 'paid';
        const message = isPaid
            ? "Terima donasi ini? Pastikan dana sudah masuk ke rekening yayasan."
            : "Apakah Anda yakin ingin menolak donasi ini?";

        if (window.confirm(message)) {
            // Menggunakan rute 'admin.donations.update-status' sesuai web.php
            post(route('admin.donations.update-status', donation.id), {
                data: { status: newStatus },
                preserveScroll: true,
                onSuccess: () => {
                    alert(`Berhasil! Status donasi diperbarui menjadi ${newStatus}.`);
                },
            });
        }
    };

    const handleDonationClick = () => {
        const nominalValue = Number(nominal);
        if (!nominalValue || nominalValue < 10000 || isNaN(nominalValue)) {
            alert("Mohon masukkan nominal donasi minimal Rp 10.000 untuk melanjutkan.");
            return;
        }
        router.visit(route('donasi.form', {
            id: program.id,
            nominal: nominalValue
        }));
    };

    // Data fallback agar tidak error jika data belum load
    const collected = formatRupiah(program.collected_amount || 0);
    const target = formatRupiah(program.target_amount || 0);
    const percentage = program.percentage || 0;

    return (
        <>
            <Head title={program.title} />
            <div className="min-h-screen bg-[#dcfce7] text-slate-800 font-sans">

                {/* --- Navbar --- */}
                <nav className="flex justify-between items-center px-6 py-4 bg-green-100 shadow-sm sticky top-0 z-50">
                    <div className="text-2xl font-bold text-green-700 italic">
                        Minhaj<span className="text-green-900">Peduli</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm font-semibold">
                        <Link href="/" className="text-gray-600 hover:text-green-700 transition">Beranda</Link>
                        <Link href={route('about')} className="text-gray-600 hover:text-green-700 transition">Tentang</Link>
                        <Link href={route('donasi')} className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition shadow-md">Donasi</Link>
                        {auth?.user && (
                            <Link href={route('admin.dashboard')} className="ml-4 rounded-md border border-green-600 px-3 py-1 text-green-700 hover:bg-green-50">Dashboard</Link>
                        )}
                    </div>
                </nav>

                <div className="max-w-6xl mx-auto px-6 py-10">
                    {/* Tombol Kembali: Mengarah ke list admin jika mode admin, ke list donasi jika mode publik */}
                    <Link
                        href={donation ? route('admin.donations') : route('donasi')}
                        className="inline-flex items-center text-green-700 hover:text-green-900 font-semibold mb-6 transition"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        {donation ? 'Kembali ke Daftar Donasi Admin' : 'Kembali ke Daftar Donasi'}
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                        {/* --- Kiri: Detail Info --- */}
                        <div className="lg:col-span-2">
                            <div className="rounded-3xl overflow-hidden shadow-lg mb-8 h-80 md:h-[400px] bg-white">
                                <img
                                    src={program.image_path}
                                    alt={program.title}
                                    className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                                />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-4 font-serif">{program.title}</h1>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed font-medium">{program.desc_short}</p>
                            <hr className="border-green-300 mb-8" />
                            <div className="bg-white/50 p-6 rounded-2xl border border-green-100">
                                <h2 className="text-xl font-bold text-green-800 mb-4 border-l-4 border-green-500 pl-3">Detail Program</h2>
                                <div className="text-gray-800 space-y-4 leading-relaxed text-justify whitespace-pre-line">{program.desc_long}</div>
                            </div>
                        </div>

                        {/* --- Kanan: Card Donasi & Aksi Admin --- */}
                        <div className="lg:col-span-1 sticky top-24 space-y-6">
                            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>

                                {/* Statistik Progress */}
                                <div className="relative w-40 h-40 mx-auto mb-6 mt-4">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="80" cy="80" r="70" stroke="#e5e7eb" strokeWidth="10" fill="transparent" />
                                        <circle cx="80" cy="80" r="70" stroke="#16a34a" strokeWidth="10" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * percentage) / 100} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-3xl font-bold text-blue-800">{percentage}%</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <p className="text-gray-600 text-sm font-medium">Donasi Terkumpul:</p>
                                    <p className="text-2xl font-bold text-green-700">{collected}</p>
                                    <p className="text-xs text-gray-500 mt-1">dari target donasi {target}</p>
                                </div>

                                {donation ? (
                                    /* --- MODE ADMIN: Validasi Pembayaran --- */
                                    <div className="space-y-3">
                                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Validasi Admin</p>
                                        <div className="mb-4 text-left p-3 bg-gray-50 rounded-lg border text-sm">
                                            <p className="text-gray-500 italic">Donatur: <span className="text-slate-800 font-bold not-italic">{donation.name}</span></p>
                                            <p className="text-gray-500 italic">Nominal: <span className="text-green-700 font-bold not-italic">{formatRupiah(donation.nominal)}</span></p>
                                        </div>

                                        {donation.status === 'pending' ? (
                                            <>
                                                <button
                                                    onClick={() => handleUpdateStatus('paid')}
                                                    disabled={processing}
                                                    className="w-full py-3 bg-green-600 text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition disabled:opacity-50"
                                                >
                                                    <Check size={20} /> Terima Donasi
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateStatus('failed')}
                                                    disabled={processing}
                                                    className="w-full py-3 bg-white text-red-600 border border-red-200 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition disabled:opacity-50"
                                                >
                                                    <X size={20} /> Tolak / Gagal
                                                </button>
                                            </>
                                        ) : (
                                            <div className="p-4 bg-gray-100 rounded-xl border border-dashed border-gray-300">
                                                <p className={`font-bold uppercase ${donation.status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                                                    Status: {donation.status}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    /* --- MODE USER: Form Input Donasi --- */
                                    <>
                                        <div className="mb-4 text-left">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="text-gray-900 font-bold">Rp</span>
                                                </div>
                                                <input
                                                    type="number"
                                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm font-medium transition shadow-inner"
                                                    placeholder="Masukkan Nominal Donasi"
                                                    value={nominal}
                                                    onChange={(e) => setNominal(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleDonationClick}
                                            className="block w-full bg-[#16a34a] hover:bg-green-700 text-white text-lg font-bold py-3 px-4 rounded-full shadow-lg transform active:scale-95 transition duration-200"
                                        >
                                            Donasi Sekarang
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Footer --- */}
                <footer className="w-full mt-10">
                    <div className="bg-green-50 py-10 px-6 text-green-900">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
                            <div className="md:w-1/3">
                                <h2 className="text-3xl font-bold italic text-green-700 mb-2">MinhajPeduli</h2>
                                <p className="text-lg font-medium text-green-800">Pondok Pesantren AL-Minhaj</p>
                            </div>
                            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                                <div>
                                    <h3 className="text-xl font-bold mb-4 text-green-900">Alamat</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <MapPin className="w-6 h-6 text-green-700 mr-3 mt-1 shrink-0" />
                                            <span className="text-green-800 text-sm">Desa kuripan Kel.Kuripan<br />Kec. Ciseeng, Bogor, Jawa Barat</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-4 text-green-900">Hubungi Kami</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center">
                                            <Mail className="w-5 h-5 text-green-700 mr-3" />
                                            <span>AlMinhaj@gmail.com</span>
                                        </li>
                                        <li className="flex items-center">
                                            <Phone className="w-5 h-5 text-green-700 mr-3" />
                                            <span>082108210821</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white py-4 text-center border-t border-green-200 text-xs text-gray-500">
                        © 2025 MINHAJ PEDULI. ALL RIGHTS RESERVED.
                    </div>
                </footer>
            </div>
        </>
    );
}
