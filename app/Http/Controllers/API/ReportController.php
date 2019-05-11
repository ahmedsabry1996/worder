<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Post as post;
use App\User as user;
use App\Report as report;
use App\reportsCounter as reports_counter;
use Storage as storage;
use App\Country as country;
class ReportController extends Controller
{
    public function report_post(Request $request)
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

      $report = new report();

      $report::create([
        'post_id'=>$post_id,
        'user_id'=>$user_id,
        'reason'=>$reason,
        'notes'=>$notes
      ]);

     $post_reports_counter=post::find($post_id)
                              ->reports_counter()
                              ->firstOrCreate(['reports_num'=>0]);

     $post->reports_counter->reports_num +=1;

     $post->reports_counter->save();

     $delete_zero_value = post::find($post_id)
                    ->reports_counter()
                    ->where('reports_num','=',0)
                    ->delete();

      return response()->json(['result'=>'ok','pp'=>$post_reports_counter ],200);
    }

    public function fetch_reported_posts()
    {

        $posts = reports_counter::latest()
                      ->with('post')
                      ->limit(100)
                      ->get();
            return response()->json(['posts'=>$posts],200);
    }

    public function load_more()
    {

    }

    public function stop_reports(Request $request)
    {

      $post_id = $request->post_id;

      $post = post::findOrFail($post_id);

      $post->reportable = 0;

      $post->save();

      $post->reports()->delete();

      $post->reports_counter()->delete();

      return response()->json(['msg'=>'disabled'],200);


    }

    public function remove_post(Request $request)
    {
      $post_id = $request->post_id;

      $post = post::findOrFail($post_id);

      if ($post->image) {
          storage::delete("/public/posts_images/"."$post->image");
      }
      $country = country::find($post->country_id);

      if ($country->latestPosts->posts_number > 0 ) {

        $country->latestPosts->decrement('posts_number');

      }

      $post->removeLikes();

      $post->removeDislikes();

      $post->reports()->delete();

      $post->reports_counter()->delete();

      $delete_post = $post->delete();

      return response()->json("",204);

    }
}
