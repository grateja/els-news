<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $fillable = [
        'event_id', 'source', 'title', 'description', 'order'
    ];

    public function event() {
        return $this->belongsTo('App\Event');
    }
}
