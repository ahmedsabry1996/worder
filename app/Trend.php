<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Trend extends Model
{

  protected $guarded = [];

  public function country()
  {
    return $this->belongsTo('App\Country');
  }
}
