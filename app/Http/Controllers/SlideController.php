<?php

namespace App\Http\Controllers;

use App\Service\SlideService;
use Illuminate\Http\Request;

class SlideController extends Controller
{
    /**
     * Notes: 获取前端展示的轮播图信息
     * @return array
     */
    public function getFrontendSlide()
    {
        return SlideService::getFrontendSlideService();
    }


    /**
     * Notes: 分页获取轮播图信息
     * @param Request $request
     * @return array
     */
    public function getSlideListPagination(Request $request)
    {
        $data = $request->post();
        return SlideService::getSlideListByPaginationService($data);
    }
}
