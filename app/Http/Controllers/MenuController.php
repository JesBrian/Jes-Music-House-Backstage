<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service\MenuService;

class MenuController extends Controller
{
    public static function checkMenuNameExistService(Request $request)
    {
        $menuName = $request->post('name');
        return MenuService::checkMenuNameExistService($menuName);
    }

    /**
     * Notes:
     * @param Request $request
     * @return array
     */
    public function createMenu(Request $request)
    {
        $menuInfo = $request->post();
        return MenuService::createMenuService($menuInfo);
    }


    public function updateMenuInfo()
    {
    }


    public function getMenuList()
    {
    }
}
