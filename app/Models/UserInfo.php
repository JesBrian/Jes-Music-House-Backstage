<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{
    /**
     * 与模型关联的数据表
     * @var string
     */
    protected $table = 'mh_user_info';
    /**
     * 该模型是否被自动维护时间戳
     * @var bool
     */
    public $timestamps = false;
    /**
     * 该模型主键
     * @var string
     */
    protected $primaryKey = 'userId';
}
