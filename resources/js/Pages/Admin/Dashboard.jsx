// Pastikan import ini benar (gunakan @ jika alias sudah diatur, atau path relatif ../../ jika belum)
import AdminLayout from '../../Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { TrendingUp, Users, AlertCircle, CheckCircle } from 'lucide-react';

export default function Dashboard() {
    // Data Statistik (Mock Data)
    const stats = [
        { label: 'Total Donasi Masuk', val: 'Rp 31.233.890', icon: <TrendingUp size={24} />, color: 'bg-green-500' },
        { label: 'Perlu Verifikasi', val: '5 Transaksi', icon: <AlertCircle size={24} />, color: 'bg-yellow-500' },
        { label: 'Total Donatur', val: '265 Orang', icon: <Users size={24} />, color: 'bg-blue-500' },
        { label: 'Program Aktif', val: '4 Program', icon: <CheckCircle size={24} />, color: 'bg-purple-500' },
    ];

    // Data Transaksi Terbaru (Mock Data)
    const recentDonations = [
        { invoice: 'MM2025120607634', name: 'Coco', amount: 'Rp 50.002', program: 'Pembangunan Asrama', status: 'Pending', date: '06/12/2025' },
        { invoice: 'MM2025120607635', name: 'Hamba Allah', amount: 'Rp 100.005', program: 'Wakaf Al-Quran', status: 'Success', date: '06/12/2025' },
        { invoice: 'MM2025120607636', name: 'Budi Santoso', amount: 'Rp 250.000', program: 'Pembangunan Masjid', status: 'Success', date: '05/12/2025' },
    ];

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            {/* Header Dashboard */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Dashboard Ikhtisar</h2>
                <p className="text-gray-500">Selamat datang kembali, Admin.</p>
            </div>

            {/* Kartu Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className={`p-4 rounded-full text-white shadow-lg ${item.color}`}>
                            {item.icon}
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                            <h3 className="text-xl font-bold text-gray-800">{item.val}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabel Donasi Terbaru */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-800">Donasi Terbaru</h3>
                    <button className="text-sm text-green-600 hover:text-green-800 font-medium transition">Lihat Semua</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-green-50 text-green-800 uppercase font-bold text-xs border-b border-green-100">
                            <tr>
                                <th className="px-6 py-4">Invoice</th>
                                <th className="px-6 py-4">Donatur</th>
                                <th className="px-6 py-4">Program</th>
                                <th className="px-6 py-4">Jumlah</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Tanggal</th>
                                <th className="px-6 py-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recentDonations.map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 font-medium text-gray-900">{item.invoice}</td>
                                    <td className="px-6 py-4 font-medium">{item.name}</td>
                                    <td className="px-6 py-4 text-gray-500">{item.program}</td>
                                    <td className="px-6 py-4 font-bold text-green-600">{item.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                                            item.status === 'Success'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            <span className={`w-2 h-2 rounded-full ${item.status === 'Success' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{item.date}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="text-blue-600 hover:text-blue-800 font-medium text-xs border border-blue-200 bg-blue-50 px-3 py-1 rounded hover:bg-blue-100 transition">
                                            Detail
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
