<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class testTest extends TestCase
{

    public function testExample()
    {

      $res = $this->json('POST','/api/show',['topic_id'=>1]);

      $res->assertStatus(201);


    }
}
