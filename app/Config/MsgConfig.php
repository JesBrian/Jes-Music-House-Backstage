<?php

namespace App\Config;

class MsgConfig
{
    public const RETURN_MESSAGE = [
        StateCodeConfig::COMMON_STATE_CODE['base'] => '请求处理 Ing',
        StateCodeConfig::COMMON_STATE_CODE['failure'] => '请求处理失败',
        StateCodeConfig::COMMON_STATE_CODE['success'] => '请求处理成功',

        StateCodeConfig::IDENTIFYING_CODE_STATE_CODE['error'] => '验证码填写错误',

        StateCodeConfig::USER_REGISTER_STATE_CODE['phoneExist'] => '该手机已被注册',
    ];
}
