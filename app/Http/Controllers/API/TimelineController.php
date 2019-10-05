<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Notifications\justTest;
use App\Events\NewLike;
use Auth;
use App\User as user;
use App\Profile as profile;
use App\Post as post ;
use App\Topic as topic;
use App\Country as country;
use App\FollowersCounter as followerscounter;
use Illuminate\Support\Facades\App;
class TimelineController extends Controller
{



      public function has_following()
      {
            $user = Auth::user();
            if ($user->following()->count() == 0) {
                return false;
            }

            //TODO :  Cache user followings ids ;
            return true;
      }

      public function following_ids()
      {
          $user = Auth::user();
          //TODO : get following ids from Cache or set them
          $following_ids = $user->following()->pluck('user_id');
          return $following_ids;
      }

      public function has_followers()
      {
        $user = Auth::user();
        $followers = $user->followers()->count();
        
        if($followers == 0){
            return false;
        }
        //TODO : cache followers ids 
        return true;
      }

      public function follower_ids()
      {
        $user = Auth::user();
       
        //TODO : get followers ids from Cache or set them
        $follower_ids = $user->followers()->pluck('follower_id');
        return $follower_ids;
      }

      public function count_following()
    {

          $current_user = Auth::user();
          //$num_of_following = followerscounter::whereUserId($user_id)->value('following');
          $num_of_following = $current_user->following()->count();
          return $num_of_following;
    }


  public function count_follower()
  {

    $current_user = Auth::user();

    $num_of_followers = $current_user->followers()->count();

    return $num_of_followers;
  }

    public function get_user_following($offset=0)
  {

          $current_user = Auth::user();

          $user_id = Auth::id();

          $user_following = $this->count_following();

          $user_follower = $this->count_follower();


          $following = $current_user
          ->following()
          ->pluck('user_id');

          return $following;
}


      //favorite topics
      public function user_topics()
      {

          $current_user = Auth::user();

          $user_id = Auth::id();

          $user_country = Auth::user()->profile->country_id;

          $user_topics = $current_user->topics->pluck('id');

          return $user_topics;

        }


        public function fetch_following_posts($offset = 0)
        {

        $current_user = Auth::user();

        $user_id = Auth::id();

        $user_country = Auth::user()->profile->country_id;

        $followings = $this->get_user_following();

          $following_posts = post::whereIn('user_id',$followings)
          ->offset($offset)
          ->limit(27)
          ->latest()
          ->with('dislikesCounter')
          ->with('likesCounter')
          ->with('topic')
          ->with('user');

          return $following_posts;

}

     

    public function time_line_posts(Request $request)
    {

      $user_country = Auth::user()->profile->country_id;

        $has_following = $this->has_following();
        $user_following_ids = $this->following_ids();
      
        if(!$has_following){
              $posts = null;
              $posts_num = 0;
              $date = null;
            }
        
        else{
          $posts = post::where('user_id','<>',Auth::id())
          ->latest()
          ->offset(0)
          ->limit(27)
          ->with('likesCounter')
          ->with('dislikesCounter')
          ->with('topic')
          ->with('user')
          ->whereIn('user_id',$user_following_ids)
          ->get();
          


        }    
      return response()->json(['posts'=>$posts,],200);
  }

  public function load_more(Request $request)
  {

      $offset = $request->has('offset') ? $request->offset : 0 ;


      if ($this->fetch_following_posts($offset)->get()->count() != 0) {


          $posts = $this->fetch_following_posts($offset)->get();


      }

      else{
        $posts = [];
      }


return response()->json(['offset'=>$offset,
                      'loaded_posts'=>$posts],200);
}


        public function reacted_posts()
        {

            $current_user_id = Auth::id();
            $liked_posts = post::whereLikedBy($current_user_id)
                ->pluck('id');
            $disliked_posts = post::whereDislikedBy($current_user_id)
              ->pluck('id');


            return response()->json(['liked_posts'=>$liked_posts
                                    ,'disliked_posts'=>$disliked_posts],200);
        }

      public function fetch_notifications(Request $request)
      {
        $locale = Auth::user()->profile->locale;
        App::setLocale($locale);
        $current_user = Auth::user();
        $offset = $request->has('offset') ? $request->offset : 0 ;
        $current_user->unreadNotifications()->update(['read_at' => now()]);
        $all_notifications = $current_user->notifications()
                                          ->orderBy('created_at','desc')
                                          ->offset($offset)
                                          ->limit(10)
                                          ->get();

      return response()->json(['all_notifications'=>$all_notifications],200);
      }

      public function unread_notifications(Request $request)
      {

          $locale = Auth::user()->profile->locale;
          App::setLocale($locale);

          $current_user = Auth::user();

          $unread_notificatons =  $current_user->unreadNotifications()->first() ? true : false ;

          return response()->json(['unread'=>$unread_notificatons],200);

      }
    public function load_more_notifications(Request $request)
    {
      $locale = Auth::user()->profile->locale;
      App::setLocale($locale);

      $current_user = Auth::user();

      $offset = $request->has('offset') ? $request->offset : 0 ;

      $more_notifications = $current_user->notifications()
                                        ->orderBy('created_at','desc')
                                        ->offset($offset)
                                        ->limit(10)
                                        ->get();
        return response()->json(['notifications'=>$more_notifications],200);
    }
    public function test_posts()
    {
      //return response()->json(['created'=>true],200);

    return  response()->json(200);
    }

}
