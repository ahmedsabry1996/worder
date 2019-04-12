<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class latestPost extends Model
{
    //
    protected $guarded = [];

    public function country()
    {
      return $this->belongsTo('App\Country');
    }
}
