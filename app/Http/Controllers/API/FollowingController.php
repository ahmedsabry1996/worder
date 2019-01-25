<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use App\Notifications\NewFollower;
use App\User as user;
use App\Profile as profile;
use App\FollowersCounter as followercounter;
use Illuminate\Support\Facades\DB;

class FollowingController extends Controller
{


      public function get_user_following($offset=0){

                $current_user = Auth::user();

                $user_id = Auth::id();

                $user_country = Auth::user()->profile->country_id;


                $following = Auth::user()
                ->following()
                ->pluck('user_id');

                return $following;
      }

      public function get_user_follower($offset=0){

                $current_user = Auth::user();

                $user_id = Auth::id();

                $user_country = Auth::user()->profile->country_id;


                $followers = Auth::user()
                ->followers()
                ->offset($offset)
                ->limit(500)
                ->pluck('user_id');

                return $followers;
      }

    public function follow(Request $request){
    $current_user = Auth::user();

    $current_user_id = Auth::id();

    $followed_id = $request->followed_id;

    $followed_user = user::findOrFail($followed_id);

    $followed_user_id = user::findOrFail($followed_id)->id;

    $is_already_follower = user::findOrFail($current_user_id)
                                ->following()
                                ->where('user_id',$followed_user_id)
                                ->get()
                                ->count();


    $current_user_followers = followercounter::firstOrCreate(['user_id' => $current_user_id]);
    $followed_user_followers = followercounter::firstOrCreate(['user_id' => $followed_user_id]);

    if(!$is_already_follower){

      $follow = $current_user->following()->attach($followed_user_id);
      $add_new_follower = $followed_user->follower_counter()->increment('followers');
      $add_new_following = $current_user->follower_counter()->increment('following');
      $action = "follow";
      $followed_user-> notify(new NewFollower($current_user_id,$current_user->profile->display_name,$current_user->profile->avatar));
    }
    else{

            $unfollow = $current_user->following()->detach($followed_user_id);
            $add_new_follower = $followed_user->follower_counter()->decrement('followers');
            $add_new_following = $current_user->follower_counter()->decrement('following');
            $action = "unfollow";
            DB::table('notifications')->where('notifiable_id',$followed_user_id)
                                      ->where('data',"{\"message\":\"started following you\",\"follower_id\":$current_user_id,\"follower_display_name\":$current_user->profile->display_name,\"avatar\":$current_user->profile->avatar}")
                                      ->delete();


    }

    $num_of_followed_followers = $followed_user->follower_counter->followers;
    $num_of_followed_following = $followed_user->follower_counter->following;


    return response()->json([

    'action'=>$action,
    'followers'=>$num_of_followed_followers,
    'following'=>$num_of_followed_following,],201);

  }


     public function user_topics()
      {

            $current_user = Auth::user();

            $user_id = Auth::id();

            $user_country = Auth::user()->profile->country_id;

            $user_favorite_topics =DB::table('topic_user')
            ->whereUserId($user_id)
            ->pluck('topic_id')
            ->toArray();

            return $user_favorite_topics;
          }

     public function suggest_people()
     {


    		//get current user
    		$current_user = Auth::user();
        $current_user_id = Auth::id();
        $current_user_country = Auth::user()->profile->country_id;

    		$my_topics =$this->user_topics();

    		$people_like_me =DB::table('topic_user')
    			->whereIn('topic_id',$my_topics)
    			->where('user_id','<>',$current_user_id)
          ->inRandomOrder()
          ->distinct()
          ->limit(5)
          ->select('user_id')
          ->pluck('user_id');

          $followed = $this->get_user_following();

      $suggested_people = profile::whereIn('user_id',$people_like_me)
                                  ->whereNotIn('user_id',$followed)
                                  ->whereCountryId($current_user_country)
                                  ->inRandomOrder()
                                  ->with('user')
                                  ->get();


    		return response()->json(['n'=>$people_like_me->count(),
                                  'like'=>$my_topics,
                                'suggest_people'=>$suggested_people,
                                'following'=>$this->get_user_following()],201);
    }

    public function my_following(Request $request)
    {
        $current_user = Auth::user();
        $offset = $request->has('offset') ? $request->offset : 0 ;

        $following = $current_user->following()
                                  ->with('profile')
                                  ->latest()
                                  ->offset($offset)
                                  ->limit(50)
                                  ->get();

        return response()->json(['following'=>$following,],201);
    }


    public function my_followers(Request $request)
    {
      $current_user = Auth::user();
      $offset = $request->has('offset') ? $request->offset : 0 ;
      $followers = $current_user->followers()
                                ->with('profile')
                                ->latest()
                                ->offset($offset)
                                ->limit(50)
                                ->get();

    return response()->json(['followers'=>$followers],201);
    }

    public function my_fans(Request $request)
    {
      $current_user = Auth::user();
      $offset = $request->has('offset') ? $request->offset : 0 ;
      $followers = $current_user->followers()
                                ->with('profile')
                                ->latest()
                                ->offset($offset)
                                ->limit(50)
                                ->get();
    $current_user = Auth::user();

    $following = $current_user->following()
                              ->with('profile')
                              ->latest()
                              ->offset($offset)
                              ->limit(50)
                              ->get();
    $following_ids = $this->get_user_following();
      return response()->json(['followers'=>$followers,
                                'following'=>$following,
                                'following_ids'=>$following_ids],201);

    }
}
