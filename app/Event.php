<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title', 'description', 'date', 'event_type_id', 'updated_at'
    ];

    public function slides() {
        return $this->hasMany('App\Slide');
    }

    public function eventType() {
        return $this->belongsTo('App\EventType');
    }

    public function video() {
        return $this->hasOne('App\Video');
    }
}
