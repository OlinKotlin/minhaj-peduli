import { Head, Link } from '@inertiajs/react';

export default function About() {
    // Variabel warna sesuai desain
    const MINHAJ_PRIMARY = "bg-green-600";
    const MINHAJ_BG = "bg-green-50";
    const MINHAJ_CARD_BORDER = "border-green-300";
    const MINHAJ_ICON_COLOR = "text-green-600";

    // Data Dummy Tim
    const teamMembers = [
        { name: "Ketua", title: "Ketua Yayasan" },
        { name: "Sekretaris", title: "Sekretaris" },
        { name: "Bendahara", title: "Bendahara" },
        { name: "Humas", title: "Hubungan Masyarakat" },
    ];

    // Komponen Ikon Orang
    const PersonIcon = ({ className }) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
    );

    return (
        <>
            <Head title="Tentang Kami" />

            <div className={`min-h-screen ${MINHAJ_BG} text-slate-800 flex flex-col font-sans`}>

                {/* 1. Header / Top Bar */}
                <div className={`${MINHAJ_PRIMARY} text-white shadow-md`}>
                    <div className="mx-auto max-w-6xl px-6 py-3 flex justify-between items-center">
                        <div className="font-serif font-semibold text-lg">MinhajPeduli</div>
                        <div className="flex space-x-6 text-sm font-medium items-center">
                            {/* Menu Aktif: Profil (Updated style to match Laporan image) */}
                            <span className="px-3 py-1 bg-black/10 rounded-md font-bold border-b-2 border-white cursor-default">Profil</span>

                            <Link href={route('laporan')} className="hover:text-green-200 text-white/90">Laporan</Link>
                            <Link href={route('donasi')} className="hover:text-green-200 text-white/90">Donasi</Link>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-6xl px-6 py-10 flex-grow w-full">

                    {/* 2. Bagian Judul Utama dengan Logo */}
                    <div className="text-center mb-12">
                        {/* Logo Pindah ke Atas */}
                        <div className="flex justify-center mb-6">
                            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden border border-green-300 p-1">
                                <img
                                    src="/images/logo-minhaj.png"
                                    alt="Logo Minhaj"
                                    className="w-full h-full object-contain"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            </div>
                        </div>

                        {/* Teks "Tentang Kami" di Bawah Logo */}
                        <h1 className="text-4xl font-bold text-slate-800 mb-2">Tentang Kami</h1>

                        {/* Judul Pesantren Hijau */}
                        <h2 className="text-3xl font-bold text-green-600 font-serif">Pondok Pesantren AL Minhaj</h2>
                    </div>

                    {/* 3. Foto Konstruksi */}
                    <div className="mb-10 overflow-hidden rounded-xl shadow-lg">
                        <div className="grid md:grid-cols-2 gap-0">
                            <img
                                src="/images/pesantren2.png"
                                alt="Fondasi"
                                className="w-full h-64 object-cover"
                                onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Foto+Tidak+Ditemukan'; }}
                            />
                            <img
                                src="/images/pesantren1.png"
                                alt="Konstruksi"
                                className="w-full h-64 object-cover"
                                onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Foto+Tidak+Ditemukan'; }}
                            />
                        </div>
                    </div>

                    {/* 4. Teks Perjalanan Kami */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-slate-800 lowercase">perjalanan kami</h2>
                        <div className="text-gray-700 leading-relaxed text-sm text-justify space-y-4">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </section>

                    {/* 5. Visi Misi Cards */}
                    <section className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center flex flex-col items-center border-t-4 border-green-600">
                            <h3 className="text-xl font-bold mb-3 text-green-800">Visi</h3>
                            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm text-center flex flex-col items-center border-t-4 border-green-600">
                            <h3 className="text-xl font-bold mb-3 text-green-800">Misi</h3>
                            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm text-center flex flex-col items-center border-t-4 border-green-600">
                            <h3 className="text-xl font-bold mb-3 text-green-800">Nilai islam</h3>
                            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
                        </div>
                    </section>

                    {/* 6. Tim Kami */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-8 text-slate-800">Tim kami</h2>
                        <div className="flex justify-center gap-10 flex-wrap">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="flex flex-col items-center text-center w-32">
                                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4 border-2 border-green-600 text-green-600 shadow-sm hover:bg-green-100 transition-colors">
                                        <PersonIcon className="w-10 h-10" />
                                    </div>
                                    <p className="font-bold text-slate-800 text-sm">{member.name}</p>
                                    <p className="text-xs text-gray-500 mt-1">{member.title}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* 7. Footer */}
                <footer className={`${MINHAJ_PRIMARY} text-white px-6 py-8 mt-auto`}>
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center text-sm gap-4">
                        <div className="max-w-xs">
                            <p className="font-semibold mb-1">MinhajPeduli</p>
                            <p className="text-green-100">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
                        </div>
                        <div className="text-left md:text-right">
                            <p className="font-bold text-lg">192849047012759</p>
                            <p className="text-green-100">minhaj@gmail.com</p>
                            <p className="text-green-100">Ciseeng, bogor, jawa barat</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
