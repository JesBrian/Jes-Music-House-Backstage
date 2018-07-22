<?php

namespace App\Models;

use App\Component\HelpTool;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

/**
 * Notes: 用户基本信息
 * Class User
 * @package App\Models
 */
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
     * @return bool|mixed
     */
    public static function addUser(string $phone, string $passwd)
    {
        $user = new User();
        $user->username = $phone;
        $user->phone = $phone;
        $user->salt = HelpTool::getRandomString(4);
        $user->passwd = md5($user->salt . $passwd);
        $user->createTime = time();
        $user->loginTime = $user->createTime;

        DB::beginTransaction();

        if ($user->save() && UserInfo::addUserInfo($user->id)) {
            DB::commit();
            $addUserOperationResult = [
                'id' => $user->id,
                'username' => $user->username,
                'avatar' => ''
            ];
        } else {
            DB::rollBack();
            $addUserOperationResult = false;
        }

        return $addUserOperationResult;
    }

    /**
     * Notes: 根据手机获取用户信息登录
     * @param string $phone
     * @return \Illuminate\Database\Eloquent\Builder|Model|null|object
     */
    public static function getUserLoginInfoByPhone(string $phone)
    {
        return self::query()->select('id', 'username', 'avatar', 'phone', 'salt', 'passwd')->where('phone', $phone)->first();
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

    /**
     * Notes: 根据用户ID和用户名判断用户是否存在
     * @param string $userId
     * @return \Illuminate\Database\Eloquent\Builder|Model|null|object
     */
    public static function getUserById(string $userId)
    {
        return self::query()->where(['id' => $userId])->first();
    }

    /**
     * Notes: 检查用户名是否存在
     * @param $username
     * @return bool
     */
    public static function checkUsernameExist($username)
    {
        return self::query()->where('username', $username)->exists();
    }

    /**
     * Notes: 更新用户名
     * @param $username
     */
    public static function updateUsername($userId, $username)
    {
        $userModel = self::find($userId);
        $userModel->username = $username;
        $userModel->save();
    }
}
