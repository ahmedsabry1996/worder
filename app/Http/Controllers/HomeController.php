<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Session as session;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('ConfirmEmail');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
		$user_display_name = Auth::user()->profile->display_name;
		
		$display_name = session(['display_name'=>$user_display_name]);
		
		return view('home');
		
    }
}
