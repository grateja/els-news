<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;

class ManageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Request $request) {
        $events = Event::where('title', 'like', "%$request->keyword%")->get();
        return view('manage/events', [
            'events' => $events
        ]);
    }

    public function show($id) {
        $event = Event::with('images')->findorFail($id);

        if($event) {
            return view('manage/show', [
                'event' => $event
            ]);
        }
    }

    public function create($id = 0, $event_type = null) {
        $event = null;

        if(!$id || !$event_type) {
            // check for drafts
            $event = Event::where('published', false)->first();
        }

        if(!$event) {
            // check for existing one
            $event = Event::with('eventType')->find($id);
        }

        $data = [
            'event' => $event,
            'eventTypes' => \App\EventType::all(),
            'action' => $event ? "/manage/events/$event->id/update" : '/manage/store',
        ];

        switch ($event->eventType->name) {
            case 'slides':
                return view('manage/create-slides', $data);
            case 'video':
                return view('manage/create-video', $data);
            case 'text':
                return view('manage/create-text', $data);
            case 'youtube':
                return view('manage/create-youtube', $data);
            default:
                return view('manage/create', $data);
        }
    }

    public function store(Request $request) {
        $rules = [
            'title' => 'required',
            'date' => 'required',
        ];

        if(Event::where('date', $request->date)->exists()) {
            return redirect()->back()
                ->withErrors(['date' => 'There is already an event pointed to this date'])
                ->withInput($request->input());
        }

        if($request->validate($rules)) {
            $event = Event::create($request->only([
                'title', 'description', 'date', 'event_type_id'
            ]));
        }

        return redirect('/manage/create/' . $event->id . '/' . $request->event_type);
    }

    public function update($id, Request $request) {

    }
}
