<?php

namespace App\Config;

class StateCodeConfig
{
    public const COMMON_STATE_CODE = [
        'base' => '000',
        'failure' => '500',
        'success' => '200',
    ];

    public const IDENTIFYING_CODE_STATE_CODE = [
        'error' => '601'
    ];

    public const USER_REGISTER_STATE_CODE = [
        'phoneExist' => '611',
    ];

    public const USER_LOGIN_STATE_CODE = [
        'loginSuccess' => '620',
        'userNoExistent' => '621',
        'passwdError' => '622',
        'verifyLoginError' => '623'
    ];
}
