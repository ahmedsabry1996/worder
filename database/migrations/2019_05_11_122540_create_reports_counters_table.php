<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReportsCountersTable extends Migration
{

    public function up()
    {
        Schema::create('reports_counters', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('post_id');
            $table->integer('reports_num');
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('reports_counters');
    }
}
