<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class NewLike implements  ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


     public $user;
    public function __construct($user)
    {
        $this->user = $user;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('user'.$this->user->id);

    }

    public function broadcastWith()
    {
      return[
        'msg'=>'u have some new likes',
      ];
    }
}
