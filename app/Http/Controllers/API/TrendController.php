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
    $country_id = Auth::user()->profile->country_id;

    $posts = post::where('post','like', "%$word%")
                    ->with('user')
                    ->with('topic')
                    ->with('dislikesCounter')
                    ->with('likesCounter')
                    ->offset(0)
                   ->limit(100)
                   ->latest()
                   ->get();

        $posts_id =  post::where('post','like', "%$word%")
                        ->with('user')
                        ->with('topic')
                        ->with('dislikesCounter')
                        ->with('likesCounter')
                        ->offset(0)
                       ->limit(100)
                       ->latest()
                       ->pluck('id');

      $liked_posts = $this->liked_posts($posts_id);
      $disliked_posts = $this->disliked_posts($posts_id);

    return response()->json(['posts'=>$posts,'liked_posts'=>$liked_posts,'disliked_posts'=>$disliked_posts]);

  }


      public function liked_posts($posts)
      {

                $posts_liked_by_current_user = post::whereLikedBy(Auth::id())
                ->whereIn('id',$posts)
                ->with('likesCounter')
                ->pluck('id');

                return $posts_liked_by_current_user;

      }

      public function disliked_posts($posts)
      {

                    $posts_disliked_by_current_user = post::whereDislikedBy(Auth::id())
                    ->whereIn('id',$posts)
                    ->with('dislikesCounter')
                    ->pluck('id');

                    return $posts_disliked_by_current_user;
      }


      public function load_more(Request $request)
      {

        $offset = $request->has('offset') ? $request->offset : 0;
        $word = $request->word;
        $country_id = Auth::user()->profile->country_id;

        $posts = post::where('post','like', "%$word%")
                        ->with('user')
                        ->with('topic')
                        ->with('dislikesCounter')
                        ->with('likesCounter')
                        ->offset($offset)
                       ->limit(100)
                       ->latest()
                       ->get();

            $posts_id =  post::where('post','like', "%$word%")
                            ->with('user')
                            ->with('topic')
                            ->with('dislikesCounter')
                            ->with('likesCounter')
                            ->offset($offset)
                           ->limit(100)
                           ->latest()
                           ->pluck('id');

          $liked_posts = $this->liked_posts($posts_id);
          $disliked_posts = $this->disliked_posts($posts_id);

        return response()->json(['posts'=>$posts,'liked_posts'=>$liked_posts,'disliked_posts'=>$disliked_posts]);


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
