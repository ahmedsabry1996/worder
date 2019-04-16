<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
        protected $guarded = [];

        public function post()
        {
          return $this->belongsTo('App\Post');
        }
}
