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
      ->limit(27)
      ->get();

      $posts_num = $topic->posts()->count();

      return response()->json(['posts'=>$posts,
                                'posts_num'=>$posts_num]
                                ,201);

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
      ->limit(27)
      ->get();


      return response()->json(['posts'=>$posts],201);

    }

    

}
