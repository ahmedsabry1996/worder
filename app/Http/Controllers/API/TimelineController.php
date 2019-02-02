<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Notifications\PostReact;
use App\Notifications\justTest;
use App\Events\NewLike;
use Auth;
use App\User as user;
use App\Profile as profile;
use App\Post as post ;
use App\Topic as topic;
use App\FollowersCounter as followerscounter;
class TimelineController extends Controller
{


    public function count_following()
    {

          $current_user = Auth::user();
          //$num_of_following = followerscounter::whereUserId($user_id)->value('following');
          $num_of_following = $current_user->follower_counter->following;

          return $num_of_following;
    }


  public function count_follower()
  {

    $current_user = Auth::user();

    $num_of_followers = $current_user->follower_counter->followers;

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
          ->whereCountryId($user_country)
          ->latest()
          ->with('dislikesCounter')
          ->with('likesCounter')
          ->with('topic')
          ->with('user');

          return $following_posts;

}

      public function fetch_other_posts($offset = 0)
      {


      $current_time = new carbon();

      $current_user = Auth::user();

      $user_id = Auth::id();

      $user_country = Auth::user()->profile->country_id;

      $user_favorite_topics = $this->user_topics();

      $followings = $this->get_user_following();

      $other_posts = post::whereNotIn('user_id',$followings)
      ->whereIn('topic_id',$user_favorite_topics)
      ->where('user_id','<>',$user_id)
      ->whereCountryId($user_country)
      ->latest()
      ->offset($offset)
      ->limit(27)
      ->with('likesCounter')
      ->with('dislikesCounter')
      ->with('topic')
      ->with('user');

      return $other_posts;
    }

    public function time_line_posts(Request $request)
    {


        $num_of_following = $this->count_following();

        if ($this->fetch_following_posts()->get()->count() != 0) {

            $posts =$this->fetch_following_posts()->get();
        }

        else{
          $posts = $this->fetch_other_posts()->get();

        }

      return response()->json(['posts'=>$posts],201);
  }

  public function load_more(Request $request)
  {

      $offset = $request->has('offset') ? $request->offset : 0 ;


      if ($this->fetch_following_posts($offset)->get()->count() != 0) {


          $posts =$this->fetch_following_posts($offset)->get();


      }

      else{
        $posts = $this->fetch_other_posts($offset)->get();

      }


return response()->json(['offset'=>$offset,
                      'loaded_posts'=>$posts],201);
}


        public function reacted_posts()
        {

            $current_user_id = Auth::id();
            $liked_posts = post::whereLikedBy($current_user_id)
                ->pluck('id');
            $disliked_posts = post::whereDislikedBy($current_user_id)
              ->pluck('id');


            return response()->json(['liked_posts'=>$liked_posts
                                    ,'disliked_posts'=>$disliked_posts],201);
        }






      public function like_posts(Request $request)
      {

          $current_user = Auth::user();
          $current_user_id = Auth::id();
          $is_reacted_before = null;
          $post_id = $request->post_id;
          $action = $request->action;

          $is_real_post = post::findOrFail($post_id);

          $post_publisher = $is_real_post->user;

          $is_liked_by_user = false;
          $is_disliked_by_user = false;
          if ($action == "like") {

                      $do_toggle_like = $is_real_post->toggleLikeBy();
                      $is_liked_by_user = $is_real_post->isLikedBy();

          }
          else{


                      $do_toggle_dislike = $is_real_post->toggleDislikeBy();
                      $is_disliked_by_user = $is_real_post->isDislikedBy();


          }


          if ($is_liked_by_user == true && $is_disliked_by_user == false) {
              $result = "like";
          $is_reacted_before = DB::table('notifications')
                              ->where('data',"{\"message\":\"you have new reacts on your post\",\"post_id\":$post_id,\"reacter_id\":$current_user,\"display_name\":$current_user->profile->display_name,\"profile_avatar\":$current_user->profile->avatar}")
                            ->where('notifiable_id',$post_publisher->id)
                            ->first();
          if ($is_reacted_before == null) {
            $post_publisher->notify(new PostReact($post_id,$current_user_id,$current_user->profile->display_name,$current_user->profile->avatar));
          }

          }

          elseif ($is_liked_by_user == false && $is_disliked_by_user == true) {
              $result = "dislike";

              $is_reacted_before = DB::table('notifications')
                                      ->where('data',"{\"message\":\"you have new reacts on your post\",\"post_id\":$post_id,\"reacter_id\":$current_user}")
                                      ->where('notifiable_id',$post_publisher->id)
                                      ->first();

        if ($is_reacted_before == null) {
          $post_publisher->notify(new PostReact($post_id,$current_user_id,$current_user->profile->display_name,$current_user->profile->avatar));

}

          }
          else{
            $result = null;
            $is_reacted_before = DB::table('notifications')
            ->where('data',"{\"message\":\"you have new reacts on your post\",\"post_id\":$post_id,\"reacter_id\":$current_user,\"display_name\":$current_user->profile->display_name,\"profile_avatar\":$current_user->profile->avatar}")
                                    ->where('notifiable_id',$post_publisher->id)
                                    ->delete();
          }

          $updated_post = post::whereId($post_id)
          ->with('likesCounter')
          ->with('dislikesCounter')
          ->with('topic')
          ->with('user')
          ->first();
          return response()->json(["result"=>$result,"updated_post"=>$updated_post]);
    }



      public function fetch_notifications(Request $request)
      {
        $current_user = Auth::user();
        $offset = $request->has('offset') ? $request->offset : 0 ;
        $current_user->unreadNotifications()->update(['read_at' => now()]);
        $all_notifications = $current_user->notifications()
                                          ->orderBy('created_at','desc')
                                          ->offset($offset)
                                          ->limit(10)
                                          ->get();

      return response()->json(['all_notifications'=>$all_notifications],201);
      }

      public function unread_notifications(Request $request)
      {
          $current_user = Auth::user();

          $unread_notificatons =  $current_user->unreadNotifications()->first() ? true : false ;

          return response()->json(['unread'=>$unread_notificatons],201);

      }
    public function load_more_notifications(Request $request)
    {
      $current_user = Auth::user();

      $offset = $request->has('offset') ? $request->offset : 0 ;

      $more_notifications = $current_user->notifications()
                                        ->orderBy('created_at','desc')
                                        ->offset($offset)
                                        ->limit(10)
                                        ->get();
        return response()->json(['notifications'=>$more_notifications],201);
    }


}
