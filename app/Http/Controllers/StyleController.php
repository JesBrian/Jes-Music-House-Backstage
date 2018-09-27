<?php

namespace App\Http\Controllers;

use App\Service\StyleService;

class StyleController extends Controller
{
    /**
     * Notes: 获取所有风格信息 API 接口
     * @return array
     */
    public function getAllStyle()
    {
        return StyleService::getAllStyleService();
    }


    public function getStyleListPagination()
    {
        return StyleService::getStyleListPaginationService();
    }
}
