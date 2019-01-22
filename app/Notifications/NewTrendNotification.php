<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class NewTrendNotification extends Notification
{
    use Queueable;


    public function __construct()
    {
        //
    }

    public function toArray($notifiable)
    {
        return [
            'msg'=>"hello"
        ];
    }

}
