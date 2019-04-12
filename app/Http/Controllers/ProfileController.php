<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Auth ;
use Session as session ;
use Storage as storage ;
use App\User as user ;
use App\Profile as profile ;
use App\Country as country ;
use App\Topic as topic ;
use App\Post as post ;
use App\Gender as gender ;

use Illuminate\Support\Collection;

class ProfileController extends Controller
{

   public function __construct()
    {
        $this->middleware('isVerified');
        $this->middleware('StopBack');
    }



    public function create()
    {

		$user_id = Auth::id();

		$user = Auth::user();

		$user_porfile = $user->profile()->count();

		$countries = country::all();

		$topics = topic::all();

		$gender = gender::all();

		if($user_porfile == 0){

		return view('profile.createprofile',
				['countries'=>$countries,
				'topics'=>$topics,
				'gender'=>$gender]);

		}

		return redirect()->route('profile.show');

	}

    public function show()
    {


		$user_id = Auth::id();
		$user = Auth::user();

		$user_porfile = $user->profile()->count();


		//if user has profile
		if($user_porfile == 0){


			return redirect()->action('ProfileController@create');


		}



		$topics = topic::all();
		$gender = gender::all();


		$user_display_name = session(['dname'=>$user->profile->display_name]);

		$country = country::findOrFail($user->profile->country_id)->country;
		$countries = country::all();

		$my_topics = array();
		$my_topics_ids = array();

		//user favorite topics
		foreach($user->topics as $topic){

			array_push($my_topics,['id'=>$topic->pivot->topic_id,'topic'=>$topic->topic]);

			array_push($my_topics_ids,$topic->pivot->topic_id);
		}

		//user unfavorite topics
		$other_topics =topic::whereNotIn('id',$my_topics_ids)->get();


		//user posts
		$posts = $user->posts()->get();

		return view('profile.showprofile',
					['user'=>$user,
					 'countries'=>$countries,
					 'country'=>$country,
					 'topics'=>$topics,
					 'my_topics'=>$my_topics,
					 'other_topics'=>$other_topics,
					 'posts'=>$posts,
					 'gender'=>$gender,
					 'display_name'=>session::get('dname'),
					]);


    }

	public function show_profile($id){

		$user = user::findOrFail($id);


		if(Auth::id() == $id ){
		return redirect()->action('ProfileController@show');
		}

		return view('profile/showuserprofile',['user'=>$user]);

	}


    public function store(Request $request){
        $user_id = Auth::id();

        $user= Auth::user();

		$user_porfile = user::findOrFail($user_id)->profile()->count();

		if($user_porfile == 1){
					return redirect()->route('profile.show');
		}



        $request->validate([
            'avatar'=>'nullable|image|between:1,5000',
						'display_name'=>'required|max:50|unique:profiles,display_name',
            'gender'=>'required',
            'country'=>'required',
            'birth_date'=>'required|before:today',
            'description'=>'nullable|string',
            'topics'=>'required|array|between:3,10',

        ]);


        //if user upload avatar
        if($request->hasFile('avatar')){

            $avatar = $request->avatar;

            $avatar_name = $avatar->getClientOriginalName();


			$new_avatar_name = "$avatar_name".$user_id.'_avatar.jpg';

			$avatar_path="storage/avatars/$avatar_name".$user_id.'_avatar.jpg';

            $avatar->storeAs('public/avatars',$new_avatar_name);

		}
else {
		$avatar_path = "storage/avatars/placeholder.jpg";
    }
	$user->profile()->create([
            'user_id'=>$user_id,
		       	'avatar'=>$avatar_path,
            'display_name'=>$request->display_name,
            'gender_id'=>$request->gender,
            'country_id'=>$request->country,
            'birth_date'=>$request->birth_date,
            'description'=>$request->description
        ]);

        $user->topics()->attach($request->topics);

        return redirect()->route('home');
    }

    public function update(Request $request)
    {

		$user=Auth::user();

		$user_id = Auth::id();



		$display_name_validation =
			$request->display_name == Auth::user()->profile->display_name ? "required|max:50" : "required|max:50|unique:profiles,display_name";


		$request->validate([
			'avatar'=>'nullable|image|between:1,3000',
			'display_name'=>$display_name_validation,
			'birth_date'=>'required|date|before:today',
			'gender'=>'required',
			'country'=>'required',
			'description'=>'nullable',
			'topics'=>'required|array|between:3,10'
		]);




		if($request->hasFile('avatar')){

            $avatar = $request->avatar;

            $avatar_name = $avatar->getClientOriginalName();

            $new_avatar_name ="$avatar_name".$user_id.'_avatar.jpg';

			$avatar_path ="storage/avatars/$avatar_name".$user_id.'_avatar.jpg';

            $avatar->storeAs('public/avatars',$new_avatar_name);

			$user->profile->avatar = $avatar_path;

			$user->profile->save();
        }


		$user->password = $request->password;

		$user->profile->display_name = $request->display_name;
		$user->profile->birth_date = $request->birth_date;
		$user->profile->gender_id = $request->gender;
		$user->profile->country_id = $request->country;
		$user->profile->description = $request->description;
		$user->profile->save();

		if(count($request->topics) < 3 ){

			return redirect()->back();

		}

		$user->topics()->sync($request->topics);

		return redirect()->route('profile.show');

	}

    public function destroy()
    {

		//delete user posts,profile,followers,following
        $user = Auth::user();
		$user->posts()->delete();
        $user->profile()->delete();
		$user->followers()->detach();
		$user->following()->detach();
        $user->delete();
        return redirect()->route('home');

    }

}
