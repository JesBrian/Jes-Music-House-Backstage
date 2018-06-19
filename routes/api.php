<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/**
 * 登录相关
 */
Route::get('oauth/{loginOAuthType}', 'LoginController@oauthLogin');
Route::post('phoneLogin', 'LoginController@phoneLogin');
Route::post('verifyUserLogin', 'LoginController@verifyUserLogin');

/**
 * 注册相关
 */
Route::post('userRegister', 'RegisterController@userRegister');
Route::post('createUser', 'RegisterController@checkIdentifyingCodeAndCreateUser');

/**
 * 搜索相关
 */
Route::post('searchInfo', 'SearchController@searchInfo');
