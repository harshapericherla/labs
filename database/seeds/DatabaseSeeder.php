<?php

use App\Imports\LabsImport;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     * No need to use factories if seeding single data, but showcasing them for my knowledge.
     * @return void
     */
    public function run()
    {
        factory(App\User::class,1)->create(["is_admin"=>true])->each(function($user){
               $user->save();
        });
        factory(App\User::class,1)->create(["is_admin"=>false])->each(function($user){
               $user->save();
        });

        $this->seedLabs();
    }

    public function seedLabs()
    {
        $xlsxFileName = "data.xlsx";
        $xlsxFile = public_path($xlsxFileName);
        
        $rows = (new LabsImport)->toArray($xlsxFile)[0];
        
        for($x=1;$x<count($rows);$x++)
        {
            $lab = LabsImport::model($rows[$x]);
            $lab->save();
        }
    }
}
