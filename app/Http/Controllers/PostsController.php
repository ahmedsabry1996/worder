<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Post as post;
use App\Profile as profile;
use App\User as user;
use App\Topic as topics;
use Illuminate\Support\Facades\DB;
class PostsController extends Controller
{
    public function create()
    {

        return view('/home');
    }

    public function store(Request $request)
    {

        $post = new post();
        $user_id = Auth::id();
        $country_id = user::findOrFail($user_id)->profile->country->id;



        $request->validate([
            'post'=>'required',
            'topic'=>'required|size:1'
        ]);

        $post->create([
                'post'=>$request->post,
                'topic_id'=>$request->topic,
                'user_id'=>$user_id,
                'country_id'=>$country_id
        ]);

        return redirect()->back();
    }

    public function like_post($id)
    {

	$current_post = post::find($id);

	$user = Auth::user();

	$user->toggleLike($current_post);

	$current_post->toggleLikeBy();

	$current_post->toggleLikeBy($user->id);

	return redirect()->back();


	}

	public function dislike_post($id)
    {

	$current_post = post::find($id);

	$user = Auth::user();

	$user->toggleDislike($current_post);

	$current_post->toggleDislikeBy();

	$current_post->toggleDislikeBy($user->id);

	return redirect()->back();


	}

    public function destroy($id)
    {

        $current_post = post::find($id);

        $current_post->delete();

		return redirect()->back();

    }

	public function timeline(){


		//store user followings
		$user_followings = Auth::user()->with('following')->get();
		$user_following_ids = array();

		foreach($user_followings as $user_following):
			array_push($user_following_ids,$user_following->id);
		endforeach;


		//store user followers
		$user_followers = Auth::user()->followers()->get();
		$user_followers_ids = array();

		foreach($user_followers as $user_follower):
				array_push($user_followers_ids,$user_follower->id);
		endforeach;


		//store user topics
		$user_topics = Auth::user()->topics()->get();
		$user_topics_ids = array();

		foreach($user_topics as $topic):
			array_push($user_topics_ids,$topic->id);
		endforeach;


		//concate followers and following posts
		$followers_following_ids = array_merge($user_following_ids,$user_followers_ids);


		//followers post
		$followers_following_posts = post::whereIn('user_id',$followers_following_ids)->inRandomOrder()->get();



		$topic_posts = post::whereIn('topic_id',$user_topics_ids)
			->where('user_id','<>',Auth::id())
			->inRandomOrder()
			->get();

		return view('home',['followers_posts'=>$followers_following_posts,'topic_posts'=>$topic_posts,'people_like_me'=>$this->people_like_you()]);


	}


}
