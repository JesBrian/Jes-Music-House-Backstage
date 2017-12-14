let NivoSlider = function (element, options) {
    let settings = $.extend({}, $.fn.nivoSlider.defaults, options);
    let lets = {
        currentSlide: 0,
        currentImage: '',
        totalSlides: 0,
        randAnim: '',
        running: false,
        paused: false,
        stop: false
    };
    let slider = $(element);
    slider.data('nivo:lets', lets);
    slider.css('position', 'relative');
    slider.addClass('nivoSlider');
    let kids = slider.children();
    kids.each(function () {
        let child = $(this);
        let link = '';
        if (!child.is('img')) {
            if (child.is('a')) {
                child.addClass('nivo-imageLink');
                link = child;
            }
            child = child.find('img:first');
        }
        let childWidth = child.width();
        if (childWidth == 0) childWidth = child.attr('width');
        let childHeight = child.height();
        if (childHeight == 0) childHeight = child.attr('height');
        if (childWidth > slider.width()) {
            slider.width(childWidth);
        }
        if (childHeight > slider.height()) {
            slider.height(childHeight);
        }
        if (link != '') {
            link.css('display', 'none');
        }
        child.css('display', 'none');
        lets.totalSlides++;
    });
    if (settings.startSlide > 0) {
        if (settings.startSlide >= lets.totalSlides) settings.startSlide = lets.totalSlides - 1;
        lets.currentSlide = settings.startSlide;
    }
    if ($(kids[lets.currentSlide]).is('img')) {
        lets.currentImage = $(kids[lets.currentSlide]);
    } else {
        lets.currentImage = $(kids[lets.currentSlide]).find('img:first');
    }
    if ($(kids[lets.currentSlide]).is('a')) {
        $(kids[lets.currentSlide]).css('display', 'block');
    }
    slider.css('background', 'url("' + lets.currentImage.attr('src') + '") no-repeat');
    slider.append($('<div class="nivo-caption"><p></p></div>').css({
        display: 'none',
        opacity: settings.captionOpacity
    }));
    let processCaption = function (settings) {
        let nivoCaption = $('.nivo-caption', slider);
        if (lets.currentImage.attr('title') != '' && lets.currentImage.attr('title') != undefined) {
            let title = lets.currentImage.attr('title');
            if (title.substr(0, 1) == '#') title = $(title).html();
            if (nivoCaption.css('display') == 'block') {
                nivoCaption.find('p').fadeOut(settings.animSpeed, function () {
                    $(this).html(title);
                    $(this).fadeIn(settings.animSpeed);
                });
            } else {
                nivoCaption.find('p').html(title);
            }
            nivoCaption.fadeIn(settings.animSpeed);
        } else {
            nivoCaption.fadeOut(settings.animSpeed);
        }
    };
    processCaption(settings);
    let timer = 0;
    if (!settings.manualAdvance && kids.length > 1) {
        timer = setInterval(function () {
            nivoRun(slider, kids, settings, false);
        }, settings.pauseTime);
    }
    if (settings.directionNav) {
        slider.append('<div class="nivo-directionNav"><a class="nivo-prevNav">' + settings.prevText + '</a><a class="nivo-nextNav">' + settings.nextText + '</a></div>');
        if (settings.directionNavHide) {
            $('.nivo-directionNav', slider).hide();
            slider.hover(function () {
                $('.nivo-directionNav', slider).show();
            }, function () {
                $('.nivo-directionNav', slider).hide();
            });
        }
        $('a.nivo-prevNav', slider).on('click', function () {
            if (lets.running) return false;
            clearInterval(timer);
            timer = '';
            lets.currentSlide -= 2;
            nivoRun(slider, kids, settings, 'prev');
        });
        $('a.nivo-nextNav', slider).on('click', function () {
            if (lets.running) return false;
            clearInterval(timer);
            timer = '';
            nivoRun(slider, kids, settings, 'next');
        });
    }
    if (settings.controlNav) {
        let nivoControl = $('<div class="nivo-controlNav"></div>');
        slider.append(nivoControl);
        for (let i = 0; i < kids.length; i++) {
            if (settings.controlNavThumbs) {
                let child = kids.eq(i);
                if (!child.is('img')) {
                    child = child.find('img:first');
                }
                if (settings.controlNavThumbsFromRel) {
                    nivoControl.append('<a class="nivo-control" rel="' + i + '"><img src="' + child.attr('rel') + '" alt="" /></a>');
                } else {
                    nivoControl.append('<a class="nivo-control" rel="' + i + '"><img src="' + child.attr('src').replace(settings.controlNavThumbsSearch, settings.controlNavThumbsReplace) + '" alt="" /></a>');
                }
            } else {
                nivoControl.append('<a class="nivo-control" rel="' + i + '">' + (i + 1) + '</a>');
            }
        }
        $('.nivo-controlNav a:eq(' + lets.currentSlide + ')', slider).addClass('active');
        $('.nivo-controlNav a', slider).on('click', function () {
            if (lets.running) return false;
            if ($(this).hasClass('active')) return false;
            clearInterval(timer);
            timer = '';
            slider.css('background', 'url("' + lets.currentImage.attr('src') + '") no-repeat');
            lets.currentSlide = $(this).attr('rel') - 1;
            nivoRun(slider, kids, settings, 'control');
        });
    }
    if (settings.keyboardNav) {
        $(window).keypress(function (event) {
            if (event.keyCode == '37') {
                if (lets.running) return false;
                clearInterval(timer);
                timer = '';
                lets.currentSlide -= 2;
                nivoRun(slider, kids, settings, 'prev');
            }
            if (event.keyCode == '39') {
                if (lets.running) return false;
                clearInterval(timer);
                timer = '';
                nivoRun(slider, kids, settings, 'next');
            }
        });
    }
    if (settings.pauseOnHover) {
        slider.hover(function () {
            lets.paused = true;
            clearInterval(timer);
            timer = '';
        }, function () {
            lets.paused = false;
            if (timer == '' && !settings.manualAdvance) {
                timer = setInterval(function () {
                    nivoRun(slider, kids, settings, false);
                }, settings.pauseTime);
            }
        });
    }
    slider.bind('nivo:animFinished', function () {
        lets.running = false;
        $(kids).each(function () {
            if ($(this).is('a')) {
                $(this).css('display', 'none');
            }
        });
        if ($(kids[lets.currentSlide]).is('a')) {
            $(kids[lets.currentSlide]).css('display', 'block');
        }
        if (timer == '' && !lets.paused && !settings.manualAdvance) {
            timer = setInterval(function () {
                nivoRun(slider, kids, settings, false);
            }, settings.pauseTime);
        }
        settings.afterChange.call(this);
    });
    let createSlices = function (slider, settings, lets) {
        for (let i = 0; i < settings.slices; i++) {
            let sliceWidth = Math.round(slider.width() / settings.slices);
            if (i == settings.slices - 1) {
                slider.append($('<div class="nivo-slice"></div>').css({
                    left: (sliceWidth * i) + 'px',
                    width: (slider.width() - (sliceWidth * i)) + 'px',
                    height: '0px',
                    opacity: '0',
                    background: 'url("' + lets.currentImage.attr('src') + '") no-repeat -' + ((sliceWidth + (i * sliceWidth)) - sliceWidth) + 'px 0%'
                }));
            } else {
                slider.append($('<div class="nivo-slice"></div>').css({
                    left: (sliceWidth * i) + 'px',
                    width: sliceWidth + 'px',
                    height: '0px',
                    opacity: '0',
                    background: 'url("' + lets.currentImage.attr('src') + '") no-repeat -' + ((sliceWidth + (i * sliceWidth)) - sliceWidth) + 'px 0%'
                }));
            }
        }
    };
    let createBoxes = function (slider, settings, lets) {
        let boxWidth = Math.round(slider.width() / settings.boxCols);
        let boxHeight = Math.round(slider.height() / settings.boxRows);
        for (let rows = 0; rows < settings.boxRows; rows++) {
            for (let cols = 0; cols < settings.boxCols; cols++) {
                if (cols == settings.boxCols - 1) {
                    slider.append($('<div class="nivo-box"></div>').css({
                        opacity: 0,
                        left: (boxWidth * cols) + 'px',
                        top: (boxHeight * rows) + 'px',
                        width: (slider.width() - (boxWidth * cols)) + 'px',
                        height: boxHeight + 'px',
                        background: 'url("' + lets.currentImage.attr('src') + '") no-repeat -' + ((boxWidth + (cols * boxWidth)) - boxWidth) + 'px -' + ((boxHeight + (rows * boxHeight)) - boxHeight) + 'px'
                    }));
                } else {
                    slider.append($('<div class="nivo-box"></div>').css({
                        opacity: 0,
                        left: (boxWidth * cols) + 'px',
                        top: (boxHeight * rows) + 'px',
                        width: boxWidth + 'px',
                        height: boxHeight + 'px',
                        background: 'url("' + lets.currentImage.attr('src') + '") no-repeat -' + ((boxWidth + (cols * boxWidth)) - boxWidth) + 'px -' + ((boxHeight + (rows * boxHeight)) - boxHeight) + 'px'
                    }));
                }
            }
        }
    };
    let nivoRun = function (slider, kids, settings, nudge) {
        let lets = slider.data('nivo:lets');
        if (lets && (lets.currentSlide == lets.totalSlides - 1)) {
            settings.lastSlide.call(this);
        }
        if ((!lets || lets.stop) && !nudge) return false;
        settings.beforeChange.call(this);
        if (!nudge) {
            slider.css('background', 'url("' + lets.currentImage.attr('src') + '") no-repeat');
        } else {
            if (nudge == 'prev') {
                slider.css('background', 'url("' + lets.currentImage.attr('src') + '") no-repeat');
            }
            if (nudge == 'next') {
                slider.css('background', 'url("' + lets.currentImage.attr('src') + '") no-repeat');
            }
        }
        lets.currentSlide++;
        if (lets.currentSlide == lets.totalSlides) {
            lets.currentSlide = 0;
            settings.slideshowEnd.call(this);
        }
        if (lets.currentSlide < 0) lets.currentSlide = (lets.totalSlides - 1);
        if ($(kids[lets.currentSlide]).is('img')) {
            lets.currentImage = $(kids[lets.currentSlide]);
        } else {
            lets.currentImage = $(kids[lets.currentSlide]).find('img:first');
        }
        if (settings.controlNav) {
            $('.nivo-controlNav a', slider).removeClass('active');
            $('.nivo-controlNav a:eq(' + lets.currentSlide + ')', slider).addClass('active');
        }
        processCaption(settings);
        $('.nivo-slice', slider).remove();
        $('.nivo-box', slider).remove();
        if (settings.effect == 'random') {
            let anims = new Array('sliceDownRight', 'sliceDownLeft', 'sliceUpRight', 'sliceUpLeft', 'sliceUpDown', 'sliceUpDownLeft', 'fold', 'fade', 'boxRandom', 'boxRain', 'boxRainReverse', 'boxRainGrow', 'boxRainGrowReverse');
            lets.randAnim = anims[Math.floor(Math.random() * (anims.length + 1))];
            if (lets.randAnim == undefined) lets.randAnim = 'fade';
        }
        if (settings.effect.indexOf(',') != -1) {
            let anims = settings.effect.split(',');
            lets.randAnim = anims[Math.floor(Math.random() * (anims.length))];
            if (lets.randAnim == undefined) lets.randAnim = 'fade';
        }
        lets.running = true;
        if (settings.effect == 'sliceDown' || settings.effect == 'sliceDownRight' || lets.randAnim == 'sliceDownRight' || settings.effect == 'sliceDownLeft' || lets.randAnim == 'sliceDownLeft') {
            createSlices(slider, settings, lets);
            let timeBuff = 0;
            let i = 0;
            let slices = $('.nivo-slice', slider);
            if (settings.effect == 'sliceDownLeft' || lets.randAnim == 'sliceDownLeft') slices = $('.nivo-slice', slider)._reverse();
            slices.each(function () {
                let slice = $(this);
                slice.css({'top': '0px'});
                if (i == settings.slices - 1) {
                    setTimeout(function () {
                        slice.animate({height: '100%', opacity: '1.0'}, settings.animSpeed, '', function () {
                            slider.trigger('nivo:animFinished');
                        });
                    }, (100 + timeBuff));
                } else {
                    setTimeout(function () {
                        slice.animate({height: '100%', opacity: '1.0'}, settings.animSpeed);
                    }, (100 + timeBuff));
                }
                timeBuff += 50;
                i++;
            });
        }
        else if (settings.effect == 'sliceUp' || settings.effect == 'sliceUpRight' || lets.randAnim == 'sliceUpRight' || settings.effect == 'sliceUpLeft' || lets.randAnim == 'sliceUpLeft') {
            createSlices(slider, settings, lets);
            let timeBuff = 0;
            let i = 0;
            let slices = $('.nivo-slice', slider);
            if (settings.effect == 'sliceUpLeft' || lets.randAnim == 'sliceUpLeft') slices = $('.nivo-slice', slider)._reverse();
            slices.each(function () {
                let slice = $(this);
                slice.css({'bottom': '0px'});
                if (i == settings.slices - 1) {
                    setTimeout(function () {
                        slice.animate({height: '100%', opacity: '1.0'}, settings.animSpeed, '', function () {
                            slider.trigger('nivo:animFinished');
                        });
                    }, (100 + timeBuff));
                } else {
                    setTimeout(function () {
                        slice.animate({height: '100%', opacity: '1.0'}, settings.animSpeed);
                    }, (100 + timeBuff));
                }
                timeBuff += 50;
                i++;
            });
        }
        else if (settings.effect == 'sliceUpDown' || settings.effect == 'sliceUpDownRight' || lets.randAnim == 'sliceUpDown' || settings.effect == 'sliceUpDownLeft' || lets.randAnim == 'sliceUpDownLeft') {
            createSlices(slider, settings, lets);
            let timeBuff = 0;
            let i = 0;
            let v = 0;
            let slices = $('.nivo-slice', slider);
            if (settings.effect == 'sliceUpDownLeft' || lets.randAnim == 'sliceUpDownLeft') slices = $('.nivo-slice', slider)._reverse();
            slices.each(function () {
                let slice = $(this);
                if (i == 0) {
                    slice.css('top', '0px');
                    i++;
                } else {
                    slice.css('bottom', '0px');
                    i = 0;
                }
                if (v == settings.slices - 1) {
                    setTimeout(function () {
                        slice.animate({height: '100%', opacity: '1.0'}, settings.animSpeed, '', function () {
                            slider.trigger('nivo:animFinished');
                        });
                    }, (100 + timeBuff));
                } else {
                    setTimeout(function () {
                        slice.animate({height: '100%', opacity: '1.0'}, settings.animSpeed);
                    }, (100 + timeBuff));
                }
                timeBuff += 50;
                v++;
            });
        }
        else if (settings.effect == 'fold' || lets.randAnim == 'fold') {
            createSlices(slider, settings, lets);
            let timeBuff = 0;
            let i = 0;
            $('.nivo-slice', slider).each(function () {
                let slice = $(this);
                let origWidth = slice.width();
                slice.css({top: '0px', height: '100%', width: '0px'});
                if (i == settings.slices - 1) {
                    setTimeout(function () {
                        slice.animate({width: origWidth, opacity: '1.0'}, settings.animSpeed, '', function () {
                            slider.trigger('nivo:animFinished');
                        });
                    }, (100 + timeBuff));
                } else {
                    setTimeout(function () {
                        slice.animate({width: origWidth, opacity: '1.0'}, settings.animSpeed);
                    }, (100 + timeBuff));
                }
                timeBuff += 50;
                i++;
            });
        }
        else if (settings.effect == 'fade' || lets.randAnim == 'fade') {
            createSlices(slider, settings, lets);
            let firstSlice = $('.nivo-slice:first', slider);
            firstSlice.css({'height': '100%', 'width': slider.width() + 'px'});
            firstSlice.animate({opacity: '1.0'}, (settings.animSpeed * 2), '', function () {
                slider.trigger('nivo:animFinished');
            });
        }
        else if (settings.effect == 'slideInRight' || lets.randAnim == 'slideInRight') {
            createSlices(slider, settings, lets);
            let firstSlice = $('.nivo-slice:first', slider);
            firstSlice.css({'height': '100%', 'width': '0px', 'opacity': '1'});
            firstSlice.animate({width: slider.width() + 'px'}, (settings.animSpeed * 2), '', function () {
                slider.trigger('nivo:animFinished');
            });
        }
        else if (settings.effect == 'slideInLeft' || lets.randAnim == 'slideInLeft') {
            createSlices(slider, settings, lets);
            let firstSlice = $('.nivo-slice:first', slider);
            firstSlice.css({'height': '100%', 'width': '0px', 'opacity': '1', 'left': '', 'right': '0px'});
            firstSlice.animate({width: slider.width() + 'px'}, (settings.animSpeed * 2), '', function () {
                firstSlice.css({'left': '0px', 'right': ''});
                slider.trigger('nivo:animFinished');
            });
        }
        else if (settings.effect == 'boxRandom' || lets.randAnim == 'boxRandom') {
            createBoxes(slider, settings, lets);
            let totalBoxes = settings.boxCols * settings.boxRows;
            let i = 0;
            let timeBuff = 0;
            let boxes = shuffle($('.nivo-box', slider));
            boxes.each(function () {
                let box = $(this);
                if (i == totalBoxes - 1) {
                    setTimeout(function () {
                        box.animate({opacity: '1'}, settings.animSpeed, '', function () {
                            slider.trigger('nivo:animFinished');
                        });
                    }, (100 + timeBuff));
                } else {
                    setTimeout(function () {
                        box.animate({opacity: '1'}, settings.animSpeed);
                    }, (100 + timeBuff));
                }
                timeBuff += 20;
                i++;
            });
        }
        else if (settings.effect == 'boxRain' || lets.randAnim == 'boxRain' || settings.effect == 'boxRainReverse' || lets.randAnim == 'boxRainReverse' || settings.effect == 'boxRainGrow' || lets.randAnim == 'boxRainGrow' || settings.effect == 'boxRainGrowReverse' || lets.randAnim == 'boxRainGrowReverse') {
            createBoxes(slider, settings, lets);
            let totalBoxes = settings.boxCols * settings.boxRows;
            let i = 0;
            let timeBuff = 0;
            let rowIndex = 0;
            let colIndex = 0;
            let box2Darr = new Array();
            box2Darr[rowIndex] = new Array();
            let boxes = $('.nivo-box', slider);
            if (settings.effect == 'boxRainReverse' || lets.randAnim == 'boxRainReverse' || settings.effect == 'boxRainGrowReverse' || lets.randAnim == 'boxRainGrowReverse') {
                boxes = $('.nivo-box', slider)._reverse();
            }
            boxes.each(function () {
                box2Darr[rowIndex][colIndex] = $(this);
                colIndex++;
                if (colIndex == settings.boxCols) {
                    rowIndex++;
                    colIndex = 0;
                    box2Darr[rowIndex] = new Array();
                }
            });
            for (let cols = 0; cols < (settings.boxCols * 2); cols++) {
                let prevCol = cols;
                for (let rows = 0; rows < settings.boxRows; rows++) {
                    if (prevCol >= 0 && prevCol < settings.boxCols) {
                        (function (row, col, time, i, totalBoxes) {
                            let box = $(box2Darr[row][col]);
                            let w = box.width();
                            let h = box.height();
                            if (settings.effect == 'boxRainGrow' || lets.randAnim == 'boxRainGrow' || settings.effect == 'boxRainGrowReverse' || lets.randAnim == 'boxRainGrowReverse') {
                                box.width(0).height(0);
                            }
                            if (i == totalBoxes - 1) {
                                setTimeout(function () {
                                    box.animate({
                                        opacity: '1',
                                        width: w,
                                        height: h
                                    }, settings.animSpeed / 1.3, '', function () {
                                        slider.trigger('nivo:animFinished');
                                    });
                                }, (100 + time));
                            } else {
                                setTimeout(function () {
                                    box.animate({opacity: '1', width: w, height: h}, settings.animSpeed / 1.3);
                                }, (100 + time));
                            }
                        })(rows, prevCol, timeBuff, i, totalBoxes);
                        i++;
                    }
                    prevCol--;
                }
                timeBuff += 100;
            }
        }
    };
    let shuffle = function (arr) {
        for (let j, x,
                 i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x) ;
        return arr;
    };
    let trace = function (msg) {
        if (this.console && typeof console.log != "undefined")
            console.log(msg);
    };
    this.stop = function () {
        if (!$(element).data('nivo:lets').stop) {
            $(element).data('nivo:lets').stop = true;
            trace('Stop Slider');
        }
    };
    this.start = function () {
        if ($(element).data('nivo:lets').stop) {
            $(element).data('nivo:lets').stop = false;
            trace('Start Slider');
        }
    };
    settings.afterLoad.call(this);
    return this;
};
$.fn.nivoSlider = function (options) {
    return this.each(function (key, value) {
        let element = $(this);
        if (element.data('nivoslider')) return element.data('nivoslider');
        let nivoslider = new NivoSlider(this, options);
        element.data('nivoslider', nivoslider);
    });
};
$.fn.nivoSlider.defaults = {
    effect: 'random',
    slices: 15,
    boxCols: 8,
    boxRows: 4,
    animSpeed: 400,
    pauseTime: 4000,
    startSlide: 0,
    directionNav: true,
    directionNavHide: true,
    controlNav: true,
    controlNavThumbs: false,
    controlNavThumbsFromRel: false,
    controlNavThumbsSearch: '.jpg',
    controlNavThumbsReplace: '_thumb.jpg',
    keyboardNav: true,
    pauseOnHover: true,
    manualAdvance: false,
    captionOpacity: 0.8,
    prevText: 'Prev',
    nextText: 'Next',
    beforeChange: function () {
    },
    afterChange: function () {
    },
    slideshowEnd: function () {
    },
    lastSlide: function () {
    },
    afterLoad: function () {
    }
};
$.fn._reverse = [].reverse;




$('#slider').nivoSlider({
    directionNav: false
});
$(".leftlist").slideToggle();
$(".leftlist .lefthide").fadeToggle();
$(".leftlist .lefthide").click(function () {
    $(".leftlist").slideToggle();
    $(".leftlist .lefthide").fadeToggle();
});
$(".leftlist_hide .lefthide").click(function () {
    $(".leftlist").slideToggle();
    $(".leftlist .lefthide").fadeToggle();
});
re_window_size();
$(window).resize(function () {
    re_window_size()
});




function re_window_size() {
    let meunli_width = $(window).width() / 10 + "px";
    $(".menu ul li a").css("width", meunli_width);
    if ($(window).width() > 1234) {
        $(".news").css("width", "850px");
        $(".authentication").css("left", "915px");
        $(".authentication").css("right", "1.5%");
    } else {
        $(".news").css("width", "640px");
        $(".authentication").css("left", "675px");
        $(".authentication").css("right", "3%");
    }
};