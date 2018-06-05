<?php

namespace App\Config;

class MsgConfig
{
    public const RETURN_MESSAGE = [
        StateCodeConfig::COMMON_STATE_CODE['base'] => '请求处理 Ing',
        StateCodeConfig::COMMON_STATE_CODE['failure'] => '请求处理失败',
        StateCodeConfig::COMMON_STATE_CODE['success'] => '请求处理成功',

        StateCodeConfig::IDENTIFYING_CODE_STATE_CODE['error'] => '验证码填写错误',

        StateCodeConfig::USER_REGISTER_STATE_CODE['phoneExist'] => '该手机号码已被注册',

        StateCodeConfig::USER_LOGIN_STATE_CODE['userNoExistent'] => '用户不存在',
        StateCodeConfig::USER_LOGIN_STATE_CODE['passwdError'] => '密码错误',
    ];
}
