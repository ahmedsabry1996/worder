<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProfilesTable extends Migration
{

    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
			      $table->integer('gender_id');
            $table->integer('country_id');
            $table->string('locale')->default('en');
            $table->string('avatar')->default('storage/avatars/placeholder.jpg');
            $table->string('display_name')->unique();
            $table->date('birth_date');
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profiles');
    }
}
