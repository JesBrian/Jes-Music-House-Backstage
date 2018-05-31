<?php

namespace App\Config;

class OauthConfig
{
    public const OAUTH_CONFIG = [
        'baiduOAuth2AK' => '百度AK',
        'baiduOAuth2SK' => '百度SK',
        'baiduCallbackUrl' => '百度回调函数',

        'codingOAuth2CI' => 'condingCI',
        'codingOAuth2CS' => 'codingCS',
        'codingCallbackUrl' => 'coding回调函数',

        'giteeOAuth2CI' => '码云CI',
        'giteeOAuth2CS' => '码云CS',
        'giteeCallbackUrl' => '码云回调函数',

        'githubOAuth2CI' => 'githubCI',
        'githubOAuth2CS' => 'githubCS',
        'githubCallbackUrl' => 'github回调函数',

        'qqOAuth2AI' => '腾讯AI',
        'qqOAuth2AK' => '腾讯AK',
        'qqCallbackUrl' => '腾讯回调函数',

        'weiboOAuth2AK' => '微博AK',
        'weiboOAuth2AS' => '微博AS',
        'weiboCallbackUrl' => '微博回调函数',
    ];
}
