import { Head } from '@inertiajs/react';
import Navbar from "@/Components/Navbar"; // Import Navbar Komponen
import { MapPin, Phone, Mail } from 'lucide-react';

export default function About({ auth }) {
    return (
        <>
            <Head title="Tentang Kami" />

            <div className="min-h-screen bg-[#dcfce7] text-slate-800 font-sans">

                {/* --- MENGGUNAKAN NAVBAR BARU --- */}
                {/* Navigasi manual dihapus, diganti komponen ini agar konsisten */}
                <Navbar auth={auth} />

                {/* --- Header / Hero Section --- */}
                <section className="bg-green-50 py-12 px-6">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="md:w-1/2">
                            <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">
                                Selamat Datang di Pondok Pesantren Al-Minhaj
                            </h1>
                            <p className="text-xl text-green-700 font-medium italic">
                                Mari Berkenalan Lebih Jauh!
                            </p>
                        </div>
                        <div className="md:w-1/2 flex justify-center md:justify-end">
                            {/* Placeholder Gambar Konstruksi Atas */}
                            <div className="bg-green-200 p-2 rounded-3xl shadow-lg w-full max-w-md h-64 overflow-hidden relative">
                                <img
                                    src="/images/pesantren1.png"
                                    alt="Konstruksi Pesantren"
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Tentang Kami Section --- */}
                <section className="bg-green-700 py-16 px-6 text-white">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl font-bold uppercase border-b-2 border-green-400 inline-block mb-8">
                            Tentang Kami
                        </h2>

                        <div className="flex flex-col md:flex-row gap-8 items-start">
                             {/* Gambar Pondasi */}
                            <div className="md:w-1/3 w-full">
                                <img
                                    src="/images/pesantren2.png"
                                    alt="Pondasi Pesantren"
                                    className="w-full h-64 object-cover rounded-xl border-4 border-green-600 shadow-xl"
                                />
                            </div>

                            {/* Teks Deskripsi */}
                            <div className="md:w-2/3 text-sm md:text-base leading-relaxed space-y-4 text-green-50 text-justify">
                                <p>
                                    Pondok Pesantren Al-Minhaj adalah lembaga pendidikan Islam yang berfokus pada pembinaan generasi Qur'ani melalui program tahfidz Al-Qur'an tingkat SD dan SMP. Kami memberikan pendidikan gratis bagi anak yatim, dhuafa, dan muallaf, sebagai bentuk kepedulian dan dakwah pendidikan.
                                </p>
                                <p>
                                    Dengan bimbingan ustadz berpengalaman, lingkungan yang asri, serta kurikulum tahfidz yang terarah, Al-Minhaj berkomitmen mencetak hafidz dan hafidzah yang berakhlak mulia dan bermanfaat bagi umat.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Visi & Misi Section --- */}
                <section className="bg-[#dcfce7] py-16 px-6">
                    <div className="max-w-5xl mx-auto space-y-16">

                        {/* VISI */}
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <div className="h-px w-20 bg-green-700"></div>
                                <h2 className="text-2xl font-bold text-green-800 uppercase">VISI</h2>
                                <div className="h-px w-20 bg-green-700"></div>
                            </div>
                            <div className="bg-green-600 text-white p-8 rounded-xl shadow-lg italic text-lg leading-relaxed">
                                "Membangun pusat pendidikan Islam dengan model pesantren dengan dukungan bangunan fisik (gedung pendidikan dan masjid) yang berkualitas serta sarana dan prasarana modern yang mendukung proses pembelajaran para santri"
                            </div>
                        </div>

                        {/* MISI */}
                        <div>
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <div className="h-px w-20 bg-green-700"></div>
                                <h2 className="text-2xl font-bold text-green-800 uppercase">MISI</h2>
                                <div className="h-px w-20 bg-green-700"></div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg text-sm md:text-base text-justify">
                                    Menjadikan pesantren (ma'had) sebagai tempat yang memadai sekaligus menyenangkan bagi para santri maupun para pendidik (ustadz/guru) dalam proses belajar-mengajar, baik menghafal al-Quran maupun mengkaji kitab kuning.
                                </div>
                                <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg text-sm md:text-base text-justify">
                                    Menjadikan pesantren (ma'had) sebagai tempat yang mendukung proses percepatan pembinaan dan pengkaderan generasi penghapal dan pejuang al-Quran, khususnya dari kalangan anak-anak yatim dan dhuafa.
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* --- Tujuan Diagram Section --- */}
                <section className="bg-green-100 py-16 px-6 relative overflow-hidden">
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h2 className="text-2xl font-bold text-green-800 uppercase mb-12 underline decoration-green-500 decoration-4 underline-offset-8">
                            TUJUAN
                        </h2>

                        {/* Layout Diagram (Tanpa Garis) */}
                        <div className="flex flex-col items-center relative">

                            {/* Baris Atas (2 Kotak) */}
                            <div className="flex flex-col md:flex-row justify-between w-full gap-8 mb-8 md:mb-16 relative z-10">
                                {/* Kotak Kiri */}
                                <div className="bg-green-200 border-4 border-green-600 p-6 rounded-lg shadow-md w-full md:w-5/12 flex items-center justify-center min-h-[120px]">
                                    <p className="text-green-900 font-bold text-sm">
                                        Memberikan pendidikan gratis bagi anak yatim, dhuafa, dan muallaf
                                    </p>
                                </div>

                                {/* Kotak Kanan */}
                                <div className="bg-green-200 border-4 border-green-600 p-6 rounded-lg shadow-md w-full md:w-5/12 flex items-center justify-center min-h-[120px]">
                                    <p className="text-green-900 font-bold text-sm">
                                        Al-Minhaj berkomitmen mencetak hafizh dan hafizhah yang berakhlak mulia dan bermanfaat bagi umat.
                                    </p>
                                </div>
                            </div>

                            {/* Baris Bawah (1 Kotak Tengah) */}
                            <div className="bg-green-200 border-4 border-green-600 p-6 rounded-lg shadow-md w-full md:w-5/12 flex items-center justify-center min-h-[120px] relative mt-4 z-10">
                                <p className="text-green-900 font-bold text-sm">
                                    Berfokus pada pembinaan generasi Qur'ani melalui program tahfidz AL-Qur'an tingkat SD dan SMP.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Ketua Yayasan Section --- */}
                <section className="bg-green-700 py-16 px-6 text-white mt-10">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-center text-2xl font-bold uppercase mb-10 border-b border-green-500 inline-block pb-2 px-10">
                            KETUA YAYASAN
                        </h2>

                        <div className="flex flex-col md:flex-row items-center gap-10">
                            {/* Foto Profil */}
                            <div className="bg-white p-3 shadow-2xl transform -rotate-2 md:rotate-0 hover:rotate-0 transition duration-500">
                                <div className="w-64 h-80 bg-gray-300 overflow-hidden">
                                    {/* GANTI DENGAN FOTO KETUA */}
                                    <img
                                        src="/images/ketua-yayasan.jpg"
                                        alt="Foto Ketua Yayasan"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {e.target.src = "https://via.placeholder.com/300x400?text=Foto+Ketua"}}
                                    />
                                </div>
                            </div>

                            {/* Teks Quote & Nama */}
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-4xl font-bold font-serif italic mb-4">Loremipsum</h3>
                                <p className="text-green-100 italic text-lg leading-relaxed mb-6">
                                    “Ketua Yayasan Pesantren Tahfidz Al-Minhaj adalah sosok yang berdedikasi dalam memajukan dakwah dan pendidikan Qur’ani, serta memastikan seluruh program berjalan dengan penuh integritas, keteladanan, dan rasa tanggung jawab.”
                                </p>
                                <div className="text-right mt-4">
                                    <p className="font-bold text-xl tracking-wide">ketua yayasan</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Footer --- */}
                <footer className="w-full mt-0 bg-green-50">
                     <div className="py-10 px-6 text-green-900">
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
                                                Desa kuripan Kel.Kuripan<br />
                                                Kec. Ciseeng, Bogor, Jawa Barat
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
                            <span className="text-lg mr-1">©</span>
                            2025 MINHAJ PEDULI. ALL RIGHTS RESERVED.
                        </p>
                    </div>
                </footer>

            </div>
        </>
    );
}
