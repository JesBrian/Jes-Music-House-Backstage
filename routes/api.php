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
Route::post('phoneLogin', 'LoginController@phoneLogin');
Route::post('verifyUserLogin', 'LoginController@verifyUserLogin');

Route::get('oauth/{loginOAuthType}', 'LoginController@oauthLogin');
Route::get('baiduOAuthCallBack', 'LoginController@baiduOAuthCallBack');
Route::get('qqOAuthCallBack', 'LoginController@qqOAuthCallBack');
Route::get('weiboOAuthCallBack', 'LoginController@weiboOAuthCallBack');
Route::get('githubOAuthCallBack', 'LoginController@githubOAuthCallBack');
Route::get('giteeOAuthCallBack', 'LoginController@giteeOAuthCallBack');
Route::get('codingOAuthCallBack', 'LoginController@codingOAuthCallBack');

Route::post('backstageLogin','LoginController@backstageLogin');


/**
 * 注册相关
 */
Route::post('userRegister', 'RegisterController@userRegister');
Route::post('createUser', 'RegisterController@checkIdentifyCodeAndCreateUser');


/**
 * 搜索相关
 */
Route::post('searchInfo', 'SearchController@searchInfo');


/**
 * 用户相关
 */
Route::post('getUserBaseInfo', 'UserController@getBaseInfoById');
Route::post('updateUserBaseInfo', 'UserController@updateUserBaseInfo');


/**
 * 管理员相关
 */


/**
 * 风格相关
 */
Route::post('getAllStyle', 'StyleController@getAllStyle');


/**
 * 歌手相关
 */


/**
 * 歌曲相关
 */


/**
 * 播放列表相关
 */


/**
 * 后台菜单相关
 */
Route::post('checkMenuNameExist', 'MenuController@checkMenuNameExistController');
Route::post('createMenu', 'MenuController@createMenu');
Route::post('updateMenuInfo', 'MenuController@updateMenuInfo');
Route::post('getMenuList', 'MenuController@getMenuList');
