<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class NewFollower extends Notification
{
    use Queueable;

    public $icon ;
    public $message;
    public $url;

    public function __construct($icon,$message,$url)
    {

      $this->icon = $icon;
      $this->message = $message;
      $this->url = $url;

    }

    public function via($notifiable)
    {
        return ['database','broadcast'];
    }
    public function toArray($notifiable)
    {
      return[
        'icon'=>$this->icon,
        'message'=>$this->message,
        'url'=>$this->url
      ];
    }

}
