$("body").append('        <!-- 上传图片 -->\n' +
    '    <div class="md-container md-effect-1" id="modal-uploadImg">\n' +
    '        <div class="md-content">\n' +
    '            <h3 class="glass-Bg box-show3"><img src="../img/icon/musicAlbum.png">上传图片</h3>\n' +
    '            <a class="md-close close-all MyIF all-arrow"></a>\n' +
    '            <div id="uploadAvatarContainer">\n' +
    '                <div class="imageBox">\n' +
    '                    <div class="thumbBox"></div>\n' +
    '                    <div class="spinner" style="display:none">Loading...</div>\n' +
    '                </div>\n' +
    '                <div class="action">\n' +
    '                    <div class="new-contentarea tc">\n' +
    '                        <a class="upload-img glass-Bg box-show3"><label for="upload-file">上传图像</label></a>\n' +
    '                        <input type="file" class="" name="upload-file" id="upload-file"/>\n' +
    '                    </div>\n' +
    '                    <a id="btnCrop" class="Btnsty_peyton cancelSelectText glass-Bg box-show3">预览</a>\n' +
    '                    <a id="btnZoomIn" class="Btnsty_peyton cancelSelectText glass-Bg box-show3">十</a>\n' +
    '                    <a id="btnZoomOut" class="Btnsty_peyton cancelSelectText glass-Bg box-show3">一</a>\n' +
    '                    <input type="hidden" name="imgDx" value="">\n' +
    '                    <input type="hidden" name="imgDy" value="">\n' +
    '                </div>\n' +
    '                <div class="cropped"></div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>');