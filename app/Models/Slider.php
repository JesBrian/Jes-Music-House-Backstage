<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    /**
     * 与模型关联的数据表
     * @var string
     */
    protected $table = 'mh_slider';
    /**
     * 该模型是否被自动维护时间戳
     * @var bool
     */
    public $timestamps = false;

    /**
     * Notes: 获取前端展示的幻灯片信息
     * @return array
     */
    public static function getFrontendSlider()
    {
        return self::query()->select('id', 'sliderImg', 'url', 'local')->where('status','1')->limit(5)->orderBy('level', 'desc')->get()->toArray();
    }

    /**
     * Notes: 获取后台分页幻灯片信息
     * @return array
     */
    public static function getPaginationSliderData()
    {
        return self::query()->limit(15)->get()->toArray();
    }
}
