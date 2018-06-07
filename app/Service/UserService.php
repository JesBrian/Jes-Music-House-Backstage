<?php

namespace App\Service;

use App\Config\StateCodeConfig;
use App\Models\User;

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
        if ($saveUserResult === true) {
            parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
        } else {
            parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['failure'];
        }
        return parent::ajaxStandardizationReturn();
    }
}
