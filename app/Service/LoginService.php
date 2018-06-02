<?php

namespace App\Service;

class LoginService extends Service
{
    /**
     * Notes: 手机登录逻辑处理
     * User: JesBrian
     * Date: 2018-06-02
     * Time: 10:55
     * @param string $phone
     * @param string $passwd
     * @return array
     */
    public static function phoneLoginService(string $phone, string $passwd): array
    {
        return parent::ajaxStandardizationReturn('200', [
            'phone' => $phone,
            'passwd' => $passwd
        ], '666');
    }
}
