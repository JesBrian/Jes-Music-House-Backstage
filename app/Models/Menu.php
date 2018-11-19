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
        if ($menuInfo['isSecondMenu'] === true) {
            $menuModel->pid = $menuInfo['pid'];
            $menuModel->url = $menuInfo['url'];
        }
        $menuModel->save();
        return $menuModel->id;
    }

    /**
     * Notes: 根据角色获取菜单数据
     * @return array
     */
    public static function getMenuDataByRole()
    {
        return [];
    }


    /**
     * Notes: 获取分页的菜单数据
     * @param int $nowPage
     * @param int $recordNum
     * @return array
     */
    public static function getPaginationMenuData($nowPage = 1, $recordNum = 15)
    {
        $result['pageCount'] = ceil($pageCount = self::query()->count() / $recordNum);
        $result['menuData'] = $menuData = self::query()->offset($recordNum * ($nowPage - 1))->limit($recordNum)->get()->toArray();
        return $result;
    }

    /**
     * @return array
     */
    public static function getAllFirstMenuData()
    {
        $menuData = self::query()->select('id', 'name', 'icon')->where('status',1)->where('pid', 0)->get()->toArray();
        return $menuData;
    }

    public static function getAllMenuData()
    {
        $menuData = self::query()->select('id', 'name', 'icon', 'url', 'pid')->where('status',1)->get()->toArray();
        return $menuData;
    }
}
