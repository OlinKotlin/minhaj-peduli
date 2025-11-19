import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Beranda" />

            <div className="min-h-screen bg-minhaj-50 text-slate-800">
                {/* Top bar */}
                <div className="bg-minhaj text-white">
                    <div className="mx-auto max-w-6xl px-6 py-3 flex justify-between items-center">
                        <div className="font-serif font-semibold">MinhajPeduli</div>
                        <div>
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md bg-white/20 px-3 py-1 text-sm hover:bg-white/30"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="rounded-md bg-white text-minhaj px-3 py-1 text-sm font-medium hover:opacity-90"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-6xl px-6 py-10">
                    {/* Logo and title */}
                    <div className="flex flex-col items-center mb-8">
                            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden">
                            {/* local logo image */}
                            <img src="/images/logo-minhaj.png" alt="Logo Minhaj" className="w-20 h-20 object-contain" />
                        </div>
                        <h1 className="mt-4 text-5xl font-serif font-bold text-minhaj">Pondok Pesantren AL Minhaj</h1>
                    </div>

                    {/* Hero */}
                    <section className="grid lg:grid-cols-2 gap-6 items-stretch">
                        <div className="rounded-lg bg-minhaj p-10 text-white shadow-lg flex flex-col justify-center">
                            <h2 className="text-5xl font-extrabold leading-tight drop-shadow">Membangun<br/>pesantren<br/>misbahul minhaj</h2>
                            <p className="mt-4 text-sm text-white">Bergabunglah dengan gerakan kebaikan untuk mendukung pembangunan dan pengembangan pesantren. Setiap donasi Anda adalah investasi untuk masa depan generasi Qur'ani yang mandiri dan berdaya.</p>
                            <div className="mt-6">
                                <Link href="/donate" className="inline-block">
                                    <button type="button" className="rounded-md bg-minhaj-cta text-minhaj px-6 py-2 shadow-sm font-medium hover:brightness-95 transition">Donasi Sekarang</button>
                                </Link>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <img src="/images/pesantren1.png" alt="konstruksi" className="w-full h-48 object-cover rounded-md shadow-md" />
                            <img src="/images/pesantren2.png" alt="fondasi" className="w-full h-48 object-cover rounded-md shadow-md" />
                        </div>
                    </section>

                    {/* About section */}
                    <section className="mt-8 bg-minhaj-100 rounded-lg p-6 shadow-inner">
                        <div className="grid lg:grid-cols-2 gap-6 items-center">
                            <div className="space-y-4">
                                <img src="/images/pesantren1.png" alt="konstruksi" className="w-full h-40 object-cover rounded-md shadow" />
                                <img src="/images/pesantren2.png" alt="fondasi" className="w-full h-40 object-cover rounded-md shadow" />
                            </div>

                            <div className="rounded-lg bg-white p-6 border-4 border-minhaj">
                                <h3 className="text-2xl font-bold text-minhaj mb-2">Tentang minhaj peduli</h3>
                                <p className="text-sm text-slate-700">Minhaj Peduli adalah sebuah inisiatif mulia yang berdedikasi untuk mendukung pembangunan dan pengembangan pesantren Al-Minhaj. Kami percaya bahwa pesantren adalah pilar penting dalam mencetak generasi Qur'ani yang tidak hanya unggul dalam ilmu agama, tetapi juga mandiri dan berdaya saing di era modern.</p>
                                <p className="mt-3 text-sm text-slate-700">Melalui platform crowdfunding yang transparan dan akuntabel, kami mengajak Anda untuk menjadi bagian dari gerakan kebaikan ini. Setiap donasi yang Anda berikan akan langsung disalurkan untuk kebutuhan vital pesantren, mulai dari pembangunan fasilitas, pengadaan sarana belajar, hingga beasiswa bagi santri berprestasi.</p>
                                <div className="mt-4">
                                    <Link href="/donate" className="inline-block">
                                        <button type="button" className="rounded-md bg-minhaj-cta text-minhaj px-6 py-2 font-medium hover:brightness-95 transition">Donasi Sekarang</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Footer contact */}
                    <footer className="mt-8 rounded-t-lg bg-minhaj text-white p-6">
                        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="text-lg">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">192849047012759</p>
                                <p>minhaj@gmail.com</p>
                                <p>Ciseeng, bogor, jawa barat</p>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
