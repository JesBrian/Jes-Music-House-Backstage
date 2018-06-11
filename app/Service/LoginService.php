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
        /* 根据手机获取用户信息 */
        $loginUserModel = User::getUserLoginInfoByPhone($phone);

        if ($loginUserModel === null) { // 用户不存在
            parent::$returnState = StateCodeConfig::USER_LOGIN_STATE_CODE['userNoExistent'];
        } else if ($loginUserModel['passwd'] === md5($loginUserModel['salt'] . $passwd)) { // 用户密码正确
            $loginUserModel->loginTime = time();
            $loginUserModel->save();
            parent::$returnState = StateCodeConfig::USER_LOGIN_STATE_CODE['loginSuccess'];
            $loginUserInfo = $loginUserModel->toArray();
            $loginUserInfo = HelpTool::delArrayElement($loginUserInfo, ['phone', 'salt', 'passwd', 'loginTime']);
            parent::$returnData = $loginUserInfo;
        } else { // 用户密码错误
            parent::$returnState = StateCodeConfig::USER_LOGIN_STATE_CODE['passwdError'];
        }
        return parent::ajaxStandardizationReturn();
    }

    /**
     * Notes: 检验用户登录状态逻辑处理
     * @param string $userId
     * @param string $username
     * @return array
     */
    public static function verifyUserLoginSevice(string $userId, string $username): array
    {
        $userModel = User::getUserById($userId);

        // 判断用户是否存在 && 用户信息是否正确
        if (($userModel === null) || ($userModel->username !== $username)) {
            parent::$returnState = StateCodeConfig::USER_LOGIN_STATE_CODE['verifyLoginError'];
        } else {
            $userModel->loginTime = time();
            $userModel->save();
            parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
        }

        return parent::ajaxStandardizationReturn();
    }
}
