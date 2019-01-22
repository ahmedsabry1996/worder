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

      $topic_id = $request->topic_id;

      $topic = topic::findOrFail($topic_id);

      $posts = $topic->posts()
      ->with('dislikesCounter')
      ->with('likesCounter')
      ->with('user')
      ->offset(0)
      ->limit(100)
      ->get();

      $posts_id = $topic->posts()
      ->offset(0)
      ->limit(100)
      ->pluck('id');

      $liked_posts = $this->liked_posts($posts_id,$topic_id);
      $disliked_posts = $this->disliked_posts($posts_id,$topic_id);
      return response()->json(['posts'=>$posts,
                              'liked_posts'=>$liked_posts,
                              'disliked_posts'=>$disliked_posts]);

    }

    public function load_more(Request $request)
    {

      $offset = $request->has('offset') ? $request->offset : 0 ;

      $topic_id = $request->topic_id;

      $topic = topic::findOrFail($topic_id);

      $posts = $topic->posts()
      ->with('dislikesCounter')
      ->with('likesCounter')
      ->with('user')
      ->offset($offset)
      ->limit(100)
      ->get();

      $posts_id = $topic->posts()
      ->offset($offset)
      ->limit(100)
      ->pluck('id');

      $liked_posts = $this->liked_posts($posts_id,$topic_id);
      $disliked_posts = $this->disliked_posts($posts_id,$topic_id);

      return response()->json(['posts'=>$posts,
                              'liked_posts'=>$liked_posts,
                              'disliked_posts'=>$disliked_posts]);

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
