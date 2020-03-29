<?php

namespace App\Http\Controllers;

use App\Lab;
use Illuminate\Http\Request;

class LabController extends Controller
{
    public function getLabs(Request $request)
    {
         $labs = Lab::get();
         return response()->json(["status" => "200","labs" => $labs]);    
    }

    public function getLab(Request $request)
    {
        $labId = $request->labId;
        $lab = Lab::where('id',$labId)->get()->first();
        return response()->json(["status" => "200","lab" => $lab]);    
    } 

    public function createLab(Request $request)
    {
        $lab = new Lab();
        $data = $request->only($lab->getFillable());
        $lab->fill($data)->save();
        $lab->refresh();
        return response()->json(["status" => "200","lab" => $lab]);    
    }

}
