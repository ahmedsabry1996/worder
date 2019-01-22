<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
class verifyEmail
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

       $verified_email =  Auth::user()->verified_email;

       if(!$verified_email){

            echo "please verify your email";
       }
       
       else{
        echo " email verifed";
       }

        return $next($request);
    }
}
