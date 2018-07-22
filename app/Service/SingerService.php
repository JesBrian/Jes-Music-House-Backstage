<?php

namespace App\Service;

use App\Models\Singer;

class SingerService extends Service
{
    /**
     * Notes: 检查用户是否歌手
     */
    public static function checkUserIsSingerService()
    {
        Singer::checkUserIsSinger();
    }

    /**
     * Notes: 检查歌手名是否存在
     */
    public static function checkSingerNameExistService()
    {
        Singer::checkSingerNameExist();
    }

    /**
     * Notes: 注册新歌手
     */
    public static function registerSingerService()
    {
        Singer::addSinger();
    }

    /**
     * Notes: 修改歌手基本信息
     */
    public static function updateSingeBaseInfoService()
    {
    }
}
