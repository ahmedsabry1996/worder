<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Cog\Contracts\Love\Liker\Models\Liker as LikerContract;
use Cog\Laravel\Love\Liker\Models\Traits\Liker;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Auth\User as Authenticatable ;
use Laravel\Passport\HasApiTokens;
use Illuminate\Support\Facades\DB;
use Auth;
class User extends Authenticatable  implements LikerContract
{
    use Notifiable,HasApiTokens,Liker;


    protected $fillable = [
        'name', 'email', 'password','original_password','verified_email','user_id','follower_id'
    ];



    protected $hidden = [
        'password', 'remember_token',
    ];

	public function profile(){
		return $this->hasOne('App\Profile');
	}

    public function topics()
    {
        return $this->belongsToMany('App\Topic')->withPivot('topic_id')->withTimestamps();
    }


    public function posts()
    {
        return $this->hasMany('App\Post')->with('profile');
    }


	public function followers(){
		return $this->belongsToMany('App\User',
									'follower_user',
									'user_id',
									'follower_id')->withTimestamps();
	}

	public function following(){
		return $this->belongsToMany('App\User',
									'follower_user',
									'follower_id',
									'user_id')->withTimestamps();
	}

  public function follower_counter()
  {
      return $this->hasOne('App\FollowersCounter');
  }

  public function role()
  {
      return $this->belongsToMany('App\Role');

  }

  public static function has_role()
  {
    $user_has_role  = DB::table('role_user')->whereUserId(Auth::id())->exists();

    return $user_has_role;
  }

  public static function current_role()
  {
    if (self::has_role()) {
          foreach(Auth::user()->role as $user_role):
              return $user_role->pivot->role_id;
          endforeach;
    }
    else{
      return false;
    }
  }

}
?>
