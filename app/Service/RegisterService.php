<?php

namespace App\Service;

use App\Models\User;
use Illuminate\Http\Request;

class RegisterService extends Service
{
    /**
     * Notes:
     * User: JesBrian
     * Date: 2018-06-02
     * Time: 10:55
     * @param string $phone
     * @param string $passwd
     * @return array
     */
    public static function userRegisterService(string $phone, string $passwd): array
    {
        session(['phone' => $phone, 'passwd' => $passwd]);
        return parent::ajaxStandardizationReturn('200', [
            'phone' => $phone,
            'passwd' => $passwd
        ], '666');
    }

    /**
     * Notes:
     * User: JesBrian
     * Date: 2018-06-03
     * Time: 20:48
     * @param Request $request
     * @param string $code
     * @return array
     */
    public static function checkIdentifyingCodeService(Request $request, string $code): array
    {
        $phone = $request->session()->get('phone');
        $passwd = $request->session()->get('passwd');
//        $request->session()->forget('phone');
//        $request->session()->forget('passwd');

        $addUserResult = self::addOneUserToDataBaseService($phone, $passwd);

        $returnData = [
          'code' => $code
        ];

        if ($addUserResult['state'] === '200') {
            $returnData = array_merge($returnData, $addUserResult['data']);
        }

        return parent::ajaxStandardizationReturn('200', $returnData, '888');
    }

    /**
     * Notes:
     * User: JesBrian
     * Date: 2018-06-03
     * Time: 20:41
     * @param string $phone
     * @param string $passwd
     * @return array
     */
    public static function addOneUserToDataBaseService(string $phone, string $passwd): array
    {
        User::addUser($phone, $passwd);
        return parent::ajaxStandardizationReturn('200', [
            'phone' => $phone,
            'passwd' => $passwd
        ],'');
    }
}
