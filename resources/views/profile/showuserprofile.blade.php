@extends('layouts.profile')

@section('title',$user->name)

@section('content')

<div class="text-center">
	{{--user avatar--}}
	<div class="avatar">
	
		<img src="{{asset($user->profile->avatar)}}" class="img-rounded" title="{{$user->name}}" alt="{{$user->name}}" width="75" height="75">


	</div>
	{{--diplay name--}}
	<div class="display-name">
			<h1>{{$user->profile->display_name}}</h1>
	</div>

	{{--user naem--}}
	<div class="username">
		<h5><i style="opacity: .7">{{$user->name}}</i></h5>
	</div>
	{{--gender--}}
	<div class="gender">
			<h2>{{$user->profile->gender->gender}}</h2>

	</div>
	{{--country--}}
	<div class="country">
			<h3>{{$user->profile->country->country}}</h3>

	</div>
	{{--followers--}}
	<div class="follower">
			<h4>followers : {{$user->followers()->count()}}</h4>

	</div>
	{{--following--}}
	<div class="following">
			<h4>following : {{$user->following()->count()}}</h4>

	</div>
	{{--follow--}}

	<div class="follow">
	@if($user->followers()->where('follower_id',Auth::user()->id)->get()->count() == 0)
		<a href="{{route('toggleFollow',['user_id'=>$user->id])}}" class="btn btn-success btn-md">Follow</a>
		
		@else
		<a href="{{route('toggleFollow',['user_id'=>$user->id])}}" class="btn btn-danger btn-md">Unfollow</a>
		
		@endif
	</div>

</div>
@endsection