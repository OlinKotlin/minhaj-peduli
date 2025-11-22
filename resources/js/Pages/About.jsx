import { Head, Link } from '@inertiajs/react';

export default function About() {
    // Variabel warna kustom, konsisten dengan Welcome dan Login page
    const MINHAJ_PRIMARY = "bg-green-600";
    const MINHAJ_BG = "bg-green-50";
    const MINHAJ_CARD_BORDER = "border-green-300";
    const MINHAJ_ICON_COLOR = "text-green-600";

    // Data Tim Kami (Mock Data)
    const teamMembers = [
        { name: "Ketua", title: "Ketua Yayasan" },
        { name: "Sekretaris", title: "Sekretaris" },
        { name: "Bendahara", title: "Bendahara" },
        { name: "Humas", title: "Hubungan Masyarakat" },
    ];

    // SVG Icon untuk anggota tim (simbol orang)
    const PersonIcon = ({ className }) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
    );

    return (
        <>
            <Head title="Tentang Kami" />

            <div className={`min-h-screen ${MINHAJ_BG} text-slate-800 flex flex-col`}>

                {/* Header/Top Bar dengan Navigasi */}
                <div className={`${MINHAJ_PRIMARY} text-white`}>
                    <div className="mx-auto max-w-6xl px-6 py-3 flex justify-between items-center">
                        <div className="font-serif font-semibold">MinhajPeduli</div>
                        <div className="flex space-x-4">
                            <Link href={route('profile')} className="text-white/80 hover:text-white text-sm">Profil</Link>
                            <Link href={route('laporan')} className="text-white/80 hover:text-white text-sm">Laporan</Link>
                            <Link href={route('donasi')} className="rounded-md bg-white text-green-800 px-3 py-1 text-sm font-medium hover:opacity-90">Donasi</Link>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-6xl px-6 py-10 flex-grow">
                    {/* Bagian Judul Utama */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-slate-800">Tentang Kami</h1>
                        <p className="text-xl font-medium mt-1 text-green-600">Pondok Pesantren Misbahul Minhaj</p>
                    </div>

                    {/* Bagian Foto Konstruksi */}
                    <div className={`p-4 bg-white rounded-xl shadow-lg mb-10 border-4 ${MINHAJ_CARD_BORDER}`}>
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Gambar 1: Fondasi */}
                            <img
                                src="/images/pesantren2.png"
                                alt="Fondasi bangunan"
                                className="w-full h-64 object-cover rounded-lg shadow-md"
                            />
                            {/* Gambar 2: Konstruksi Lantai Atas */}
                            <img
                                src="/images/pesantren1.png"
                                alt="Konstruksi lantai atas"
                                className="w-full h-64 object-cover rounded-lg shadow-md"
                            />
                        </div>
                    </div>

                    {/* Perjalanan Kami (Teks Panjang) */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-3 text-slate-800">perjalanan kami</h2>
                        <p className="text-gray-700 leading-relaxed text-base">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </section>

                    {/* Visi, Misi, Nilai Islam (Cards) */}
                    <section className="grid md:grid-cols-3 gap-6 mb-10">
                        {/* Visi Card */}
                        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-600 text-center">
                            <h3 className="text-xl font-semibold mb-2 text-green-800">Visi</h3>
                            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
                        </div>

                        {/* Misi Card */}
                        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-600 text-center">
                            <h3 className="text-xl font-semibold mb-2 text-green-800">Misi</h3>
                            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
                        </div>

                        {/* Nilai Islam Card */}
                        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-600 text-center">
                            <h3 className="text-xl font-semibold mb-2 text-green-800">Nilai Islam</h3>
                            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
                        </div>
                    </section>

                    {/* Tim Kami (Our Team) */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-6 text-slate-800">Tim kami</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="flex flex-col items-center text-center">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-3 border-2 border-green-500">
                                        <PersonIcon className={`w-12 h-12 ${MINHAJ_ICON_COLOR}`} />
                                    </div>
                                    <p className="font-semibold text-sm">{member.name}</p>
                                    <p className="text-xs text-gray-500">{member.title}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Footer (Full Width) - Konsisten dengan halaman lain */}
                <footer className={`${MINHAJ_PRIMARY} text-white p-6 mt-auto`}>
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                        <div className="text-left">
                            <p>Lorem ipsum dolor sit amet, consectetur</p>
                            <p>adipiscing elit, sed do</p>
                        </div>
                        <div className="text-right">
                            <p className="font-medium">192849047012759</p>
                            <p>minhaj@gmail.com</p>
                            <p>Ciseeng, bogor, jawa barat</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
