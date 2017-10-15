


var startx, starty;

//获得角度
function getAngle(angx, angy) {
    return Math.atan2(angy, angx) * 180 / Math.PI;
}

//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
function getDirection(startx, starty, endx, endy) {
    var angx = endx - startx;
    var angy = endy - starty;
    var result = 5; /* 默认触摸为点，没滑动 */
    //如果滑动距离太短
    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
        return result;
    }
    var angle = getAngle(angx, angy);
    if (startx == 0 && angle >= -45 && angle <= 45) {
        /* 从最左边开始触摸 -- 专门显示用户导航栏 */
        result = 0;
    } else if (angle >= -135 && angle <= -45) {
        /* 触摸方向向上 */
        result = 1;
    } else if (angle > 45 && angle < 135) {
        /* 触摸方向向下 */
        result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        /* 触摸方向向左 */
        result = 3;
    } else if (angle >= -45 && angle <= 45) {
        /* 触摸方向向右 */
        result = 4;
    }
    return result;
}

//手指触摸屏幕开始事件
function tsEvent(e) {
    startx = e.touches[0].pageX;
    starty = e.touches[0].pageY;
}

//手指触摸屏幕结束事件
function teEvent(e) {
    var endx, endy;
    endx = e.changedTouches[0].pageX;
    endy = e.changedTouches[0].pageY;
    var direction = getDirection(startx, starty, endx, endy);
    switch (direction) {
        case 0:
            $('#leftNav', window.parent.document).animate({left: '0'});
            $('#userOperList', window.parent.document).animate({scrollTop: 0}, 0);
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        default:
    }
}

//手指接触屏幕
document.addEventListener("touchstart", tsEvent, false);
//手指离开屏幕
document.addEventListener("touchend", teEvent, false);





/**
 * 点击展示菜单按钮弹出左侧用户菜单页
 */
$("#showMenu").on("touchend", function () {
    $('#leftNav', window.parent.document).animate({left:'0'});
    $('#userOperList', window.parent.document).animate({scrollTop:0},0);
});


