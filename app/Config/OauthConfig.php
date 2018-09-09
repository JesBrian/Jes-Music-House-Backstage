<?php

namespace App\Config;

class OauthConfig
{
    public const OAUTH_CONFIG = [
        // baidu
        'baiduOAuth2AK' => 'f7weT5KIlTd8N85b9gTOkjR3',
        'baiduOAuth2SK' => 'Hcm3kQ6csWlQ7fDXS6gUN0PdqArIw5HU',
        'baiduCallbackUrl' => 'http://local.musichouse.cn/api/baiduOAuthCallBack',

        // coding
        'codingOAuth2CI' => 'c240a9f92b26e428025b25e075969c92e1d1353d',
        'codingOAuth2CS' => 'c240a9f92b26e428025b25e075969c92e1d1353d',
        'codingCallbackUrl' => 'http://local.musichouse.cn/api/codingOAuthCallBack',

        // gitee
        'giteeOAuth2CI' => '9d44e8042dc0b48b2b7b78810ffe01dd3941e68a3349b9eb9f859777e938ad87',
        'giteeOAuth2CS' => '44d1b662e4e2efe1162184b915063adc458b1673b8a265356016857fa04ffb97',
        'giteeCallbackUrl' => 'http://local.musichouse.cn/api/giteeOAuthCallBack',

        // github
        'githubOAuth2CI' => '87c8d2b97928d405f78f',
        'githubOAuth2CS' => '36ba4a44bb234b19b3296499ad5d36152f4a70af',
        'githubCallbackUrl' => 'http://local.musichouse.cn/api/githubOAuthCallBack',

        // qq
        'qqOAuth2AI' => '101481602',
        'qqOAuth2AK' => 'ebad3afbcabb4789c9a3d88d678756cf',
        'qqCallbackUrl' => 'http://local.musichouse.cn/api/qqOAuthCallBack',

        // weibo
        'weiboOAuth2AK' => '1232002919',
        'weiboOAuth2AS' => '97832caec4bb0202cd9c6d60f5d77b00',
        'weiboCallbackUrl' => 'http://local.musichouse.cn/api/weiboOAuthCallBack',
    ];
}
