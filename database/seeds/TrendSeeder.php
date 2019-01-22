<?php

use Illuminate\Database\Seeder;
use App\Trend as trend;
use App\Country as country;
class TrendSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

      $trend = new trend();
      $all_countries = country::all();

      foreach ($all_countries as $country) {
          trend::create(['country_id'=>$country->id]);
      }
    }
}
