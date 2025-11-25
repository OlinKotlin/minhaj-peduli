import { Head, Link } from '@inertiajs/react';

export default function About() {
    // Variabel warna sesuai desain
    const MINHAJ_PRIMARY = "bg-green-600";
    const MINHAJ_BG = "bg-green-50";

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

                {/* Header */}
                <div className={`${MINHAJ_PRIMARY} text-white shadow-md`}>
                    <div className="mx-auto max-w-6xl px-6 py-3 flex justify-between items-center">
                        <div className="font-serif font-semibold text-lg">MinhajPeduli</div>

                        <div className="flex space-x-6 text-sm font-medium">

                            {/* Profil */}
                            <Link
                                href={route('about')}
                                className="hover:text-green-200"
                            >
                                Profil
                            </Link>

                            {/* Laporan */}
                            <Link
                                href={route('laporan')}
                                className="hover:text-green-200"
                            >
                                Laporan
                            </Link>

                            {/* Donasi */}
                            <Link
                                href={route('donasi')}
                                className="rounded-md bg-white text-green-800 px-3 py-1 text-sm font-medium hover:opacity-90"
                            >
                                Donasi
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Konten Utama */}
                <div className="mx-auto max-w-5xl px-6 py-8 flex-grow w-full">
                    {/* Judul */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-black mb-1">Tentang Kami</h1>
                        <p className="text-xl font-bold text-green-600">Pondok Pesantren Misbahul Minhaj</p>
                    </div>

                    {/* Foto */}
                    <div className="mb-8 overflow-hidden rounded-xl shadow-lg">
                        <div className="grid md:grid-cols-2 gap-0">
                            <img
                                src="/images/pesantren2.png"
                                alt="Fondasi"
                                className="w-full h-64 object-cover"
                            />
                            <img
                                src="/images/pesantren1.png"
                                alt="Konstruksi"
                                className="w-full h-64 object-cover"
                            />
                        </div>
                    </div>

                    {/* Perjalanan */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-3 text-black lowercase">perjalanan kami</h2>
                        <p className="text-gray-800 leading-relaxed text-sm text-justify">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore...
                        </p>
                    </section>

                    {/* Visi Misi */}
                    <section className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white p-6 rounded-xl shadow-md text-center flex flex-col items-center">
                            <h3 className="text-xl font-bold mb-3 text-black">Visi</h3>
                            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet...</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md text-center flex flex-col items-center">
                            <h3 className="text-xl font-bold mb-3 text-black">Misi</h3>
                            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet...</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md text-center flex flex-col items-center">
                            <h3 className="text-xl font-bold mb-3 text-black">Nilai islam</h3>
                            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet...</p>
                        </div>
                    </section>

                    {/* Tim Kami */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-6 text-black">Tim kami</h2>
                        <div className="flex justify-center gap-8 sm:gap-16 flex-wrap">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-full border-2 border-blue-900 flex items-center justify-center mb-3 bg-white">
                                        <PersonIcon className="w-10 h-10 text-blue-900" />
                                    </div>
                                    <p className="font-bold text-black">{member.name}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <footer className={`${MINHAJ_PRIMARY} text-white px-6 py-8 mt-auto`}>
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center text-sm gap-4">
                        <div className="max-w-xs">
                            <p>Lorem ipsum dolor sit amet...</p>
                        </div>
                        <div className="text-left md:text-right">
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
