<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class RetreiveGoogleNews extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'newsapi:getall';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Retreives news from google news api';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        \App\GoogleNews::generateNews();
    }
}
