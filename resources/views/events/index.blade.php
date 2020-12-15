@extends('layouts.app')

@section('content')
<div class="container">
    <div class="events">
        <a href="/events/create">Create new event</a>
        <hr>
        <ul class="list-group">
            @foreach($events as $event)
                <li class="list-group-item">
                    <h4><a href="/boards/{{$event->eventType->name}}/{{$event->id}}/preview">{{$event->title}}</a></h4>
                    <p>{{$event->description}}</p>
                </li>
            @endforeach
        </ul>
    </div>
</div>
@endsection
