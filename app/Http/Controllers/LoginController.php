<?php

namespace App\Http\Controllers;

use App\Service\{
    LoginService, OauthService
};
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /**
     * Notes: 手机号码登录 API 接口
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
     * @param string $loginOAuthType
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function oauthLogin(string $loginOAuthType)
    {
        return redirect(OauthService::loginService($loginOAuthType));
    }

    /**
     * Notes: 检验用户登录状态和信息 API 接口
     * @param Request $request
     * @return array
     */
    public function verifyUserLogin(Request $request): array
    {
        $userId = $request->post('userId');
        $username = $request->post('username');
        return LoginService::verifyUserLoginSevice($userId, $username);
    }
}
