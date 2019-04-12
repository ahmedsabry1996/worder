<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FollowersCounter extends Model
{

    protected $guarded = []; 
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
