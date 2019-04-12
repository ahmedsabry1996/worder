<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Auth;

class Topic extends Model
{
    //
	protected $fillable = ['topic'];
	public function users()
	{
		return $this->belongsToMany('App\User');
	}
	

	public function posts()
	{
		return $this->hasMany('App\Post');
	}
}
