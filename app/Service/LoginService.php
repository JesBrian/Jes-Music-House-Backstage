<?php

namespace App\Service;

use App\Component\HelpTool;
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
        $loginUserModel = User::getUserLoginInfoByPhone($phone);
        if ($loginUserModel === null) {
            parent::$returnState = StateCodeConfig::USER_LOGIN_STATE_CODE['userNoExistent'];
        } else {
            if ($loginUserModel['passwd'] === md5($loginUserModel['salt'] . $passwd)) {
                $loginUserModel->loginTime = time();
                $loginUserModel->save();
                parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
                $loginUserInfo = $loginUserModel->toArray();
                $loginUserInfo = HelpTool::delArrayElement($loginUserInfo, ['phone', 'salt', 'passwd', 'loginTime']);
                parent::$returnData = $loginUserInfo;
            } else {
                parent::$returnState = StateCodeConfig::USER_LOGIN_STATE_CODE['passwdError'];
            }
        }
        return parent::ajaxStandardizationReturn();
    }
}
