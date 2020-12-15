<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Carbon\Carbon;
use App\Video;

class VideosController extends Controller
{
    public function delete($videoId) {
        $video = Video::findorFail($videoId);

        \DB::transaction(function () use ($video) {
            $video->event->update([
                'updated_at' => Carbon::now()
            ]);
            $source = $video->source;
            if($video->delete()) {
                File::delete(public_path() . $source);
            }
        });

        return response()->json([
            'message' => 'Video delete successfully'
        ], 200);
    }
}
