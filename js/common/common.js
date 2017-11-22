/**
 * 获取当前时间函数 [格式化 -- XXXX-XX-XX XX:XX:XX]
 * param [dateObj 要显示 年-月-日 的jq对象], [timeObj 要显示 时:分:秒 的对象]
 */
function getNowTime(dateObj, timeObj) {

    var date = new Date();  //获取JS日期对象

    /* 获取年、月、日、时、分、秒、信息 */
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;

    /* 将格式化的时间信息输出到指定的位置 */
    dateObj.text(y + '-' + m + '-' + d);
    timeObj.text(h + ' : ' + minute + ' : ' + second);
}


/**
 * 检查该对象是否可以触发某事件 -- 是否有 unable 类
 * param [checkObj 要检查的jq对象], [checkTime 禁止触发时间]
 * return [false 禁止触发事件], [true 可以触发事件]
 */
function checkEnable(checkObj, checkTime) {
    if (checkObj.hasClass('enable')) {  //可以触发事件状态

        checkObj.removeClass('enable');    //设置点击后禁止状态
        setTimeout(function () {
            checkObj.addClass('enable');
        }, checkTime);

        return true;

    } else {  //禁止状态
        return false;
    }
}


/**
 * 根据传入的model名字来弹出相应的模拟框
 */
function niftymodalsByModelName(modal,url,text) {
    $("#" + modal).niftyModal();
    if(text != '') {
        $("#warning-text").html(text);
    }
}


/**
 * 操作消息提示
 */
function alertTips(type,message) {
    if(type) {
        iziToast.info({
            title: 'Success - ',
            message: message,
            position: 'bottomLeft',
            transitionIn: 'flipInX',
            transitionOut: 'flipOutX'
        });
    } else {
        iziToast.error({
            title: 'Error - ',
            message: message,
            position: 'bottomLeft',
            transitionIn: 'flipInX',
            transitionOut: 'flipOutX'
        });
    }
}