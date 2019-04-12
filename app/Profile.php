<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{

	protected $fillable = ['avatar','user_id','display_name','gender_id','country','birth_date','description','country_id'];
    //related to a user
    public function user()
    {
    	return $this->belongsTo('App\User');
    }
	public function country(){
		return  $this->belongsTo('App\Country');
	}

	public function gender(){

		return  $this->belongsTo('App\Gender');

	}


}
