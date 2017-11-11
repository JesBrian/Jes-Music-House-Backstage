

$("#leftNavbar").find($("a")).click(function () {
    iframeLocation($(this).attr("from"), $(this).attr("to"));
    $("#leftNavbar").find("a").removeClass("active");
    $(this).addClass("active");
});

function iframeLocation(ifName, url) {
    $("#" + ifName).attr("src",url);
}
