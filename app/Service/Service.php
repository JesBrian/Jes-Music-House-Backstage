<?php

namespace App\Service;

use App\Config\MsgConfig;

abstract class Service
{
    /**
     * @var string 返回操作结果状态码
     */
    protected static $returnState = '000';
    /**
     * @var array 返回操作结果数据
     */
    protected static $returnData = [];
    /**
     * @var string 返回操作结果信息
     */
    protected static $returnMsg = '';


    /**
     * Notes: 规范化 ajax-json 数据格式返回
     * @return array
     */
    protected final static function ajaxStandardizationReturn(): array
    {
        return [
            'state' => self::$returnState,
            'data' => self::$returnData,
            'msg' => self::$returnMsg = MsgConfig::RETURN_MESSAGE[self::$returnState]
        ];
    }
}
