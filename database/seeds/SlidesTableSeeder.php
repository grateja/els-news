<?php

use Illuminate\Database\Seeder;

class SlidesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $slides = [
            [
                'source' => '/img/defaults/img (1).jpg',
                'order' => 1,
                'caption' => '[caption sample 1]',
                'description' => '[description sample 1]',
                'event_id' => 1,
            ],
            [
                'source' => '/img/defaults/img (2).jpg',
                'order' => 2,
                'caption' => '[caption sample 2]',
                'description' => '[description sample 2]',
                'event_id' => 1,
            ],
            [
                'source' => '/img/defaults/img (3).jpg',
                'order' => 3,
                'caption' => '[caption sample 3]',
                'description' => '[description sample 3]',
                'event_id' => 1,
            ],
            [
                'source' => '/img/defaults/img (4).jpg',
                'order' => 4,
                'caption' => '[caption sample 4]',
                'description' => '[description sample 4]',
                'event_id' => 1,
            ],
            [
                'source' => '/img/defaults/img (5).jpg',
                'order' => 5,
                'caption' => '[caption sample 5]',
                'description' => '[description sample 5]',
                'event_id' => 1,
            ],
        ];

        \App\Slide::insert($slides);
    }
}
