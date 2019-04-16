<?php

namespace App;

use Cog\Contracts\Love\Likeable\Models\Likeable as LikeableContract;
use Cog\Laravel\Love\Likeable\Models\Traits\Likeable;
use Illuminate\Database\Eloquent\Model;
use Auth;
class Post extends Model implements LikeableContract
{

    use Likeable;

    protected $fillable = ['post','image','user_id','country_id','topic_id'];

	public function user()
	{
		return $this->belongsTo('App\User')->with('profile');
	}

	public function country()
	{
		return $this->belongsTo('App\Country');
	}

	public function topic()
	{
		return $this->belongsTo('App\Topic');
	}
  public function profile()
  {
    return $this->belongsTo('App\Profile','user_id','user_id');
  }
  public function reports(){
    return $this->hasMany('App\Report');
  }

}


?>
