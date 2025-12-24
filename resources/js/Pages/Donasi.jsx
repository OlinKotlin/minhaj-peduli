import { Head, Link } from '@inertiajs/react';
import Navbar from "@/Components/Navbar"; // Pastikan path ini benar sesuai struktur folder Anda
import { Search, MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

// Fungsi helper untuk memformat angka menjadi Rupiah (Rp X.XXX.XXX)
const formatRupiah = (number) => {
    const num = Number(number);
    if (isNaN(num) || num === 0) return "Rp 0";

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(num);
};

export default function Donasi({ auth, allPrograms = [], totalStats = {} }) {
    const [searchTerm, setSearchTerm] = useState('');

    // --- Stats Data Dinamis ---
    const totalCollected = totalStats.collected_amount || 0;
    const totalDonatur = totalStats.total_donatur || 0;
    const programCount = totalStats.program_count || allPrograms.length;

    const statsData = [
        { val: programCount.toString(), label: "Program Donasi" },
        { val: formatRupiah(totalCollected), label: "Total Donasi Terkumpul" },
        { val: totalDonatur.toString(), label: "Total Donatur" }
    ];

    // --- Memproses Programs Data dari Props ---
    const programsData = allPrograms.map(prog => ({
        id: prog.id,
        title: prog.title,
        current: formatRupiah(prog.collected_amount || 0),
        target: formatRupiah(prog.target_amount || 0),
        pct: Number(prog.percentage) || 0,
        img: prog.image_path || '/images/default.png',
    }));


    // 1. Filter Program berdasarkan input pencarian
    let filteredPrograms = programsData.filter(program =>
        program.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 2. Batasi Maksimal 4 Program jika tidak sedang mencari
    if (searchTerm === '') {
        filteredPrograms = filteredPrograms.slice(0, 4);
    }


    return (
        <>
            <Head title="Donasi" />

            <div className="min-h-screen bg-[#dcfce7] text-slate-800 font-sans">

                {/* --- MENGGUNAKAN NAVBAR BARU --- */}
                <Navbar auth={auth} />

                {/* --- Hero Section --- */}
                <section className="relative h-[500px] flex items-center justify-center text-center px-4">
                    <div className="absolute inset-0 z-0">
                        <img src="/images/pesantren1.png" alt="Construction Site" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60"></div>
                    </div>
                    <div className="relative z-10 max-w-4xl mx-auto text-white">
                        <h1 className="text-4xl md:text-6xl font-bold uppercase mb-4 tracking-wide">DONASI</h1>
                        <p className="text-lg md:text-xl font-medium mb-2">
                            Investasikan Donasi Anda dalam Pembangunan Pondok Pesantren, Mari Membentuk Generasi Unggul di Masa Depan!
                        </p>
                        <p className="text-sm md:text-base text-gray-300 mb-8 italic">
                            Raih Pahala Jariah dengan Berdonasi Pembangunan Pondok Pesantren
                        </p>
                        <a href="#program-list" className="bg-white/20 hover:bg-white/30 text-white border border-white px-8 py-3 rounded-full font-semibold transition backdrop-blur-sm">
                            Yuk Donasi
                        </a>
                    </div>
                </section>

                {/* --- Stats Boxes --- */}
                <section className="relative z-20 px-4 -mt-16 mb-12">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                        {statsData.map((item, idx) => (
                            <div key={idx} className="bg-green-700 text-white rounded-2xl py-8 px-4 text-center shadow-xl border-4 border-green-100/20">
                                <div className="text-3xl md:text-4xl font-bold mb-1">{item.val}</div>
                                <div className="text-sm md:text-base font-medium opacity-90">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Quote Banner --- */}
                <section className="relative h-64 flex items-center justify-center mb-12 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img src="/images/pesantren2.png" alt="Quote Background" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50"></div>
                    </div>
                    <div className="relative z-10 max-w-4xl px-6 text-center">
                        <p className="text-xl md:text-3xl font-bold text-white italic leading-relaxed">
                            “Wujudkan Pesantren Impian. Donasi Anda Sangat Berarti.”
                        </p>
                    </div>
                </section>

                {/* --- Program List Section --- */}
                <section id="program-list" className="max-w-6xl mx-auto px-6 pb-20">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <h2 className="text-2xl font-bold text-green-900">Pilihan Program Donasi</h2>
                        <div className="relative w-full md:w-80">
                            <input
                                type="text"
                                placeholder="Cari Program Donasi"
                                className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredPrograms.length > 0 ? (
                            filteredPrograms.map((prog) => (
                                <div key={prog.id} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                    <div className="h-56 overflow-hidden relative">
                                        <img src={prog.img} alt={prog.title} className="w-full h-full object-cover transform hover:scale-110 transition duration-500" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif">{prog.title}</h3>
                                        <div className="text-xs text-gray-500 mb-2 font-medium">
                                            {prog.current} / {prog.target} ({prog.pct}%)
                                        </div>
                                        <div className="w-full bg-pink-100 rounded-full h-3 mb-6 relative overflow-hidden">
                                            <div className="bg-green-500 h-full rounded-full" style={{ width: `${prog.pct}%` }}></div>
                                            <div className="absolute top-0 left-0 bg-[#86efac] h-full rounded-full opacity-50" style={{ width: `${prog.pct - 15 > 0 ? prog.pct - 15 : 0}%` }}></div>
                                        </div>
                                        <div className="flex justify-end">
                                            <Link
                                                href={route('donasi.show', { id: prog.id })}
                                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-semibold text-sm shadow-md transition transform active:scale-95"
                                            >
                                                Donasi Sekarang
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-10 text-gray-500 italic">
                                Program tidak ditemukan.
                            </div>
                        )}
                    </div>

                    {/* Tombol Lihat Semua (Jika program lebih dari 4 dan tidak sedang mencari) */}
                    {programCount > 4 && searchTerm === '' && (
                        <div className="text-center mt-10">
                            <Link
                                href={route('donasi')}
                                className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition shadow-lg font-semibold"
                            >
                                Lihat Semua Program ({programCount})
                            </Link>
                        </div>
                    )}
                </section>

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
