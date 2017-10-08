

$("#leftNavbar>a").click(function () {
    iframeLocation($(this).attr("from"), $(this).attr("to"));
    $("#leftNavbar>a").removeClass("active");
    $(this).addClass("active");
});

function iframeLocation(ifName, url) {
    $("#" + ifName).attr("src",url);
}


/**
 * 鼠标移动到某个音乐列表上显示操作
 */
$("table.specialTable tr").mousemove(function () {
    $(this).find($("span.songlistOper")).fadeIn(38);
}).mouseleave(function () {
    $(this).find($("span.songlistOper")).fadeOut(38);
});
