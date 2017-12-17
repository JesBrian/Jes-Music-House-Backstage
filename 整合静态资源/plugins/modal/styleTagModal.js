$("body").append('\n' +
    '        <!-- 歌单风格分类 -->\n' +
    '    <div class="md-container md-effect-1" id="modal-selectStyleTag">\n' +
    '        <div class="md-content">\n' +
    '            <h3 class="glass-Bg box-show3"><img src="../img/icon/cube.png">选择风格标签</h3>\n' +
    '            <a class="md-close close-all MyIF all-arrow" onclick="clearStyleTagSelect();"></a>\n' +
    '            <span>选择合适的风格标签，最多可选3个:</span>\n' +
    '            <span id="styleTagListTips"></span>\n' +
    '            <div id="styleTagList">\n' +
    '                <table style="margin-top:12px;">\n' +
    '                    <tr>\n' +
    '                        <td><i class="MyIF earth"></i> 语种</td>\n' +
    '                        <td>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood0\' name="styleTag" value="1"><label for=\'verygood0\'><span>华语</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood1\' name="styleTag" value="2"><label for=\'verygood1\'><span>欧美</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood2\' name="styleTag" value="3"><label for=\'verygood2\'><span>日语</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood3\' name="styleTag" value="4"><label for=\'verygood3\'><span>韩语</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood4\' name="styleTag" value="5"><label for=\'verygood4\'><span>粤语</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood5\' name="styleTag" value="6"><label for=\'verygood5\'><span>小语种</span></label>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                    <tr><td>&nbsp;</td></tr>\n' +
    '\n' +
    '                    <tr>\n' +
    '                        <td><i class="MyIF instrument"></i> 风格</td>\n' +
    '                        <td>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood6\' name="styleTag"><label for=\'verygood6\'><span>流行</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood7\' name="styleTag"><label for=\'verygood7\'><span>摇滚</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood8\' name="styleTag"><label for=\'verygood8\'><span>民谣</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood9\' name="styleTag"><label for=\'verygood9\'><span>电子</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood10\' name="styleTag"><label for=\'verygood10\'><span>舞曲</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood11\' name="styleTag"><label for=\'verygood11\'><span>说唱</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood12\' name="styleTag"><label for=\'verygood12\'><span>爵士</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood13\' name="styleTag"><label for=\'verygood13\'><span>轻音乐</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood14\' name="styleTag"><label for=\'verygood14\'><span>乡村</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood15\' name="styleTag"><label for=\'verygood15\'><span>R&B/Soul</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood16\' name="styleTag"><label for=\'verygood16\'><span>英伦</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood17\' name="styleTag"><label for=\'verygood17\'><span>金属</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood18\' name="styleTag"><label for=\'verygood18\'><span>朋克</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood19\' name="styleTag"><label for=\'verygood19\'><span>蓝调</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood20\' name="styleTag"><label for=\'verygood20\'><span>雷鬼</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood21\' name="styleTag"><label for=\'verygood21\'><span>世界音乐</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood22\' name="styleTag"><label for=\'verygood22\'><span>拉丁</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood23\' name="styleTag"><label for=\'verygood23\'><span>另类/独立</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood24\' name="styleTag"><label for=\'verygood24\'><span>New Age</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood25\' name="styleTag"><label for=\'verygood25\'><span>古风</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood26\' name="styleTag"><label for=\'verygood26\'><span>后摇</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood27\' name="styleTag"><label for=\'verygood27\'><span>Bossa Nova</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood28\' name="styleTag"><label for=\'verygood28\'><span>电音</span></label>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                    <tr><td>&nbsp;</td></tr>\n' +
    '\n' +
    '                    <tr>\n' +
    '                        <td><i class="MyIF cofee"></i> 场景</td>\n' +
    '                        <td>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood29\' name="styleTag"><label for=\'verygood29\'><span>清晨</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood30\' name="styleTag"><label for=\'verygood30\'><span>夜晚</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood31\' name="styleTag"><label for=\'verygood31\'><span>学习</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood32\' name="styleTag"><label for=\'verygood32\'><span>工作</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood33\' name="styleTag"><label for=\'verygood33\'><span>午休</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood34\' name="styleTag"><label for=\'verygood34\'><span>下午茶</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood35\' name="styleTag"><label for=\'verygood35\'><span>地铁</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood36\' name="styleTag"><label for=\'verygood36\'><span>驾车</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood37\' name="styleTag"><label for=\'verygood37\'><span>运动</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood38\' name="styleTag"><label for=\'verygood38\'><span>旅行</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood39\' name="styleTag"><label for=\'verygood39\'><span>散步</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood40\' name="styleTag"><label for=\'verygood40\'><span>酒吧</span></label>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                    <tr><td>&nbsp;</td></tr>\n' +
    '\n' +
    '                    <tr>\n' +
    '                        <td><i class="MyIF exciting"></i> 情感</td>\n' +
    '                        <td>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood41\' name="styleTag"><label for=\'verygood41\'><span>怀旧</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood42\' name="styleTag"><label for=\'verygood42\'><span>清新</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood43\' name="styleTag"><label for=\'verygood43\'><span>浪漫</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood44\' name="styleTag"><label for=\'verygood44\'><span>性感</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood45\' name="styleTag"><label for=\'verygood45\'><span>伤感</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood46\' name="styleTag"><label for=\'verygood46\'><span>治愈</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood47\' name="styleTag"><label for=\'verygood47\'><span>放松</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood48\' name="styleTag"><label for=\'verygood48\'><span>孤独</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood49\' name="styleTag"><label for=\'verygood49\'><span>感动</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood50\' name="styleTag"><label for=\'verygood50\'><span>兴奋</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood51\' name="styleTag"><label for=\'verygood51\'><span>快乐</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood52\' name="styleTag"><label for=\'verygood52\'><span>安静</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood53\' name="styleTag"><label for=\'verygood53\'><span>思念</span></label>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                    <tr><td>&nbsp;</td></tr>\n' +
    '\n' +
    '                    <tr>\n' +
    '                        <td><i class="MyIF kinds"></i> 主题</td>\n' +
    '                        <td>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood54\' name="styleTag"><label for=\'verygood54\'><span>影视原声</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood55\' name="styleTag"><label for=\'verygood55\'><span>ACG</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood56\' name="styleTag"><label for=\'verygood56\'><span>游戏</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood57\' name="styleTag"><label for=\'verygood57\'><span>70后</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood58\' name="styleTag"><label for=\'verygood58\'><span>80后</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood59\' name="styleTag"><label for=\'verygood59\'><span>90后</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood60\' name="styleTag"><label for=\'verygood60\'><span>00后</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood61\' name="styleTag"><label for=\'verygood61\'><span>网络歌曲</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood62\' name="styleTag"><label for=\'verygood62\'><span>KTV</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood63\' name="styleTag"><label for=\'verygood63\'><span>经典</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood64\' name="styleTag"><label for=\'verygood64\'><span>翻唱</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood65\' name="styleTag"><label for=\'verygood65\'><span>吉他</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood66\' name="styleTag"><label for=\'verygood66\'><span>钢琴</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood67\' name="styleTag"><label for=\'verygood67\'><span>器乐</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood68\' name="styleTag"><label for=\'verygood68\'><span>儿童</span></label>\n' +
    '                            <input type="checkbox" class="superInput" id=\'verygood69\' name="styleTag"><label for=\'verygood69\'><span>榜单</span></label>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                    <tr><td>&nbsp;</td></tr>\n' +
    '                </table>\n' +
    '                <input type="hidden" id="styleTagIdsTemp" name="styleTagIdsTemp" value="">\n' +
    '            </div>\n' +
    '            <div id="buttonGroup">\n' +
    '                <a id="styleTagListTemp" class="superBtn joinSinger md-close MyIF makesure" onclick="saveStyleTagTempData(); clearStyleTagSelect();"> 确定保存</a>\n' +
    '                <a class="superBtn joinSinger md-close MyIF cancel" onclick="clearStyleTagSelect();"> 取消返回</a>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>');