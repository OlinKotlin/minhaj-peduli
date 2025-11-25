import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Laporan() {
    // Halluuwwan (Colors)
    const MINHAJ_PRIMARY = "bg-green-600";
    const MINHAJ_BG = "bg-green-50";
    const MINHAJ_CTA = "bg-green-500 text-white hover:bg-green-700";

    // State Filter Kategori
    const [activeCategory, setActiveCategory] = useState("Semua");

    // Data Dummy Campaign
    const campaignsData = [
        { id: 1, category: "Kesehatan", title: "Kesehatan", target: 10000000, collected: 1000000, percentage: 10, image: "/images/pesantren2.png" },
        { id: 2, category: "Pendidikan", title: "Pendidikan", target: 10000000, collected: 1000000, percentage: 10, image: "/images/pesantren1.png" },
        { id: 3, category: "Teknologi", title: "Teknologi", target: 10000000, collected: 1000000, percentage: 10, image: "/images/pesantren2.png" },
        { id: 4, category: "Lingkungan", title: "lingkungan", target: 10000000, collected: 1000000, percentage: 10, image: "/images/pesantren1.png" },
    ];

    const categories = ["Semua", "Teknologi", "Pendidikan", "Kesehatan", "Lingkungan"];

    // Logic Filter
    const filteredCampaigns = activeCategory === "Semua"
        ? campaignsData
        : campaignsData.filter(c => c.category === activeCategory);

    // Format Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    return (
        <>
            <Head title="Laporan Donasi" />

            <div className={`min-h-screen ${MINHAJ_BG} text-slate-800 flex flex-col font-sans`}>

                {/* 1. HEADER HIJAU */}
                <div className={`${MINHAJ_PRIMARY} text-white shadow-md`}>
                    <div className="mx-auto max-w-6xl px-6 py-3 flex justify-between items-center">
                        <div className="font-serif font-semibold text-lg">MinhajPeduli</div>
                        <div className="flex space-x-6 text-sm font-medium items-center">
                            {/* Link Profil (Manual link 'a' tag for safety) */}
                            <a href="/tentang-kami" className="hover:text-green-200 cursor-pointer">Profil</a>

                            {/* Menu Aktif (Laporan) */}
                            <span className="px-3 py-1 bg-black/10 rounded-md font-bold border-b-2 border-white cursor-default">Laporan</span>

                            <a href="/donasi" className="hover:text-green-200 cursor-pointer">Donasi</a>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-5xl px-6 py-8 flex-grow w-full">

                    {/* 2. LOGO & JUDUL */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center mb-3">
                            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden border border-green-300 p-1">
                                <img src="/images/logo-minhaj.png" alt="Logo" className="w-full h-full object-contain"
                                     onError={(e) => e.target.style.display = 'none'} />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-green-600 font-serif">Pondok Pesantren AL Minhaj</h1>
                    </div>

                    {/* 3. STATISTIK (DUA KOTAK) */}
                    <div className="grid md:grid-cols-2 gap-6 mb-10">
                        {/* Dana Terkumpul */}
                        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 border-l-4 border-green-500">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-sm">$</div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">Rp 200 Juta</p>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Total Dana Terkumpul</p>
                            </div>
                        </div>
                        {/* Total Donatur */}
                        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 border-l-4 border-green-500">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">3, 600</p>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Total Donatur</p>
                            </div>
                        </div>
                    </div>

                    {/* 4. FILTER KATEGORI */}
                    <div className="bg-white p-2 rounded-xl shadow-sm mb-10 flex flex-wrap justify-center gap-2 border border-gray-100">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                    activeCategory === cat
                                    ? "bg-green-500 text-white shadow-md transform scale-105"
                                    : "bg-transparent text-gray-600 hover:bg-gray-50 border border-gray-200"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* 5. GRID CAMPAIGN */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {filteredCampaigns.map((campaign) => (
                            <div key={campaign.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                                {/* Gambar */}
                                <div className="relative h-48 overflow-hidden bg-gray-200">
                                    <img
                                        src={campaign.image}
                                        alt={campaign.title}
                                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                                        onError={(e) => e.target.style.opacity = 0}
                                    />
                                    {/* Fallback Text */}
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 -z-10 font-bold">
                                        {campaign.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-serif font-bold mb-4 text-gray-900">{campaign.title}</h3>

                                    <div className="mt-auto">
                                        <div className="flex justify-between text-xs text-gray-500 mb-1 font-medium">
                                            <span>{formatRupiah(campaign.collected)}</span>
                                            <span>{formatRupiah(campaign.target)} ({campaign.percentage}%)</span>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full"
                                                style={{ width: `${campaign.percentage}%` }}
                                            ></div>
                                        </div>

                                        {/* Tombol Donasi */}
                                        <a href="/donasi" className="block w-full">
                                            <button type="button" className={`w-full py-3 rounded-lg text-sm font-bold uppercase tracking-wider ${MINHAJ_CTA} shadow-lg transform active:scale-95 transition-all`}>
                                                donasi sekarang
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. FOOTER */}
                <footer className={`${MINHAJ_PRIMARY} text-white px-6 py-10 mt-auto`}>
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 text-sm">
                        <div>
                            <h4 className="font-serif text-xl font-bold mb-4">Lorem ipsum dolor sit</h4>
                            <p className="text-green-100 max-w-xs leading-relaxed">amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div className="text-left md:text-right space-y-2">
                            <p className="font-bold text-lg">192849047012759</p>
                            <p className="text-green-100">minhaj@gmail.com</p>
                            <p className="text-green-100 capitalize">Ciseeng, bogor, jawa barat</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
