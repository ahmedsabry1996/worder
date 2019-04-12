<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/{any}',function(){
	return view('welcome');
})->where('any','.*');




Route::get('/showcode','VerifyEmailController@index')->name('insert.code');

//account confirmation
Route::post('/confirm_email','ConfirmEmail')->name('confirm.email');

//user profile
Route::group(['middleware'=>['auth','isVerified'],'prefix'=>'profile','name'=>'profile.'],function(){

	Route::get('mine','ProfileController@show')->name('profile.show');

	Route::get('user/{id}','ProfileController@show_profile')->name('profile.user');

	Route::get('create','ProfileController@create')->name('profile.create');

	Route::post('store','ProfileController@store')->name('profile.store');

	Route::get('delete','ProfileController@destroy')->name('profile.delete');

	Route::post('upadte','ProfileController@update')->name('profile.update');



});

//posts and time line
Route::group(['middleware'=>['auth','isVerified'],'prefix'=>'post'],function(){


	Route::post('create_post','PostsController@store')->name('post.create')->middleware('WordsCounter');

	Route::delete('delete_post/{id}','PostsController@destroy')->name('post.delete');

	Route::get('like_post/{id}','PostsController@like_post')->name('post.like');

	Route::get('dislike_post/{id}','PostsController@dislike_post')->name('post.dislike');


});

	//timeline
	Route::get('timeline','PostsController@timeline');

	Route::get('pe','PostsController@people_like_you');



//topics
Route::group(['middleware'=>['auth','isVerified'],'prefix'=>'topic'],function(){

	Route::get('posts/{id}','TopicsController@index')->name('topic.posts');

});

//following system
Route::group(['middleware'=>['auth','isVerified'],'prefix'=>'follow'],function(){

	Route::get('/follow/{user_id}','FollowingController@toggleFollow')->name('toggleFollow');

});

//home page
Route::get('/home','PostsController@timeline')->name('home');

Auth::routes();
