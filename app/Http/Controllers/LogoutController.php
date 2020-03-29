<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function logout(Request $request)
    {
        $request->session()->forget('user_token');
        $request->session()->forget('user_obj');
        $request->session()->flush();
        return response()->json(["status" => "200","message" => "logout success"]);
    }
}
