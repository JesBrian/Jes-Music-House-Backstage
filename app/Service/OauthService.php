<?php

namespace App\Service;

use App\Config\OauthConfig;

class OauthService
{
    private static $oauthObj = null;

    /**
     * Notes:
     * @param string $loginOAuthType
     * @return string
     */
    public static function loginService(string $loginOAuthType): string
    {
        $loginOAuthModel = self::OAuthFactory($loginOAuthType);

        // 获取登录授权跳转页地址
        $oauthLoginUrl = $loginOAuthModel->getAuthUrl();

        return $oauthLoginUrl;
    }


    /**
     * Notes: 通用 OAuth 登录回调函数
     */
    public static function commonOAuthCallBack($userData)
    {
        self::OAuthFactory($userData['type']);
        $userData['accessToken'] = self::$oauthObj->getAccessToken($userData['state']);

        // openid，用户在第三方平台的唯一标识
//        $userData['openid'] = self::$oauthObj->getOpenID($userData['accessToken']);

        // 获取用户资料，第一个参数不传则默认使用getAccessToken方法获取到的结果
        $userData['userInfo'] = self::$oauthObj->getUserInfo($userData['accessToken']);

        return $userData;
    }


    /**
     * Notes:
     * @param string $loginOAuthType
     * @return null|\Yurun\OAuthLogin\Baidu\OAuth2|\Yurun\OAuthLogin\Coding\OAuth2|\Yurun\OAuthLogin\Gitee\OAuth2|\Yurun\OAuthLogin\Github\OAuth2|\Yurun\OAuthLogin\QQ\OAuth2|\Yurun\OAuthLogin\Weibo\OAuth2
     */
    public static function OAuthFactory(string $loginOAuthType)
    {
        if (self::$oauthObj === null) {
            switch ($loginOAuthType) {
                case 'baidu':
                    self::$oauthObj = new \Yurun\OAuthLogin\Baidu\OAuth2(OauthConfig::OAUTH_CONFIG['baiduOAuth2AK'], OauthConfig::OAUTH_CONFIG['baiduOAuth2SK'], OauthConfig::OAUTH_CONFIG['baiduCallbackUrl']);
                    break;
                case 'coding':
                    self::$oauthObj = new \Yurun\OAuthLogin\Coding\OAuth2(OauthConfig::OAUTH_CONFIG['codingOAuth2CI'], OauthConfig::OAUTH_CONFIG['codingOAuth2CS'], OauthConfig::OAUTH_CONFIG['codingCallbackUrl']);
                    break;
                case 'gitee':
                    self::$oauthObj = new \Yurun\OAuthLogin\Gitee\OAuth2(OauthConfig::OAUTH_CONFIG['giteeOAuth2CI'], OauthConfig::OAUTH_CONFIG['giteeOAuth2CS'], OauthConfig::OAUTH_CONFIG['giteeCallbackUrl']);
                    break;
                case 'github':
                    self::$oauthObj = new \Yurun\OAuthLogin\Github\OAuth2(OauthConfig::OAUTH_CONFIG['githubOAuth2CI'], OauthConfig::OAUTH_CONFIG['githubOAuth2CS'], OauthConfig::OAUTH_CONFIG['githubCallbackUrl']);
                    break;
                case 'qq':
                    self::$oauthObj = new \Yurun\OAuthLogin\QQ\OAuth2(OauthConfig::OAUTH_CONFIG['qqOAuth2AI'], OauthConfig::OAUTH_CONFIG['qqOAuth2AK'], OauthConfig::OAUTH_CONFIG['qqCallbackUrl']);
                    break;
                case 'weibo':
                    self::$oauthObj = new \Yurun\OAuthLogin\Weibo\OAuth2(OauthConfig::OAUTH_CONFIG['weiboOAuth2AK'], OauthConfig::OAUTH_CONFIG['weiboOAuth2AS'], OauthConfig::OAUTH_CONFIG['weiboCallbackUrl']);
                    break;
                case 'Weixin':
//                    self::$oauthObj = new \Yurun\OAuthLogin\Weixin\OAuth2(\Yii::$app->params['githubOAuth2CI'], \Yii::$app->params['githubOAuth2CS'], 'http://jesbrian.cn/jesblog-backstage/web/index.php/oauth/weixin');
                    break;
                default:
                    break;
            }
        }

        return self::$oauthObj;
    }
}
