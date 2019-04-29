<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

    public function run()
    {
        // $this->call(UsersTableSeeder::class);
		 			  // $this->call(TopicsSeeder::class);
            //  $this->call(Genderseeder::class);
            //  $this->call(CountriesSeeder::class);
            //  $this->call(LatestPostsSeeder::class);
            //  $this->call(TrendSeeder::class);
             $this->call(roleSeeder::class);
        }
}
