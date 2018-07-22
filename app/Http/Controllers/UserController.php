<?php

namespace App\Http\Controllers;

use App\Service\UserService;
use Illuminate\Support\Facades\Input;

class UserController extends Controller
{
    /**
     * Notes: 根据用户 ID 获取基本信息 API 接口
     * @return array
     */
    public function getBaseInfoById()
    {
        $userId = Input::post('id');
        return UserService::getUserBaseInfoByIdService($userId);
    }


    /**
     * Notes: 修改用户基本信息 API 接口
     * @return array
     */
    public function updateUserBaseInfo()
    {
        $infoData = Input::post();
        return UserService::updateUserBaseInfoService($infoData);
    }
}
