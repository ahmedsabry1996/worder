<?php

use Illuminate\Database\Seeder;
use App\Role as role;
class roleSeeder extends Seeder
{
    public function run()
    {
        role::create(['role'=>'sudo']);
        role::create(['role'=>'posts reviewer']);
        role::create(['role'=>'profile reviewer']);
        role::create(['role'=>'ads reviewer']);
    }
}
