@extends('layouts.profile')
@section('title',$user->name)
@section('content')
   
{{--user data--}}
<div class="text-center user-profile">

<div class="avatar">

<img src="{{asset($user->profile->avatar)}}" class="img-circle" width="100" height="100">

</div>

<div class="user-data">
<h2>{{$user->profile->display_name}}</h2>

<h3>Gender : {{$user->profile->gender->gender}}</h3>

<h3>Country : {{$country}}</h3>

<h3>Data of Birth : {{$user->profile->birth_date}}</h3>


<p><b>Descriptrion : </b>{{$user->profile->description}}</p>
<br>

<h2 class="text-center">your favorite topics</h2>
<ul class="list-group">
	
	@foreach($user->topics as $topic)
	<a class="btn btn-success" title="{{$topic->topic}}">{{$topic->topic}}</a>

	@endforeach
</ul>
</div>



<a href="{{route('profile.delete')}}" title="Delete account" onclick="return confirm('sure?');" class="btn btn-danger">Delete profile</a>

<button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal" title="edit your profile data">Edit profile</button>

</div>
@if($errors->any())
<div class="alert alert-danger">
	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;
</button>
@foreach($errors->all() as $error)
<h5>{{$error}}</h5>
@endforeach
</div>


@endif
{{--update user data--}}
<div class="update-profile">
	
<!-- Update profile -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
       <div class="text-center avatar">

<img src="{{asset($user->profile->avatar)}}" class="img-circle" width="100" height="100">

      
           </div>
       <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Edit your profile</h4>
      </div>
      <div class="modal-body">
	
     	<form action="{{route('profile.update')}}" method="POST" role="form" enctype="multipart/form-data">
     	@csrf
     
    
    {{--avatar--}}
	<div class="form-group">
<label for="">Avatar</label>
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
		<label for="">display name</label>
		<input type="text" class="form-control" required value="{{$user->profile->display_name}}" name="display_name">
		
	@if($errors->has('display_name'))
		<div class="alert alert-danger">
	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;
</button>
		<h4>{{$errors->first('display_name')}}</h4>
	
	</div>

	
	@endif
	</div>
	
	{{--birth date--}}
	<div class="form-group">
		<label for="">Birth date</label>
		<input type="date" class="form-control" name="birth_date" value="{{$user->profile->birth_date}}">
		
	@if($errors->has('birth_date'))
		<div class="alert alert-danger">
	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;
</button>
		<h4>{{$errors->first('birth_date')}}</h4>
	
	</div>

	
	@endif
	</div>
	
	{{--gender--}}
	<div class="form-group">
		<label for="">gender</label>
		<select name="gender" class="form-control" required="required">
			@foreach($gender as $g)
				<option value="{{$g->id}}" @if($user->profile->gender_id ==$g->id ) selected @endif>{{$g->gender}}</option>
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
	<label for="">country{{ $user->profile->country_id}}</label>
	<select name="country"  class="form-control" required="required">
   
	
			@foreach($countries as $country)
		<option value="{{$country->id}}" 
						@if($country->id == $user->profile->country_id)
										   selected
											   @endif
												   >
		  
		  {{$country->country}}</option>
		  
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
	<div class="alert alert-info">
	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;
</button>
	<p><b>please select at least 3 topics</b></p>
		</div>
<select multiple name='topics[]' class="form-control">
      	
      	@foreach($my_topics as $topic=>$prop)
      	
      	<option class="topic-op" value="{{$prop['id']}}" selected>{{$prop['topic']}}</option>
      	@endforeach
      	@foreach($other_topics as $topic)
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

	{{--description--}}
	<div class="form-group">
			<label for="">description</label>
	<textarea name="description" id="input" class="form-control" rows="3">{{$user->profile->description}}</textarea>
	
	@if($errors->has('description'))
		<div class="alert alert-danger">
	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;
</button>
		<h4>{{$errors->first('description')}}</h4>
	
	</div>
@endif

</div>

<div class="text-center">
	<button type="submit" class="btn btn-success btn-md">save</button>
	
        <button type="button" class="btn btn-danger btn-md" data-dismiss="modal">Cancel</button>
</div>
      </form>

 
              </div>
      
    </div>

  </div>
</div>
</div>
<hr>

{{--user posts--}}

<div class="posts">

@if($posts->count() == 0 )
<div class="alert alert-info">
	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;
</button>
<h2 class="text-center">you havn't publish any thing yet
</h2>
</div>

@else
<h1 class="text-center">
	<div class="row">
		my posts
	</div>
</h1>
@foreach($posts as $post)
<div class="post text-center">

<div class="post-content">
	<p title="{{$post->post}}">
		"{{$post->post}}"
	</p>
	
</div>
<div class="post-topic">
	<p title="{{$post->topic->topic}}">{{$post->topic->topic}}</p>
</div>	
<div class="post-time">
	<span><i>{{$post->created_at->diffForHumans()}}</i></span>
</div>
<div class="post-reaction">

			<a href="#" class="btn"><i class="fas fa-thumbs-up fa-1x"></i>({{$post->likesCount}})</a>
			<a href="#" class="btn"><i class="fas fa-thumbs-down fa-1x"></i>({{$post->dislikesCount}})</a>
		
	<form action="{{route('post.delete',['id'=>$post->id])}}" method="post">
		@method('DELETE')
		@csrf
<button title="delete this post" onclick="return confirm('sure?');" type="submit" class="btn btn-danger btn-xs"><i  class="fas fa-trash-alt fa-1x"></i>
</button>
	
	
	</form>		
</div>
</div>
<hr>
	@endforeach
	@endif
</div>
		

@include('included.follower')	
			
<script type="text/javascript">
$('.topic-op').mousedown(function(e) {
    e.preventDefault();
    $(this).prop('selected', !$(this).prop('selected'));
    return false;
});
</script>
@endsection