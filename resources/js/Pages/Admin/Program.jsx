import AdminLayout from '../../Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';

export default function Program() {
    // Data Dummy Program
    const programs = [
        { id: 1, title: 'Pembangunan Asrama Santri', target: 'Rp 50.000.000', collected: 'Rp 30.000.000', progress: 60, status: 'Aktif', image: '/images/pesantren1.png' },
        { id: 2, title: 'Pembangunan Pesantren Tahfidz', target: 'Rp 20.000.000', collected: 'Rp 12.000.000', progress: 60, status: 'Aktif', image: '/images/pesantren2.png' },
        { id: 3, title: 'Wakaf AL-Quran dan Buku', target: 'Rp 50.000.000', collected: 'Rp 15.000.000', progress: 30, status: 'Selesai', image: '/images/pesantren1.png' },
        { id: 4, title: 'Pembangunan Masjid', target: 'Rp 10.000.000', collected: 'Rp 8.000.000', progress: 80, status: 'Aktif', image: '/images/pesantren2.png' },
    ];

    return (
        <AdminLayout>
            <Head title="Kelola Program" />

            {/* Header Halaman */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Daftar Program Donasi</h2>
                    <p className="text-gray-500 text-sm">Kelola kampanye donasi yang sedang berjalan.</p>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition flex items-center gap-2">
                    <Plus size={18} /> Tambah Program
                </button>
            </div>

            {/* Filter & Pencarian */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Cari nama program..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                </div>
                <button className="flex items-center gap-2 bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 text-gray-700">
                    <Filter size={16} /> Filter Status
                </button>
            </div>

            {/* Grid Program */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition duration-300 group">
                        {/* Gambar */}
                        <div className="h-48 overflow-hidden relative">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                                item.status === 'Aktif' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                            }`}>
                                {item.status}
                            </div>
                        </div>

                        {/* Konten */}
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="font-bold text-gray-800 text-lg mb-3 leading-snug line-clamp-2">{item.title}</h3>

                            <div className="space-y-4 mb-6">
                                {/* Progress Bar */}
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-500">Terkumpul</span>
                                        <span className="font-bold text-green-700">{item.collected}</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${item.progress}%` }}></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                                        <span>Target: {item.target}</span>
                                        <span>{item.progress}%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tombol Aksi */}
                            <div className="mt-auto flex gap-3 pt-4 border-t border-gray-100">
                                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 hover:text-green-700 font-medium transition">
                                    <Edit size={16} /> Edit
                                </button>
                                <button className="flex-none p-2.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition tooltip" title="Hapus Program">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
