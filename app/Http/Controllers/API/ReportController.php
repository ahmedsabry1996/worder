<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Post as post;
use App\User as user;
use App\Report ;
class ReportController extends Controller
{
    public function report(Request $request)
    {

      $request->validate([
        'post_id'=>'required|numeric',
        'user_id'=>'required|numeric',
        'reason'=>'required',
        'notes'=>'nullable'
      ]);

      $post_id = $request->post_id;
      $user_id = $request->user_id;
      $reason = $request->reason;
      $notes = $request->filled('notes') ? $request->notes : '-';

      $post = post::findOrFail($post_id);
      $user = user::findOrFail($user_id);

      $report = new Report();

      $report::create([
        'post_id'=>$post_id,
        'user_id'=>$user_id,
        'reason'=>$reason,
        'notes'=>$notes
      ]);

      return response()->json(['result'=>'ok'],200);
    }
}
