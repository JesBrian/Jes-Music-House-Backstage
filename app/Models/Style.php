<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Style extends Model
{
    /**
     * 与模型关联的数据表
     * @var string
     */
    protected $table = 'mh_style';
    /**
     * 该模型是否被自动维护时间戳
     * @var bool
     */
    public $timestamps = false;


    public static function getAllStyle()
    {
        return self::query()->select('id', 'name', 'pid', 'icon')->where('status','1')->get()->toArray();
    }
}
