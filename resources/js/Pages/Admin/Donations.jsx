// Ganti import ini agar tidak error
import AdminLayout from '../../Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Search, Filter, Eye, Check, X } from 'lucide-react';

export default function Donations() {
    return (
        <AdminLayout>
            <Head title="Kelola Donasi" />

            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Daftar Donasi Masuk</h2>
                    <p className="text-gray-500 text-sm">Verifikasi transfer manual dan pantau donasi.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <input type="text" placeholder="Cari invoice/nama..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:border-green-500" />
                        <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                    </div>
                    <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                        <Filter size={16} /> Filter
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-green-50 text-green-800 uppercase font-bold text-xs">
                        <tr>
                            <th className="px-6 py-4">Invoice</th>
                            <th className="px-6 py-4">Donatur</th>
                            <th className="px-6 py-4">Nominal + Kode</th>
                            <th className="px-6 py-4">Metode</th>
                            <th className="px-6 py-4">Bukti</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-yellow-50/50 transition bg-yellow-50">
                            <td className="px-6 py-4 font-medium">MM2025120607634</td>
                            <td className="px-6 py-4">
                                <div className="font-bold text-gray-800">Coco</div>
                                <div className="text-xs text-gray-500">081234567890</div>
                            </td>
                            <td className="px-6 py-4 font-bold">
                                Rp 50.<span className="text-red-500">002</span>
                            </td>
                            <td className="px-6 py-4">Transfer BTN</td>
                            <td className="px-6 py-4">
                                <span className="text-blue-600 underline cursor-pointer hover:text-blue-800">Lihat Bukti</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                                    Verifikasi
                                </span>
                            </td>
                            <td className="px-6 py-4 flex justify-center gap-2">
                                <button className="p-2 bg-green-100 text-green-600 rounded hover:bg-green-200 tooltip" title="Terima">
                                    <Check size={16} />
                                </button>
                                <button className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 tooltip" title="Tolak">
                                    <X size={16} />
                                </button>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 font-medium">MM2025120500123</td>
                            <td className="px-6 py-4">
                                <div className="font-bold text-gray-800">Hamba Allah</div>
                            </td>
                            <td className="px-6 py-4 font-bold">Rp 100.005</td>
                            <td className="px-6 py-4">Transfer BCA</td>
                            <td className="px-6 py-4 text-gray-400">-</td>
                            <td className="px-6 py-4">
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                                    Berhasil
                                </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <button className="text-gray-400 hover:text-gray-600">
                                    <Eye size={18} />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
