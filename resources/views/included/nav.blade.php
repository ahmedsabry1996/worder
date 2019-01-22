<nav class="navbar navbar-default " role="navigation">

	<div class="navbar-header">
		<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
			<span class="sr-only">Toggle navigation</span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
		</button>

		<a class="navbar-brand" href="{{ route('home') }}">

			Words</a>
	</div>


	<div class="collapse navbar-collapse navbar-ex1-collapse">
		<ul class="nav navbar-nav">
			@guest
			<li>
				<a href="{{ route('login') }}">{{ __('Login') }}</a>
			</li>
			<li>
				<a href="{{ route('register') }}">{{ __('Register') }}</a>
			</li>
			@else
			<li>

				<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
					@csrf
				</form>
				<a class="dropdown-item" href="{{route('profile.show')}}">
					Profile
				</a>
			</li>
			<li>
				<a href="#" data-toggle="modal" data-target="#followers">my fans</a>
			</li>
			<li>

				<a href="{{ route('logout') }}" onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">{{ __('Logout') }}</a></li>



		</ul>
		<form class="navbar-form navbar-left" role="search">
			<div class="form-group">
				<input type="text" class="form-control" placeholder="Search and find new people .. ">
			</div>
			<button type="submit" class="btn btn-default">Search</button>
		</form>

		@endguest

	</div>
</nav>




<nav class="hide navbar navbar-inverse navbar-fixed-top" role="navigation">

	<!-- Brand and toggle get grouped for better mobile display -->
	<div class="navbar-header">
		<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
			<span class="sr-only">Toggle navigation</span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
		</button>

		<a class="navbar-brand" href="{{ route('home') }}">
			Home
		</a>
	</div>

	<!-- Collect the nav links, forms, and other content for toggling -->
	<div class="collapse navbar-collapse navbar-ex1-collapse">

		<ul class="nav navbar-nav navbar-center">
			@guest
			<li>
				<a href="{{ route('login') }}">{{ __('Login') }}</a>
			</li>
			<li>
				<a href="{{ route('register') }}">{{ __('Register') }}</a>
			</li>
			@else
			<li>

				<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
					@csrf
				</form>
				<a class="dropdown-item" href="{{route('profile.show')}}">
					Profile
				</a>
			</li>
			<li>
				<a href="#" data-toggle="modal" data-target="#followers">my fans</a>
			</li>
			<li>

				<a href="{{ route('logout') }}" onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">{{ __('Logout') }}</a></li>

		</ul>

		@endguest
	</div><!-- /.navbar-collapse -->
</nav>
