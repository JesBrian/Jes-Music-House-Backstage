<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    /**
     * 与模型关联的数据表
     * @var string
     */
    protected $table = 'mh_menu';
    /**
     * 该模型是否被自动维护时间戳
     * @var bool
     */
    public $timestamps = false;

    /**
     * Notes: 检查菜单名是否存在
     * @param $menuName
     * @return bool
     */
    public static function checkMenuNameExist($menuName)
    {
        return self::query()->where('name', $menuName)->exists();
    }

    /**
     * Notes: 创建新的菜单项
     * @param $menuInfo
     * @return mixed
     */
    public static function createNewMenu($menuInfo)
    {
        $menuModel = new self();
        $menuModel->name = $menuInfo['name'];
        $menuModel->icon = $menuInfo['icon'];
        $menuModel->pid = $menuInfo['pid'];
        $menuModel->url = $menuInfo['url'];
        $menuModel->save();
        return $menuModel->id;
    }
}
