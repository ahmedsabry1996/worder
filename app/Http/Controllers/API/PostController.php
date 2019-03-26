<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;

use Image;
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
          'topic'=>'required|numeric|between:1,11',

      ]);

        $image = $request->image;
        $new_image_name = null;
    if ($image) {
      // code...
      $encoded_image = explode(',', $image)[1];

      $image_extension = explode(',', $image)[0];

      if (strpos($image_extension,'jpeg')) {
        $new_image_extension = ".jpg";
      }
      elseif (strpos($image_extension,'png')) {
        $new_image_extension = ".png";
      }
      else {
        $new_image_extension = ".png";
      }

      $decoded_image = base64_decode($encoded_image);

      $new_image_name = "post_$user_id"."_".time()."$new_image_extension";

      $save_to = public_path()."/storage/posts_images/$new_image_name";


      $upload = file_put_contents($save_to,$decoded_image);

      $image_size = filesize($save_to);

      if ($image_size > 1000000) {


        $img = Image::make($save_to);
      	$img->save($save_to,50);
      }

    }


      $post->create([
              'post'=>$request->post,
              'image'=>$new_image_name,
              'topic_id'=>$request->topic,
              'user_id'=>$user_id,
              'country_id'=>$country_id
      ]);

      $country->latestPosts->increment('posts_number');

      return response()->json("",201);

  }

  public function show_post(Request $request)
  {
    $post_id = $request->post_id;
    $reader_id = $request->user_id;

    $type_of_react = DB::table('love_likes')->where('user_id',$reader_id)
    ->where('likeable_id',$post_id)
    ->first();

    $post = post::whereId($post_id)
    ->with('user')
    ->with('topic')
    ->firstOrFail();

    $post_likes = $post->likesCount;
    $post_dislikes = $post->dislikesCount;
    return response()->json(['post'=>$post,
                              'likes'=>$post_likes,
                              'dislikes'=>$post_dislikes
                              ,'type'=>$type_of_react],201);

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

    $post->removeLikes();
    $post->removeDislikes();
    $delete_post = $post->delete();
    if ($country->latestPosts->posts_number > 0 ) {

      $country->latestPosts->decrement('posts_number');

    }

    return response()->json("",204);
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

    $post_likers = post::findOrFail($post_id)
                        ->collectLikers()
                        ->pluck('id');

    $likers =  user::whereIn('id',$post_likers)
                    ->offset($offset)
                    ->limit(27)
                    ->with('profile')
                    ->latest()
                    ->get();

    return response()->json(['likers'=>$likers],201);

  }

  public function dislikers(Request $request)
  {

    $offset = $request->has('offset') ? $request->offset : 0 ;

    $post_id = $request->post_id;

    $post_dislikers = post::findOrFail($post_id)
                          ->collectDislikers()
                          ->pluck('id');

    $dislikers =  user::whereIn('id',$post_dislikers)
                        ->offset($offset)
                        ->limit(27)
                        ->with('profile')
                        ->latest()
                        ->get();

    return response()->json(['dislikers'=>$dislikers],201);

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

      $message = $current_user->profile->display_name." reacted with your post";
      $icon = $current_user->profile->avatar;
      $url = "post/$post_id";

      $reacter_id = Auth::id();

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

                $updated_post = post::whereId($post_id)
                ->with('likesCounter')
                ->with('dislikesCounter')
                ->with('topic')
                ->with('user')
                ->first();
          $post_publisher->notify(new PostReact($icon,$message,$url,$reacter_id));

      }

      elseif ($is_liked_by_user == false && $is_disliked_by_user == true) {
          $result = "dislike";

                $updated_post = post::whereId($post_id)
                ->with('likesCounter')
                ->with('dislikesCounter')
                ->with('topic')
                ->with('user')
                ->first();
          $post_publisher->notify(new PostReact($icon,$message,$url,$reacter_id));


      }
      else{
        $result = null;
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
