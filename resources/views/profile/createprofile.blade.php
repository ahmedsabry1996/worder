@extends('layouts.profile')
@section('title','Create new Profile')

@section('content')


	@if($errors->any())
<div class="alert alert-warning">
	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;
	</button>

		<strong> check the error below please </strong>

</div>

		@endif


<form action="{{route('profile.store')}}" class="form col-md-4 col-md-push-4" method="post" enctype="multipart/form-data">
	@csrf
	
	{{--avatar--}}
	<div class="form-group">

		<label>Avatar : </label>
		<input type="file" name="avatar">
		@if($errors->has('avatar'))
		<div class="alert alert-danger">
			<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;
			</button>
			<h4>{{$errors->first('avatar')}}</h4>

		</div>

		@endif
	</div>

	{{--display name--}}
	<div class="form-group">
		<label> Display Name : </label>
		<input type="text" name="display_name" class="form-control" value="{{old('display_name')}}" required>
		@if($errors->has('display_name'))
		<div class="alert alert-danger">
			<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;
			</button>
			<h4>{{$errors->first('display_name')}}</h4>

		</div>
		@endif
	</div>

	{{--gender--}}
	<div class="form-group">
		<label>Gender : </label>
		<select name="gender" required>
			
			@foreach($gender as $g)
				<option value="{{$g->id}}">{{$g->gender}}</option>
			@endforeach
		</select>
		@if($errors->has('gender'))
		<div class="alert alert-danger">
			<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;
			</button>
			<h4>{{$errors->first('gender')}}</h4>

		</div>
		@endif
	</div>

	{{--country--}}
	<div class="form-group">
		<label>Country : </label>
		<select name="country" class="form-control" required>
			@foreach($countries as $country)
			<option value="{{$country->id}}">{{$country->country}}</option>
			@endforeach
		</select>
		@if($errors->has('country'))

		<div class="alert alert-danger">
			<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;
			</button>
			<h4>{{$errors->first('country')}}</h4>

		</div>
		@endif
	</div>
	
	{{--topics--}}
	<div class="form-group">


		<label>Topics : </label>
			<div class="alert alert-info">
	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;
</button>
	<p><b>please select at least 3 topics</b></p>
		</div>
		<select multiple name="topics[]" class="form-control" required>
			@foreach($topics as $topic)
			<option class="topics-op" value="{{$topic->id}}">{{$topic->topic}}</option>
			@endforeach
		</select>
		@if($errors->has('topics'))
		<div class="alert alert-danger">
			<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;
			</button>
			<h4>{{$errors->first('topics')}}</h4>

		</div>
		@endif

	</div>
	
	{{--birth date--}}
	<div class="form-group">
		<label>Date of Birth</label>
		<input type="date" name="birth_date" class="form-control" value="{{old('birth_date')}}" required>

		@if($errors->has('birth_date'))
		<div class="alert alert-danger">
			<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;
			</button>
			<h4>{{$errors->first('birth_date')}}</h4>
		</div>
		@endif
	</div>
	
	{{--description--}}
	<div class="form-group">
		<label>Simple Description about you</label>
		<textarea class="form-control" cols='40' rows="5" name="description" placeholder="Description" value="{{old('description')}}"></textarea>

	</div>
	
	
	<div class="form-group text-center">
		<input type="submit" value="Create" class="btn btn-primary">
	</div>

</form>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js"></script>
<script type="text/javascript">
	$('.topics-op').mousedown(function(e) {
		e.preventDefault();
		$(this).prop('selected', !$(this).prop('selected'));
		return false;
	});

</script>
@endsection
