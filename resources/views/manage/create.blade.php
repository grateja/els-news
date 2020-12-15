@extends('layouts.app')

@section('content')

<div class="container">
    <h3>Create new event</h3>
    <hr>
    @if($event)
        <div class="alert alert-info">
            Saved from drafts.
        </div>
    @endif
    <form action="{{$action}}" method="POST">
        {{csrf_field()}}

        <div class="form-group">
            <label for="date">Date:</label>
            <input type="date" name="date" id="date" class="form-control" value="{{ old('date') ? old('date') : $event ? $event->date : '' }}">
            <span class="text-danger">{{$errors->first('date')}}</span>
        </div>

        <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" name="title" id="title" class="form-control" value="{{ old('title') ? old('title') : $event ? $event->title : '' }}">
            <span class="text-danger">{{$errors->first('title')}}</span>
        </div>

        <div class="form-group">
            <label for="description">Description:</label>
            <textarea name="description" id="description" rows="5" class="form-control">{{ old('description') ? old('description') : $event ? $event->description : '' }}</textarea>
        </div>

        <h4>Event type</h4>
        <hr>

        @foreach($eventTypes as $eventType)
            <div class="form-check form-check-inline">
                <label for="evt{{ $eventType->id }}">
                    <input type="radio" name="event_type_id" id="evt{{ $eventType->id }}" value="{{ $eventType->id }}" {{ $event ? ($eventType->id == $event->event_type_id ? 'checked' : '') : $eventType->id == 1 ? 'checked' : '' }}> {{ $eventType->name }}
                </label>
            </div>
        @endforeach
        <hr>

        <div class="form-group">
            <input type="submit" value="Next" class="btn btn-primary btn-lg">
        </div>

    </form>
</div>

@endsection
