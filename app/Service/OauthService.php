<?php

namespace App\Service;

use App\Models\Oauth;

class OauthService
{
    private static $oauthObj = null;

    public static function loginService($loginOAuthType)
    {
        $loginOAuthModel = self::OAuthFactory($loginOAuthType);

        // 获取登录授权跳转页地址
//        $oauthLoginUrl = $loginOAuthModel->getAuthUrl();
        $oauthLoginUrl = 888;

        return $oauthLoginUrl;
    }



    public static function OAuthFactory($loginOAuthType)
    {
        if (self::$oauthObj === null) {
            switch ($loginOAuthType) {
                case 'Baidu':
//                    self::$oauthObj = new \Yurun\OAuthLogin\Baidu\OAuth2(\Yii::$app->params['baiduOAuth2AK'], \Yii::$app->params['baiduOAuth2SK'], 'http://blog.jesbrian.cn/oauth/baidu');
                    break;
                case 'Coding':
//                    self::$oauthObj = new \Yurun\OAuthLogin\Coding\OAuth2(\Yii::$app->params['codingOAuth2CI'], \Yii::$app->params['codingOAuth2CS'], 'http://blog.jesbrian.cn/oauth/coding');
                    break;
                case 'CSDN':
                    break;
                case 'Gitee':
//                    self::$oauthObj = new \Yurun\OAuthLogin\Gitee\OAuth2(\Yii::$app->params['giteeOAuth2CI'], \Yii::$app->params['giteeOAuth2CS'], 'http://blog.jesbrian.cn/oauth/gitee');
                    break;
                case 'Github':
//                    self::$oauthObj = new \Yurun\OAuthLogin\Github\OAuth2(\Yii::$app->params['githubOAuth2CI'], \Yii::$app->params['githubOAuth2CS'], 'http://blog.jesbrian.cn/oauth/github');
                    break;
                case 'OSChina':
                    break;
                case 'QQ':
//                    self::$oauthObj = new \Yurun\OAuthLogin\QQ\OAuth2(\Yii::$app->params['qqOAuth2AI'], \Yii::$app->params['qqOAuth2AK'], 'http://blog.jesbrian.cn/oauth/qq');
                    break;
                case 'Weibo':
//                    self::$oauthObj = new \Yurun\OAuthLogin\Weibo\OAuth2(\Yii::$app->params['weiboOAuth2AK'], \Yii::$app->params['weiboOAuth2AS'], 'http://blog.jesbrian.cn/oauth/weibo');
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
