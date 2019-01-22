<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Session as session;
use Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyEmail as sendCode;
class VerifyEmailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
	
    public function index()
    {
     
		if(is_null(session::get('code'))){
			
		$rand_code = rand(1000,10000);
		
        $code = session(['code'=>$rand_code]);
        
		$code = session::get('code');

        //get user email
        $email = Auth::user()->email;
		
       	Mail::to($email)->send(new sendCode($code));
       
        return view('emails.confirm',['error'=>false]);
		
		}
		else{
		
			return view('emails.confirm',['error'=>false]);

		}
		
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
