<?php

namespace App\Service;

class RegisterService extends Service
{
    /**
     * Notes:
     * User: JesBrian
     * Date: 2018-06-02
     * Time: 10:55
     * @param string $phone
     * @param string $passwd
     * @return array
     */
    public static function userRegisterService(string $phone, string $passwd): array
    {
        return parent::ajaxStandardizationReturn('200', [
            'phone' => $phone,
            'passwd' => $passwd
        ], '666');
    }

    /**
     * Notes:
     * User: JesBrian
     * Date: 2018-06-02
     * Time: 12:35
     * @param string $code
     * @return array
     */
    public static function checkIdentifyingCodeService(string $code): array
    {
        return parent::ajaxStandardizationReturn('200', [
            'code' => $code
        ], '888');
    }
}
