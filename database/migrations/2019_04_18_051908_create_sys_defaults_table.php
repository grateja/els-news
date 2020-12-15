<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSysDefaultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sys_defaults', function (Blueprint $table) {
            $table->increments('id');

            // default event
            $table->unsignedInteger('event_id')->nullable();

            // default announcement
            $table->unsignedInteger('announcement_id')->nullable();

            $table->timestamps();

            $table->foreign('event_id')->references('id')->on('events')->onDelete('CASCADE');
            $table->foreign('announcement_id')->references('id')->on('announcements')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('defaults');
    }
}
