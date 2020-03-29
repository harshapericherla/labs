<?php

namespace App\Imports;

use App\Lab;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\Importable;
class LabsImport 
{
    use Importable;
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public static function model(array $row)
    {
        if(isset($row[2])){
            return new Lab([
                'title' => $row[2],
                'description' => $row[3], 
                'category' => $row[4],
                'latitude' => $row[7],
                'longitude' => $row[8],
                'address' => $row[9],
                'city' => $row[10],
                'country' => $row[11]
            ]);
        }
        
    }
}
