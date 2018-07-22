<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Singer extends Model
{
    /**
     * 与模型关联的数据表
     * @var string
     */
    protected $table = 'mh_singer';
    /**
     * 该模型是否被自动维护时间戳
     * @var bool
     */
    public $timestamps = false;

    /**
     * Notes: 检查是否为歌手
     */
    public static function checkUserIsSinger()
    {
    }

    /**
     * Notes: 检查歌手名是否存在
     */
    public static function checkSingerNameExist()
    {
    }

    /**
     * Notes: 添加单个歌手
     */
    public static function addSinger()
    {
    }
}
