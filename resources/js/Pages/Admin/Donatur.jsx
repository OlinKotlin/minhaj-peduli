import AdminLayout from '../../Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Search, Mail, Phone, Download } from 'lucide-react';

// Ganti nama function dari Donors menjadi Donatur
export default function Donatur() {
    // Mock Data Donatur
    const donors = [
        { id: 1, name: 'Coco', email: 'tes@example.com', phone: '081234567890', total_donasi: 'Rp 50.000', last_donation: '06/12/2025' },
        { id: 2, name: 'Hamba Allah', email: '-', phone: '-', total_donasi: 'Rp 100.000', last_donation: '05/12/2025' },
        { id: 3, name: 'Budi Santoso', email: 'budi@gmail.com', phone: '085712345678', total_donasi: 'Rp 250.000', last_donation: '04/12/2025' },
        { id: 4, name: 'Siti Aminah', email: 'siti@yahoo.com', phone: '081399887766', total_donasi: 'Rp 1.000.000', last_donation: '01/12/2025' },
    ];

    return (
        <AdminLayout>
            <Head title="Data Donatur" />

            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Database Donatur</h2>
                    <p className="text-gray-500 text-sm">Data lengkap para donatur yayasan.</p>
                </div>
                <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm">
                    <Download size={16} /> Export CSV
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Toolbar Table */}
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <div className="relative w-full md:w-72">
                        <input type="text" placeholder="Cari nama, email, no hp..." className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:border-green-500" />
                        <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                        Total: <span className="text-gray-800 font-bold">{donors.length} Donatur</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-white text-gray-700 border-b border-gray-200 font-bold uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Nama Donatur</th>
                                <th className="px-6 py-4">Kontak</th>
                                <th className="px-6 py-4">Total Donasi</th>
                                <th className="px-6 py-4">Terakhir Donasi</th>
                                <th className="px-6 py-4 text-center">Detail</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {donors.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-800">{item.name}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1 text-xs">
                                            {item.email !== '-' && (
                                                <div className="flex items-center gap-1"><Mail size={12} className="text-gray-400" /> {item.email}</div>
                                            )}
                                            {item.phone !== '-' && (
                                                <div className="flex items-center gap-1"><Phone size={12} className="text-gray-400" /> {item.phone}</div>
                                            )}
                                            {item.email === '-' && item.phone === '-' && <span className="text-gray-400 italic">Tidak ada data</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-green-600">{item.total_donasi}</td>
                                    <td className="px-6 py-4 text-gray-500">{item.last_donation}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="text-blue-600 hover:underline text-xs font-bold bg-blue-50 px-3 py-1 rounded">Lihat Riwayat</button>
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
