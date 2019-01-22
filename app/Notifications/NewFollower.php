<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class NewFollower extends Notification
{
    use Queueable;

    public $follower_id;
    public $follower_display_name;
    public $avatar ;
    public function __construct($follower_id,$follower_display_name="someone",$avatar)
    {
        $this->follower_id = $follower_id;
        $this->follower_display_name = $follower_display_name;
        $this->avatar = $avatar;
    }

    public function via($notifiable)
    {
        return ['database','broadcast'];
    }
    public function toArray($notifiable)
    {
      return[
        "message"=>"started following you",
        "follower_id"=>$this->follower_id,
        "follower_display_name"=>$this->follower_display_name,
        "avatar"=>$this->avatar,
      ];
    }

}
