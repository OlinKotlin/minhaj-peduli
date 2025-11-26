import { Head, useForm, router } from '@inertiajs/react'; // Pastikan 'router' diimpor
import { useState } from 'react';

export default function FormDonasi() {
    // Warna Tema
    const MINHAJ_PRIMARY = "bg-green-600";
    const MINHAJ_BG = "bg-green-50";
    const MINHAJ_CTA = "bg-green-500 text-white hover:bg-green-600";

    // State untuk nominal pilihan
    const [selectedAmount, setSelectedAmount] = useState(null);

    // Menggunakan useForm dari Inertia
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        whatsapp: '',
        amount: '',
        payment_method: '',
    });

    // Handler saat memilih nominal cepat
    const handleAmountSelect = (amount) => {
        setSelectedAmount(amount);
        setData('amount', amount);
    };

    // Handler saat input nominal manual berubah
    const handleManualAmountChange = (e) => {
        setSelectedAmount(null);
        setData('amount', e.target.value);
    };

    // === BAGIAN INI YANG DIPERBAIKI ===
    const submit = (e) => {
        e.preventDefault();

        // Log data untuk debugging (opsional)
        console.log('Mengirim data donasi:', data);

        // MENGARAHKAN KE HALAMAN KONFIRMASI
        // Pastikan rute '/konfirmasi-pembayaran' sudah ada di web.php
        router.visit('/konfirmasi-pembayaran');
    };
    // ==================================

    return (
        <>
            <Head title="Donasi Sekarang" />

            <div className={`min-h-screen ${MINHAJ_BG} text-slate-800 flex flex-col font-sans`}>

                {/* 1. Header Hijau */}
                <div className={`${MINHAJ_PRIMARY} text-white shadow-md`}>
                    <div className="mx-auto max-w-6xl px-6 py-3 flex justify-between items-center">
                        <div className="font-serif font-semibold text-lg">MinhajPeduli</div>
                        <div className="flex space-x-6 text-sm font-medium items-center">
                            <a href="/tentang-kami" className="hover:text-green-200 cursor-pointer">Profil</a>
                            <a href="/laporan" className="hover:text-green-200 cursor-pointer">Laporan</a>
                            <span className="px-3 py-1 bg-black/10 rounded-md font-bold border-b-2 border-white cursor-default">Donasi</span>
                        </div>
                    </div>
                </div>

                {/* 2. Logo & Judul */}
                <div className="text-center mt-8 mb-4">
                    <div className="flex flex-col items-center mb-2">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden border border-green-300 p-1">
                            <img src="/images/logo-minhaj.png" alt="Logo" className="w-full h-full object-contain"
                                 onError={(e) => e.target.style.display = 'none'} />
                        </div>
                    </div>
                    <h1 className="text-xl font-bold text-green-600 font-serif">Pondok Pesantren AL Minhaj</h1>
                </div>

                {/* 3. Formulir Donasi */}
                <div className="flex-grow flex justify-center px-4 pb-10">
                    <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-8 border-t-4 border-green-500">

                        {/* Judul Form */}
                        <div className="text-center mb-8">
                            <div className="flex justify-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-slate-800">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-slate-800">Donasi Sekarang</h2>
                        </div>

                        <form onSubmit={submit} className="space-y-6">

                            {/* Input Nama */}
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Nama Lengkap</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-green-500 focus:ring-green-500 text-gray-700 placeholder-gray-400"
                                    placeholder="Masukkan nama anda"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                />
                            </div>

                            {/* Input WhatsApp */}
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Nomor WhatsApp</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-green-500 focus:ring-green-500 text-gray-700 placeholder-gray-400"
                                    placeholder="Contoh: 08123456789"
                                    value={data.whatsapp}
                                    onChange={e => setData('whatsapp', e.target.value)}
                                />
                            </div>

                            {/* Input Jumlah */}
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Jumlah Donasi</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-green-500 focus:ring-green-500 text-gray-700 placeholder-gray-400 mb-4"
                                    placeholder="Masukkan Nominal"
                                    value={data.amount}
                                    onChange={handleManualAmountChange}
                                />

                                <div className="grid grid-cols-4 gap-3">
                                    {[5000, 10000, 20000, 50000].map((amt) => (
                                        <button
                                            key={amt}
                                            type="button"
                                            onClick={() => handleAmountSelect(amt)}
                                            className={`py-2 rounded-lg border text-sm font-medium transition ${
                                                selectedAmount === amt
                                                ? "bg-green-100 border-green-500 text-green-700"
                                                : "bg-white border-gray-400 text-gray-500 hover:border-gray-600"
                                            }`}
                                        >
                                            Rp {amt.toLocaleString('id-ID')}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Pilihan Metode Pembayaran */}
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Metode Pembayaran</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {['ShopeePay', 'Dana', 'Rekening'].map((method) => (
                                        <button
                                            key={method}
                                            type="button"
                                            onClick={() => setData('payment_method', method)}
                                            className={`py-3 px-4 rounded-full border text-sm font-medium transition ${
                                                data.payment_method === method
                                                ? "bg-green-100 border-green-600 text-gray-900"
                                                : "bg-white border-gray-400 text-gray-700 hover:bg-gray-50"
                                            }`}
                                        >
                                            {method}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tombol Submit */}
                            <div className="pt-6 text-center">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`px-10 py-3 rounded-lg font-bold text-sm shadow-md transform active:scale-95 transition ${MINHAJ_CTA}`}
                                >
                                    Donasi Sekarang
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

                {/* Footer */}
                <footer className={`${MINHAJ_PRIMARY} text-white px-6 py-8 mt-auto`}>
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 text-sm">
                        <div>
                            <h4 className="font-serif text-xl font-bold mb-2">Lorem ipsum dolor sit</h4>
                            <p className="text-green-100 max-w-xs">amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                        </div>
                        <div className="text-left md:text-right">
                            <p className="font-bold">192849047012759</p>
                            <p className="text-green-100">minhaj@gmail.com</p>
                            <p className="text-green-100 capitalize">Ciseeng, bogor, jawa barat</p>
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
}
