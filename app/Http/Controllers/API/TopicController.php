<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Topic as topic;
use App\Post as post;
use Auth;
class TopicController extends Controller
{

    public function show(Request $request)
    {

      $user_id = Auth::id();


      $topic_id = $request->topic_id;

      $topic = topic::findOrFail($topic_id);

      $posts = $topic->posts()
      ->where('user_id','<>',$user_id)
      ->with('dislikesCounter')
      ->with('likesCounter')
      ->with('user')
      ->latest()
      ->offset(0)
      ->limit(100)
      ->get();

      return response()->json(['posts'=>$posts],201);

    }

    public function load_more(Request $request)
    {

      $user_id = Auth::id();

      $offset = $request->has('offset') ? $request->offset : 0 ;

      $topic_id = $request->topic_id;

      $topic = topic::findOrFail($topic_id);

      $posts = $topic->posts()
      ->where('user_id','<>',$user_id)
      ->with('dislikesCounter')
      ->with('likesCounter')
      ->with('user')
      ->latest()
      ->offset($offset)
      ->limit(100)
      ->get();


      return response()->json(['posts'=>$posts],201);

    }

    public function liked_posts($posts,$topic_id)
    {

              $posts_liked_by_current_user = post::whereLikedBy(Auth::id())
              ->whereTopicId($topic_id)
              ->whereIn('id',$posts)
              ->with('likesCounter')
              ->pluck('id');

              return $posts_liked_by_current_user;

    }

    public function disliked_posts($posts,$topic_id)
    {

                  $posts_disliked_by_current_user = post::whereDislikedBy(Auth::id())
                  ->whereTopicId($topic_id)
                  ->whereIn('id',$posts)
                  ->with('dislikesCounter')
                  ->pluck('id');

                  return $posts_disliked_by_current_user;
    }

}
