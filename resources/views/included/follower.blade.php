<?php
  use App\User as user;
 ?>
   <div class="modal fade" id="followers" role="dialog">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="text-center modal-title">my fans</h4>
        </div>
        <div class="modal-body">
<div class="row">
 <div class="pills col-md-5 col-md-push-4">
  <ul class="nav nav-pills ">
    <li class="text-center"><a data-toggle="pill" href="#menu1">Followers</a></li>
    <li class="text-center"><a data-toggle="pill" href="#menu2">Following</a></li>
  </ul>
  </div>
  </div>
  <div class="tab-content">
    <div id="menu1" class="tab-pane fade text-center active">
      <h3>Followers</h3>
      @if(Auth::user()->followers()->get()->count() !=0)
     
	 	<h4>{{ Auth::user()->followers()->get()->count()}}</h4>	

 		@foreach( Auth::user()->followers as $follower)
	<a href="{{route('profile.user',['id'=>$follower->profile->user_id])}}">
	<div class="row">
	<img src="{{asset(Auth::user()->profile->avatar)}}" class="img-rounded" alt="{{$follower->profile->display_name}}" width="50" height="50"> 
		</div>
	<span>{{$follower->profile->display_name}}</span></a>
 			@endforeach

 		 @else
      	<div class="alert alert-info">
	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;
</button>
	you have no followers 
      </div>

      @endif
    </div>
    <div id="menu2" class="tab-pane fade text-center">
      <h3>Following</h3>
   @if(Auth::user()->following()->get()->count() !== 0)
   	
	<h4>{{ Auth::user()->following()->get()->count()}}</h4>	
 	
 	@foreach( Auth::user()->following as $following)
 	
 	<a href="{{route('profile.user',['id'=>$following->profile->user_id])}}">
	@if(strlen($following->profile->avatar) == 0)
	<div class="row">
	<img src="{{asset('avatars/ava.jpg')}}" class="img-rounded" alt="{{$following->profile->display_name}}" width="50" height="50"> 
		</div>
	@else
	<div class="row">
	<img src="{{asset($following->profile->avatar)}}" class="img-rounded" alt="{{$following->profile->display_name}}" width="50" height="50"> 
		</div>
	@endif
	<span>{{$following->profile->display_name}}</span></a>
 
		
 			@endforeach
		
		@else
		
			<div class="alert alert-info">
	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">
</button>
			you haven't follow anyone 
</div>
   @endif
    </div>
  </div>
		  
       </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
 