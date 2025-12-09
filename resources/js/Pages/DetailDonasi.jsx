import { Head, Link } from '@inertiajs/react';
import { MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function DetailDonasi({ auth, id }) {
    // State untuk menangkap input nominal donasi
    const [nominal, setNominal] = useState('');

    // Mock Data Program (Sama dengan halaman Donasi untuk konsistensi data)
    const allPrograms = [
        {
            id: 1,
            title: "Pembangunan Asrama Santri",
            desc_short: "Bantu wujudkan tempat tinggal yang nyaman bagi para penjaga Al-Qur'an masa depan.",
            desc_long: `Kami sampaikan kabar gembira dan ajakan mulia. Pesantren Misbahul Minhaj akan segera didirikan di lokasi strategis: Ciseeng, Kabupaten Bogor, Jawa Barat. Visi kami jelas: mencetak generasi ulama dan pemimpin yang berlandaskan Al-Qur'an dan Sunnah, menjadi pusat pendidikan Islam terdepan di Bogor Barat.

Saat ini, kami telah memiliki tanah wakaf, namun bangunan utama (termasuk asrama dan kelas) belum ada sama sekali. Kami mengajak Anda untuk menanam Batu Pertama bagi pembangunan Asrama Santri dan Gedung Kelas. Donasi Anda bukan hanya membantu pembangunan, tetapi menjadikan Anda pendiri sekaligus saksi berdirinya sebuah institusi pendidikan Islam dari nol di Ciseeng. Inilah kesempatan emas amal jariyah untuk mendirikan Rumah Ilmu di Bogor.`,
            current: "Rp 12.765.512",
            target: "Rp 100.000.000",
            pct: 10,
            img: "/images/pesantren1.png"
        },
        {
            id: 2,
            title: "Pembangunan Pesantren Tahfidz",
            desc_short: "Membangun fasilitas penghafal Quran yang memadai.",
            desc_long: "Program ini bertujuan membangun ruang kelas khusus tahfidz agar para santri dapat menghafal dengan tenang dan fokus. Fasilitas yang baik akan menunjang kualitas hafalan mereka.",
            current: "Rp 8.450.000",
            target: "Rp 10.000.000",
            pct: 84,
            img: "/images/pesantren2.png"
        },
        {
            id: 3,
            title: "Wakaf Al-quran dan Buku",
            desc_short: "Penyediaan literasi islam untuk santri.",
            desc_long: "Wakaf buku dan Al-Quran untuk perpustakaan santri. Kami membutuhkan ribuan eksemplar Al-Quran dan kitab-kitab kuning untuk menunjang kegiatan belajar mengajar sehari-hari.",
            current: "Rp 6.380.000",
            target: "Rp 10.000.000",
            pct: 68,
            img: "/images/pesantren1.png"
        },
        {
            id: 4,
            title: "Pembangunan Masjid",
            desc_short: "Tempat ibadah utama bagi para santri dan warga sekitar.",
            desc_long: "Pembangunan masjid utama pesantren yang akan menjadi pusat kegiatan ibadah santri dan masyarakat sekitar. Masjid ini didesain untuk menampung hingga 500 jamaah.",
            current: "Rp 8.483.890",
            target: "Rp 10.000.000",
            pct: 84,
            img: "/images/pesantren2.png"
        },
    ];

    // Cari program berdasarkan ID (pastikan tipe data id sesuai)
    const program = allPrograms.find(p => p.id === Number(id)) || allPrograms[0];

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
                                    src={program.img}
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
                                {/* Hiasan Background Card */}
                                <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>

                                {/* Circular Progress Bar */}
                                <div className="relative w-40 h-40 mx-auto mb-6 mt-4">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="80"
                                            cy="80"
                                            r="70"
                                            stroke="#e5e7eb"
                                            strokeWidth="10"
                                            fill="transparent"
                                        />
                                        <circle
                                            cx="80"
                                            cy="80"
                                            r="70"
                                            stroke="#16a34a" // green-600
                                            strokeWidth="10"
                                            fill="transparent"
                                            strokeDasharray={440} // Keliling lingkaran approx 2*PI*r (2 * 3.14 * 70)
                                            strokeDashoffset={440 - (440 * program.pct) / 100}
                                            strokeLinecap="round"
                                            className="transition-all duration-1000 ease-out"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-3xl font-bold text-blue-800">{program.pct}%</span>
                                    </div>
                                </div>

                                {/* Text Stats */}
                                <div className="mb-6">
                                    <p className="text-gray-600 text-sm font-medium">Donasi Terkumpul:</p>
                                    <p className="text-2xl font-bold text-green-700">{program.current}</p>
                                    <p className="text-xs text-gray-500 mt-1">dari target donasi {program.target}</p>
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

                                {/* Button Action: Link ke Form Donasi */}
                                <Link
                                    href={route('donasi.form', {
                                        id: program.id,
                                        nominal: nominal || 0 // Kirim nominal ke route (default 0 jika kosong)
                                    })}
                                    className="block w-full bg-[#16a34a] hover:bg-green-700 text-white text-lg font-bold py-3 px-4 rounded-full shadow-lg transform active:scale-95 transition duration-200"
                                >
                                    Donasi Sekarang
                                </Link>

                            </div>
                        </div>

                    </div>
                </div>

                {/* --- Footer (Konsisten dengan halaman lain) --- */}
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
