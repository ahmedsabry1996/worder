<?php

use Illuminate\Http\Request;



Route::group(['prefix'=>"auth"],function(){

          Route::post('login','API\AuthControllerApi@login');
          Route::post('signup','API\AuthControllerApi@signup');
          Route::post('verify/{id}','API\AuthControllerApi@verify_email');
          Route::post('verify-profile','API\AuthControllerApi@verify_profile');
          Route::post('sendcode','API\AuthControllerApi@send_verification_code');
          Route::post('reset-password','API\AuthControllerApi@update_password');
});


Route::post('verify-email',"API\AuthControllerApi@check_email_exist");
Route::post('create-profile/{user_id}',"API\ProfileController@store");

Route::post('/confirm-verify','API\AdminController@approve');

Route::get('user-profile/{user_id}',"API\ProfileController@get_user_profile")->middleware('auth:api');
Route::get('user/{display_name}',"API\ProfileController@show_user_profile")->middleware('auth:api');
Route::post('user-posts',"API\ProfileController@load_more_profile_posts")->middleware('auth:api');
Route::post('user-reacted',"API\TimelineController@reacted_posts")->middleware('auth:api');
Route::post('update-profile','API\ProfileController@update_profile')->middleware('auth:api');
Route::post('update-email','API\AuthControllerApi@update_email')->middleware('auth:api');
Route::post('change-email','API\AuthControllerApi@change_email')->middleware('auth:api');

Route::group(['middleware'=>'auth:api','prefix'=>'post'],function(){

  Route::post('create-post','API\PostController@create_new_post');
  Route::get('my-posts','API\PostController@my_posts');
  Route::get('delete-post/{post_id}','API\PostController@delete_post');
  Route::post('likers','API\PostController@likers');
  Route::post('dislikers','API\PostController@dislikers');

});

Route::group(['middleware'=>'auth:api','prefix'=>'timeline'], function()
{
    Route::get('/suggest-people','API\FollowingController@suggest_people');
    Route::post('posts','API\TimelineController@time_line_posts');
    Route::post('react','API\TimelineController@like_posts');
    Route::post('load-more','API\TimelineController@load_more');
    Route::post('/follow','API\FollowingController@follow');
    Route::post('/my-following','API\FollowingController@my_following');
    Route::post('/my-followers','API\FollowingController@my_followers');
    Route::post('/notifications','API\TimelineController@fetch_notifications');
    Route::post('/unread-notifications','API\TimelineController@unread_notifications');
    Route::post('/load-more-notifications','API\TimelineController@load_more_notifications');
    Route::post('/post','API\PostController@show_post');
    Route::post('search','API\searchController@search');

});
Route::get('/trend','API\TrendController@test');


Route::group(['middleware'=>'auth:api','prefix'=>'topic'],function(){

    Route::post('show','API\TopicController@show');
    Route::post('load-more','API\TopicController@load_more');
});
Route::group(['middleware'=>'auth:api','prefix'=>'trend'],function(){
  Route::post('update','API\TrendController@update');

      Route::post('posts','API\TrendController@show');
      Route::post('load-more','API\TrendController@load_more');
});
