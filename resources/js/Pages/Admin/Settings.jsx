import AdminLayout from '../../Layouts/AdminLayout'; // Menggunakan path manual agar aman
import { Head } from '@inertiajs/react';
import { Save, User, Lock, Globe } from 'lucide-react';

export default function Settings() {
    return (
        <AdminLayout>
            <Head title="Pengaturan" />

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Pengaturan</h2>
                <p className="text-gray-500 text-sm">Kelola profil admin dan informasi website.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* --- Kolom Kiri: Menu Tab --- */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <nav className="space-y-1">
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium bg-green-50 text-green-700 rounded-lg transition">
                                <User size={18} /> Profil Admin
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition">
                                <Lock size={18} /> Ganti Password
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition">
                                <Globe size={18} /> Informasi Website
                            </button>
                        </nav>
                    </div>
                </div>

                {/* --- Kolom Kanan: Form Edit --- */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">Edit Profil Admin</h3>

                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            {/* Foto Profil */}
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-xl border border-green-200">
                                    AY
                                </div>
                                <div>
                                    <button className="text-sm bg-white border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-50 font-medium transition">
                                        Ganti Foto
                                    </button>
                                    <p className="text-xs text-gray-400 mt-1">JPG, PNG maks 1MB.</p>
                                </div>
                            </div>

                            {/* Input Form */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                    <input type="text" defaultValue="Admin Yayasan" className="w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2.5 border" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" defaultValue="admin@minhaj.com" className="w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2.5 border" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
                                    <input type="text" defaultValue="081299998888" className="w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2.5 border" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                    <input type="text" value="Super Admin" disabled className="w-full border-gray-200 bg-gray-50 text-gray-500 rounded-lg shadow-sm sm:text-sm p-2.5 border cursor-not-allowed" />
                                </div>
                            </div>

                            {/* Tombol Simpan */}
                            <div className="pt-4 flex justify-end">
                                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition flex items-center gap-2">
                                    <Save size={18} /> Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}
