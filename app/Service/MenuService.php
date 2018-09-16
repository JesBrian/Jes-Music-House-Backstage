<?php

namespace App\Service;

use App\Config\StateCodeConfig;
use App\Models\Menu;
use App\Component\HelpTool;

class MenuService extends Service
{
    /**
     * Notes: 根据角色获取该角色的菜单
     * @param $power
     * @return array
     */
    public static function getMenuDataByRoleService($power)
    {
        $menuArrData = Menu::getMenuDataByRole();
        $menuTreeData = HelpTool::getTreeFormatArrayData($menuArrData);
        parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
        parent::$returnData = $menuTreeData;
        return parent::ajaxStandardizationReturn();
    }

    /**
     * Notes:
     * @param $menuName
     * @return array
     */
    public static function checkMenuNameExistService($menuName)
    {
        if (Menu::checkMenuNameExist($menuName) === true) {
            parent::$returnState = StateCodeConfig::BACKSTAGE_MENU_STAGE_CODE['menuNameIsExist'];
        } else {
            parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
        }

        return parent::ajaxStandardizationReturn();
    }

    /**
     * Notes: 创建新的菜单项
     * @param $menuInfo
     * @return array
     */
    public static function createMenuService($menuInfo)
    {
        $newMenuId = Menu::createNewMenu($menuInfo);
        parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
        parent::$returnData = [
            'id' => $newMenuId
        ];
        return parent::ajaxStandardizationReturn();
    }


    public static function getAllMenuTreeDataService()
    {
        $menuData = Menu::getAllMenuData();
        $menuTreeData = HelpTool::getTreeFormatArrayData($menuData);
        parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
        parent::$returnData = $menuTreeData;
        return parent::ajaxStandardizationReturn();
    }
}
