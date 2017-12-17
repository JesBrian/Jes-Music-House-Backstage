$("body").append('        <!-- 歌单风格分类 -->\n' +
    '    <div class="md-container md-effect-1" id="modal-category">\n' +
    '        <div class="md-content">\n' +
    '            <h3 class="glass-Bg box-show3"><img src="../img/icon/cube.png">选择分类</h3>\n' +
    '            <a class="md-close close-all MyIF all-arrow"></a>\n' +
    '            <div>\n' +
    '                <div id="allStyleButton">\n' +
    '                    <span>选择风格</span>\n' +
    '                    <a class="joinSinger superBtn md-close MyIF" onclick="changeAlbumStyle(this);">全部风格</a>\n' +
    '                </div>\n' +
    '                <table id="styleList">\n' +
    '                    <tr>\n' +
    '                        <td>\n' +
    '                            <i class="MyIF earth"></i> 语种\n' +
    '                        </td>\n' +
    '                        <td>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="0" onclick="changeAlbumStyle(this);">华语</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="1" onclick="changeAlbumStyle(this);">欧美</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="2" onclick="changeAlbumStyle(this);">日语</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="3" onclick="changeAlbumStyle(this);">韩语</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="4" onclick="changeAlbumStyle(this);">粤语</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="5" onclick="changeAlbumStyle(this);">小语种</a>|</span>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                    <tr>\n' +
    '                        <td>\n' +
    '                            <i class="MyIF instrument"></i> 风格\n' +
    '                        </td>\n' +
    '                        <td>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="6" onclick="changeAlbumStyle(this);">流行</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="7" onclick="changeAlbumStyle(this);">摇滚</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="8" onclick="changeAlbumStyle(this);">民谣</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="9" onclick="changeAlbumStyle(this);">电子</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="10" onclick="changeAlbumStyle(this);">舞曲</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="11" onclick="changeAlbumStyle(this);">说唱</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="12" onclick="changeAlbumStyle(this);">爵士</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="13" onclick="changeAlbumStyle(this);">轻音乐</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="14" onclick="changeAlbumStyle(this);">乡村</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="15" onclick="changeAlbumStyle(this);">R&B/Soul</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="16" onclick="changeAlbumStyle(this);">民族</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="17" onclick="changeAlbumStyle(this);">英伦</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="18" onclick="changeAlbumStyle(this);">金属</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="19" onclick="changeAlbumStyle(this);">朋克</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="20" onclick="changeAlbumStyle(this);">蓝调</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="21" onclick="changeAlbumStyle(this);">雷鬼</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="22" onclick="changeAlbumStyle(this);">世界音乐</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="23" onclick="changeAlbumStyle(this);">拉丁</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="24" onclick="changeAlbumStyle(this);">另类/独立</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="25" onclick="changeAlbumStyle(this);">New Age</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="26" onclick="changeAlbumStyle(this);">古风</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="27" onclick="changeAlbumStyle(this);">后摇</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="28" onclick="changeAlbumStyle(this);">Bossa Nova</a>|</span>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                    <tr>\n' +
    '                        <td>\n' +
    '                            <i class="MyIF cofee"></i> 场景\n' +
    '                        </td>\n' +
    '                        <td>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="29" onclick="changeAlbumStyle(this);">清晨</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="30" onclick="changeAlbumStyle(this);">夜晚</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="31" onclick="changeAlbumStyle(this);">学习</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="32" onclick="changeAlbumStyle(this);">工作</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="33" onclick="changeAlbumStyle(this);">午休</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="34" onclick="changeAlbumStyle(this);">下午茶</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="35" onclick="changeAlbumStyle(this);">地铁</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="36" onclick="changeAlbumStyle(this);">驾车</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="37" onclick="changeAlbumStyle(this);">运动</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="38" onclick="changeAlbumStyle(this);">旅行</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="39" onclick="changeAlbumStyle(this);">散步</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="40" onclick="changeAlbumStyle(this);">酒吧</a>|</span>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                    <tr>\n' +
    '                        <td>\n' +
    '                            <i class="MyIF exciting"></i> 情感\n' +
    '                        </td>\n' +
    '                        <td>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="41" onclick="changeAlbumStyle(this);">怀旧</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="42" onclick="changeAlbumStyle(this);">清新</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="43" onclick="changeAlbumStyle(this);">浪漫</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="44" onclick="changeAlbumStyle(this);">性感</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="45" onclick="changeAlbumStyle(this);">伤感</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="46" onclick="changeAlbumStyle(this);">治愈</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="47" onclick="changeAlbumStyle(this);">放松</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="48" onclick="changeAlbumStyle(this);">孤独</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="49" onclick="changeAlbumStyle(this);">感动</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="50" onclick="changeAlbumStyle(this);">兴奋</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="51" onclick="changeAlbumStyle(this);">快乐</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="52" onclick="changeAlbumStyle(this);">安静</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="53" onclick="changeAlbumStyle(this);">思念</a>|</span>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                    <tr>\n' +
    '                        <td>\n' +
    '                            <i class="MyIF kinds"></i> 主题\n' +
    '                        </td>\n' +
    '                        <td>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="54" onclick="changeAlbumStyle(this);">影视原声</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="55" onclick="changeAlbumStyle(this);">ACG</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="56" onclick="changeAlbumStyle(this);">游戏</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="57" onclick="changeAlbumStyle(this);">70后</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="58" onclick="changeAlbumStyle(this);">80后</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="59" onclick="changeAlbumStyle(this);">90后</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="60" onclick="changeAlbumStyle(this);">00后</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="61" onclick="changeAlbumStyle(this);">网络歌曲</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="62" onclick="changeAlbumStyle(this);">KTV</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="63" onclick="changeAlbumStyle(this);">经典</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="64" onclick="changeAlbumStyle(this);">翻唱</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="65" onclick="changeAlbumStyle(this);">吉他</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="66" onclick="changeAlbumStyle(this);">钢琴</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="67" onclick="changeAlbumStyle(this);">器乐</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="68" onclick="changeAlbumStyle(this);">儿童</a>|</span>\n' +
    '                            <span><a class="hover-undeline md-close" data-styleId="69" onclick="changeAlbumStyle(this);">榜单</a>|</span>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </table>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>');