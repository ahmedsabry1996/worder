<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User as user;
use App\Profile as profile;
use App\Notifications\ProfileVerified;
use Illuminate\Support\Facades\DB;
class AdminController extends Controller
{
    public function create_admin(Request $request)
    {
        $request->validate([
          'name'=>'required',
          'email'=>'required',
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
          'display_name'=>$request->name."man.$request->id",
          'gender_id'=>1,
          'country_id'=>1,
          'avatar'=>null,
          'birth_date'=>'2019-03-22'
        ]);

        $user->role()->sync([$request->role]);

        return response()->json(['msg'=>'new admin created',200]);
    }


    public function fetch_admins(Request $request)
    {
        $all_admin_id = DB::table('role_user')->pluck('user_id');

        $all_admins = user::whereIn('id',$all_admin_id)->with('role')->with('profile')->get();

        return response()->json(['admins'=>$all_admins],200);
    }

    public function delete_admin(Request $request)
    {

    }

    public function edit_admin(Request $request)
    {


    }

}
