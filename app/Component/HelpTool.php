<?php

namespace App\Component;

class HelpTool
{
    /**
     * Notes:
     * User: JesBrian
     * Date: 2018-06-03
     * Time: 20:10
     * @param int $strlen
     * @return string
     */
    public static function getRandomString(int $strlen): string
    {
        // 字符集，可任意添加你需要的字符
        $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_ []{}<>~`+=,.;:/?|';
        $charsLen = strlen($chars) - 1;
        $randomStr = '';
        for ($i = 0; $i < $strlen; $i++) {
            // 取字符数组 $chars 的任意元素
            $randomStr .= $chars[mt_rand(0, $charsLen)];
        }
        return $randomStr;
    }
}
