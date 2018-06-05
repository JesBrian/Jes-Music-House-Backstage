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

    /**
     * Notes: 添加单个用户
     * @param string $phone
     * @param string $passwd
     * @return bool
     */
    public static function addUser(string $phone, string $passwd): bool
    {
        $user = new self();
        $user->username = $phone;
        $user->phone = $phone;
        $user->salt = HelpTool::getRandomString(4);
        $user->passwd = md5($user->salt . $passwd);
        $user->createTime = time();
        $user->loginTime = $user->createTime;
        return $user->save();
    }

    /**
     * Notes: 根据手机获取用户信息登录
     * @param string $phone
     * @return \Illuminate\Database\Eloquent\Builder|Model|null|object
     */
    public static function getUserLoginInfoByPhone(string $phone)
    {
        return self::query()->select('phone', 'salt', 'passwd')->where(['phone' => $phone])->first();
    }

    /**
     * Notes: 根据手机号码判断用户是否存在
     * @param string $phone
     * @return bool
     */
    public static function checkUserExistByPhone(string $phone): bool
    {
        return self::query()->where('phone', $phone)->exists();
    }
}
