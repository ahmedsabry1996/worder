<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class ProfileVerified extends Notification
{
    use Queueable;

    public $user_id;

    public function __construct($user_id)
    {
        $this->user_id = $user_id;
    }

    public function via($notifiable)
    {
        return ['broadcast','database'];
    }


    public function toArray($notifiable)
    {
        return [
            "message"=>'Congrates! your profile has been verified',
            "user_id"=>$this->user_id
        ];
    }
}
