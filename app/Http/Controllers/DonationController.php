<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Program;
use App\Models\Donation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class DonationController extends Controller
{
    public function index()
    {
        $programs = Program::with('donations')->get()->map(function ($program) {
            $collected_amount = $program->donations->where('status', 'paid')->sum('nominal');
            $target_amount = $program->target_amount;

            $percentage = 0;
            if ($target_amount > 0) {
                $percentage = min(100, round(($collected_amount / $target_amount) * 100));
            }

            return [
                'id' => $program->id,
                'title' => $program->title,
                'target_amount' => $target_amount,
                'collected_amount' => $collected_amount,
                'percentage' => $percentage,
                'image_path' => $program->image_path ?? '/images/default.png',
            ];
        });

        $totalCollectedAmount = $programs->sum('collected_amount');
        $totalDonaturCount = Donation::where('status', 'paid')->distinct('name')->count();

        $totalStats = [
            'program_count' => $programs->count(),
            'collected_amount' => $totalCollectedAmount,
            'total_donatur' => $totalDonaturCount,
        ];

        return Inertia::render('Donasi', [
            'allPrograms' => $programs,
            'totalStats' => $totalStats,
            'auth' => Auth::user() ? ['user' => Auth::user()] : null,
        ]);
    }

    public function show($id)
    {
        $program = Program::findOrFail($id);

        $collected_amount = $program->donations->where('status', 'paid')->sum('nominal');
        $target_amount = $program->target_amount;

        $percentage = 0;
        if ($target_amount > 0) {
            $percentage = min(100, round(($collected_amount / $target_amount) * 100));
        }

        $programData = [
            'id' => $program->id,
            'title' => $program->title,
            'desc_short' => $program->desc_short,
            'desc_long' => $program->desc_long,
            'target_amount' => $program->target_amount,
            'collected_amount' => $collected_amount,
            'percentage' => $percentage,
            'image_path' => $program->image_path,
        ];

        return Inertia::render('DetailDonasi', [
            'program' => $programData,
        ]);
    }

    public function storeDonation(Request $request, $programId)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'notes' => 'nullable|string',
            'nominal' => 'required|numeric|min:10000',
        ]);

        $uniqueCode = rand(1, 999);
        $invoiceNo = 'MM' . now()->format('Ymd') . Str::random(5);

        $donation = Donation::create([
            'program_id' => $programId,
            'invoice_no' => $invoiceNo,
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'phone' => $validatedData['phone'],
            'notes' => $validatedData['notes'],
            'nominal' => $validatedData['nominal'],
            'unique_code' => $uniqueCode,
            'status' => 'pending',
        ]);

        return redirect()->route('donasi.pembayaran', [
            'id' => $programId,
            'donation_id' => $donation->id,
        ]);
    }

    public function paymentForm(Request $request, $programId)
    {
        $donationId = $request->input('donation_id');

        if (!$donationId) {
             return redirect()->route('welcome')->with('error', 'Transaksi tidak valid.');
        }

        $donation = Donation::findOrFail($donationId);

        if ($donation->program_id != $programId) {
            return redirect()->route('welcome');
        }

        // KOREKSI: Menghapus 'Donation/'
        return Inertia::render('PembayaranDonasi', [
            'id' => $programId,
            'donationData' => $donation->only(['name', 'email', 'phone', 'nominal', 'unique_code', 'invoice_no']),
        ]);
    }
}
