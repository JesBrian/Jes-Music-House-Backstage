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