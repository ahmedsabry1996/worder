<?php

use Illuminate\Database\Seeder;
use App\Topic as topic;
class TopicsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
    
    	$t = new topic();

    	$t::create(['topic'=>'politics']);
    	$t::create(['topic'=>'sport']);
    	$t::create(['topic'=>'films']);
    	$t::create(['topic'=>'love']);
    	$t::create(['topic'=>'economy']);
    	$t::create(['topic'=>'trade']);
    	$t::create(['topic'=>'industry']);
    	$t::create(['topic'=>'travel']);
    	$t::create(['topic'=>'migration']);
    	$t::create(['topic'=>'education']);
    }
}
