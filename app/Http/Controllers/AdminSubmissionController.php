<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Submission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminSubmissionController extends Controller
{
    public function updateStatus(Request $request, Submission $submission)
    {
        $request->validate([
            'status' => 'required|in:pending,approved,rejected'
        ]);

        $submission->update([
            'status' => $request->status
        ]);

        return back();
    }

    public function show(Submission $submission)
    {
        return Inertia::render('SubmissionDetail', [
            'submission' => $submission
        ]);
    }
}
