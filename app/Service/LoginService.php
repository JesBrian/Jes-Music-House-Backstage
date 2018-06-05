<?php

namespace App\Service;

use App\Config\MsgConfig;
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
        $returnState = StateCodeConfig::COMMON_STATE_CODE['base'];
        $returnData = [];

        $loginUserInfo = User::getUserLoginInfoByPhone($phone);
        if ($loginUserInfo === null) {
            $returnState = StateCodeConfig::USER_LOGIN_STATE_CODE['userNoExistent'];
        } else {
            $loginUserInfo = $loginUserInfo->toArray();
            if ($loginUserInfo['passwd'] === md5($loginUserInfo['salt'] . $passwd)) {
                $returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
            } else {
                $returnState = StateCodeConfig::USER_LOGIN_STATE_CODE['passwdError'];
            }
        }

        $returnMsg = MsgConfig::RETURN_MESSAGE[$returnState];
        return parent::ajaxStandardizationReturn($returnState, $returnData, $returnMsg);
    }
}
