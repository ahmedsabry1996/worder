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
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{

  public function create_new_post(Request $request)
  {

      $post = new post();
      $latestPost = new latestposts();
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

  public function my_posts()
  {

    $my_posts =Auth::user()->posts()->orderBy('created_at','desc')->get();

    return response()->json(['my_posts'=>$my_posts]);
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
    ->first();

    return response()->json(['post'=>$post,'type'=>$type_of_react]);

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
  }
