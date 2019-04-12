<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Cog\Contracts\Love\Liker\Models\Liker as LikerContract;
use Cog\Laravel\Love\Liker\Models\Traits\Liker;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Auth\User as Authenticatable ;
use Laravel\Passport\HasApiTokens;

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
}
?>
