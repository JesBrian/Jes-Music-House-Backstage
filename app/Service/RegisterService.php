<?php

namespace App\Service;

use App\Config\MsgConfig;
use App\Config\StateCodeConfig;
use App\Models\User;

class RegisterService extends Service
{
    /**
     * Notes:
     * @param string $phone
     * @param string $passwd
     * @return array
     */
    public static function userRegisterService(string $phone, string $passwd): array
    {
        $returnState = StateCodeConfig::COMMON_STATE_CODE['base'];
        $returnData = [];

        $checkUserExistResult = User::checkUserExistByPhone($phone);

        /* 判断手机号码是否已经注册,用户是否已存在 */
        if ($checkUserExistResult === true) {
            $returnState = StateCodeConfig::USER_REGISTER_STATE_CODE['phoneExist'];
        } else {
            $returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
            session(['phone' => $phone, 'passwd' => $passwd, 'identifyingCode' => '0000']);
        }

        $returnMsg = MsgConfig::RETURN_MESSAGE[$returnState];

        return parent::ajaxStandardizationReturn($returnState, $returnData, $returnMsg);
    }

    /**
     * Notes: 判断验证码输入是否正确
     * @param string $code
     * @return array
     */
    public static function checkIdentifyingCodeService(string $code): array
    {
        $returnState = StateCodeConfig::COMMON_STATE_CODE['base'];
        $returnData = [];

        /* 判断输入的验证码正确性 */
        if ($code === session('identifyingCode')) { // 验证码正确

            $createUserResult = UserService::createUserService(session('phone'), session('passwd'));

            if ($createUserResult['state'] === StateCodeConfig::COMMON_STATE_CODE['success']) {
                /* 删除 session 缓存的注册信息 */
                session(['phone' => null, 'passwd' => null, 'identifyingCode' => null]);
            }
            $returnState = $createUserResult['state'];
        } else { // 验证码错误
            $returnState = StateCodeConfig::IDENTIFYING_CODE_STATE_CODE['error'];
        }
        $returnMsg = MsgConfig::RETURN_MESSAGE[$returnState];

        return parent::ajaxStandardizationReturn($returnState, $returnData, $returnMsg);
    }
}
