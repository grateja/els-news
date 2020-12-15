<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SysDefault extends Model
{
    public function announcement() {
        return $this->belongsTo('App\Announcement');
    }

    public function event() {
        return $this->belongsTo('App\Event');
    }
}
