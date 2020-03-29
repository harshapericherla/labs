<?php

use App\Http\Controllers\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['middleware' => ['jwt-auth']], function () {
    
    Route::post('logout','LogoutController@logout');  
    Route::get('labs','LabController@getLabs');
    Route::get('getLab','LabController@getLab');    
    Route::post('labs','LabController@createLab');
});

Route::group([],function () {
    Route::post('login','LoginController@login');   
});
