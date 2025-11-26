import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

// Menerima props dari URL (dikirim dari FormDonasi)
export default function KonfirmasiPembayaran({ name, amount, payment_method }) {
    const MINHAJ_PRIMARY = "bg-green-600";
    const MINHAJ_BG = "bg-green-50";

    // Data Rekening
    const getPaymentDetails = (method) => {
        switch(method) {
            case 'ShopeePay': return { number: '085218973434', name: 'Achmad adrian' };
            case 'Dana': return { number: '081234567890', name: 'Yayasan Minhaj' };
            case 'Rekening': return { number: '123-456-7890', name: 'Yayasan Minhaj (BSI)' };
            default: return { number: '085218973434', name: 'Achmad adrian' };
        }
    };

    const paymentInfo = getPaymentDetails(payment_method);

    // Format Rupiah
    const formatRupiah = (val) => {
        const number = Number(val);
        if (isNaN(number)) return "Rp 0";
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Nomor rekening berhasil disalin!");
    };

    // Aksi Tombol
    const handlePaymentComplete = () => {
        // Di sini nanti logika simpan ke database
        alert(`Terima kasih ${name}! Pembayaran sebesar ${formatRupiah(amount)} sedang diproses.`);
        router.visit('/donasi');
    };

    const handleCancel = () => {
         if(confirm("Batalkan donasi?")) {
            router.visit('/donasi');
         }
    };

    return (
        <>
            <Head title="Konfirmasi Pembayaran" />

            <div className={`min-h-screen ${MINHAJ_BG} text-slate-800 flex flex-col font-sans`}>

                {/* Header (Sederhana) */}
                <div className={`${MINHAJ_PRIMARY} text-white shadow-md py-4`}>
                    <div className="mx-auto max-w-6xl px-6 text-center md:text-left">
                        <div className="font-serif font-semibold text-lg">MinhajPeduli</div>
                    </div>
                </div>

                <div className="flex-grow flex justify-center px-4 py-10 items-center">
                    <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8 border-t-4 border-green-500 relative">

                        {/* Ikon & Judul */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 text-slate-800 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-slate-900">Selesaikan pembayaran</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Field Nama Donatur (Read Only) */}
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Nama donatur</label>
                                <div className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 font-medium">
                                    {name || "Hamba Allah"}
                                </div>
                            </div>

                            {/* Field Jumlah Transfer (Read Only) */}
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Jumlah tranfer</label>
                                <div className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 font-medium text-lg">
                                    {formatRupiah(amount)}
                                </div>
                            </div>

                            {/* Instruksi & Rekening */}
                            <div className="bg-green-50 p-5 rounded-lg border border-green-200 text-center">
                                <p className="text-sm text-gray-600 mb-2">Silakan transfer ke:</p>
                                <p className="text-gray-800 font-serif text-lg font-bold mb-2">{payment_method || "Metode Pembayaran"}</p>

                                <button
                                    onClick={() => copyToClipboard(paymentInfo.number)}
                                    className="flex justify-center items-center gap-2 bg-white border border-green-300 rounded-lg py-2 px-4 mx-auto mb-2 hover:bg-green-100 transition cursor-pointer group"
                                    title="Salin Nomor Rekening"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 group-hover:text-green-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.381a9.06 9.06 0 0 1-1.5.124m7.5-3.977a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5-10.381V5.625a1.125 1.125 0 0 0-1.125-1.125h-3.375c-1.505 0-2.881.727-3.75 1.875m0 0A9.015 9.015 0 0 1 20.25 10.5v1.125m-18 3.375c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h9.75a1.125 1.125 0 0 1 1.125 1.125V16.875" />
                                    </svg>
                                    <span className="font-mono text-xl font-bold text-slate-800">{paymentInfo.number}</span>
                                </button>

                                <p className="text-xs text-gray-500 italic">a.n. {paymentInfo.name}</p>
                            </div>

                            {/* Tombol Aksi */}
                            <div className="pt-2 space-y-3">
                                <button
                                    onClick={handlePaymentComplete}
                                    className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold shadow-md transition active:scale-95"
                                >
                                    Saya Sudah Bayar
                                </button>

                                <button
                                    onClick={handleCancel}
                                    className="w-full py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold shadow-md transition active:scale-95"
                                >
                                    Batalkan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
