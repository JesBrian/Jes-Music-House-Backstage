<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Oauth extends Model
{
    const config = [
        'baiduOAuth2AK' => 0,
        'baiduOAuth2SK' => 0,

        'codingOAuth2CI' => 0,
        'codingOAuth2CS' => 0,

        'giteeOAuth2CI' => 0,
        'giteeOAuth2CS' => 0,

        'githubOAuth2CI' => 0,
        'githubOAuth2CS' => 0,

        'qqOAuth2AI' => 0,
        'qqOAuth2AK' => 0,

        'weiboOAuth2AK' => 0,
        'weiboOAuth2AS' => 0
    ];
}
