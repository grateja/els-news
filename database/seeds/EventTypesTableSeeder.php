<?php

use Illuminate\Database\Seeder;

class EventTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $eventTypes = [
            [
                'name' => 'slides',
            ],
            [
                'name' => 'video',
            ],
            [
                'name' => 'text',
            ],
            [
                'name' => 'youtube',
            ],
        ];

        \App\EventType::insert($eventTypes);
    }
}
