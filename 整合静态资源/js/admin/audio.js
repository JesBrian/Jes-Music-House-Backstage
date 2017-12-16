var song = document.getElementById("songSource");
var currentPlayTime = 0, addCurrentPlayTime;


/**
 * 控制歌曲的播放 or 暂停部分
 */
$("#playSong").click(function () {
    $(this).toggleClass('play').toggleClass('stop');

    if ($(this).hasClass("stop")) {
        if (!song.src) {
            song.src = "../../audio/ゼロFINAL%20FANTASY零式オープニングver.mp3";
        }
        song.play();

        setTimeout(function () {
            $("#totalPlayTime").html(getTotalPlayTime())
        }, 1500);

        addCurrentPlayTime = setInterval(function () {
            currentPlayTime++;
            let house = Number.parseInt(currentPlayTime / 3600);
            let minute = Number.parseInt((currentPlayTime - house * 3600) / 60);
            let second = Number.parseInt(currentPlayTime % 60);
            if (house <= 9) {
                house = "0" + house;
            }
            if (minute <= 9) {
                minute = "0" + minute;
            }
            if (second <= 9) {
                second = "0" + second;
            }

            $("#currentPlsyTime").html(house + ":" + minute + ":" + second);
        }, 1000);
    } else {
        song.pause();
        clearInterval(addCurrentPlayTime);
    }
});

/************************** ---- 控制歌曲的播放 or 暂停部分结束 ---- **************************/




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
    $('<div class="colorBar">').css({backgroundColor: '#' + colors[i], transform: 'rotate(' + deg + 'deg)', top: -Math.sin(deg / rad2deg) * 40 + 100, left: Math.cos((180 - deg) / rad2deg) * 40 + 100,}).appendTo(bars);
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
 * 控制上一首 or 下一首部分
 */
$("#prepSong").click(function () {
    song.src = "../../audio/我ら来たれり.mp3";
    song.play();
    $("#playSong").removeClass('play').addClass('stop');
    setTimeout(function () {
        $("#totalPlayTime").html(getTotalPlayTime())
    }, 1500);

    clearInterval(addCurrentPlayTime);
    currentPlayTime = 0;
    addCurrentPlayTime = setInterval(function () {
        currentPlayTime++;
        let house = Number.parseInt(currentPlayTime / 3600);
        let minute = Number.parseInt((currentPlayTime - house * 3600) / 60);
        let second = Number.parseInt(currentPlayTime % 60);
        if (house <= 9) {
            house = "0" + house;
        }
        if (minute <= 9) {
            minute = "0" + minute;
        }
        if (second <= 9) {
            second = "0" + second;
        }

        $("#currentPlsyTime").html(house + ":" + minute + ":" + second);
    }, 1000);

});
$("#nextSong").click(function () {
    song.src = "../../audio/月半小夜曲.mp3";
    song.play();
    $("#playSong").removeClass('play').addClass('stop');
    setTimeout(function () {
        $("#totalPlayTime").html(getTotalPlayTime())
    }, 1500);

    clearInterval(addCurrentPlayTime);
    currentPlayTime = 0;
    addCurrentPlayTime = setInterval(function () {
        currentPlayTime++;
        let house = Number.parseInt(currentPlayTime / 3600);
        let minute = Number.parseInt((currentPlayTime - house * 3600) / 60);
        let second = Number.parseInt(currentPlayTime % 60);
        if (house <= 9) {
            house = "0" + house;
        }
        if (minute <= 9) {
            minute = "0" + minute;
        }
        if (second <= 9) {
            second = "0" + second;
        }

        $("#currentPlsyTime").html(house + ":" + minute + ":" + second);
    }, 1000);
});

/************************** ---- 控制上一首 or 下一首部分结束 ---- **************************/



/**
 * 播放器复用函数部分
 */
    /* 获取歌曲的总时间长度 */
function getTotalPlayTime() {
    let tempTimeStamp = Number.parseInt(song.duration);
    let house = Number.parseInt(tempTimeStamp / 3600);
    let minute = Number.parseInt((tempTimeStamp - house * 3600) / 60);
    let second = Number.parseInt(tempTimeStamp % 60);
    if (house <= 9) {
        house = "0" + house;
    }
    if (minute <= 9) {
        minute = "0" + minute;
    }
    if (second <= 9) {
        second = "0" + second;
    }
    return house + ":" + minute + ":" + second;
}

    /* 获取当前歌曲播放的进度时间 */
function getCurrentPlayTime() {

}
// setTimeout(getCurrentPlayTime, 3000);

/************************** ---- 播放器复用函数部分结束 ---- **************************/