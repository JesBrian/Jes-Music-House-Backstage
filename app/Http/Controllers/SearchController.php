<?php

namespace App\Http\Controllers;

use App\Service\SearchService;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function searchInfo(Request $request)
    {
        $key = $request->post('key');
        $type = $request->post('type');
        return SearchService::searchInfoAndCreateRecord($key, $type);
    }
}
