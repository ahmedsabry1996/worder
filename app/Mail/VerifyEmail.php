<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class VerifyEmail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct($code)
    {

        $this->code= $code ;
    }

    public function build()
    {
        return $this->view('emails.verify',['code'=>$this->code])->from('no-reply@words.co');
    }
}
