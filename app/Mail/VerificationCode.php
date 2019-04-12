<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class VerificationCode extends Mailable
{
    use Queueable, SerializesModels;

    public $msg;
    public $code;
    public function __construct($msg,$code)
    {
        $this->msg = $msg;
        $this->code = $code;
    }

    public function build()
    {
        return $this->view('emails.verificationcode',['code'=>$this->code,'msg'=>$this->msg]);
    }
}
