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

    /**
     * Notes: 获取 OAuth 登录跳转 URL API 接口
     * User: JesBrian
     * Date: 2018-06-02
     * Time: 11:29
     * @param string $loginOAuthType
     * @return string
     */
    public function oauthLogin(string $loginOAuthType)
    {
        return OauthService::loginService($loginOAuthType);
    }
}
