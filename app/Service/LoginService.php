<?php

namespace App\Service;

class LoginService extends Service
{
    public static function loginService()
    {
        return parent::ajaxStandardizationReturn('200', [6,8], '666');
    }
}
