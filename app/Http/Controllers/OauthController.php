<?php

namespace App\Http\Controllers;

use App\Service\OauthService;
use Illuminate\Http\Request;

class OauthController extends Controller
{
    public function actionLogin($type)
    {
        return OauthService::loginService($type);
    }
}
