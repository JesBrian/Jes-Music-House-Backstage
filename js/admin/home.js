/**
 * 设置后台整体框架布局函数
 */
function layoutSize() {
    /* windowObj -- 浏览器、accountMainBodyObj -- 后台页面主体、accountOperIframeObj -- 后台页面iframe页面 */
    var windowObj = $(window), accountMainBodyObj = $("#accountMainBody"), accountOperIframeObj = $("#accountOperIframe");

    accountMainBodyObj.height(windowObj.height() - 100);    //调整 后台页面主体 高度，减去nav和footer高度

    accountOperIframeObj.height(accountMainBodyObj.height() - 16); //调整 后台页面iframe页面 宽高，根据主菜单是否折叠来计算宽度
    if ($('#mainMenu').hasClass('active')) {
        accountOperIframeObj.width(accountMainBodyObj.width() - 279);
    } else {
        accountOperIframeObj.width(accountMainBodyObj.width() - 60);
    }

    $('#accountMenu').height(accountMainBodyObj.height());  //调整 账户操作菜单 高度

    $("#accountMenuMask").width(windowObj.width() - 276);   //调整 遮盖层 宽度，减去用户操作菜单的宽度
}


/**--  全局变量  --**/
var preFirstMenuObj = null, preSecondMenuObj = null;    //preSecondMenuObj -- 指向之前已经打开了的二级菜单jq对象，preFirstMenuObj -- 指向之前已经打开了的一级菜单jq对象
var showNowTimeStep = null, showTimeSwitch = null;       //showNowTimeStep -- 用来设置 setInterval 名字[ 每秒刷新时间 ]，showTimeSwitch -- 记录“显示时间”是否开启
var accountOperIframeObj = $('#accountOperIframe');      //accountOperIframeObj -- 后台各种操作页面主iframe jq对象
//var nowUrl = 'adminIframe/index.html';                   //nowUrl -- 记录当前后台主iframe的URL[用于刷新页面按钮]


/**
 * 调整后台页面布局 -- 调用home.js里的 layoutSize 方法
 */
layoutSize();   //后台页面第一次打开时设置布局
(function($){   //设置滚动条样式
    $(window).on("load",function(){
        $.mCustomScrollbar.defaults.scrollButtons.enable=true;
        $.mCustomScrollbar.defaults.axis="y";

        $("#mainMenuContent").mCustomScrollbar({theme:"inset-2"});
    });
})(jQuery);
$(window).resize(function () {  //改变浏览器窗口时
    layoutSize();
});


/**
 * 左侧主菜单导航栏 [ 折叠 OR 展开 ]
 */
$("#mainMenuSwitch").click(function () {

    if (checkEnable($(this), 888)) { //判断是否可以触发事件 -- 调用 common.js 里的 checkEnable 函数

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
    }
});


/**
 * 右侧账户操作菜单导航栏 [ 折叠 OR 展开 ]
 */
$(".accountMenuSwitch").click(function () {

    if (checkEnable($(this), 888)) { //判断是否可以触发事件 -- 调用 common.js 里的 checkEnable 函数

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

        accountMenuObj = null;     //将其重新指向null -- 不知道会不会被GC回收
    }
});


/**
 * 左侧主菜单导航栏一级菜单手风琴效果 -- [ 每次只能展开一个一级菜单 ]
 */
$('div.firstMenuSwitch').click(function () {

    if (checkEnable($(this), 600)) { //判断是否可以触发事件 -- 调用 common.js 里的 checkEnable 函数

        var nowFirstMenuObj = $(this);  //获取现在要打开的一级菜单jq对象, 并将 nowFirstMenuObj 指向其

        if (preFirstMenuObj !== null) { //判断之前的一级菜单jq对象是否为空 -- 不为空则关闭已经打开的一级菜单
            preFirstMenuObj.removeClass('active').parent().animate({height: 42}, 566);  //动画折叠起菜单面板以及将箭头旋转180度变成Up状态
            preFirstMenuObj.nextAll('li').animate({top: 0}, 500);
        }

        if (!nowFirstMenuObj.is(preFirstMenuObj)) {  //if新点击的一级菜单和之前的一级菜单不相同，则打开新的一级菜单 -- [ 判断的两个变量不能互换位置，preFirstMenuObj maybe null ]

            var nowSecondMenu = nowFirstMenuObj.nextAll('li');  //获取该一级菜单下的所有二级菜单

            /*动画展开菜单面板以及将箭头旋转180度变成Down状态*/
            nowFirstMenuObj.addClass('active').parent().animate({height: 58 + nowSecondMenu.length * 38}, 500);
            var i = 0;
            nowSecondMenu.each(function () {
                $(this).animate({top: 48 + i++ * 38}, 566);
            });

            preFirstMenuObj = nowFirstMenuObj;  //不能随便调换该语句位置！！需在判断一级菜单是否为空 && 打开新的一级菜单之后之后才能改变其指向
        } else {
            preFirstMenuObj = null; //不将其重新指向 null 的话有BUG -- 连续点击同一个三次情况BUG[ '打开/关闭/打不开' 的BUG ] -- 也就是没执行打开新一级菜单的情况
        }

        nowFirstMenuObj = null;     //将其重新指向null -- 不知道会不会被GC回收
    }
});


/**
 * 左侧主菜单导航栏二级菜单点击跳转 & 视觉效果 [ 由于自身菜鸡技术，iframe一次只能显示一个，即二级菜单一次只能跳转一个 ]
 */
$('li.secondMenu').click(function () {

    if (checkEnable($(this), 688)) { //判断是否可以触发事件 -- 调用 common.js 里的 checkEnable 函数

        var nowSecondMenuObj = $(this);  //获取现在要打开的二级菜单jq对象, 并将 nowSecondMenuObj 指向其

        if ((preSecondMenuObj !== null) && (!nowSecondMenuObj.is(preSecondMenuObj))) { //判断之前的二级菜单jq对象是否为空且新点击的二级菜单和之前的二级菜单不相同 -- 不为空则
            preSecondMenuObj.removeClass('active');
        }
        nowSecondMenuObj.addClass('active');

        accountOperIframeObj.attr('src', nowSecondMenuObj.attr('dataUrl')); //修改iframe的src

        preSecondMenuObj = nowSecondMenuObj;  //不能随便调换位置！！需在判断一级菜单是否为空 && 打开新的二级菜单之后之后才能改变其指向

        nowSecondMenuObj = null;     //将其重新指向null -- 不知道会不会被GC回收
    }
});


/**
 * 显示 OR 隐藏当前时间
 */
$('#timeSwitch').click(function () {

    if (checkEnable($(this), 688)) { //判断是否可以触发事件 -- 调用 common.js 里的 checkEnable 函数

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
    }
});


/**
 * 点击刷新页面按钮刷新iframe当前页面
 */
$('#refreshIframe').click(function () {
    if (checkEnable($(this), 2680)) { //判断是否可以触发事件 -- 调用 common.js 里的 checkEnable 函数
        accountOperIframeObj.attr('src', accountOperIframeObj.attr('src'));
    }
});


/**
 * 获取当前时间并显示到指定位置 -- 后台页面初始化显示
 */
getNowTime($("#showNowTimeDate"), $("#showNowTimeTime"));


/**
 * 账户操作菜单iframe内容页面跳转
 */
$('a.accountOperIframeUrl').click(function () {
    accountOperIframeObj.attr('src', $(this).attr('dataUrl'));
});
