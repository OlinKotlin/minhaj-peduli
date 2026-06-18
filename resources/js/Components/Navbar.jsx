import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ auth }) {
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);

    // Fungsi untuk style menu aktif
    const isActive = (path) => {
        const isCurrent = (path !== '/' && url.startsWith(path)) || (path === '/' && url === '/');
        const baseClass = "px-4 py-2 rounded-full transition duration-300 font-semibold";
        return isCurrent
            ? `${baseClass} bg-green-600 text-white shadow-md`
            : `${baseClass} text-gray-600 hover:text-green-700 hover:bg-green-50`;
    };

    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-green-100 shadow-sm sticky top-0 z-50">
            <div className="text-2xl font-bold text-green-700 italic flex items-center gap-2">
                <Link href="/" className="flex items-center hover:opacity-80 transition">
                    <span>Minhaj<span className="text-green-900">Peduli</span></span>
                </Link>
            </div>

            {/* Desktop Menu - HANYA MENU UMUM */}
            <div className="hidden md:flex items-center space-x-2 text-sm font-semibold">
                <Link href="/" className={isActive('/')}>Beranda</Link>
                <Link href="/about" className={isActive('/about')}>Tentang</Link>
                <Link href="/laporan" className={isActive('/laporan')}>Laporan Keuangan</Link>
                <Link href="/donasi" className={isActive('/donasi')}>Donasi</Link>

                {/* TOMBOL DASHBOARD SUDAH SAYA HAPUS DARI SINI */}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="text-green-800 p-2 rounded-md hover:bg-green-200 transition">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    );
}
