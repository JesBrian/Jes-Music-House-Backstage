<?php

namespace App\Service;

use App\Component\HelpTool;
use App\Config\StateCodeConfig;
use App\Models\Style;

class StyleService extends Service
{
    /**
     * Notes: 获取所有风格信息 - 分级
     * @return array
     */
    public static function getAllStyleService()
    {
        $allStyle = Style::getAllStyle();
        parent::$returnData = HelpTool::getTreeFormatArrayData($allStyle);
        parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
        return parent::ajaxStandardizationReturn();
    }

    /**
     * Notes:
     * @return array
     */
    public static function getStyleListPaginationService()
    {
        $styleList = Style::getStyleListPagination();
        parent::$returnState = StateCodeConfig::COMMON_STATE_CODE['success'];
        parent::$returnData = $styleList;
        return parent::ajaxStandardizationReturn();
    }
}
