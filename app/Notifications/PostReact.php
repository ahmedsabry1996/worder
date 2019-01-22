<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\BroadcastMessage;
class PostReact extends Notification
{
    use Queueable;

    public $msg = "reacted to your post!";
    public $post_id ;
    public $reacter_id;
    public $display_name;
    public $avatar;
    public function __construct($post_id,$reacter_id,$display_name,$avatar)
    {
        $this->post_id = $post_id;
        $this->reacter_id = $reacter_id;
        $this->display_name = $display_name;
        $this->avatar = $avatar;
    }

    public function via($notifiable)
    {
        return ['database','broadcast'];
    }



public function toArray($notifiable)
  {
  return [
      'message'=>$this->msg,
      'post_id'=>$this->post_id,
      'reacter_id'=>$this->reacter_id,
      'reacter_display_name'=>$this->display_name,
      'profile_avatar'=>$this->avatar,
  ];
}

}
