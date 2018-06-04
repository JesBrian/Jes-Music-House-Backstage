<?php

namespace App\Service;

use App\Config\MsgConfig;
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
        $returnState = StateCodeConfig::COMMON_STATE_CODE['base'];
        $returnData = [];

        $saveUserResult = User::addUser($phone, $passwd);
        if ($saveUserResult === true) {
            $returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
        } else {
            $returnState = StateCodeConfig::COMMON_STATE_CODE['failure'];
        }

        $returnMsg = MsgConfig::RETURN_MESSAGE[$returnState];
        return parent::ajaxStandardizationReturn($returnState, $returnData, $returnMsg);
    }
}
