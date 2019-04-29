<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
class superadmin
{

    public function handle($request, Closure $next)
    {
        $user_roles = Auth::user()->role;

        $current_role = null;

        foreach ($user_roles as $role) {
             $current_role = $role->pivot->role_id;
        }

          if ($current_role != 1) {
              return response()->json(['msg'=>"sudo only"],422);
          }
        return $next($request);
    }
}
