<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Slide extends Model
{
    /**
     * 与模型关联的数据表
     * @var string
     */
    protected $table = 'mh_slide';
    /**
     * 该模型是否被自动维护时间戳
     * @var bool
     */
    public $timestamps = false;

    /**
     * Notes: 获取前端展示的幻灯片信息
     * @return array
     */
    public static function getFrontendSlide()
    {
        return self::query()->select('id', 'img', 'url', 'local')->where('status','1')->limit(5)->orderBy('level', 'desc')->get()->toArray();
    }

    /**
     * Notes: 获取后台分页幻灯片信息
     * @param int $nowPage
     * @param int $recordNum
     * @return mixed
     */
    public static function getPaginationSlideData($nowPage = 1, $recordNum = 15)
    {
        $result['pageCount'] = ceil($pageCount = self::query()->count() / $recordNum);
        $result['slideData'] = self::query()->offset($recordNum * ($nowPage - 1))->limit($recordNum)->get()->toArray();
        return $result;
    }
}
