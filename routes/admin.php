<?php

use App\Http\Controllers\API\Admin\AdminAuthController;
use App\Http\Controllers\API\Admin\AdminProfileController;
use App\Http\Controllers\API\Admin\EmployeeController;
use App\Http\Controllers\API\Admin\LawController;
use App\Http\Controllers\API\Admin\LawyerController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AdminAuthController::class, 'login']);

Route::middleware('auth:admin')->group(function () {

    Route::post('/logout', [AdminAuthController::class, 'logout']);

    Route::get('/profile', [AdminProfileController::class, 'show']);
    Route::put('/profile', [AdminProfileController::class, 'update']);

    Route::get('employees/total', [EmployeeController::class, 'total']);
    Route::get('lawyers/total', [LawyerController::class, 'total']);
    Route::apiResource('lawyers', LawyerController::class);

    
    Route::get('/lawyers-archived', [LawyerController::class, 'archived']);
    Route::put('/lawyers/{id}/restore', [LawyerController::class, 'restore']);
    Route::delete('/lawyers/{id}/force', [LawyerController::class, 'forceDelete']);

    Route::apiResource('employees', EmployeeController::class);
    Route::put('employees/{id}/restore', [EmployeeController::class, 'restore']);
    Route::delete('employees/{id}/force', [EmployeeController::class, 'forceDelete']);
    Route::get('employees-archived', [EmployeeController::class, 'archived']);


    // Custom law status routes
    Route::get('laws/published', [LawController::class, 'published']);
    Route::get('laws/draft', [LawController::class, 'draft']);
    Route::get('laws/archived', [LawController::class, 'archived']);

    // Extra law actions
    Route::post('laws/{id}/toggle-status', [LawController::class, 'toggleStatus']);
    Route::put('laws/{id}/restore', [LawController::class, 'restore']);
    Route::delete('laws/{id}/force', [LawController::class, 'forceDelete']);
    Route::apiResource('laws', LawController::class);

});
