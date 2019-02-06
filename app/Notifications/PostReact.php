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


    public $icon;
    public $message;
    public $url;
    public $reacter_id;
    public $updated_post;
    public function __construct($icon,$message,$url,$reacter_id,$updated_post)
    {
      $this->icon = $icon;
      $this->message = $message;
      $this->url = $url ;
      $this->reacter_id = $reacter_id;
      $this->updated_post = $updated_post;
    }

    public function via($notifiable)
    {
        return ['database','broadcast'];
    }



public function toArray($notifiable)
  {
  return [
      'icon'=>$this->icon,
      'message'=>$this->message,
      'url'=>$this->url,
      'reacter_id'=>$this->reacter_id,
      'updated_post'=>$this->updated_post
  ];
}

}
