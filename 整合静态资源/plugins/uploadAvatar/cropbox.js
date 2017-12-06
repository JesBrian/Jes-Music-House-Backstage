"use strict";
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
    var cropbox = function(options, el){
        var el = el || $(options.imageBox),
            obj =
            {
                state : {},
                ratio : 1,
                options : options,
                imageBox : el,
                thumbBox : el.find(options.thumbBox),
                spinner : el.find(options.spinner),
                image : new Image(),
                getDataURL: function ()
                {
                    var width = this.thumbBox.width(),
                        height = this.thumbBox.height(),
                        canvas = document.createElement("canvas"),
                        dim = el.css('background-position').split(' '),
                        size = el.css('background-size').split(' '),
                        dx = parseInt(dim[0]) - el.width()/2 + width/2,
                        dy = parseInt(dim[1]) - el.height()/2 + height/2,
                        dw = parseInt(size[0]),
                        dh = parseInt(size[1]),
                        sh = parseInt(this.image.height),
                        sw = parseInt(this.image.width);

                    canvas.width = width;
                    canvas.height = height;
                    var context = canvas.getContext("2d");
                    context.drawImage(this.image, 0, 0, sw, sh, dx, dy, dw, dh);
                    var imageData = canvas.toDataURL('image/jpeg');

                    // console.log(sw, sh, dx, dy, dw, dh);  //dx[距离图片左侧距离]，dy[距离图片顶部距离]
                    // $("input[name=imgDx]").val(dx);
                    // $("input[name=imgDy]").val(dy);
                    return imageData;
                },
                getBlob: function()
                {
                    var imageData = this.getDataURL();
                    var b64 = imageData.replace('data:image/jpeg;base64,','');
                    var binary = atob(b64);
                    var array = new Array();
                    for (var i = 0; i < binary.length; i++) {
                        array.push(binary.charCodeAt(i));
                    }
                    return  new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
                },
                zoomIn: function ()
                {
                    this.ratio*=1.1;
                    setBackground();
                },
                zoomOut: function ()
                {
                    this.ratio*=0.9;
                    setBackground();
                }
            },
            setBackground = function()
            {
                var w =  parseInt(obj.image.width)*obj.ratio;
                var h =  parseInt(obj.image.height)*obj.ratio;

                var pw = (el.width() - w) / 2;
                var ph = (el.height() - h) / 2;

                el.css({
                    'background-image': 'url(' + obj.image.src + ')',
                    'background-size': w +'px ' + h + 'px',
                    'background-position': pw + 'px ' + ph + 'px',
                    'background-repeat': 'no-repeat'});
            },
            imgMouseDown = function(e)
            {
                e.stopImmediatePropagation();

                obj.state.dragable = true;
                obj.state.mouseX = e.clientX;
                obj.state.mouseY = e.clientY;
            },
            imgMouseMove = function(e)
            {
                e.stopImmediatePropagation();

                if (obj.state.dragable)
                {
                    var x = e.clientX - obj.state.mouseX;
                    var y = e.clientY - obj.state.mouseY;

                    var bg = el.css('background-position').split(' ');

                    var bgX = x + parseInt(bg[0]);
                    var bgY = y + parseInt(bg[1]);

                    el.css('background-position', bgX +'px ' + bgY + 'px');

                    obj.state.mouseX = e.clientX;
                    obj.state.mouseY = e.clientY;
                }
            },
            imgMouseUp = function(e)
            {
                e.stopImmediatePropagation();
                obj.state.dragable = false;
            },
            zoomImage = function(e)
            {
                e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0 ? obj.ratio*=1.1 : obj.ratio*=0.9;
                setBackground();
            }

        obj.spinner.show();
        obj.image.onload = function() {
            obj.spinner.hide();
            setBackground();

            el.bind('mousedown', imgMouseDown);
            el.bind('mousemove', imgMouseMove);
            $(window).bind('mouseup', imgMouseUp);
            el.bind('mousewheel DOMMouseScroll', zoomImage);
        };
        obj.image.src = options.imgSrc;
        el.on('remove', function(){$(window).unbind('mouseup', imgMouseUp)});

        return obj;
    };

    jQuery.fn.cropbox = function(options){
        return new cropbox(options, this);
    };
}));




var options =
    {
        thumbBox: '.thumbBox',
        spinner: '.spinner',
        imgSrc: ''
    };
var cropper = $('.imageBox').cropbox(options);
$('#upload-file').on('change', function () {
    var reader = new FileReader();
    reader.onload = function (e) {
        options.imgSrc = e.target.result;
        cropper = $('.imageBox').cropbox(options);
    };
    reader.readAsDataURL(this.files[0]);
    this.files = [];
});
$('#btnCrop').on('click', function () {
    var img = cropper.getDataURL();
    $('.cropped').html('<img id="changeImgTemp" src="' + img + '" align="absmiddle" style="width:128px; height:128px; margin-top:28px; border-radius:5px; box-shadow:0 0 12px #7E7E7E;"><p>预览效果</p><span style="top:128px; right:60px; position:relative; z-index:9;"><a id="sureChangeImg" class="md-close superBtn joinSinger MyIF">确认修改</a></span>');

    $('#sureChangeImg').click(function(){

        console.log(cropper.getBlob());  //获取预览后想要修改的图片的 blob 数据，准备利用 ajax 上传图片

        $(window.top.frames["accountOperIframe"].document).find("img.changeImg").attr("src", $("#changeImgTemp").attr("src"));


        $('.cropped').empty();
        //$('.imageBox').css({'background-image':''});
        window.top.niftymodalCloseEvent();  //使用 niftymodal.js 里暴力添加的拟态框关闭事件
    });
});
$('#btnZoomIn').on('click', function () {
    cropper.zoomIn();
});
$('#btnZoomOut').on('click', function () {
    cropper.zoomOut();
});
