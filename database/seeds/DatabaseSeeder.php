<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(\UserTableSeeder::class);
        $this->call(\EventTypesTableSeeder::class);
        $this->call(\EventsTableSeeder::class);
        $this->call(\SlidesTableSeeder::class);
        $this->call(\AnnouncementsDataSeeder::class);
        $this->call(\SysDefaultsTableSeeder::class);
    }
}
