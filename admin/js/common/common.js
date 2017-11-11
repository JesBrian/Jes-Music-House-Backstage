/**
 * 获取当前时间函数 [格式化 -- XXXX-XX-XX XX:XX:XX]
 * param dateObj要显示 年-月-日 的jq对象，timeObj要显示 时:分:秒 的对象
 */
function getNowTime(dateObj, timeObj) {

    var date = new Date();

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


    dateObj.text(y + '-' + m + '-' + d);
    timeObj.text(h + ' : ' + minute + ' : ' + second);
}