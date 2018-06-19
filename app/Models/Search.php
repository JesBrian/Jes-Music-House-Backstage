<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Search extends Model
{
    /**
     * 与模型关联的数据表
     * @var string
     */
    protected $table = 'mh_search';
    /**
     * 该模型是否被自动维护时间戳
     * @var bool
     */
    public $timestamps = false;

    private static $SEARCH_TYPE = [
        'song' => 1,
        'playList' => 2,
        'singer' => 3,
        'user' => 4
    ];

    /**
     * Notes: 创建/保存一条搜索记录
     * @param $key
     * @param $type
     * @return bool
     */
    public static function createOneSearchRecord($key, $type)
    {
        $searchRecord = new Search();
        $searchRecord->key = $key;
        $searchRecord->type = self::$SEARCH_TYPE[$type];
        $searchRecord->date = 0;
        return $searchRecord->save();
    }

    /**
     * Notes: 搜索数据
     * @param $key
     * @param $type
     */
    public static function achieveSearchInfo($key, $type)
    {
    }
}
