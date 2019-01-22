@extends('layouts.app')

@section('content')
{{--create new post--}}

@include('included.createpost') 

{{--timeline--}}

@include('included.timeline') 

{{-- followers	--}}

@include('included.follower') 

{{--post words counter--}}

@include('included.jquerypost')

@endsection
