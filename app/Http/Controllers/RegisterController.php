<?php

namespace App\Http\Controllers;

use App\Service\RegisterService;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function userRegister(Request $request): array
    {
        $phone = $request->post('phone');
        $passwd = $request->post('passwd');
        return RegisterService::userRegisterService($phone, $passwd);
    }

    public function checkIdentifyingCode(Request $request): array
    {
        $identifyingCode = $request->post('identifyingCode');
        return RegisterService::checkIdentifyingCodeService($request, $identifyingCode);
    }
}
