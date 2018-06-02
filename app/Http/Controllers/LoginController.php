<?php

namespace App\Http\Controllers;

use App\Service\{
    LoginService, OauthService
};
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /**
     * Notes: 手机登录 API 接口
     * User: JesBrian
     * Date: 2018-06-02
     * Time: 10:55
     * @param Request $request
     * @return array
     */
    public function phoneLogin(Request $request): array
    {
        $phone = $request->post('phone');
        $passwd = $request->post('passwd');
        return LoginService::phoneLoginService($phone, $passwd);
    }

    public function oauthLogin(string $loginOAuthType)
    {
        return OauthService::loginService($loginOAuthType);
    }
}
