<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReportsTable extends Migration
{

    public function up()
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->increments('id');
            $table->bigInteger('post_id');
            $table->bigInteger('user_id');
            $table->string('reason');
            $table->text('notes');
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('reports');
    }
}
