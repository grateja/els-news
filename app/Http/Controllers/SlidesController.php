<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

use Carbon\Carbon;

use App\Event;
use App\Slide;

class SlidesController extends Controller
{
    public function index() {

    }

    public function create($id) {
        $event = Event::findorFail($id);

        $data = [
            'event' => $event,
        ];

        return view('boards/slides/create', $data);
    }

    public function view($id) {
        $event = Event::with('eventType', 'images')->findorFail($id);

        $data = [
            'event' => $event,
        ];

        return view('boards/slides/preview', $data);
    }

    public function delete($slideId) {
        $slide = Slide::findorFail($slideId);

        \DB::transaction(function () use ($slide) {
            $slide->event->update([
                'updated_at' => Carbon::now()
            ]);
            $source = $slide->source;
            if($slide->delete()) {
                File::delete(public_path() . $source);
            }
        });

        return response()->json([
            'message' => 'Slide delete successfully'
        ], 200);
    }
}
