<?php

namespace App\Http\Controllers;

use App\Service\{
    LoginService, OauthService
};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Validation\Rules\In;

class LoginController extends Controller
{
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


    public function baiduOAuthCallBack()
    {
        $data = Input::get();
        $data['type'] = 'baidu';
        OauthService::commonOAuthCallBack($data);
    }
    public function qqOAuthCallBack()
    {
        $data = Input::get();
        $data['type'] = 'qq';
        OauthService::commonOAuthCallBack($data);
    }
    public function weiboOAuthCallBack()
    {
        $data = Input::get();
        $data['type'] = 'weibo';
        OauthService::commonOAuthCallBack($data);
    }
    public function githubOAuthCallBack()
    {
        $data = Input::get();
        $data['type'] = 'github';
        OauthService::commonOAuthCallBack($data);
    }
    public function giteeOAuthCallBack()
    {
        $data = Input::get();
        $data['type'] = 'gitee';
        OauthService::commonOAuthCallBack($data);
    }
    public function codingOAuthCallBack()
    {
        $data = Input::get();
        $data['type'] = 'coding';
        OauthService::commonOAuthCallBack($data);
    }
}
