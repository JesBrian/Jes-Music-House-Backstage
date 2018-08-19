<?php

namespace App\Service;

use App\Component\HelpTool;
use App\Models\Style;

class StyleService extends Service
{
    /**
     * Notes: 获取所有风格信息 - 分级
     * @return array
     */
    public static function getAllStyle()
    {
        $allStyle = Style::getAllStyle();
        parent::$returnData = HelpTool::getTreeFormatArrayData($allStyle);
        parent::$returnState = '200';
        return parent::ajaxStandardizationReturn();
    }
}
