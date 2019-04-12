<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>@yield('title')</title>

		<!-- Bootstrap CSS -->
   <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
    <link rel="stylesheet" media="screen" href="{{asset('css/bs.css')}}">
    <link rel="stylesheet" media="screen" href="{{asset('css/posts.css')}}">

	</head>
	<body>
   
    <script src="{{asset('js/jq.js')}}"></script>
    <script src="{{asset('js/bs.js')}}"></script>
   <div class="container-fluide">
   <div class="row">
   @include('included.nav')	
@include('included/follower')
</div>
   	<div class="row">
   		@yield('content')
   	</div>
   </div>
	</body>
</html>