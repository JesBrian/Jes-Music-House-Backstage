<?php

namespace App\Service;

use App\Config\StateCodeConfig;
use App\Models\Menu;
use App\Component\HelpTool;

class MenuService extends Service
{
    /**
     * Notes:
     * @param $menuName
     * @return array
     */
    public static function checkMenuNameExistService($menuName)
    {
        if (Menu::checkMenuNameExist($menuName) === true) {
            parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
        } else {
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
}
