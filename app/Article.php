<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'google_news_id', 'source', 'author', 'title', 'description', 'url', 'urlToImage', 'publishedAt', 'content',
    ];

    public function googleNews() {
        return $this->belongsTo('App\GoogleNews');
    }
}
