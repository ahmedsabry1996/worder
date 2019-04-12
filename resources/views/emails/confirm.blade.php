@extends('layouts.profile')
@section('content')

<div class="text-center col-md-6 col-md-push-3">
	<h4 class="text-center">please check your email for verification code</h4>
	<form action="{{route('confirm.email')}}" method="post">
	@csrf
	<div class="form-group">
		<input type="text" name="code" placeholder="code" class="form-control text-center">
		</div>
	<div class="form-group">	
		<input type="submit" class="btn btn-success" value="verify">
	</div>
	</form>

	@if($error)
			<div class="alert alert-danger">
	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;
</button>
	Error in code please check your email inbox and  try again 
	</div>

	@endif
</div>
@endsection
