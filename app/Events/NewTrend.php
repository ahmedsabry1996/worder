<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class NewTrend implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public function __construct()
    {

    }

    public function broadcastWith()
    {
      return [
        'msg'=>'بسم الله الرحمن الرحيم'
      ];
    }

    public function broadcastAs()
    {
      return 'newTrend';
    }
    public function broadcastOn()
    {
        return new Channel('trend');
    }


}
