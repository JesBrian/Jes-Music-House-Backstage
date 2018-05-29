<?php

namespace App\Service;

use App\Models\Oauth;

class OauthService
{
    public static function loginService($loginType)
    {
        $loginOAuthModel = Oauth::OAuthFactory($loginType);

        // 获取登录授权跳转页地址
//        $oauthLoginUrl = $loginOAuthModel->getAuthUrl();
        $oauthLoginUrl = 888;

        return $oauthLoginUrl;
    }
}
