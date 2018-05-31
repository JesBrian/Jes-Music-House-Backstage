<?php

namespace App\Service;

abstract class Service
{
    /**
     * Notes: 规范化 ajax-json 数据格式返回
     * User: JesBrian
     * Date: 2018-05-30
     * Time: 21:49
     * @param $state
     * @param $data
     * @param $msg
     * @return array[application/json]
     */
    protected final static function ajaxStandardizationReturn($state, $data, $msg)
    {
        return [
            'state' => $state,
            'data' => $data,
            'msg' => $msg
        ];
    }
}
