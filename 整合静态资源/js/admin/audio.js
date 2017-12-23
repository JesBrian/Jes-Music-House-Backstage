var song = document.getElementById("songSource");
var tempCurrentTime = 0;
var currentPlayTimeInterval;    //当前播放时间定时器
var bufferBarInterval;  //缓冲条进度定时器
var nowPointX = $("#nowPoint").offset().left;

/**
 * 控制歌曲的播放 or 暂停部分
 */
$("#playSong").click(function () {
    $(this).toggleClass('play').toggleClass('stop');

    if ($(this).hasClass("stop")) {
        if (!song.src) {
            song.src = "../../audio/test.mp3";
            song.oncanplay = function () {
                startPlaySong();
            };

        } else {
            if (tempCurrentTime !== 0) {
                song.currentTime = tempCurrentTime;
                tempCurrentTime = 0;
            }
            if (song.currentTime == song.duration) { //如果一首歌曲已经播放完毕就重新开始
                song.currentTime = 0;
                $("#nowPlayBar").stop(true).width(0);
                $("#nowPoint").stop(true).css({'margin-left':0});
            }

            currentPlayTimeInterval = setInterval(getCurrentPlayTime, 1000);
            changePlayBar();
        }

        song.play();

    } else {
        song.pause();
        clearInterval(currentPlayTimeInterval);
        $("#nowPlayBar").stop(true);
        $("#nowPoint").stop(true);
    }
});

/************************** ---- 控制歌曲的播放 or 暂停部分结束 ---- **************************/



/**
 * 控制上一首 or 下一首部分
 */
$("#prepSong").click(function () {
    song.src = "../../audio/我ら来たれり.mp3";
    $("#playSong").removeClass('play').addClass('stop');

    clearInterval(currentPlayTimeInterval);
    $("#nowPlayBar").stop(true).width(0);
    $("#nowPoint").stop(true).css({'margin-left': 0});
    $("#nowBufferBar").stop(true).width(0);

    song.play();

    song.oncanplay = function () {
        startPlaySong();
    }
});
$("#nextSong").click(function () {
    song.src = "../../audio/月半小夜曲.mp3";
    $("#playSong").removeClass('play').addClass('stop');

    clearInterval(currentPlayTimeInterval);
    $("#nowPlayBar").stop(true).width(0);
    $("#nowPoint").stop(true).css({'margin-left': 0});
    $("#nowBufferBar").stop(true).width(0);

    song.play();

    song.oncanplay = function () {
        startPlaySong();
    }
});

/************************** ---- 控制上一首 or 下一首部分结束 ---- **************************/



/**
 * 点击进度条播放跳转进度的部分
 */
$("#barTag").on('click', function (event) {
    if (song.src) {
        if (song.oncanplay !== null) {
            song.oncanplay = null;  //必须将其设为null，不然会有一大堆BUG现象
        }
        song.pause();
        clearInterval(currentPlayTimeInterval);
        let clickTime = (getMousePosX(event) - $("#barTag").offset().left) / $("#barTag").width() + 0.01;
        let clickTimePrecent = Number.parseInt(clickTime * 100) + "%";

        $("#nowPlayBar").stop(true).width(clickTimePrecent);
        $("#nowPoint").stop(true).css({"margin-left": clickTimePrecent});


        if ($("#playSong").hasClass("stop")) {
            song.currentTime = song.duration * clickTime;
            currentPlayTimeInterval = setInterval(getCurrentPlayTime, 1000);
            song.play();
            changePlayBar();
        } else {
            song.currentTime = song.duration * clickTime;
            $("#currentPlayTime").html(completeTime(song.currentTime));
        }
    }
});


/************************** ---- 点击进度条播放的部分结束 ---- **************************/



/**
 * 拖拽播放进度指针跳转进度的部分[使用鼠标按下、拖动、弹开几个来实现]
 */
$("#nowPoint").mousedown(function () {
    // 绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件
    $(document).on("mousemove", function (ev) {
        // 当前鼠标的位置（移动后，鼠标弹起）
        sx = ev.pageX;

        // 设定元素位置
        $("#nowPoint").css({"margin-left": sx - nowPointX - 50, 'cursor': 'crosshair'});
    });
    // 当鼠标按键弹起时，解除元素移动，让元素停留在当前位置
    $(document).mouseup(function () {
        $(this).off("mousemove");
        $("#nowPoint").css({'cursor': 'pointer'});
    });
});




/************************** ---- 拖拽播放进度指针的部分结束 ---- **************************/




/**
 * 控制音量的部分
 */
$("#volumeOper").click(function () {
    $(this).children('a').toggleClass('volume-yes').toggleClass('volume-no');

    if ($(this).children('a').hasClass('volume-no')) {
        $('#volumeControl').fadeOut();
        $('div.colorBar').fadeOut();

        song.volume = 0;

    } else {
        $('#volumeControl').fadeIn();
        $('div.colorBar').fadeIn();

        song.volume = (numBars / 30).toFixed(1);
    }

});


$.fn.knobKnob = function (props) {

    var options = $.extend({
        snap: 0,
        value: 0,
        turn: function () {
        }
    }, props || {});

    var tpl = '<div class="knob">\<div class="top"></div>\<div class="base"></div>\</div>';

    return this.each(function () {

        var el = $(this);
        el.append(tpl);

        var knob = $('.knob', el),
            knobTop = knob.find('.top'),
            startDeg = -1,
            currentDeg = 0,
            rotation = 0,
            lastDeg = 0,
            doc = $(document);

        if (options.value > 0 && options.value <= 359) {
            rotation = currentDeg = options.value;
            knobTop.css('transform', 'rotate(' + (currentDeg) + 'deg)');
            options.turn(currentDeg / 359);
        }

        knob.on('mousedown touchstart', function (e) {

            e.preventDefault();

            var offset = knob.offset();
            var center = {
                y: offset.top + knob.height() / 2,
                x: offset.left + knob.width() / 2
            };

            var a, b, deg, tmp,
                rad2deg = 180 / Math.PI;

            knob.on('mousemove.rem touchmove.rem', function (e) {

                e = (e.originalEvent.touches) ? e.originalEvent.touches[0] : e;

                a = center.y - e.pageY;
                b = center.x - e.pageX;
                deg = Math.atan2(a, b) * rad2deg;

                // we have to make sure that negative
                // angles are turned into positive:
                if (deg < 0) {
                    deg = 360 + deg;
                }

                // Save the starting position of the drag
                if (startDeg == -1) {
                    startDeg = deg;
                }

                // Calculating the current rotation
                tmp = Math.floor((deg - startDeg) + rotation);

                // Making sure the current rotation
                // stays between 0 and 359
                if (tmp < 0) {
                    tmp = 360 + tmp;
                }
                else if (tmp > 359) {
                    tmp = tmp % 360;
                }

                // Snapping in the off position:
                if (options.snap && tmp < options.snap) {
                    tmp = 0;
                }

                // This would suggest we are at an end position;
                // we need to block further rotation.
                if (Math.abs(tmp - lastDeg) > 180) {
                    return false;
                }

                currentDeg = tmp;
                lastDeg = tmp;

                knobTop.css('transform', 'rotate(' + (currentDeg) + 'deg)');
                options.turn(currentDeg / 359);
            });

            doc.on('mouseup.rem  touchend.rem', function () {
                knob.off('.rem');
                doc.off('.rem');

                // Saving the current rotation
                rotation = currentDeg;

                // Marking the starting degree as invalid
                startDeg = -1;
            });

        });
    });
};


var colors = ['0BFF42', '0DFF51', '13FF5F', '11FF73', '16FF86', '16FF98', '21FFBE', '36FFD0', '34FFE0', '28FFEF', '34FFFB', '29EFFF', '32E1FF', '22D3FF', '2BC9FF', '21BBFF', '1D9DFF', '1382FF', '137AFF', '1172FF', '492AFF', '552DFF', '622EFF', '6D2EFF', '7729FF', '8328FF', '9138FF', 'A14AFF', 'B05CFF', 'B362FF',];
var rad2deg = 180 / Math.PI;
var deg = 0;
var bars = $('#volumeBar');

for (let i = 0; i < colors.length; i++) {

    deg = i * 12;

    // Create the colorbars
    $('<div class="colorBar">').css({
        backgroundColor: '#' + colors[i],
        transform: 'rotate(' + deg + 'deg)',
        top: -Math.sin(deg / rad2deg) * 40 + 100,
        left: Math.cos((180 - deg) / rad2deg) * 40 + 100,
    }).appendTo(bars);
}

var colorBars = bars.find('.colorBar');
var numBars = 0, lastNum = -1;

$('#volumeControl').knobKnob({
    snap: 10,
    value: 180,
    turn: function (ratio) {
        numBars = Math.round(colorBars.length * ratio);

        // Update the dom only when the number of active bars
        // changes, instead of on every move

        if (numBars == lastNum) {
            return false;
        }
        lastNum = numBars;

        song.volume = (numBars / 30).toFixed(1);

        colorBars.removeClass('active').slice(0, numBars).addClass('active');
    }
});

/************************** ---- 控制音量部分结束 ---- **************************/



/**
 * 播放器复用函数部分
 */
    /* 获取歌曲的总时间长度 */
function getTotalPlayTime() {
    $("#totalPlayTime").html(completeTime(song.duration));
}

    /* 获取当前歌曲播放的进度时间 */
function getCurrentPlayTime() {
    $("#currentPlayTime").html(completeTime(song.currentTime));

    if (song.currentTime == song.duration) {
        song.oncanplay = null;
        clearInterval(currentPlayTimeInterval);
        $("#playSong").addClass('play').removeClass('stop');
    }
}

    /* 获取歌曲缓冲进度/改变播放器缓冲条进度 */
function changeBufferBar() {
    $("#nowBufferBar").stop(true).animate({'width': song.buffered.end(song.buffered.length - 1) / song.duration * 100 + "%"}, 1000);
    if ($("#nowBufferBar").width() == $("#barTag").width()) {
        $("#nowBufferBar").stop(true);
        clearInterval(bufferBarInterval);
    }
}

    /* 改变播放器播放进度条 */
function changePlayBar() {
    $("#nowPlayBar").stop(true).animate({'width': "100%"}, ((song.duration - song.currentTime + 0.8) * 1000));
    $("#nowPoint").stop(true).animate({'margin-left': "100%"}, ((song.duration - song.currentTime + 0.8) * 1000));
}

    /* 计算时间 */
function completeTime(time) {
    time = Number.parseInt(time);
    let house = Number.parseInt(time / 3600), minute = Number.parseInt((time - house * 3600) / 60), second = Number.parseInt(time % 60);
    if (house <= 9) house = "0" + house;
    if (minute <= 9) minute = "0" + minute;
    if (second <= 9) second = "0" + second;
    return house + ":" + minute + ":" + second;
}

    /* 开始播放歌曲 */
function startPlaySong() {
    bufferBarInterval = setInterval(changeBufferBar, 1000);
    currentPlayTimeInterval = setInterval(getCurrentPlayTime, 1000);
    getTotalPlayTime();
    changePlayBar();
}

/************************** ---- 播放器复用函数部分结束 ---- **************************/


function getMousePosX(e = window.event) {
    let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    let x = e.pageX || e.clientX + scrollX;
    return x;
}
function getMousePosY(e = window.event) {
    let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    let x = e.pageX || e.clientX + scrollX;
    return x;
}