<?php

namespace App\Models;

use App\Component\HelpTool;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * 与模型关联的数据表
     * @var string
     */
    protected $table = 'mh_user';
    /**
     * 该模型是否被自动维护时间戳
     * @var bool
     */
    public $timestamps = false;

    public static function addUser($phone, $passwd)
    {
        $user = new self();
        $user->username = $phone;
        $user->phone = $phone;
        $user->salt = HelpTool::getRandomString(4);
        $user->passwd = md5($user->salt . $passwd);
        $user->createTime = time();
        $user->loginTime = $user->createTime;
        $user->save();
    }
}
