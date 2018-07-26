<?php

namespace App\Service;

use App\Config\StateCodeConfig;
use App\Models\User;
use App\Models\UserInfo;

class UserService extends Service
{
    /**
     * Notes: 将新用户信息存入数据库
     * @param string $phone
     * @param string $passwd
     * @return array
     */
    public static function createUserService(string $phone, string $passwd): array
    {
        $saveUserResult = User::addUser($phone, $passwd);
        if ($saveUserResult === false) {
            parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['failure'];
        } else {
            parent::$returnData = $saveUserResult;
            parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
        }
        return parent::ajaxStandardizationReturn();
    }


    /**
     * Notes: 根据用户 ID 获取用户基本信息
     * @param $userId
     * @return array
     */
    public static function getUserBaseInfoByIdService($userId)
    {
        parent::$returnData = UserInfo::getUserBaseInfoById($userId);
        parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
        return parent::ajaxStandardizationReturn();
    }


    /**
     * Notes: 修改用户基本信息
     */
    public static function updateUserBaseInfoService($infoData)
    {
        User::updateUsername($infoData['userId'], $infoData['username']);
        UserInfo::updateUserBaseInfo($infoData);
        parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
        return parent::ajaxStandardizationReturn();
    }
}
