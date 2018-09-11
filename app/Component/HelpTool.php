<?php

namespace App\Component;

class HelpTool
{
    /**
     * Notes: 获取固定长度的随机字符串
     * @param int $strlen
     * @return string
     */
    public static function getRandomString(int $strlen): string
    {
        // 字符集,可任意添加你需要的字符
        $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $charsLen = strlen($chars) - 1;
        $randomStr = '';
        for ($i = 0; $i < $strlen; $i++) {
            // 取字符数组 $chars 的任意元素
            $randomStr .= $chars[mt_rand(0, $charsLen)];
        }
        return $randomStr;
    }

    /**
     * Notes: 删除关联数组中制定的元素
     * @param array $operArr
     * @param array $delElArr
     * @return array
     */
    public static function delArrayElement(array $operArr, array $delElArr):array
    {
        foreach ($delElArr as $delEl) {
            unset($operArr[$delEl]);
        }
        return $operArr;
    }


    /**
     * Notes: 无限极分类
     * @param array $items
     * @return array
     */
    public static function getTreeFormatArrayData(array $items)
    {
        $tree = [];

        foreach ($items as $item) {
            $tree[$item['id']] = $item;
        }

        foreach ($tree as $key => $item) {
            if ($item['pid'] !== 0) {
                $tree[$item['pid']]['cell'][] = $tree[$key];
                unset($tree[$key]);
            }
        }

        return $tree;
    }

    /**
     * Notes: 时间字符串转时间戳
     * @param String $timeString
     * @return float
     */
    public static function timeStringToTimestamp(string $timeString)
    {
        $timestamp = 0.0;
        $tempTimeArr = explode($timeString, ':');
        $timestamp += $tempTimeArr[0] * 60 + $tempTimeArr[1];
        return $timestamp;
    }
}
