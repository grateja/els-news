<?php

use Illuminate\Database\Seeder;

class SysDefaultsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\SysDefault::create([
            'event_id' => 1,
            'announcement_id' => 1,
        ]);
    }
}
