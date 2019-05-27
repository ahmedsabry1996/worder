<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Image;
use Carbon\Carbon;
use Storage as storage ;
use App\User as user ;
use App\Profile as profile ;
use App\Country as country ;
use App\Topic as topic ;
use App\Post as post ;
use App\Gender as gender ;
use App\FollowersCounter as followercounter;
use App\Trend as trend ;
class ProfileController extends Controller
{

      public $user_id;

      //create profile
      public function store(Request $request){

          $validate = $request->validate([
              'user_id'=>'required',
              'avatar'=>'nullable',
  						'display_name'=>'required|max:50|unique:profiles,display_name',
              'gender_id'=>'required',
              'country_id'=>'required',
              'birth_date'=>'required|before:today',
              'description'=>'nullable|string',
              'topics'=>'required|array|between:3,11',
          ]);

          $avatar=$request->avatar;

          $profile_description = null;

          if (!$avatar) {
                $new_avatar_name = null;
          }

          else{

          $encoded_avatar = explode(',', $avatar)[1];

          $avatar_extension = explode(',', $avatar)[0];

          if (strpos($avatar_extension,'jpeg')) {
            $new_avatar_extension = ".jpg";
          }
          elseif (strpos($avatar_extension,'png')) {
            $new_avatar_extension = ".png";
          }
          else {
            $new_avatar_extension = ".png";
          }

          $decoded_avatar = base64_decode($encoded_avatar);

          $new_avatar_name = "avatar_$request->user_id"."$new_avatar_extension";

          $save_to = public_path()."/storage/avatars/$new_avatar_name";

          $upload = file_put_contents($save_to,$decoded_avatar);

          $image_size = filesize($save_to);

          if ($image_size > 1000000) {

            if ($image_size > 4000000) {

                $img = Image::make($save_to);
                $img->save($save_to,50);

                $img = Image::make($save_to);
                $img->save($save_to,40);

                $img = Image::make($save_to);
                $img->save($save_to,25);

            }
            else{

              $img = Image::make($save_to);
              $img->save($save_to,80);
            }
          }




            }

            if ($request->filled('description')) {

                $profile_description = $request->description;

                $num_of_words = explode(' ', $profile_description ,26);

                if (count($num_of_words) == 26) {
                      return response()->json(['errors'=>['description'=>['API please write at most 25 words']]],422);
                }
            }
          $profile = new profile();
          $followers_counter = new followercounter();
          $profile->user_id = $request->user_id;
          $profile->avatar = $new_avatar_name;
          $profile->display_name = $request->display_name;
          $profile->gender_id = $request->gender_id;
          $profile->country_id = $request->country_id;
          $profile->birth_date = $request->birth_date;
          $profile->description = $profile_description;
          $followers_counter->user_id =  $request->user_id;

          $followers_counter->save();

          $profile->save();


          $user =  user::findOrFail($request->user_id);

          $user->topics()->attach($request->topics);

          $user->has_profile = 1 ;

          $user->save();


          if (!Auth::loginUsingId($request->user_id,1)) {

            return response()->json(['message'=>'Unauthorized'],401);

          }

          $user = Auth::user();

          $tokenResult = $user->createToken('Personal Access Token');

          $token = $tokenResult->token;

          $token->expires_at = Carbon::now()->addWeeks(90);

          $token->save();

          $user_topics = Auth::user()->topics()->get();

          $country_id = $request->country_id;

          $trend = country::find($country_id)->trend;

          return response()->json([

              'message'=>"Account Created Successfully",
              'user'=>Auth::user(),
              'profile'=>Auth::user()->profile,
              'access_token' => $tokenResult->accessToken,
              'topics'=>$user_topics,
              'trend'=>$trend,
              'followers_num'=>0,
              'following_num'=>0,


          ]);


      }

      //edit user profile
      public function update_profile(Request $request)
      {

        $user = Auth::user();

        if ($request->display_name == $user->profile->display_name) {
          $validate = $request->validate([
              'avatar'=>'nullable',
              'display_name'=>'required|max:50',
              'gender_id'=>'required',
              'country_id'=>'required',
              'birth_date'=>'required|before:today',
              'description'=>'nullable|string',
              'topics'=>'required|array|between:3,11',
          ]);
        }

        else{
          $validate = $request->validate([
              'avatar'=>'nullable',
              'name'=>"required|string|max:55",
              'display_name'=>'required|max:50|unique:profiles,display_name',
              'gender_id'=>'required',
              'country_id'=>'required',
              'birth_date'=>'required|before:today',
              'description'=>'nullable|string',
              'topics'=>'required|array|between:3,11',
          ]);
        }

        $current_user_avatar = $user->profile->avatar;
        $avatar=$request->avatar;
        $avatar_state = $request->avatar_state;
        $profile_description = null;
        $image_size = 0;
        if ($avatar_state == null ) {
          if ($current_user_avatar != "avatar_default.jpg") {
            storage::delete("/public/avatars/$current_user_avatar");

          }
              $new_avatar_name = null;
        }
        elseif($avatar_state == 'same'){
          $new_avatar_name = $user->profile->avatar;
        }
        else{

        $encoded_avatar = explode(',', $avatar)[1];

        $avatar_extension = explode(',', $avatar)[0];

        if (strpos($avatar_extension,'jpeg')) {
          $new_avatar_extension = ".jpg";
        }
        elseif (strpos($avatar_extension,'png')) {
          $new_avatar_extension = ".png";
        }
        else {
          $new_avatar_extension = ".png";
        }

        $decoded_avatar = base64_decode($encoded_avatar);

        $user_id = Auth::id();

        $new_avatar_name = "avatar_$user_id"."$new_avatar_extension";

        $save_to = public_path()."/storage/avatars/$new_avatar_name";

        $upload = file_put_contents($save_to,$decoded_avatar);

        $image_size = filesize($save_to);

        $img = Image::make($save_to);

      	$img->save($save_to,50);

    }

          if ($request->filled('description')) {

              $profile_description = $request->description;

              $num_of_words = explode(' ', $profile_description ,26);

              if (count($num_of_words) == 26) {
                    return response()->json(['errors'=>['description'=>['API please write at most 25 words']]],422);
              }
          }


          $user->name = $request->name;
          $user->profile->display_name = $request->display_name;
          $user->profile->avatar = $new_avatar_name;
          $user->profile->gender_id = $request->gender_id;
          $user->profile->country_id = $request->country_id;
          $user->profile->birth_date = $request->birth_date;
          $user->profile->description = $request->description;

          $user->topics()->sync($request->topics);

          $user->save();

          $user->profile->save();

          $updated_topics = $user->topics()->get();

          $updated_profile = $user->profile;

          return response()->json(['updated_user'=>$user,
                      'updated_profile'=>$updated_profile,
                      'updated_topics'=>$user->topics,
                      'size'=>$image_size,
                      'avater'=>$avatar_state],201);

      }


      public function get_user_profile($user_id)
      {
          $user_profile = user::whereId($user_id)->with('profile')->first();

          return  response()->json(['user_profile'=>$user_profile]);
      }

      public function show_user_profile($display_name)
      {


              $current_user = Auth::user();

              $current_user_id = Auth::id();

              $user_country = Auth::user()->profile->country_id;


              $following_ids = Auth::user()
              ->following()
              ->pluck('user_id');




          $user_id = profile::whereDisplayName($display_name)->firstOrFail()->user_id;

          $user = user::whereId($user_id)
                  ->with('profile')
                  ->with('follower_counter')
                  ->with('topics')
                  ->first();

          $posts = post::where('user_id',$user_id)
          ->offset(0)
          ->limit(27)
          ->latest()
          ->with('user')
          ->with('topic')
          ->with('likesCounter')
          ->with('dislikesCounter')
          ->distinct()
          ->get();

          $posts_num = user::find($user_id)->posts()->count();

          $is_follow = user::find($current_user_id)
                      ->following()
                      ->where('user_id',$user_id)
                      ->exists() ;

          $num_of_followers = user::find($user_id)->follower_counter->followers;
          $num_of_following = user::find($user_id)->follower_counter->following;

          return response()->json(['profile'=>$user,
                                    'posts'=>$posts,
                                    'posts_num'=>$posts_num,
                                    'followers'=>$num_of_followers,
                                    'following'=>$num_of_following,
                                    'following_ids'=>$following_ids,
                                    'is_follow'=>$is_follow]);

      }

      public function my_posts(Request $request)
      {


          $offset = $request->has('offset') ? $request->offset : 0;

          $posts = post::where('user_id',Auth::id())
          ->offset($offset)
          ->limit(27)
          ->latest()
          ->with('user')
          ->with('topic')
          ->with('likesCounter')
          ->with('dislikesCounter')
          ->distinct()
          ->get();

          return response()->json(['posts'=>$posts],200);

      }
      public function load_more_profile_posts(Request $request)
      {
          $user_id = $request->user_id;
          $offset = $request->has('offset') ? $request->offset : 0;

          $posts = post::where('user_id',$user_id)
          ->offset($offset)
          ->limit(27)
          ->latest()
          ->with('user')
          ->with('topic')
          ->with('likesCounter')
          ->with('dislikesCounter')
          ->distinct()
          ->get();

          return response()->json(['posts'=>$posts],201);
      }

      public function cancel_profile(Request $request)
      {
        $email = $request->email;

        $user = user::whereEmail($email)->delete();

        return response()->json(['deleted'=>true],201);
      }

      public function update_locale(Request $request)
      {
            $id = $request->id;

            $new_locale = $request->locale;

            $user = user::findOrFail($id);

            $user->profile->locale = $new_locale;

            $user->profile->save();

            return response()->json(['data'=>'ok'],200);
      }

}
