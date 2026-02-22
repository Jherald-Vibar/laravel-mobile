<?php

use App\Http\Controllers\ProfessorController\ProfessorController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/prof-scanner', [ProfessorController::class, 'prof_scanner']);
