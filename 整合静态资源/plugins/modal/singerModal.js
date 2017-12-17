$("body").append('\n' +
    '        <!-- 入驻歌手 -->\n' +
    '    <div id="modal-joinSinger" class="md-container md-effect-1">\n' +
    '        <div class="md-content">\n' +
    '            <h3 class="glass-Bg box-show3"><img src="../img/icon/singer.png">入驻歌手</h3>\n' +
    '            <a class="md-close close-all MyIF all-arrow"></a>\n' +
    '            <form>\n' +
    '                <section class="webdesigntuts-workshop">\n' +
    '                    <input type="text" class="niftyModalForm" placeholder=" 输入您想要申请的歌手名称，查看是否已被使用 " required>\n' +
    '                    <button type="submit"><i class="MyIF search"></i></button>\n' +
    '                </section>\n' +
    '                <img id="singerAvatar" class="box-show3" src="../img/common/touxiang.jpg">\n' +
    '                <span>\n' +
    '                    <a class="joinSinger superBtn md-close" href="joinSinger.html" target="indexIframe" onclick="cancelNiftyModalsForm();">立即入驻 <i class="MyIF double-arrow-right"></i></a>\n' +
    '                </span>\n' +
    '                <p>暂无搜索到相关歌手，立即创建分享你的作品吧！</p>\n' +
    '            </form>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '        <!-- 歌手登录 -->\n' +
    '    <div class="md-container md-effect-1" id="modal-singerLogin">\n' +
    '        <div class="md-content">\n' +
    '            <h3 class="glass-Bg box-show3"><img src="../img/icon/singer.png">歌手登录</h3>\n' +
    '            <a class="md-close close-all MyIF all-arrow" onclick="cancelNiftyModalsForm();"></a>\n' +
    '            <img src="../img/common/touxiang.jpg" class="box-show3">\n' +
    '            <form action="#" method="post">\n' +
    '                <ul>\n' +
    '                    <li>\n' +
    '                        请输入验证码：<input type="text" class="niftyModalForm s1c-Bg box-show3">\n' +
    '                    </li>\n' +
    '                    <li>\n' +
    '                        <img class="box-show3" src="../img/common/touxiang.jpg" onclick="cancelNiftyModalsForm();">\n' +
    '                        <span><a class="joinSinger superBtn md-close" href="../admin/home.html" onclick="cancelNiftyModalsForm();">验证登录 <i class="MyIF double-arrow-right"></i></a></span>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '            </form>\n' +
    '            <p>还没入驻音乐人？立即入驻我们分享你的作品吧！</p>\n' +
    '            <span><a class="joinSinger superBtn md-close" onclick="niftymodalsByModelName(\'modal-joinSinger\',\'\',\'\'); cancelNiftyModalsForm();">立即入驻 <i class="MyIF double-arrow-right"></i></a></span>\n' +
    '        </div>\n' +
    '    </div>');