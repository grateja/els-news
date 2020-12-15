<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;
use App\Article;
use App\GoogleNews;
use Carbon\Carbon;

class NewsController extends Controller
{
    public function index() {
        $images = [];
        for ($index = 1; $index <= 3; $index++) {
            $active = $index == 1;
            $images[] = [
                'src' => "img/today/img ($index).jpg",
                'active' => $active ? 'active' : ''
            ];
        }
        $data = ['images' => $images];
        return view('news/index', $data);
    }

    public function eventToday() {
        return view('news/index');
        // $event = Event::with('slides')->where('date', date('Y-m-d'))->first();
        // if($event) {
        //     $data = ['images' => $event->images];
        //     return view('news/index', $data);
        // }
    }

    public function getNews(Request $request) {
        $news = GoogleNews::with(['articles' => function($query) use ($request) {
            $query->skip($request->page)->limit(1);
        }])
            ->whereDate('created', Carbon::today())
            ->latest('created')->first();

        return response()->json([
            'article' => $news->articles->first()
        ], 200);
    }

    public function getInitialNews() {
        $news = GoogleNews::with(['articles' => function($query) {
            $query->limit(5)->select('id', 'google_news_id', 'title', 'description', 'urlToImage');
        }])
            ->whereDate('created', Carbon::today())
            ->latest('created')->first();

        if(!$news) {
            $news = GoogleNews::generateNews();
            // return response()->json([
            //     'message' => 'No available news today',
            // ], 404);
        }

        return response()->json([
            'news' => $news
        ], 200);
    }
}
