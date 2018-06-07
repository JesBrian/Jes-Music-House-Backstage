<?php

namespace App\Service;

use App\Config\StateCodeConfig;
use App\Models\User;

class LoginService extends Service
{
    /**
     * Notes: 手机号码登录逻辑处理
     * @param string $phone
     * @param string $passwd
     * @return array
     */
    public static function phoneLoginService(string $phone, string $passwd)
    {
        parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['base'];
        $loginUserInfo = User::getUserLoginInfoByPhone($phone);
        if ($loginUserInfo === null) {
            parent::$returnState = StateCodeConfig::USER_LOGIN_STATE_CODE['userNoExistent'];
        } else {
            $loginUserInfo = $loginUserInfo->toArray();
            if ($loginUserInfo['passwd'] === md5($loginUserInfo['salt'] . $passwd)) {
                parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
            } else {
                parent::$returnState = StateCodeConfig::USER_LOGIN_STATE_CODE['passwdError'];
            }
        }
        return parent::ajaxStandardizationReturn();
    }
}
