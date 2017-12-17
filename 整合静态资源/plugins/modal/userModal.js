$("body").append('        <!-- 用户登录 -->\n' +
    '    <div class="md-container md-effect-1" id="modal-userLogin">\n' +
    '        <div class="md-content">\n' +
    '            <h3 class="glass-Bg box-show3"><img src="../img/icon/login.png">账户登录</h3>\n' +
    '            <a class="md-close close-all MyIF all-arrow"></a>\n' +
    '            <div>\n' +
    '                <form action="account.html" target="indexIframe" method="post">\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <td><i class="MyIF IDcard-1"></i>用户名</td>\n' +
    '                            <td><input class="niftyModalForm s1c-Bg box-show3" type="text"></td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td><i class="MyIF yuechi"></i>密码</td>\n' +
    '                            <td><input class="niftyModalForm s1c-Bg box-show3" type="password"></td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td colspan="2">\n' +
    '                                <span>\n' +
    '                                    <a class="joinSinger superBtn MyIF check" onclick="cancelNiftyModalsForm();"> 重新填写</a>\n' +
    '                                    <a class="joinSinger superBtn md-close MyIF questionnaire-3" href="account.html" target="indexIframe" onclick="cancelNiftyModalsForm();"> 确认提交</a>\n' +
    '                                </span>\n' +
    '                            </td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                    <p style="z-index:9; position:relative;">\n' +
    '                        <a href="#" class="hover-undeline md-close" onclick="niftymodalsByModelName(\'modal-forgetPasswd\')">忘记密码</a>\n' +
    '                        /\n' +
    '                        <a class="hover-undeline md-close" onclick="niftymodalsByModelName(\'modal-register\',\'\',\'\'); cancelNiftyModalsForm();">新用户注册</a>\n' +
    '                    </p>\n' +
    '                </form>\n' +
    '                <span id="ortherLogin">\n' +
    '                    <a class="superBtn joinSinger MyIF wechat"> 微信登录</a>\n' +
    '                    <a class="superBtn joinSinger MyIF qq"> QQ登录</a>\n' +
    '                    <a class="superBtn joinSinger MyIF weibo"> 微博登录</a>\n' +
    '                </span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '        <!-- 找回密码 -->\n' +
    '    <div class="md-container md-effect-1" id="modal-forgetPasswd">\n' +
    '        <div class="md-content">\n' +
    '            <h3 class="glass-Bg box-show3"><img src="../img/icon/power.png">重设密码</h3>\n' +
    '            <a class="md-close close-all MyIF all-arrow"></a>\n' +
    '            <form>\n' +
    '                <table>\n' +
    '                    <tr>\n' +
    '                        <td><i class="MyIF mail"></i> 注册邮箱</td>\n' +
    '                        <td><input class="niftyModalForm s1c-Bg box-show3" type="text" name="mail"></td>\n' +
    '                    </tr>\n' +
    '                    <tr><td colspan="2">邮件发送后，两小时有效！请注意时间</td></tr>\n' +
    '                    <tr>\n' +
    '                        <td colspan="2">\n' +
    '                            <a class="superBtn joinSinger md-close MyIF makesure" onclick="alertTips(1,\'邮件发送成功，请注意查收！\'); cancelNiftyModalsForm();"> 确定新建</a>\n' +
    '                            <a class="superBtn joinSinger md-close MyIF cancel" onclick="cancelNiftyModalsForm();"> 取消返回</a>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </table>\n' +
    '            </form>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '        <!-- 用户注册 -->\n' +
    '    <div class="md-container md-effect-1" id="modal-register">\n' +
    '        <div class="md-content">\n' +
    '            <h3 class="glass-Bg box-show3"><img src="../img/icon/addUser.png">账户注册</h3>\n' +
    '            <a class="md-close close-all MyIF all-arrow"></a>\n' +
    '            <form action="account.html" target="indexIframe" method="post">\n' +
    '                <table>\n' +
    '                    <tr>\n' +
    '                        <td><i class="MyIF IDcard-1"></i>用户名</td>\n' +
    '                        <td><input class="niftyModalForm s1c-Bg box-show3" type="text"></td>\n' +
    '                    </tr>\n' +
    '                    <tr>\n' +
    '                        <td><i class="MyIF mail"></i>邮箱</td>\n' +
    '                        <td><input class="niftyModalForm s1c-Bg box-show3" type="text"></td>\n' +
    '                    </tr>\n' +
    '                    <tr>\n' +
    '                        <td><i class="MyIF yuechi"></i>密码</td>\n' +
    '                        <td><input class="niftyModalForm s1c-Bg box-show3" type="password"></td>\n' +
    '                    </tr>\n' +
    '                    <tr>\n' +
    '                        <td colspan="2">\n' +
    '                            <span>\n' +
    '                                <a class="joinSinger superBtn MyIF check" onclick="cancelNiftyModalsForm();"> 重新填写</a>\n' +
    '                                <a class="joinSinger superBtn md-close MyIF questionnaire-3" href="account.html" target="indexIframe" onclick="alertTips(\'1\',\'注册成功！完善资料有助于系统提供更精确的个性推荐。\'); cancelNiftyModalsForm();"> 确认注册</a>\n' +
    '                            </span>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </table>\n' +
    '                <p>已有账号？<a class="hover-undeline md-close" onclick="niftymodalsByModelName(\'modal-userLogin\',\'\',\'\'); cancelNiftyModalsForm();">点此立刻登录</a></p>\n' +
    '            </form>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '        <!-- 问卷调查 -->\n' +
    '    <div class="md-container md-effect-1" id="modal-questionnaire">\n' +
    '        <div class="md-content">\n' +
    '            <h3 class="glass-Bg box-show3"><img src="../img/icon/menu.png">调查问卷</h3>\n' +
    '            <a class="md-close close-all MyIF all-arrow" onclick="cancelNiftyModalsForm();"></a>\n' +
    '            <form action="#" method="post">\n' +
    '                <p>1、您认为我们网站的服务质量如何：</p>\n' +
    '                <input type="radio" class="niftyModalForm superInput" id=\'verybad\' name="quality"><label for=\'verybad\' class="MyIF cry"><span> 很差</span></label>\n' +
    '                <input type="radio" class="niftyModalForm superInput" id=\'bad\' name="quality"><label for=\'bad\' class="MyIF unhappy"><span> 差</span></label>\n' +
    '                <input type="radio" class="niftyModalForm superInput" id=\'normal\' name="quality"><label for=\'normal\' class="MyIF expressionless"><span> 一般</span></label>\n' +
    '                <input type="radio" class="niftyModalForm superInput" id=\'good\' name="quality"><label for=\'good\' class="MyIF happy"><span> 好</span></label>\n' +
    '                <input type="radio" class="niftyModalForm superInput" id=\'verygood\' name="quality"><label for=\'verygood\' class="MyIF exciting"><span> 很好</span></label>\n' +
    '                <p>2、您认为我们网站存在哪些缺点 [可多选] ：</p>\n' +
    '                <table>\n' +
    '                    <tr>\n' +
    '                        <td><input type="checkbox" class="niftyModalForm superInput" id=\'1verybad\' name="defect"><label for=\'1verybad\' ><b>加载速度慢</b></label></td>\n' +
    '                        <td><input type="checkbox" class="niftyModalForm superInput" id=\'1bad\' name="defect"><label for=\'1bad\' ><b>歌曲收录少</b></label></td>\n' +
    '                        <td><input type="checkbox" class="niftyModalForm superInput" id=\'1normal\' name="defect"><label for=\'1normal\' ><b>曲库更新迟</b></label></td>\n' +
    '                        <td><input type="checkbox" class="niftyModalForm superInput" id=\'1good\' name="defect"><label for=\'1good\' ><b>歌曲音质差</b></label></td>\n' +
    '                    </tr>\n' +
    '                    <tr>\n' +
    '                        <td><input type="checkbox" class="niftyModalForm superInput" id=\'1verygood\' name="defect"><label for=\'1verygood\' ><b>会员收费高</b></label></td>\n' +
    '                        <td><input type="checkbox" class="niftyModalForm superInput" id=\'2verygood\' name="defect"><label for=\'2verygood\' ><b>歌曲价格高</b></label></td>\n' +
    '                        <td><input type="checkbox" class="niftyModalForm superInput" id=\'3verygood\' name="defect"><label for=\'3verygood\' ><b>功能不齐全</b></label></td>\n' +
    '                        <td><input type="checkbox" class="niftyModalForm superInput" id=\'4verygood\' name="defect"><label for=\'4verygood\' ><b>推荐不合理</b></label></td>\n' +
    '                    </tr>\n' +
    '                </table>\n' +
    '                <p>3、如还有任何问题、疑问或者不满或者改进意见请写下：</p>\n' +
    '                <textarea class="niftyModalForm s1c-Bg box-show3" placeholder="请填写您的不满或改进意见！"></textarea>\n' +
    '                <p> 请填写正确的邮箱，以便我们对您的问题以邮箱方式回应，谢谢您的支持！</p>\n' +
    '                <input type="text" class="niftyModalForm s1c-Bg box-show3" placeholder="请填写您的邮箱地址！">\n' +
    '\n' +
    '            </form>\n' +
    '            <span>\n' +
    '                <a class="superBtn joinSinger md-close MyIF questionnaire-3" onclick="alertTips(1,\'问卷提交成功！感谢您对我们的支持！\'); cancelNiftyModalsForm();"> 提交问卷</a>\n' +
    '            </span>\n' +
    '        </div>\n' +
    '    </div>');