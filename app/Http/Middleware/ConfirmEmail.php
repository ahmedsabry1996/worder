<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
class ConfirmEmail
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
		
		if(!Auth::user()->verified_email){
			
        return redirect()->route('insert.code');
			
		}
		
        return $next($request);
    }
}
