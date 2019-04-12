<?php

namespace App\Http\Middleware;

use Closure;

class WordsCounter
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

        $response =  $next($request);
    
        $counter = explode(' ',$request->post);
            if(count($counter) > 100){

               return redirect()->back();
            
            }

        return $response;
        }
}
