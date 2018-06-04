<?php

namespace App\Service;

use App\Config\MsgConfig;
use App\Config\StateCodeConfig;
use App\Models\User;

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
        session(['phone' => $phone, 'passwd' => $passwd]);
        return parent::ajaxStandardizationReturn('200', [
            'phone' => $phone,
            'passwd' => $passwd
        ], '666');
    }

    /**
     * Notes:
     * User: JesBrian
     * Date: 2018-06-03
     * Time: 20:48
     * @param string $code
     * @return array
     */
    public static function checkIdentifyingCodeService(string $code): array
    {
        $phone = session('phone');
        $passwd = session('passwd');

        $returnState = StateCodeConfig::COMMON_STATE_CODE['base'];
        $returnData = [];

        /* 判断输入的验证码正确性 */
        if ($code === session('identifyingCode')) { // 验证码正确
            $addUserResult = self::addOneUserToDataBaseService($phone, $passwd);
            if ($addUserResult['state'] === StateCodeConfig::COMMON_STATE_CODE['success']) {
                /* 删除 session 缓存的注册信息 */
                session(['phone' => null, 'passwd' => null, 'identifyingCode' => null]);
            }
            $returnState = $addUserResult['state'];
        } else { // 验证码错误
            $returnState = StateCodeConfig::IDENTIFYING_CODE_STATE_CODE['error'];
        }
        $returnMsg = MsgConfig::RETURN_MESSAGE[$returnState];

        return parent::ajaxStandardizationReturn($returnState, $returnData, $returnMsg);
    }

    /**
     * Notes:
     * User: JesBrian
     * Date: 2018-06-03
     * Time: 20:41
     * @param string $phone
     * @param string $passwd
     * @return array
     */
    public static function addOneUserToDataBaseService(string $phone, string $passwd): array
    {
        User::addUser($phone, $passwd);
        return parent::ajaxStandardizationReturn('200', [
            'phone' => $phone,
            'passwd' => $passwd
        ],'');
    }
}
