<?php

namespace App\Service;

use App\Config\StateCodeConfig;
use App\Models\User;

class RegisterService extends Service
{
    /**
     * Notes: 新用户注册发送手机验证码
     * @param string $phone
     * @param string $passwd
     * @return array
     */
    public static function userRegisterService(string $phone, string $passwd): array
    {
        $checkUserExistResult = User::checkUserExistByPhone($phone);

        /* 判断手机号码是否已经注册,用户是否已存在 */
        if ($checkUserExistResult === true) { // 用户已注册
            parent::$returnState = StateCodeConfig::USER_REGISTER_STATE_CODE['phoneExist'];
        } else { // 用户未注册
            parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
            session(['phone' => $phone, 'passwd' => $passwd, 'identifyingCode' => '0000']);
        }
        return parent::ajaxStandardizationReturn();
    }

    /**
     * Notes: 判断验证码输入是否正确
     * @param string $code
     * @return array
     */
    public static function checkIdentifyingCodeService(string $code): array
    {
        /* 判断输入的验证码正确性 */
        if ($code === session('identifyingCode')) { // 验证码正确
            $createUserResult = UserService::createUserService(session('phone'), session('passwd'));
            if ($createUserResult['state'] === StateCodeConfig::COMMON_STATE_CODE['success']) {
                /* 删除 session 缓存的注册信息 */
                session(['phone' => null, 'passwd' => null, 'identifyingCode' => null]);
            }
            parent::$returnState = $createUserResult['state'];
        } else { // 验证码错误
            parent::$returnState = StateCodeConfig::IDENTIFYING_CODE_STATE_CODE['error'];
        }
        return parent::ajaxStandardizationReturn();
    }
}
