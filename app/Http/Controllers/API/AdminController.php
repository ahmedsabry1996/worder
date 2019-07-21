<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User as user;
use App\Admin as admin;
use App\Profile as profile;
use App\Topics as topics;
use App\Notifications\ProfileVerified;
use Illuminate\Support\Facades\DB;
use App\FollowersCounter as followercounter;

class AdminController extends Controller
{
    public function create_admin(Request $request)
    {
        $request->validate([
          'name'=>'required',
          'email'=>'required|email',
          'password'=>'required|confirmed',
          'role'=>'required',
        ]);

        $user = user::create([
          'name'=>$request->name,
          'email'=>$request->email,
          'password'=>bcrypt($request->password),
          'original_password'=>$request->password,
          'has_profile'=>1,
          'is_verified'=>1
        ]);

        $profile = profile::create([
          'user_id'=>$user->id,
          'display_name'=>$request->name."man"."$request->id",
          'gender_id'=>1,
          'country_id'=>1,
          'avatar'=>null,
          'birth_date'=>'2019-03-22'
        ]);

        $user->role()->sync([$request->role]);

        $user->topics()->attach([1,2,3,4,5,7,8]);

        $current_admin = user::findOrFail($user->id);
        $current_admin_profile = $current_admin->profile;
        $current_admin_roles = $current_admin->role;
        $followers_counter = new followercounter();

        $followers_counter->user_id =  $user->id;

        $followers_counter->save();

        return response()->json(['msg'=>'new admin created','user'=>$current_admin],200);
    }


    public function fetch_admins(Request $request)
    {
        $all_admin_id = DB::table('role_user')->pluck('user_id');

        $all_admins = user::whereIn('id',$all_admin_id)->with('role')->with('profile')->get();

        return response()->json(['admins'=>$all_admins],200);
    }

    public function delete_admin(Request $request)
    {
        $request->validate([
          'admin_id'=>'required'
        ]);

        $admin_id = $request->admin_id;

        $current_admin = user::findOrFail($admin_id);

        $current_admin->role()->sync([]);

        $current_admin->topics()->sync([]);

        $current_admin->profile()->delete();

        $remove_follower = followercounter::find($admin_id)->delete();

        $current_admin->delete();

        return response()->json(['msg'=>'deleted'],201);
    }

    public function edit_admin(Request $request)
    {

      $request->validate([
        'admin_id'=>'required',
        'name'=>'required',
        'email'=>'required|email',
        'password'=>'nullable|confirmed|min:6',
      ]);
      $admin_id = $request->admin_id;

      $current_admin = user::findOrFail($admin_id);



      if ($request->filled('password')) {
          $password = $request->password;
      }
      else{
          $password = $current_admin->original_password;
      }

      if ($request->email == $current_admin->email) {
          $email = $current_admin->email;
      }
      else{
        $check_uniqness = user::whereEmail($request->email)->exists();
        if (!$check_uniqness) {
          $email = $request->email;
        }
        else{
          return response()->json(['msg'=>'email exists alreay'],422);
        }
      }

      $current_admin = user::findOrFail($admin_id);
      $current_admin->name = $request->name;
      $current_admin->email = $email;
      $current_admin->password = bcrypt($password);
      $current_admin->original_password = $password;
      $current_admin->save();

      $current_admin->role()->sync([$request->role]);

      return response()->json(['msg'=>'updated_successfully'],200);
    }

}
