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
                   ->limit(27)
                   ->get();

    $posts_num = post::where('post','like', "%$word%")->where('user_id','<>',$user_id)->count();

    return response()->json(['posts'=>$posts,"posts_num"=>$posts_num],201);

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
                       ->limit(27)
                       ->latest()
                       ->get();

        return response()->json(['posts'=>$posts],201);
      }
}
