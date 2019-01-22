<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<!-- CSRF Token -->
	<meta name="csrf-token" content="{{ csrf_token() }}">

	<title>Words</title>

	<!-- Scripts -->
	<script src="{{ asset('js/app.js') }}" defer></script>

	<!-- Fonts -->
	<link rel="dns-prefetch" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

	<!-- Styles -->
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
	<link rel="stylesheet" media="screen" href="{{asset('css/bs.css')}}">
	<link rel="stylesheet" media="screen" href="{{asset('css/posts.css')}}">

</head>

<body>

	<script src="{{asset('js/jq.js')}}"></script>
	<script src="{{asset('js/bs.js')}}"></script>

	<div class="container-fluide">
		<div class="row">
		@auth
		
@include('included.nav')

		<div class="container">	<div class="ads">
				<div class="col-md-3 ads-content">
					<h2 class="text-center">

people who have your same interests
						</h2>
						<ul class="list-group">

					@foreach($people_like_me as $person)
	<li class="list-group-item">
	<p>
		<img src="{{asset($person->profile->avatar)}}" alt="{{$person->name}}" class="img-circle" width="50" height="50" style="top: 10px;position: relative;"> 
		<a href="{{route('profile.user',['id'=>$person->id])}}">{{$person->name}}</a>
		<br>
			<i style="opacity: .5;left: 58px;position: relative;top: -16px;">({{$person->profile->display_name}})</i>
			</p>
	</li>


						
							@endforeach	
							</ul>
				</div>
			</div>
			@endauth

			<div class="content">
				<div class="col-md-6">
					@yield('content')
				</div>
			</div>
			@auth
			<div class="topics">
				<div class="col-md-3 topics-content">
					<div class="title">
						<h1 class="text-center">my topics</h1>
					</div>
					<div class="topics">
						<ul class="list-group text-center">

							@foreach(Auth::user()->topics as $topic)
							<li class="list-group-item"><a href="{{route('topic.posts',['id'=>$topic->id])}}">{{$topic->topic}}</a></li>
						
								@endforeach
						
						</ul>
					
							<hr>
						<h1 class="text-center">
							All topics 
						</h1>
				
						<ul class="list-group text-center">

							@foreach(App\Topic::all() as $topic)
							<li class="list-group-item"><a href="{{route('topic.posts',['id'=>$topic->id])}}">{{$topic->topic}}</a></li>
							@endforeach
							
						</ul>
					
					</div>
				</div>
			</div>
			@endauth
		</div>
	</div>
</div>

</body>

</html>