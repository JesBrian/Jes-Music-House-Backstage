<?php

namespace App\Http\Controllers;

use App\Service\SearchService;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * Notes: 搜索信息
     * @param Request $request
     * @return array
     */
    public function searchInfo(Request $request)
    {
        $key = $request->post('key');
        $type = $request->post('type');
        return SearchService::searchInfoAndCreateRecord($key, $type);
    }
}
