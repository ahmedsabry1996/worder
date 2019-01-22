<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Post as post;
class sayhi extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:hi';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Simple command that prints hi';

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
      $post = new post();
      $post->user_id = 1;
      $post->post = 'hello guys';
      $post->country_id = 1;
      $post->topic_id = 1;
      $post->save();

    }
}
