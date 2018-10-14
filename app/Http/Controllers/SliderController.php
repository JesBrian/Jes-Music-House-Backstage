<?php

namespace App\Http\Controllers;

use App\Service\SliderService;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    /**
     * Notes: 获取前端展示的轮播图信息
     * @return array
     */
    public function getFrontendSlider()
    {
        return SliderService::getFrontendSliderService();
    }


    /**
     * Notes: 分页获取轮播图信息
     * @param Request $request
     * @return array
     */
    public function getSliderListPagination(Request $request)
    {
        $data = $request->post();
        return SliderService::getSliderListByPaginationService($data);
    }
}
