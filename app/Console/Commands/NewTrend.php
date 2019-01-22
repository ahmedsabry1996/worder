<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Events\NewTrendEvent;
use App\Post as post ;
use App\latestPost as latestposts;
use App\Trend as trend ;
use App\Country as country;
use Carbon\Carbon as carbon;
use Auth;
class NewTrend extends Command
{

    public $data ;

    protected $signature = 'command:NewTrend';


    protected $description = 'Trend';

  public function __construct()
    {
        parent::__construct();


        $this->data = array();

    }


    public function handle()
    {


          $current_time = new carbon();

          $last_hour = $current_time->subHours(1);

          $top_countries = latestposts::where('posts_number','<>',0)
                                ->orderBy('posts_number','desc')->pluck('country_id');


                foreach ($top_countries as $id) {
                  $current_country =country::find($id);
                  $country_posts = $current_country->posts()->where('created_at','>=',$last_hour)->chunk(10000,function($posts){

                          foreach ($posts as $post) {

                              $to_small = strtolower($post->post);

                              $explode = explode(' ', $post->post );

                              $unique_post = array_unique($explode);

                              $implodes = implode(' ', $unique_post);

                              array_push( $this->data,$implodes);


                          }

                  });


                $this->data = array_values($this->data);

                $trend = join(' ', $this->data);

                $trend_ex = explode (' ' ,$trend);

                $top_trend = array_count_values($trend_ex);

                $tttt= (array)arsort($top_trend);

                $top_ten = json_encode(array_slice($top_trend,0,10));

                $current_country->trend->top_words = $top_ten;

                $current_country->trend->save();

                $this->data = array();



                }
                 event(new NewTrendEvent());



    }
}
