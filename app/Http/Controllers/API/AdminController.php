<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User as user;
use App\Notifications\ProfileVerified;

class AdminController extends Controller
{
    public function approve(Request $request)
    {
      $user_id = $request->user_id;

      $user = user::findOrFail($user_id);

      $user->profile->is_verified = 1 ;

      $user->profile->save();

      $user->notify(New ProfileVerified($user_id));

      return response()->json(['done'=>"ok"],200);
    }
}
