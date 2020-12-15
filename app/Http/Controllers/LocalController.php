<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Event;
use App\Announcement;
use App\SysDefault;

class LocalController extends Controller
{
    public function checkAll() {

        $event = Event::select('updated_at')
            ->orderBy('id', 'desc')
            ->whereDate('date', Carbon::now())
            ->first();

        $announcement = Announcement::select('updated_at')
            ->orderBy('id', 'desc')
            ->whereDate('date', Carbon::now())
            ->first();

        if($announcement == null || $event == null) {
            $defaults = SysDefault::find(1);
        }

        return response()->json([
            'board' => $event ? $event->updated_at : $defaults->event->updated_at,
            'announcement' => $announcement ? $announcement->updated_at : $defaults->announcement->updated_at,
        ], 200);
    }
}
