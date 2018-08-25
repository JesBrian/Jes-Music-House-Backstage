<?php

namespace App\Http\Controllers;

use App\Service\RegisterService;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    /**
     * Notes: 用户注册 API 接口
     * @param Request $request
     * @return array
     */
    public function userRegister(Request $request): array
    {
        $phone = $request->post('phone');
        $passwd = $request->post('passwd');
        return RegisterService::userRegisterService($phone, $passwd);
    }

    /**
     * Notes: 验证短信验证码 & 保存用户信息 API 接口
     * @param Request $request
     * @return array
     */
    public function checkIdentifyCodeAndCreateUser(Request $request): array
    {
        $identifyCode = $request->post('identifyCode');
        return RegisterService::checkIdentifyCodeService($identifyCode);
    }
}
