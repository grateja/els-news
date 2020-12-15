@extends('layouts.app')

@section('content')

<div class="container">
    <slide-show id="{{$event->id}}" />
    <!-- <div class="row">
        <div class="col-sm-12">
            @include('boards/_event-partial')
        </div>
    </div>
    <div class="row">
        <div class="col-sm-3">
            <ul class="list-group">
                @foreach($event->images as $image)
                    <li class="list-group-item">
                        <img src="/{{$image->source}}" alt="" class="w-100">
                    </li>
                @endforeach
            </ul>
        </div>
        <div class="col-sm-9">
            include('boards/slides/_slideshow-partial', ['images' => $event->images])
            <slide-show/>
        </div>
    </div> -->
</div>

@endsection
