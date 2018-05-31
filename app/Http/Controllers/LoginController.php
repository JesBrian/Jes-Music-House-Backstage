<?php

namespace App\Http\Controllers;

use App\Service\{
    LoginService, OauthService
};
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function phoneLogin($phone)
    {
        return LoginService::loginService($phone);
    }

    public function oauthLogin($loginOAuthType)
    {
        return OauthService::loginService($loginOAuthType);
    }
}
