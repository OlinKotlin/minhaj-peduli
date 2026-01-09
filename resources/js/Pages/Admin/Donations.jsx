import React, { useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Search, Filter, Eye, Check, X } from 'lucide-react';

export default function Donations({ pendingDonations = {}, paidDonations = {} }) {
    const [tab, setTab] = useState('pending');
    const [processingId, setProcessingId] = useState(null);

    const handleUpdateStatus = (id, status) => {
        if (!confirm(`Yakin ingin mengubah status menjadi ${status}?`)) return;
        setProcessingId(id);
        router.post(route('admin.donations.update-status', id), { status }, {
            preserveScroll: true,
            onSuccess: () => {
                setProcessingId(null);
                router.reload();
            },
            onError: () => setProcessingId(null),
        });
    };

    const renderTable = (list, type) => {
        if (!list || !list.data || list.data.length === 0) {
            return (
                <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                        <p className="text-sm">Tidak ada data.</p>
                    </td>
                </tr>
            );
        }

        return list.data.map((donation) => (
            <tr key={donation.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-800">{donation.invoice_no}</td>
                <td className="px-6 py-4">
                    <div className="font-bold text-gray-800">{donation.name}</div>
                    <div className="text-xs text-gray-500">{donation.phone}</div>
                </td>
                <td className="px-6 py-4">
                    <span className="text-gray-700">{donation.program?.title || '-'}</span>
                </td>
                <td className="px-6 py-4 font-bold text-green-600">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(donation.nominal)}
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">{donation.date}</td>
                <td className="px-6 py-4 text-center">
                    {type === 'pending' ? (
                        <div className="flex items-center justify-center gap-2">
                            <button
                                onClick={() => handleUpdateStatus(donation.id, 'paid')}
                                disabled={processingId === donation.id}
                                className="p-2 bg-green-100 text-green-600 rounded hover:bg-green-200 disabled:opacity-50"
                                title="Terima"
                            >
                                <Check size={16} />
                            </button>
                            <button
                                onClick={() => handleUpdateStatus(donation.id, 'failed')}
                                disabled={processingId === donation.id}
                                className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 disabled:opacity-50"
                                title="Tolak"
                            >
                                <X size={16} />
                            </button>
                            <Link href={route('admin.donations.show', donation.id)} className="text-gray-400 hover:text-gray-600">
                                <Eye size={18} />
                            </Link>
                        </div>
                    ) : (
                        <Link
                            href={route('admin.donations.show', donation.id)}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition font-medium text-xs"
                        >
                            <Eye size={16} /> Detail
                        </Link>
                    )}
                </td>
            </tr>
        ));
    };

    return (
        <AdminLayout>
            <Head title="Kelola Donasi" />

            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Daftar Donasi</h2>
                    <p className="text-gray-500 text-sm">Verifikasi transfer manual dan arsip donasi terbayar.</p>
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

            <div className="mb-4">
                <div className="inline-flex rounded-lg bg-gray-100 p-1">
                    <button onClick={() => setTab('pending')} className={`px-4 py-2 rounded-md ${tab==='pending' ? 'bg-white shadow' : 'text-gray-600'}`}>
                        Donasi Masuk ({pendingDonations?.total ?? 0})
                    </button>
                    <button onClick={() => setTab('paid')} className={`px-4 py-2 rounded-md ${tab==='paid' ? 'bg-white shadow' : 'text-gray-600'}`}>
                        Donasi Terbayar ({paidDonations?.total ?? 0})
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-green-50 text-green-800 uppercase font-bold text-xs">
                        <tr>
                            <th className="px-6 py-4">Invoice</th>
                            <th className="px-6 py-4">Donatur</th>
                            <th className="px-6 py-4">Program</th>
                            <th className="px-6 py-4">Nominal + Kode</th>
                            <th className="px-6 py-4">Tanggal</th>
                            <th className="px-6 py-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {tab === 'pending' ? renderTable(pendingDonations, 'pending') : renderTable(paidDonations, 'paid')}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}

