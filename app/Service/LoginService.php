<?php

namespace App\Service;

class LoginService extends Service
{
    public static function loginService($phone)
    {
        $phone = [
            'phone' => $phone
        ];
        return parent::ajaxStandardizationReturn('200', $phone, '666');
    }
}
