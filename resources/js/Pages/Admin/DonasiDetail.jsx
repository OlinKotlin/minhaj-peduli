import AdminLayout from '../../Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Check, X, Calendar, User, CreditCard, MessageCircle } from 'lucide-react';

export default function DonasiDetail({ donation }) {
    // Inisialisasi Form Inertia untuk update status
    const { post, processing } = useForm({
        status: ''
    });

    const handleUpdateStatus = (newStatus) => {
        if (confirm(`Apakah Anda yakin ingin mengubah status menjadi ${newStatus}?`)) {
            post(route('admin.donations.update-status', donation.id), {
                data: { status: newStatus },
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout>
            <Head title={`Detail Donasi - ${donation.invoice_no}`} />

            <div className="mb-6">
                <Link href={route('admin.dashboard')} className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition">
                    <ArrowLeft size={18} />
                    <span>Kembali ke Dashboard</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Kolom Kiri: Informasi Donatur & Program */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{donation.invoice_no}</h2>
                                <p className="text-gray-500 italic">Dibuat pada {donation.date}</p>
                            </div>
                            <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                                donation.status === 'paid' ? 'bg-green-100 text-green-700' :
                                donation.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                                {donation.status.toUpperCase()}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-xs uppercase tracking-wider text-gray-400 font-bold text-gray-400">Informasi Donatur</label>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-50 rounded-lg"><User size={20} className="text-gray-400"/></div>
                                    <div>
                                        <p className="text-sm text-gray-500">Nama Lengkap</p>
                                        <p className="font-semibold text-gray-800">{donation.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-50 rounded-lg"><MessageCircle size={20} className="text-gray-400"/></div>
                                    <div>
                                        <p className="text-sm text-gray-500">Kontak</p>
                                        <p className="font-semibold text-gray-800">{donation.email} / {donation.phone}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs uppercase tracking-wider text-gray-400 font-bold">Detail Program</label>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-50 rounded-lg"><Calendar size={20} className="text-gray-400"/></div>
                                    <div>
                                        <p className="text-sm text-gray-500">Program</p>
                                        <p className="font-semibold text-gray-800">{donation.program?.title || '-'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-50 rounded-lg"><CreditCard size={20} className="text-gray-400"/></div>
                                    <div>
                                        <p className="text-sm text-gray-500">Metode Pembayaran</p>
                                        <p className="font-semibold text-gray-800">Transfer Manual (Dicek Otomatis)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                            <p className="text-sm text-blue-700 font-medium italic">" {donation.notes || 'Tidak ada pesan doa.'} "</p>
                        </div>
                    </div>
                </div>

                {/* Kolom Kanan: Verifikasi Pembayaran */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                        <p className="text-gray-500 mb-2">Total Donasi</p>
                        <h1 className="text-4xl font-black text-green-600 mb-6">{donation.amount}</h1>

                        <div className="space-y-3">
                            {donation.status === 'pending' && (
                                <>
                                    <button
                                        onClick={() => handleUpdateStatus('paid')}
                                        disabled={processing}
                                        className="w-full py-3 bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition"
                                    >
                                        <Check size={20} /> Terima Donasi
                                    </button>
                                    <button
                                        onClick={() => handleUpdateStatus('failed')}
                                        disabled={processing}
                                        className="w-full py-3 bg-white text-red-600 border border-red-200 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition"
                                    >
                                        <X size={20} /> Tolak / Gagal
                                    </button>
                                </>
                            )}

                            {donation.status !== 'pending' && (
                                <div className="p-4 bg-gray-50 rounded-xl text-gray-500 text-sm italic">
                                    Transaksi ini sudah selesai diproses.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
