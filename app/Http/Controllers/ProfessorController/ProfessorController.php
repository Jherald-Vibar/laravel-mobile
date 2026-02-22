<?php

namespace App\Http\Controllers\ProfessorController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfessorController extends Controller
{
    public function prof_scanner() {
        return Inertia::render('Prof_Scanner');
    }
}
