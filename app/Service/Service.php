<?php

namespace App\Service;

abstract class Service
{
    /**
     * Notes: 规范化 ajax-json 数据格式返回
     * User: JesBrian
     * Date: 2018-06-03
     * Time: 20:33
     * @param string $state
     * @param array $data
     * @param string $msg
     * @return array
     */
    protected final static function ajaxStandardizationReturn(string $state = '000', array $data = [], string $msg = ''): array
    {
        return [
            'state' => $state,
            'data' => $data,
            'msg' => $msg
        ];
    }
}
