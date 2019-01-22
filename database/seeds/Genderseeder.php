<?php

use Illuminate\Database\Seeder;
use App\Gender as gender;
class Genderseeder extends Seeder
{

    public function run()
    {


      gender::create([
        'gender'=>'male',
        'gender'=>'female',
      ]);


    }
}
