<?php

namespace App\Http\Controllers;

use App\Service\SingerService;

class SingerController extends Controller
{
    /**
     * Notes: 检查用户是否歌手 API 接口
     */
    public function checkUserIsSinger()
    {
        SingerService::checkUserIsSingerService();
    }

    /**
     * Notes: 检查歌手名是否存在 API 接口
     */
    public function checkSingerNameExist()
    {
        SingerService::checkSingerNameExistService();
    }

    /**
     * Notes: 注册新歌手 API 接口
     */
    public function registerSinger()
    {
        SingerService::registerSingerService();
    }

    /**
     * Notes: 修改歌手基本信息 API 接口
     */
    public function updateSingeBaseInfo()
    {
        SingerService::updateSingeBaseInfoService();
    }
}
