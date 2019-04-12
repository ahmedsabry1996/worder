<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLatestPostsTable extends Migration
{
    public function up()
    {
        Schema::create('latest_posts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('country_id');
            $table->bigInteger('posts_number')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('latest_posts');
    }
}
