<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use App\Country as country;
use App\Post as post;
use App\latestPost ;
use App\Profile as profile;
use App\User as user;
use App\Topic as topics;
use Storage as sotrage ;
use App\latestPost as latestposts;
use App\Notifications\PostReact;

use Illuminate\Support\Facades\DB;

class PostController extends Controller
{

  public function create_new_post(Request $request)
  {

      $post = new post();

      $user_id = Auth::id();
      $country_id = Auth::user()->profile->country_id;

      $country = country::find($country_id);
      $post_count_words = explode(' ',$request->post);

      if (count($post_count_words) > 100) {

            return response()->json(['error'=>'failed to create post'],400);
      }


      $post_validation = $request->validate([
          'post'=>'required',
          'topic'=>'required|numeric|between:1,9',

      ]);

      $post->create([
              'post'=>$request->post,
              'topic_id'=>$request->topic,
              'user_id'=>$user_id,
              'country_id'=>$country_id
      ]);

      $country->latestPosts->increment('posts_number');

      return response()->json(['msg'=>'post created Successfully','co'=>$country->latestPosts],201);

  }

  public function show_post(Request $request)
  {
    $post_id = $request->post_id;
    $reader_id = $request->user_id;

    $type_of_react = DB::table('love_likes')->where('user_id',$reader_id)
    ->where('likeable_id',$post_id)
    ->first();

    $post = post::whereId($post_id)
    ->with('likesCounter')
    ->with('dislikesCounter')
    ->with('topic')
    ->with('user')
    ->firstOrFail();

    return response()->json(['post'=>$post,'type'=>$type_of_react]);

  }

  public function delete_post(Request $request)
  {

    $post_id = $request->post_id;

    $country_id = Auth::user()->profile->country_id;

    $country = country::find($country_id);

    $post = post::findOrFail($post_id);

    if ($post->user->id !== Auth::id()) {

      return response()->json(['msg'=>'you don\'t have the permession to do it'],403);
    }

    $delete_post = $post->delete();
    if ($country->latestPosts->posts_number > 0 ) {

      $country->latestPosts->decrement('posts_number');

    }

    return response()->json(['msg'=>'deleted!'],201 );
  }

  public function my_posts()
  {

    $my_posts =Auth::user()->posts()->orderBy('created_at','desc')->get();

    return response()->json(['my_posts'=>$my_posts]);
  }

  public function likers(Request $request)
  {

    $offset = $request->has('offset') ? $request->offset : 0 ;

    $post_id = $request->post_id;

    $post_likers = DB::table('love_likes')
    ->where('likeable_id',$post_id)
    ->where('type_id','LIKE')
    ->offset($offset)
    ->limit(100)
    ->pluck('user_id');

    $likers =  user::whereIn('id',$post_likers)->with('profile')->get();

    return response()->json(['likers'=>$likers]);

  }

  public function dislikers(Request $request)
  {

    $offset = $request->has('offset') ? $request->offset : 0 ;

    $post_id = $request->post_id;

    $post_dislikers = DB::table('love_likes')
    ->where('likeable_id',$post_id)
    ->where('type_id','DISLIKE')
    ->offset($offset)
    ->limit(100)
    ->pluck('user_id');

    $dislikers =  user::whereIn('id',$post_dislikers)->with('profile')->get();

    return response()->json(['dislikers'=>$dislikers]);

  }

  public function like_posts(Request $request)
  {

      $current_user = Auth::user();
      $current_user_id = Auth::id();
      $is_reacted_before = null;

      $post_id = $request->post_id;

      //like , dislike or null
      $action = $request->action;

      //post founded
      $is_real_post = post::findOrFail($post_id);


      $post_publisher = $is_real_post->user;

      $is_liked_by_user = false;
      $is_disliked_by_user = false;

      //like
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
}
