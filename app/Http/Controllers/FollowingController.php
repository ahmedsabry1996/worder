<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth ;
use App\User as user;
class FollowingController extends Controller
{



	public function toggleFollow($user_id){

		$current_user = Auth::user();

		$current_user_id = Auth::id();

		$followed_user_id = user::findOrFail($user_id)->id;

		$is_already_follower = user::findOrFail($current_user_id)->following()->where('user_id',$followed_user_id)->get()->count();

		if(!$is_already_follower){
			$current_user->following()->attach($followed_user_id);
			return redirect()->back();
		}
		else{

			$current_user->following()->detach($followed_user_id);
			return redirect()->back();

		}

	}

}
