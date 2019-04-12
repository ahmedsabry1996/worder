<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Topic as topic;
use Illuminate\Database\Eloquent\Collection;
use Auth;
use App\Post as post;
use App\Profile as profile;
use App\User as user;
use App\Topic as topics;
use Illuminate\Support\Facades\DB;
class TopicsController extends Controller
{

	public function index($id)
    {
    
	$topics_posts = topic::find($id)->posts()->orderBy('created_at','desc')->get();	
	
	return view('topic.posts',['posts'=>$topics_posts,'current_topic'=>$id,'people_like_me'=>$this->people_like_you()]);
		
	}

		public function people_like_you(){
		
		//get current user 
		$current_user = Auth::user();
		
		$current_user_topics = Auth::user()->topics()->get();
		
		$my_topics = array();
		
		foreach($current_user_topics as $topic):
				array_push($my_topics,$topic->id);
		endforeach;
		
		
		
		$people_like_me =DB::table('topic_user')
			->whereIn('topic_id',$my_topics)
			->where('user_id','<>',Auth::id())
			->select('user_id')
			->take(5)
			->distinct()
			->get();
		
		
		
		$users_like_me = array();
		
		foreach($people_like_me as $person):
			
			
			$user = user::find($person->user_id);
			
				
				array_push($users_like_me,$user);
		
		endforeach;
		
		
		return $users_like_me;	
	}


}
