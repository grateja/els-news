<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class GoogleNews extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'status', 'totalResults',
    ];

    public function articles() {
        return $this->hasMany('App\Article');
    }

    public static function incrementCounter() {
        $g = GoogleNews::latest('created')->first();
        $g->update([
            'totalResults' => $g->totalResults + 1
        ]);
    }

    public static function generateNews() {
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET', 'https://newsapi.org/v2/top-headlines?country=ph&apiKey=e8f43388480f45dd8e297078121879fa');
        $result = $res->getBody()->getContents();
        $resultToJSON = json_decode($result);


        return DB::transaction(function() use ($resultToJSON) {
            $googleNews = GoogleNews::create([
                'status' => $resultToJSON->status,
                'totalResults' => $resultToJSON->totalResults,
            ]);

            $articles = collect($resultToJSON->articles)->map(function($article) use ($googleNews) {
                $date = new \DateTime($article->publishedAt);

                $article->google_news_id = $googleNews->id;
                $article->source = $article->source->name;
                $article->publishedAt = $date;
                return collect($article);
            });

            Article::insert($articles->toArray());

            return $googleNews->fresh(['articles' => function($query) {
                $query->limit(5);
            }]);
        });
    }
}
