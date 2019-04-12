<?php

use Illuminate\Database\Seeder;
use App\Country as country;
use App\latestPost ;
class LatestPostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $all_countries = country::all();
        $latests = new latestPost();
        foreach ($all_countries  as $country ) {
          latestPost::create(['country_id'=>$country->id]);
        }
    }
}
