import { Head, Link, router } from '@inertiajs/react';
import { MapPin, Phone, Mail, Check, X } from 'lucide-react'; // Tambahkan Check dan X
import { useState } from 'react';

export default function KonfirmasiPembayaran({ auth, id, data }) {
    // Data simulasi dari halaman sebelumnya
    const donatur = {
        name: data.name || "Coco",
        email: data.email || "tes@example.com",
        phone: data.phone || "081234567890",
        nominal: Number(data.nominal) || 50000
    };

    const invoiceNo = "MM2025120607634";
    const uniqueCode = 2;
    const totalTransfer = donatur.nominal + uniqueCode;

    // State untuk form input
    const [bankOwner, setBankOwner] = useState('');
    const [selectedBank, setSelectedBank] = useState('BCA');
    const [paymentDate, setPaymentDate] = useState('2025-12-06');
    const [notes, setNotes] = useState('');

    // State untuk Modal Popup
    const [showModal, setShowModal] = useState(false);

    const formatRupiah = (num) => {
        return new Intl.NumberFormat('id-ID').format(num);
    };

    // Fungsi saat tombol Konfirmasi diklik
    const handleSubmit = () => {
        // Di sini bisa ditambahkan validasi form jika diperlukan
        // Jika valid, munculkan modal
        setShowModal(true);
    };

    // Fungsi saat tombol Oke diklik (Redirect ke Beranda)
    const handleFinish = () => {
        router.visit('/');
    };

    return (
        <>
            <Head title="Konfirmasi Pembayaran" />

            <div className={`min-h-screen bg-white text-slate-800 font-sans ${showModal ? 'overflow-hidden' : ''}`}>

                {/* --- Navbar --- */}
                <nav className="flex justify-between items-center px-6 py-4 bg-green-100 shadow-sm sticky top-0 z-50">
                    <div className="text-2xl font-bold text-green-700 italic">
                        Minhaj<span className="text-green-900">Peduli</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm font-semibold">
                        <Link href="/" className="text-gray-600 hover:text-green-700">Beranda</Link>
                        <Link href={route('about')} className="text-gray-600 hover:text-green-700">Tentang</Link>
                        <Link href={route('donasi')} className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition shadow-md">
                            Donasi
                        </Link>
                    </div>
                </nav>

                <div className="max-w-4xl mx-auto px-6 py-10">

                    {/* --- Stepper --- */}
                    <div className="flex justify-center items-center mb-12">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center relative z-10">
                            <div className="text-sm font-bold text-gray-700 mb-2">Formulir Donasi</div>
                            <div className="w-12 h-12 bg-[#4ade80] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">1</div>
                        </div>
                        <div className="h-2 w-20 md:w-40 bg-[#4ade80] -mx-2 mt-6"></div>
                        {/* Step 2 */}
                        <div className="flex flex-col items-center relative z-10">
                            <div className="text-sm font-bold text-gray-700 mb-2">Pembayaran</div>
                            <div className="w-12 h-12 bg-[#4ade80] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">2</div>
                        </div>
                        <div className="h-2 w-20 md:w-40 bg-[#4ade80] -mx-2 mt-6"></div>
                        {/* Step 3 */}
                        <div className="flex flex-col items-center relative z-10">
                            <div className="text-sm font-bold text-gray-700 mb-2">Selesai</div>
                            <div className="w-12 h-12 bg-[#4ade80] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">3</div>
                        </div>
                    </div>

                    {/* --- Judul Halaman --- */}
                    <div className="text-center mb-8">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-700 uppercase tracking-wide">
                            Mohon Lengkapi Form<br />Konfirmasi Pembayaran Manual
                        </h1>
                        <hr className="mt-4 border-gray-300 w-full" />
                    </div>

                    {/* --- Form Tabel --- */}
                    <div className="border border-gray-400 text-sm md:text-base">

                        <div className="border-b border-gray-400 bg-white p-4 font-bold text-gray-700 uppercase">
                            Formulir Konfirmasi Pembayaran Manual
                        </div>

                        {/* No. Invoice */}
                        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-400">
                            <div className="p-4 font-bold text-gray-700 border-b md:border-b-0 md:border-r border-gray-400 bg-gray-50 md:bg-white flex items-center">
                                No. Invoice
                            </div>
                            <div className="p-4 md:col-span-2 text-gray-800 flex items-center">
                                {invoiceNo}
                            </div>
                        </div>

                        {/* Nama Lengkap */}
                        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-400">
                            <div className="p-4 font-bold text-gray-700 border-b md:border-b-0 md:border-r border-gray-400 bg-gray-50 md:bg-white flex items-center">
                                Nama Lengkap
                            </div>
                            <div className="p-4 md:col-span-2 text-gray-800 flex items-center">
                                {donatur.name}
                            </div>
                        </div>

                        {/* Nomor Telepon */}
                        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-400">
                            <div className="p-4 font-bold text-gray-700 border-b md:border-b-0 md:border-r border-gray-400 bg-gray-50 md:bg-white flex items-center">
                                Nomor Telepon
                            </div>
                            <div className="p-4 md:col-span-2 text-gray-800 flex items-center">
                                {donatur.phone}
                            </div>
                        </div>

                        {/* E-mail */}
                        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-400">
                            <div className="p-4 font-bold text-gray-700 border-b md:border-b-0 md:border-r border-gray-400 bg-gray-50 md:bg-white flex items-center">
                                E-mail
                            </div>
                            <div className="p-4 md:col-span-2 text-gray-800 flex items-center">
                                {donatur.email}
                            </div>
                        </div>

                        {/* Bank Anda */}
                        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-400">
                            <div className="p-4 font-bold text-gray-700 border-b md:border-b-0 md:border-r border-gray-400 bg-gray-50 md:bg-white flex items-center">
                                Bank Anda *
                            </div>
                            <div className="p-4 md:col-span-2 text-gray-800 flex flex-col md:flex-row gap-3">
                                <input
                                    type="text"
                                    placeholder="Nama pemilik"
                                    value={bankOwner}
                                    onChange={(e) => setBankOwner(e.target.value)}
                                    className="border border-gray-400 px-3 py-2 w-full md:w-1/2 focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                                <select
                                    value={selectedBank}
                                    onChange={(e) => setSelectedBank(e.target.value)}
                                    className="border border-gray-400 px-3 py-2 w-full md:w-1/3 focus:outline-none focus:ring-1 focus:ring-green-500 bg-white"
                                >
                                    <option value="BCA">BCA</option>
                                    <option value="BRI">BRI</option>
                                    <option value="MANDIRI">MANDIRI</option>
                                    <option value="BNI">BNI</option>
                                    <option value="BSI">BSI</option>
                                </select>
                            </div>
                        </div>

                        {/* Bank Tujuan */}
                        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-400">
                            <div className="p-4 font-bold text-gray-700 border-b md:border-b-0 md:border-r border-gray-400 bg-gray-50 md:bg-white flex items-center">
                                Bank Tujuan *
                            </div>
                            <div className="p-4 md:col-span-2 text-gray-800">
                                <input
                                    type="text"
                                    readOnly
                                    value="BTN | Yayasan Minhajul Misbah Al Jadid | 20022228422"
                                    className="w-full border border-gray-400 px-3 py-2 bg-gray-100 text-gray-600 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Jumlah */}
                        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-400">
                            <div className="p-4 font-bold text-gray-700 border-b md:border-b-0 md:border-r border-gray-400 bg-gray-50 md:bg-white flex items-center">
                                Jumlah
                            </div>
                            <div className="p-4 md:col-span-2 text-gray-800 font-bold flex items-center">
                                Rp {formatRupiah(donatur.nominal)}.<span className="text-red-600">{String(uniqueCode).padStart(3, '0')}</span>
                            </div>
                        </div>

                        {/* Tanggal Bayar */}
                        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-400">
                            <div className="p-4 font-bold text-gray-700 border-b md:border-b-0 md:border-r border-gray-400 bg-gray-50 md:bg-white flex items-center">
                                Tanggal Bayar *
                            </div>
                            <div className="p-4 md:col-span-2 text-gray-800">
                                <input
                                    type="date"
                                    value={paymentDate}
                                    onChange={(e) => setPaymentDate(e.target.value)}
                                    className="border border-gray-400 px-3 py-2 w-full md:w-1/2 focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                            </div>
                        </div>

                        {/* Bukti Pembayaran */}
                        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-400">
                            <div className="p-4 font-bold text-gray-700 border-b md:border-b-0 md:border-r border-gray-400 bg-gray-50 md:bg-white flex items-center">
                                Bukti Pembayaran *
                            </div>
                            <div className="p-4 md:col-span-2 text-gray-800 flex flex-col md:flex-row gap-3">
                                <input
                                    type="text"
                                    placeholder="Tidak ada file yang dipilih"
                                    readOnly
                                    className="border border-gray-400 px-3 py-2 w-full md:w-1/2 bg-white text-gray-500 italic"
                                />
                                <label className="cursor-pointer bg-[#d1d5db] hover:bg-gray-400 text-gray-700 font-semibold py-2 px-6 border border-gray-400 text-center">
                                    Pilih File
                                    <input type="file" className="hidden" />
                                </label>
                            </div>
                        </div>

                        {/* Catatan */}
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            <div className="p-4 font-bold text-gray-700 border-b md:border-b-0 md:border-r border-gray-400 bg-gray-50 md:bg-white flex items-start">
                                Catatan
                            </div>
                            <div className="p-4 md:col-span-2 text-gray-800">
                                <textarea
                                    placeholder="Silakan isi catatan Anda di sini"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows="4"
                                    className="w-full border-none focus:outline-none focus:ring-0 resize-none p-0 text-gray-600 placeholder-gray-400"
                                ></textarea>
                            </div>
                        </div>

                    </div>

                    {/* --- Tombol Konfirmasi --- */}
                    <div className="mt-8 flex justify-center border border-t-0 border-gray-400 p-4 bg-white -mt-[1px]">
                        <button
                            onClick={handleSubmit}
                            className="bg-[#86efac] hover:bg-green-400 text-green-900 font-bold py-2 px-16 rounded-full shadow-md transition transform active:scale-95"
                        >
                            Konfirmasi
                        </button>
                    </div>

                </div>

                {/* --- Footer --- */}
                <footer className="w-full mt-10">
                    <div className="bg-green-50 py-10 px-6 text-green-900">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
                            <div className="flex flex-col justify-start md:w-1/3">
                                <h2 className="text-3xl font-bold italic text-green-700 mb-2">MinhajPeduli</h2>
                                <p className="text-lg font-medium text-green-800">Pondok Pesantren AL-Minhaj</p>
                            </div>
                            <div className="flex flex-col md:flex-row gap-8 md:gap-16 md:w-2/3 md:justify-end">
                                <div>
                                    <h3 className="text-xl font-bold mb-4 text-green-900">Alamat</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start"><MapPin className="w-6 h-6 text-green-700 mr-3 mt-1 shrink-0" /><span className="text-green-800 leading-relaxed">Desa kuripan Kel.Kuripan<br />Kec. Ciseeng, Bogor, Jawa Barat</span></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-4 text-green-900">Hubungi Kami</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center"><Mail className="w-6 h-6 text-green-700 mr-3" /><a href="mailto:AlMinhaj@gmail.com" className="text-green-800 hover:text-green-600 transition">AlMinhaj@gmail.com</a></li>
                                        <li className="flex items-center"><Phone className="w-6 h-6 text-green-700 mr-3" /><a href="tel:082108210821" className="text-green-800 hover:text-green-600 transition">082108210821</a></li>
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

            {/* --- MODAL POPUP --- */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
                    <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 relative animate-fade-in-up">

                        {/* Tombol Close (X) */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X size={20} />
                        </button>

                        <div className="text-center">
                            {/* Ikon Centang Hijau */}
                            <div className="mx-auto w-20 h-20 rounded-full border-4 border-[#22c55e] flex items-center justify-center mb-6">
                                <Check className="text-[#22c55e] w-10 h-10" strokeWidth={4} />
                            </div>

                            {/* Judul */}
                            <h3 className="text-sm font-bold text-gray-900 mb-4 leading-relaxed px-4">
                                Alhamdulillah! Donasi Jariyah Anda telah berhasil kami terima
                            </h3>

                            {/* Deskripsi */}
                            <p className="text-xs text-gray-600 mb-8 leading-relaxed px-2">
                                Mohon ditunggu, kami akan melakukan verifikasi maksimal 2x24 jam.
                                Semoga Allah SWT membalas kebaikan Anda dengan pahala yang
                                berlipat ganda. Aamiin.
                            </p>

                            {/* Tombol Oke */}
                            <button
                                onClick={handleFinish}
                                className="bg-[#0ea5e9] hover:bg-sky-600 text-white font-semibold py-2 px-12 rounded shadow-md transition"
                            >
                                Oke
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
