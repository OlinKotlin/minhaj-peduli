import { Head, Link } from '@inertiajs/react';
import { Check, MapPin, Phone, Mail, ArrowRight, ArrowLeft } from 'lucide-react';

export default function Welcome({ auth }) {
    // Data Statistik
    const statsData = [
        { val: "4", label: "Program Donasi" },
        { val: "Rp 31.233.890", label: "Total Donasi Terkumpul" },
        { val: "265", label: "Total Donatur" }
    ];

    // Data Tujuan Program
    const goalsData = [
        {
            title: "Meningkatkan Akses dan Kualitas Pembelajaran Keagamaan",
            desc: "Program pembangunan pondok pesantren diutamakan untuk memperluas kesempatan masyarakat mendapatkan pendidikan agama yang menyeluruh dan bermutu tinggi."
        },
        {
            title: "Menyediakan Fasilitas Fisik dan Infrastruktur Standar",
            desc: "Donasi pembangunan ini bertujuan untuk memastikan ketersediaan sarana dan prasarana yang layak, kokoh, dan fungsional untuk mendukung kegiatan pendidikan."
        },
        {
            title: "Menciptakan Ekosistem Pendidikan yang Inovatif",
            desc: "Melalui program donasi, peran donatur sangat vital dalam membentuk lingkungan belajar di pesantren yang mendorong pengembangan ide baru, kreativitas, dan adaptasi terhadap perkembangan ilmu."
        }
    ];

    // Data Program Donasi
    const programsData = [
        { title: "Pembangunan Asrama Santri", collected: "Rp 30.000.000", target: "Rp 50.000.000", pct: 60, img: "/images/pesantren1.png" },
        { title: "Pembangunan Pesantren Tahfidz", collected: "Rp 12.000.000", target: "Rp 20.000.000", pct: 60, img: "/images/pesantren2.png" },
        { title: "Wakaf AL-Quran dan Buku", collected: "Rp 15.000.000", target: "Rp 50.000.000", pct: 30, img: "/images/pesantren1.png" },
        { title: "Pembangunan Masjid", collected: "Rp 8.000.000", target: "Rp 10.000.000", pct: 80, img: "/images/pesantren2.png" },
    ];

    return (
        <>
            <Head title="Beranda" />

            <div className="min-h-screen bg-[#dcfce7] text-slate-800 font-sans">

                {/* --- Navbar --- */}
                <nav className="flex justify-between items-center px-6 py-4 bg-green-100 shadow-sm sticky top-0 z-50">
                    <div className="text-2xl font-bold text-green-700 italic">
                        Minhaj<span className="text-green-900">Peduli</span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm font-semibold">
                        {/* PERBAIKAN 1: Href Beranda jadi "/" bukan route('login') */}
                        <Link href="/" className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition shadow-md">
                            Beranda
                        </Link>

                        <Link href={route('about')} className="text-gray-600 hover:text-green-700 transition">
                            Tentang
                        </Link>

                        <Link href={route('donasi')} className="text-gray-600 hover:text-green-700 transition">
                            Donasi
                        </Link>

                        {/* Link ke Dashboard Admin (Jika user terdeteksi) */}
                        {auth?.user && (
                            <Link
                                href={route('admin.dashboard')} // Pastikan route ini ada di web.php
                                className="ml-4 rounded-md border border-green-600 px-3 py-1 text-green-700 hover:bg-green-50"
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>
                </nav>

                {/* --- Header Logo Area --- */}
                <div className="text-center py-10 bg-white">
                    <img
                        src="/images/logo-minhaj.png"
                        alt="Logo Pondok Pesantren Al-Minhaj"
                        className="mx-auto w-24 h-24 object-contain mb-4"
                    />
                    <h1 className="text-2xl md:text-3xl font-bold text-green-800 uppercase tracking-wide leading-tight px-4">
                        Pondok Pesantren<br />Al-Minhaj
                    </h1>
                </div>

                {/* --- Hero Section (Sesuai Desain Terakhir) --- */}
                <section className="w-full">
                    <div className="grid md:grid-cols-2">
                        {/* Kolom Kiri */}
                        <div className="bg-[#439c63] text-white p-10 md:p-16 flex flex-col justify-center">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 italic leading-tight tracking-wide">
                                Membangun<br />
                                Pesantren<br />
                                Misbahul Minhaj
                            </h2>
                            <p className="text-white/90 text-sm md:text-lg leading-relaxed font-normal">
                                Bergabunglah dengan gerakan kebaikan untuk mendukung pembangunan dan pengembangan pesantren. Setiap donasi Anda adalah investasi untuk masa depan generasi Qur'ani yang mandiri dan berdaya.
                            </p>
                        </div>
                        {/* Kolom Kanan */}
                        <div className="relative h-64 md:h-auto w-full">
                            <img
                                src="/images/pesantren1.png"
                                alt="Pembangunan Pesantren"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* --- Stats Section --- */}
                <section className="py-10 px-4">
                    <div className="flex justify-center mb-6 text-green-700 text-2xl gap-4 items-center opacity-70">
                        <ArrowLeft size={24} />
                        <span className="tracking-[0.5em] text-sm font-bold">• • •</span>
                        <ArrowRight size={24} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto text-center text-white">
                        {statsData.map((item, idx) => (
                            <div key={idx} className="bg-green-700 py-6 px-4 rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
                                <div className="text-3xl font-bold mb-1">{item.val}</div>
                                <div className="text-sm font-medium text-green-100">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Tujuan Program --- */}
                <section className="py-10 px-4 max-w-5xl mx-auto" id="tentang">
                    <h2 className="text-center text-2xl font-bold text-green-800 mb-8 uppercase tracking-wide">Tujuan Program</h2>
                    <div className="space-y-4">
                        {goalsData.map((item, idx) => (
                            <div key={idx} className="rounded-xl overflow-hidden shadow-md group">
                                <div className="bg-green-400 p-3 flex items-center group-hover:bg-green-500 transition">
                                    <Check className="text-white mr-3 shrink-0" strokeWidth={3} size={20} />
                                    <h3 className="font-bold text-white italic text-sm md:text-lg">{item.title}</h3>
                                </div>
                                <div className="bg-green-800 p-5 text-green-50 text-sm leading-relaxed">
                                    {item.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Site Plan --- */}
                <section className="py-10 px-4 text-center">
                    <h2 className="text-2xl font-bold text-green-800 mb-6 uppercase">
                        Site Plan Pesantren Al-Minhaj
                    </h2>
                    <div className="max-w-4xl mx-auto bg-white p-2 rounded-lg shadow-lg border border-gray-200">
                        <img
                            src="/images/Site-plan.png"
                            alt="Site Plan Pesantren Al-Minhaj"
                            className="w-full h-auto rounded"
                        />
                    </div>
                </section>

                {/* --- Program Donasi --- */}
                <section className="py-12 px-4 max-w-6xl mx-auto" id="donasi">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-green-800 uppercase mb-2">Program Donasi</h2>
                        <p className="font-medium text-gray-700">Yuk berpartisipasi dalam kebaikan !</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {programsData.map((prog, idx) => (
                            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-lg border border-green-100 hover:shadow-2xl transition duration-300 flex flex-col h-full">
                                <img src={prog.img} alt={prog.title} className="w-full h-48 object-cover" />
                                <div className="p-5 flex flex-col flex-grow justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-3 font-serif">{prog.title}</h3>
                                        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                                            <div
                                                className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                                                style={{ width: `${prog.pct}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-end mt-2">
                                        <div className="text-xs text-gray-600 space-y-1">
                                            <p>Terkumpul: <span className="font-bold text-green-700">{prog.collected}</span></p>
                                            <p>Target: {prog.target}</p>
                                        </div>
                                        {/* PERBAIKAN 2: Langsung ke donasi, hapus logika login sementara */}
                                        <Link
                                            href={route('donasi')}
                                            className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 px-4 rounded shadow-md transform active:scale-95 transition"
                                        >
                                            Donasi Sekarang
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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
                                    <h3 className="text-xl font-bold mb-4 text-green-900">Kontak kami</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center">
                                            <Mail className="w-6 h-6 text-green-700 mr-3" />
                                            <a href="mailto:AlMinhaj@gmail.com" className="text-green-800 hover:text-green-600 transition">AlMinhaj@gmail.com</a>
                                        </li>
                                        <li className="flex items-center">
                                            <Phone className="w-6 h-6 text-green-700 mr-3" />
                                            <a href="tel:081234567890" className="text-green-800 hover:text-green-600 transition">081234567890</a>
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
