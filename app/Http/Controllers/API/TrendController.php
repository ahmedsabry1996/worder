<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Post as post ;
use App\latestPost as latestposts;
use App\Trend as trend ;
use App\Country as country;
use App\Events\NewTrend;
use Auth;
class TrendController extends Controller
{
    public $data ;
    public $all_posts;
    public $user_id;
    public function __construct()
    {
      $this->data = array();

      $this->all_posts = '';


    }

    public function update()
    {
      $user_country = Auth::user()->profile->country_id;

      $country_trend = country::find($user_country)->trend;

      return response()->json(['trend'=>($country_trend)]);
    }

  public function show(Request $request)
  {
    $word = $request->word;
    $user_id = Auth::id();
    $country_id = Auth::user()->profile->country_id;

    $posts = post::where('post','like', "%$word%")
                ->where('user_id','<>',$user_id)
                    ->with('user')
                    ->with('topic')
                    ->with('dislikesCounter')
                    ->with('likesCounter')
                    ->latest()
                   ->limit(100)
                   ->get();

    return response()->json(['posts'=>$posts,"word"=>$user_id],201);

  }

      public function load_more(Request $request)
      {
        $user_id = Auth::id();

        $offset = $request->has('offset') ? $request->offset : 0;
        $word = $request->word;
        $country_id = Auth::user()->profile->country_id;

        $posts = post::where('post','like', "%$word%")
                        ->where('user_id','<>',$user_id)
                        ->with('user')
                        ->with('topic')
                        ->with('dislikesCounter')
                        ->with('likesCounter')
                        ->offset($offset)
                       ->limit(100)
                       ->latest()
                       ->get();


        return response()->json(['posts'=>$posts],201);


      }
  public function test()
  {


    $top_countries = latestposts::where('posts_number','<>',0)
                          ->orderBy('posts_number','desc')->pluck('country_id');




    $country_posts = country::find(3)->posts()->chunk(10000,function($posts){

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


    return response()->json(['trend'=>($top_ten),'cs'=>$top_countries[1]]);

  }

  public function test2()
  {
    event(new NewTrend());
  }
}
