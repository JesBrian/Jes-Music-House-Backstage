<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    /**
     * 与模型关联的数据表
     * @var string
     */
    protected $table = 'mh_admin';
    /**
     * 该模型是否被自动维护时间戳
     * @var bool
     */
    public $timestamps = false;

    /**
     * Notes: 登陆后台
     */
    public static function backstageLogin()
    {
    }
}
