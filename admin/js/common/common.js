/**
 * 获取当前时间函数 [格式化 -- XXXX-XX-XX XX:XX:XX]
 * param dateObj要显示 年-月-日 的jq对象，timeObj要显示 时:分:秒 的对象
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