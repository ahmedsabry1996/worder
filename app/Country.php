<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{

    protected $guarded = [];
      //
    public function profile(){

      return $this->hasMany('App\Profile');
    }

    public function posts()
    {
      return $this->hasMany('App\Post');
    }

    public function latestPosts()
    {
      return $this->hasOne('App\latestPost');
    }

    public function trend()
    {
      return $this->hasOne('App\Trend');
    }

    public function posts_counter()
    {
      return $this->hasOne('App\latestPost');
    }
}
