<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFollowersCountersTable extends Migration
{

    public function up()
    {
        Schema::create('followers_counters', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('followers')->default(0)->unsigned();
            $table->integer('following')->default(0)->unsigned();
            $table->timestamps();
        });
    }

  
    public function down()
    {
        Schema::dropIfExists('followers_counters');
    }
}
