/**
 * 设置后台整体框架布局函数
 */
function layoutSize() {
    /* windowObj -- 浏览器、accountMainBodyObj -- 后台页面主体、accountOperIframeObj -- 后台页面iframe页面 */
    var windowObj = $(window), accountMainBodyObj = $("#accountMainBody"), accountOperIframeObj = $("#accountOperIframe");

    accountMainBodyObj.height(windowObj.height() - 100);    //调整 后台页面主体 高度，减去nav和footer高度

    accountOperIframeObj.height(accountMainBodyObj.height() - 18); //调整 后台页面iframe页面 宽高，根据主菜单是否折叠来计算宽度
    if ($('#mainMenu').hasClass('active')) {
        accountOperIframeObj.width(accountMainBodyObj.width() - 279);
    } else {
        accountOperIframeObj.width(accountMainBodyObj.width() - 60);
    }

    $("#accountMenuMask").width(windowObj.width() - 276);   //调整 遮盖层 宽度，减去用户操作菜单的宽度
}


/**--  全局变量  --**/
var preFirstMenuObj = null, nowFirstMenuObj = null;      //preFirstMenuObj -- 指向之前已经打开了的一级菜单jq对象，nowFirstMenuObj -- 指向现在点击要打开的一级菜单
var preSecondMenuObj = null, nowSecondMenuObj = null;    //preSecondMenuObj -- 指向之前已经打开了的二级菜单jq对象，nowSecondMenuObj -- 指向现在点击要打开的二级菜单
var showNowTimeStep = null, showTimeSwitch = null;       //showNowTimeStep -- 用来设置 setInterval 名字[ 每秒刷新时间 ]，showTimeSwitch -- 记录“显示时间”是否开启
var accountOperIframeObj = $('#accountOperIframe');      //accountOperIframeObj -- 后台各种操作页面主iframe jq对象
var nowUrl = 'adminIframe/index.html';                   //nowUrl -- 记录当前后台主iframe的URL


;(function ($) {
    /**
     * 调整后台页面布局 -- 调用home.js里的 layoutSize 方法
     */
    layoutSize();   //后台页面第一次打开时设置布局
    $(window).resize(function () {  //改变浏览器窗口时
        layoutSize();
    });

    /**
     * 左侧主菜单导航栏 [ 折叠 OR 展开 ]
     */
    $("#mainMenuSwitch").click(function () {

        var mainMenuObj = $('#mainMenu');   //获取左侧主菜单jq对象

        if (mainMenuObj.hasClass('active')) {   //若是打开状态 -- 有 active 类，则折叠主菜单
            mainMenuObj.animate({left: -218}, 800);
        } else {    //若是折叠状态 -- 没 active 类，则展开主菜单
            mainMenuObj.animate({left: 0}, 800);
        }

        /* 添加 OR 删除主菜单及其主菜单开关的 active 类 */
        mainMenuObj.toggleClass('active');
        $(this).children("p").toggleClass('active');

        setTimeout(layoutSize, 600);    //调整后台布局
    });

    /**
     * 右侧账户操作菜单导航栏 [ 折叠 OR 展开 ]
     */
    $(".accountMenuSwitch").click(function () {

        var accountMenuObj = $('#accountMenu'); //获取右侧账户操作菜单导航栏jq对象

        if (accountMenuObj.hasClass('active')) {    //若是打开状态 -- 有 active 类，则折叠账户操作菜单
            $('#accountMenuMask').css({left: $(window).width()});   //折叠遮幕
            accountMenuObj.animate({right: -247}, 800);
        } else {    //若是折叠状态 -- 没 active 类，则展开账户操作菜单
            $('#accountMenuMask').css({left: 0});   //展开遮幕
            accountMenuObj.animate({right: 2}, 800);
        }

        /* 添加 OR 删除账户操作菜单及其账户操作菜单开关的 active 类 */
        accountMenuObj.toggleClass('active');
        $('a.accountMenuSwitch').children('p').toggleClass('active');
    });

    /**
     * 左侧主菜单导航栏一级菜单手风琴效果 -- [ 每次只能展开一个一级菜单 ]
     */
    $('div.firstMenuSwitch').click(function () {
        nowFirstMenuObj = $(this);  //获取现在要打开的一级菜单jq对象, 并将 nowFirstMenuObj 指向其

        if (preFirstMenuObj !== null) { //判断之前的一级菜单jq对象是否为空 -- 不为空则关闭已经打开的一级菜单
            preFirstMenuObj.removeClass('active').parent().animate({height: 42}, 566);  //动画折叠起菜单面板以及将箭头旋转180度变成Up状态
            preFirstMenuObj.nextAll('li').animate({top: 0}, 500);
        }

        if (!nowFirstMenuObj.is(preFirstMenuObj)) {  //if新点击的一级菜单和之前的一级菜单不相同，则打开新的一级菜单 -- [ 判断的两个变量不能互换位置，preFirstMenuObj maybe null ]

            var length = nowFirstMenuObj.nextAll('li').length;  //获取该一级菜单下有多少个二级菜单

            nowFirstMenuObj.addClass('active').parent().animate({height: 58 + length * 38}, 500);  //动画展开菜单面板以及将箭头旋转180度变成Down状态
            for (var i = 0; i < length; i++) {  // 忘了 jQuery 的 each 方法怎样获取下标，先用古老方法 -_-
                nowFirstMenuObj.nextAll('li').eq(i).animate({top: 48 + i * 38}, 566);
            }

            preFirstMenuObj = nowFirstMenuObj;  //不能随便调换位置！！需在判断一级菜单是否为空 && 打开新的一级菜单之后之后才能改变其指向
        } else {
            preFirstMenuObj = null; //不将其重新指向 null 的话有BUG -- 连续点击同一个三次情况BUG[ 打开/关闭/不打开BUG ] -- 也就是没执行打开新一级菜单的情况
        }
    });

    /**
     * 左侧主菜单导航栏二级菜单点击跳转 & 视觉效果 [ 由于自身菜鸡技术，iframe一次只能显示一个，即二级菜单一次只能跳转一个 ]
     */
    $('li.secondMenu').click(function () {
        nowSecondMenuObj = $(this);  //获取现在要打开的二级菜单jq对象, 并将 nowSecondMenuObj 指向其

        if ((preSecondMenuObj !== null) && (!nowSecondMenuObj.is(preSecondMenuObj))) { //判断之前的二级菜单jq对象是否为空且新点击的二级菜单和之前的二级菜单不相同 -- 不为空则
            preSecondMenuObj.removeClass('active');
        }
        nowSecondMenuObj.addClass('active');

        nowUrl = nowSecondMenuObj.attr('dataUrl');   //修改记录当前URL的变量并在iframe显示
        accountOperIframeObj.attr('src', nowUrl);

        preSecondMenuObj = nowSecondMenuObj;  //不能随便调换位置！！需在判断一级菜单是否为空 && 打开新的二级菜单之后之后才能改变其指向
    });

    /**
     * 显示 OR 隐藏当前时间
     */
    $('#timeSwitch').click(function () {

        var showTimeSwitchObj = $(this).children('a').toggleClass('active');    //获取显示当前时间开关且添加 active 类

        if (showTimeSwitchObj.hasClass('active')) { //如果开关为开 -- 即有 active 类，则显示当前时间

            showNowTimeStep = setInterval("getNowTime($('#showNowTimeDate'),$('#showNowTimeTime'))", 1000); //设置每秒刷新当前时间setInterval

            $(this).parent().animate({height: 68}, 588);    //显示当前时间悬浮块
            $('#showNowTime').fadeIn(1280);

            //设置6888毫秒自动隐藏
            showTimeSwitch = setTimeout("$('#timeSwitch').parent().animate({height:38},588); $('#timeSwitch').children('a').toggleClass('active');$('#showNowTime').fadeOut(200);clearInterval(showNowTimeStep);", 6888);

        } else {    //如果开关为关 -- 即没 active 类，则显示当前时间

            clearInterval(showNowTimeStep); //取消每秒刷新当前时间的setInterval

            $(this).parent().animate({height: 36}, 588); //隐藏显示当前时间悬浮块
            $('#showNowTime').fadeOut(100);

            clearTimeout(showTimeSwitch);   //取消6888毫秒自动隐藏
        }
    });

    /**
     * 点击刷新页面按钮刷新iframe当前页面
     */
    $('#refreshIframe').click(function () {
        accountOperIframeObj.attr('src', nowUrl);   //刷新 nowUrl 所记录的网页地址
    });

    /**
     * 获取当前时间并显示到指定位置 -- 后台页面初始化显示
     */
    getNowTime($("#showNowTimeDate"), $("#showNowTimeTime"));

    /**
     * 账户操作菜单iframe内容页面跳转
     */
    $('li.accountOperIframeUrl').click(function () {
        nowUrl = $(this).attr('dataUrl');   //修改记录当前URL的变量并在iframe显示
        accountOperIframeObj.attr('src', nowUrl);
    });

})(jQuery);
