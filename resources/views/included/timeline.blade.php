
	
<div class="row">
	<div class="posts-timeline text-center">

	@foreach($followers_posts as $post)
		
		
<div class="post text-center">
{{--publisher avatar--}}
	<div class="avatar">
		@if(strlen($post->user->profile->avatar) == 0)
<a href="
	@if($post->user->profile->user_id == Auth::id() )
		{{route('profile.show')}}
	
	@else
	{{route('profile.user',['id'=>$post->user->profile->user_id])}}
	
	@endif
	">

		<img src="{{asset('avatars/ava.jpg')}}" class="img-circle" width="60" height="60">
</a>
		@else
<a href="{{route('profile.user',['id'=>$post->user->profile->user_id])}}">
		<img src="{{asset($post->user->profile->avatar)}}" class="img-circle" width="60" height="60">
</a>
		@endif
	</div>

	{{--post content--}}	
	<div class="post-content">
		<p><b><bdi>" {{$post->post}}"</bdi></b></p>
	</div>
	
	<div class="post-publisher">
		@if($post->user_id != Auth::id())
		<p>by <i>{{$post->user->profile->display_name}}</i></p>
		@if($post->isLikedBy(Auth::id()))


		<div class="post-reaction">

			<a href="{{route('post.like',['id'=>$post->id])}}" class="btn selected"><i class="fas fa-thumbs-up fa-1x"></i>({{$post->likesCount}})</a>

			<a href="{{route('post.dislike',['id'=>$post->id])}}" class="btn"><i class="fas fa-thumbs-down fa-1x"></i>({{$post->dislikesCount}})</a>

		</div>

		@elseif($post->isDisLikedBy(Auth::id()))


		<div class="post-reaction">
			<a href="{{route('post.like',['id'=>$post->id])}}" class="btn"><i class="fas fa-thumbs-up fa-1x"></i>({{$post->likesCount}})</a>
			<a href="{{route('post.dislike',['id'=>$post->id])}}" class="btn selected"><i class="fas fa-thumbs-down fa-1x"></i>({{$post->dislikesCount}})</a>
		</div>
		@else
		<div class="post-reaction">
			<a href="{{route('post.like',['id'=>$post->id])}}" class="btn"><i class="fas fa-thumbs-up fa-1x"></i>({{$post->likesCount}})</a>
			<a href="{{route('post.dislike',['id'=>$post->id])}}" class="btn"><i class="fas fa-thumbs-down fa-1x"></i>({{$post->dislikesCount}})</a>
		</div>

@endif
	<div class="follow-user">
		
		<a href="{{route('toggleFollow',['user_id'=>$post->user_id])}}">
	@if(Auth::user()->following()->where('user_id',$post->user_id)->get()->count())
		
		
		<b class="btn btn-danger btn-sm " title="unfollow"> 
		unfollow <i class="fas fa-times"></i></b>
		
	@else
	
		<b class="btn btn-success btn-sm " title="follow"> follow <i class="fas fa-check"></i></b>
		@endif
	
		</a>
	
	
	
	</div>
		

		@else
		
		<div class="post-reaction">
			<a href="#" class="btn"><i class="fas fa-thumbs-up fa-1x"></i>({{$post->likesCount}})</a>
			<a href="#" class="btn"><i class="fas fa-thumbs-down fa-1x"></i>({{$post->dislikesCount}})</a>
		</div>
		<form action="{{route('post.delete',['id'=>$post->id])}}" method="post">
			@method('DELETE')
			@csrf
			<button type="submit" onclick="return confirm('sure?');" class="btn btn-danger btn-xs"><i class="fas fa-trash-alt fa-1x"></i>
			</button>
		</form>
		&nbsp;
		<p>by <b>you</b></p>

				@endif
				
		<div class="post-topic">
			<i>{{$post->topic->topic}}</i>
		</div>

	</div>
	
	<div class="post-time">
		<p><i>{{$post->created_at->diffForHumans()}}</i></p>
	</div>
</div>
	<hr>
	@endforeach
	
	<b>--------------------------------------------</b>
@foreach($topic_posts as $post)			
<div class="post text-center">
{{--publisher avatar--}}
	<div class="avatar">
		@if(strlen($post->user->profile->avatar) == 0)
<a href="
	@if($post->user->profile->user_id == Auth::id() )
		{{route('profile.show')}}
	
	@else
	{{route('profile.user',['id'=>$post->user->profile->user_id])}}
	
	@endif
	">

		<img src="{{asset('avatars/ava.jpg')}}" class="img-circle" width="60" height="60">
</a>
		@else
<a href="{{route('profile.user',['id'=>$post->user->profile->user_id])}}">
		<img src="{{asset($post->user->profile->avatar)}}" class="img-circle" width="60" height="60">
</a>
		@endif
	</div>

	{{--post content--}}	
	<div class="post-content">
		<p><b><bdi>" {{$post->post}}"</bdi></b></p>
	</div>
	
	<div class="post-publisher">
		@if($post->user_id != Auth::id())
		<p>by <i>{{$post->user->profile->display_name}}</i></p>
		@if($post->isLikedBy(Auth::id()))


		<div class="post-reaction">

			<a href="{{route('post.like',['id'=>$post->id])}}" class="btn selected"><i class="fas fa-thumbs-up fa-1x"></i>({{$post->likesCount}})</a>

			<a href="{{route('post.dislike',['id'=>$post->id])}}" class="btn"><i class="fas fa-thumbs-down fa-1x"></i>({{$post->dislikesCount}})</a>

		</div>

		@elseif($post->isDisLikedBy(Auth::id()))


		<div class="post-reaction">
			<a href="{{route('post.like',['id'=>$post->id])}}" class="btn"><i class="fas fa-thumbs-up fa-1x"></i>({{$post->likesCount}})</a>
			<a href="{{route('post.dislike',['id'=>$post->id])}}" class="btn selected"><i class="fas fa-thumbs-down fa-1x"></i>({{$post->dislikesCount}})</a>
		</div>
		@else
		<div class="post-reaction">
			<a href="{{route('post.like',['id'=>$post->id])}}" class="btn"><i class="fas fa-thumbs-up fa-1x"></i>({{$post->likesCount}})</a>
			<a href="{{route('post.dislike',['id'=>$post->id])}}" class="btn"><i class="fas fa-thumbs-down fa-1x"></i>({{$post->dislikesCount}})</a>
		</div>

@endif
	<div class="follow-user">
		
		<a href="{{route('toggleFollow',['user_id'=>$post->user_id])}}">
	@if(Auth::user()->following()->where('user_id',$post->user_id)->get()->count())
		
		
		<b class="btn btn-danger btn-sm " title="unfollow"> 
		unfollow <i class="fas fa-times"></i></b>
		
	@else
	
		<b class="btn btn-success btn-sm " title="follow"> follow <i class="fas fa-check"></i></b>
		@endif
	
		</a>
	
	
	
	</div>
		

		@else
		
		<div class="post-reaction">
			<a href="#" class="btn"><i class="fas fa-thumbs-up fa-1x"></i>({{$post->likesCount}})</a>
			<a href="#" class="btn"><i class="fas fa-thumbs-down fa-1x"></i>({{$post->dislikesCount}})</a>
		</div>
		<form action="{{route('post.delete',['id'=>$post->id])}}" method="post">
			@method('DELETE')
			@csrf
			<button type="submit" onclick="return confirm('sure?');" class="btn btn-danger btn-xs"><i class="fas fa-trash-alt fa-1x"></i>
			</button>
		</form>
		&nbsp;
		<p>by <b>you</b></p>

				@endif

	</div>
		
		<div class="post-topic">
			<i style="color: black;font-weight: bolder">{{$post->topic->topic}}</i>
		</div>
	<div class="post-time">
		<p><i>{{$post->created_at->diffForHumans()}}</i></p>
	</div>
</div>
<hr>

		@endforeach

</div></div>