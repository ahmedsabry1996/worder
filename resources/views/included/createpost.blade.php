<form action="{{route('post.create')}}" method="post">
@csrf
	<div class="form-group">
		<textarea name="post" placeholder="write what do u want" class="form-control text-center" cols="4" rows="7" id="post" required="required"></textarea>
	</div>
	<div class="form-group row text-center">

		<div class="col-md-4">
			<p><span id="counter">0</span>/100</p>
		</div>
		<div class="col-md-4">

			<button class="btn btn-success" id="publish" type="submit">publish <i class="fas fa-hand-pointer"></i></button>
		</div>

		<div class="col-md-4">

			<select name="topic">
				@foreach(Auth::user()->topics as $topic)
				<option value="{{$topic->pivot->topic_id}}">{{$topic->topic}}</option>
				@endforeach
			</select>

		</div>

	</div>
</form>