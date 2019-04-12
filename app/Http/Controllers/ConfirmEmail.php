<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User as user;
use Session as session;
use Auth;
class ConfirmEmail extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        //
		
		
		$current_user = user::findOrFail(Auth::id());	
		
		$request->validate(['code'=>'required']);
		
		$code = session::get('code');
		
		if($code != $request->code){

        return view('emails.confirm',['error'=>true]);

		}
		
		$current_user->verified_email = 1;
		
		$current_user->save();
		
		return redirect()->route('profile.create');
    }
}
