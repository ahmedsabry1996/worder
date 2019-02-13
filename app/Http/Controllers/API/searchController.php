<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User as user;
use App\Profile as profile;
class searchController extends Controller
{
    public $word ;
  public function search(Request $request)
  {

      $this->word = $request->word;
      if (strlen($this->word) > 0) {

      $search = user::where('name',"like","%$this->word%")->where('is_verified',"1")->where('has_profile',"1")->orwhereHas("profile",function($query){
        $query->where('display_name','like',"%$this->word%")->orWhere('description','like',"%$this->word%");
      })->with('profile')->limit(5)->get();
      return response()->json(['results'=>$search,"w"=>$this->word]);

    }

}

    }
