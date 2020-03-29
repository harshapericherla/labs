<?php

namespace App\Http\Middleware;

use App\User;
use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Hash;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            return route('login');
        }
    }

    public function handle($request, Closure $next)
    {

          $isUserAuthenticated = false;

          if(!$request->session()->has('user_token'))
          {
               $reqName = $request->name;
               $user = User::where('name', $reqName)->get()->first();
               if(!empty($user))
               {
                    $dbPassword = $user -> password;
                    $reqPassword = $request->password;
                    if(Hash::check($reqPassword, $dbPassword))
                    {
                        $request->session()->put('user_token',$user->remember_token);
                        $request->session()->put('user_obj',$user);
                        $isUserAuthenticated = true;
                    }
                    else
                    {
                        $isUserAuthenticated = false;
                    }
               }
               else
               {
                   $isUserAuthenticated = false;
               }
               
          }
          else
          {
              $isUserAuthenticated = true;
          }

          if($isUserAuthenticated)
          {
              return $next($request);
          }
          else
          {
              http_response_code(401);
              return response()->json(["status" => "401","error" =>
               ["message" => "wrong credentials"]]);
          }
    }
}
