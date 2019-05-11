<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
class PostReviewr
{

    public function handle($request, Closure $next)
    {
      $user_roles = Auth::user()->role;

      $current_role = null;

      foreach ($user_roles as $role) {
           $current_role = $role->pivot->role_id;
      }

        if ($current_role == 1 || $current_role ==2) {
          return $next($request);
        }
        return response()->json(['msg'=>"Post Reviewr only"],422);

    }
}
