;(function ($, window, document, undefined) {
    var isTouch = 'ontouchstart' in window,
        eStart = isTouch ? 'touchstart' : 'mousedown',
        eMove = isTouch ? 'touchmove' : 'mousemove',
        eEnd = isTouch ? 'touchend' : 'mouseup',
        eCancel = isTouch ? 'touchcancel' : 'mouseup',
        secondsToTime = function (secs) {
            var hours = Math.floor(secs / 3600), minutes = Math.floor(secs % 3600 / 60),
                seconds = Math.ceil(secs % 3600 % 60);
            return ( hours == 0 ? '' : hours > 0 && hours.toString().length < 2 ? '0' + hours + ':' : hours + ':' ) + ( minutes.toString().length < 2 ? '0' + minutes : minutes ) + ':' + ( seconds.toString().length < 2 ? '0' + seconds : seconds );
        },
        canPlayType = function (file) {
            var audioElement = document.createElement('audio');
            return !!( audioElement.canPlayType && audioElement.canPlayType('audio/' + file.split('.').pop().toLowerCase() + ';').replace(/no/, '') );
        };

    $.fn.audioPlayer = function (params) {
        var params = $.extend({
                classPrefix: 'audioplayer',
                strPlay: '播放',
                strPause: '暂停',
                strVolume: '声音'
            }, params),
            cssClass = {},
            cssClassSub =
                {
                    playPause: 'playpause',
                    playing: 'playing',
                    time: 'time',
                    timeCurrent: 'time-current',
                    timeDuration: 'time-duration',
                    bar: 'bar',
                    barLoaded: 'bar-loaded',
                    barPlayed: 'bar-played',
                    volume: 'volume',
                    volumeButton: 'volume-button',
                    volumeAdjust: 'volume-adjust',
                    noVolume: 'novolume',
                    mute: 'mute',
                    mini: 'mini'
                };

        for (var subName in cssClassSub)
            cssClass[subName] = params.classPrefix + '-' + cssClassSub[subName];

        this.each(function () {
            if ($(this).prop('tagName').toLowerCase() != 'audio')
                return false;

            var $this = $(this),
                audioFile = $this.attr('src'),
                isAutoPlay = $this.get(0).getAttribute('autoplay'),
                isAutoPlay = isAutoPlay === '' || isAutoPlay === 'autoplay' ? true : false,
                isLoop = $this.get(0).getAttribute('loop'), isLoop = isLoop === '' || isLoop === 'loop' ? true : false,
                isSupport = false;

            if (typeof audioFile === 'undefined') {
                $this.find('source').each(function () {
                    audioFile = $(this).attr('src');
                    if (typeof audioFile !== 'undefined' && canPlayType(audioFile)) {
                        isSupport = true;
                        return false;
                    }
                });
            }
            else if (canPlayType(audioFile)) isSupport = true;

            var thePlayer = $('<div class="' + params.classPrefix + '">' + ( isSupport ? $('<div>').append($this.eq(0).clone()).html() : '' ) + '<div class="' + cssClass.playPause + '" title="' + params.strPlay + '"><a href="#">' + params.strPlay + '</a></div></div>'),
                theAudio = isSupport ? thePlayer.find('audio') : thePlayer.find('embed'), theAudio = theAudio.get(0);

            if (isSupport) {
                thePlayer.find('audio').css({'width': 0, 'height': 0, 'visibility': 'hidden'});
                thePlayer.append('<div class="' + cssClass.time + ' ' + cssClass.timeCurrent + '"></div><div class="' + cssClass.bar + '"><div class="' + cssClass.barLoaded + '"></div><div class="' + cssClass.barPlayed + '"></div></div><div class="' + cssClass.time + ' ' + cssClass.timeDuration + '">/</div><div class="' + cssClass.volume + '"><div class="' + cssClass.volumeButton + '" title="' + params.strVolume + '"><a href="#">' + params.strVolume + '</a></div><div class="' + cssClass.volumeAdjust + '"><div><div></div></div></div></div>');

                var theBar = thePlayer.find('.' + cssClass.bar),
                    barPlayed = thePlayer.find('.' + cssClass.barPlayed),
                    barLoaded = thePlayer.find('.' + cssClass.barLoaded),
                    timeCurrent = thePlayer.find('.' + cssClass.timeCurrent),
                    timeDuration = thePlayer.find('.' + cssClass.timeDuration),
                    volumeButton = thePlayer.find('.' + cssClass.volumeButton),
                    volumeAdjuster = thePlayer.find('.' + cssClass.volumeAdjust + ' > div'),
                    volumeDefault = 0,
                    adjustCurrentTime = function (e) {
                        theRealEvent = isTouch ? e.originalEvent.touches[0] : e;
                        theAudio.currentTime = Math.round(( theAudio.duration * ( theRealEvent.pageX - theBar.offset().left ) ) / theBar.width());
                    },
                    adjustVolume = function (e) {
                        theRealEvent = isTouch ? e.originalEvent.touches[0] : e;
                        theAudio.volume = Math.abs(( theRealEvent.pageY - ( volumeAdjuster.offset().top + volumeAdjuster.height() ) ) / volumeAdjuster.height());
                    },
                    updateLoadBar = setInterval(function () {
                        barLoaded.width(( theAudio.buffered.end(0) / theAudio.duration ) * 100 + '%');
                        if (theAudio.buffered.end(0) >= theAudio.duration)
                            clearInterval(updateLoadBar);
                    }, 100);

                var volumeTestDefault = theAudio.volume, volumeTestValue = theAudio.volume = 0.111;
                if (Math.round(theAudio.volume * 1000) / 1000 == volumeTestValue) theAudio.volume = volumeTestDefault;
                else thePlayer.addClass(cssClass.noVolume);

                timeDuration.html('&hellip;');
                timeCurrent.text(secondsToTime(0));

                theAudio.addEventListener('loadeddata', function () {
                    timeDuration.text(secondsToTime(theAudio.duration));
                    volumeAdjuster.find('div').height(theAudio.volume * 100 + '%');
                    volumeDefault = theAudio.volume;
                });

                theAudio.addEventListener('timeupdate', function () {
                    timeCurrent.text(secondsToTime(theAudio.currentTime));
                    barPlayed.width(( theAudio.currentTime / theAudio.duration ) * 100 + '%');
                });

                theAudio.addEventListener('volumechange', function () {
                    volumeAdjuster.find('div').height(theAudio.volume * 100 + '%');
                    if (theAudio.volume > 0 && thePlayer.hasClass(cssClass.mute)) thePlayer.removeClass(cssClass.mute);
                    if (theAudio.volume <= 0 && !thePlayer.hasClass(cssClass.mute)) thePlayer.addClass(cssClass.mute);
                });


                /* 控制播放模式  [0 -- 也是默认列表循环][1 -- 随机播放列表][2 -- 单曲循环] */
                var playmodeClickTemp = 0;
                $("#audioplayer-playmode").click(function () {
                    ++playmodeClickTemp;
                    playmodeClickTemp %= 3;
                    var playmodeLogo = $("#audioplayer-playmode > span");
                    var playmodeText = $("#audioplayer-playmodeText");
                    playmodeLogo.removeClass();
                    playmodeText.fadeIn();
                    switch (playmodeClickTemp) {
                        case 0:
                            playmodeLogo.addClass("MyIF loop");
                            playmodeText.text("循环列表");
                            break;
                        case 1:
                            playmodeLogo.addClass("MyIF random");
                            playmodeText.text("随机播放");
                            break;
                        case 2:
                            playmodeLogo.addClass("MyIF single-loop");
                            playmodeText.text("单曲循环");
                            break;
                    }
                    setTimeout('$("#audioplayer-playmodeText").fadeOut()', 5000);
                });
                /* 一首歌曲播放完毕 [依据播放模式选择下一首] */
                theAudio.addEventListener('ended', function () {
                    thePlayer.removeClass(cssClass.playing);
                    if (playmodeClickTemp == 0) {
                        $("audio").attr('src', 'audio/月半小夜曲.mp3');
                        audioFile = $this.attr('src');
                        thePlayer.addClass(cssClass.playing);
                        theAudio.play();
                    }
                    else if (playmodeClickTemp == 1) {
                        $("audio").attr('src', 'audio/东京不太热.mp3');
                        audioFile = $this.attr('src');
                        thePlayer.addClass(cssClass.playing);
                        theAudio.play();
                    }
                    else if (playmodeClickTemp == 2) {
                        audioFile = $this.attr('src');
                        thePlayer.addClass(cssClass.playing);
                        theAudio.play();
                    }
                });

                theBar.on(eStart, function (e) {
                    adjustCurrentTime(e);
                    theBar.on(eMove, function (e) {
                        adjustCurrentTime(e);
                    });
                })
                    .on(eCancel, function () {
                        theBar.unbind(eMove);
                    });

                volumeButton.on('click', function () {
                    if (thePlayer.hasClass(cssClass.mute)) {
                        thePlayer.removeClass(cssClass.mute);
                        theAudio.volume = volumeDefault;
                    }
                    else {
                        thePlayer.addClass(cssClass.mute);
                        volumeDefault = theAudio.volume;
                        theAudio.volume = 0;
                    }
                    return false;
                });

                volumeAdjuster.on(eStart, function (e) {
                    adjustVolume(e);
                    volumeAdjuster.on(eMove, function (e) {
                        adjustVolume(e);
                    });
                })
                    .on(eCancel, function () {
                        volumeAdjuster.unbind(eMove);
                    });
            }
            else thePlayer.addClass(cssClass.mini);

            if (isAutoPlay) thePlayer.addClass(cssClass.playing);

            thePlayer.find('.' + cssClass.playPause).on('click', function () {
                if (thePlayer.hasClass(cssClass.playing)) {
                    $(this).attr('title', params.strPlay).find('a').html(params.strPlay);
                    thePlayer.removeClass(cssClass.playing);
                    isSupport ? theAudio.pause() : theAudio.Stop();
                }
                else {
                    $(this).attr('title', params.strPause).find('a').html(params.strPause);
                    thePlayer.addClass(cssClass.playing);
                    isSupport ? theAudio.play() : theAudio.Play();
                }
                return false;
            });
            $this.replaceWith(thePlayer);

            /* 控制前一首 --错误做法OTZ */
            $("#audioplayer-PREV").click(function () {
                $("audio").attr('src', 'audio/东京不太热.mp3');
                audioFile = $this.attr('src');
                thePlayer.addClass(cssClass.playing);
                theAudio.play();
            });

            /* 控制后一首 */
            $("#audioplayer-NEXT").click(function () {
                $("audio").attr('src', 'audio/月半小夜曲.mp3');
                audioFile = $this.attr('src');
                thePlayer.addClass(cssClass.playing);
                theAudio.play();
            });

            /* 控制显示播放列表 */
            var songlistClickTemp = 0;
            $(".audioplayer-songlist").click(function () {
                ++songlistClickTemp;
                songlistClickTemp %= 2;
                if (songlistClickTemp) {
                    $("#audioplayer-songlistContent").fadeIn();
                }
                else {
                    $("#audioplayer-songlistContent").fadeOut();
                }
            });
            $("#songlistContent-close").click(function () {  //关闭按钮
                ++songlistClickTemp;
                songlistClickTemp %= 2;
                $("#audioplayer-songlistContent").fadeOut();
            });
            $("#songlistCollection").click(function () {    //播放列表收藏按钮
                ++songlistClickTemp;
                songlistClickTemp %= 2;
                $("#audioplayer-songlistContent").fadeOut();
            });
            $("#songlistClean").click(function () {         //播放列表清空按钮
                ++songlistClickTemp;
                songlistClickTemp %= 2;
                $("#audioplayer-songlistContent").fadeOut();
                $("audio").attr('src', '#.mp3');
                audioFile = $this.attr('src');
                thePlayer.removeClass(cssClass.playing);
                theAudio.pause();
            });
        });
        return this;
    };
})(jQuery, window, document);

$(function () {
    $('audio').audioPlayer();
});