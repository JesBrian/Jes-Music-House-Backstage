<?php

namespace App\Http\Controllers;

use App\Service\OauthService;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function phoneLogin($phone)
    {
        return $phone;
    }

    public function oauthLogin($loginOAuthType)
    {
        return OauthService::loginService($loginOAuthType);
    }
}
