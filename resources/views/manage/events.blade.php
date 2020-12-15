@extends('layouts.app')

@section('content')

<div class="container">
    <a href="/manage/create">Create event</a>
    <hr>
    {{$events}}
</div>

@endsection
