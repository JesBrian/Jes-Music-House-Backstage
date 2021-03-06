set character_set_client = utf8;
set character_set_server = utf8;
set character_set_connection = utf8;
set character_set_database = utf8;
set character_set_results = utf8;
set collation_connection = utf8_general_ci;
set collation_database = utf8_general_ci;
set collation_server = utf8_general_ci;

show variables like "%char%";


# [为了系统运行,且学习用途,会收集一些关于个人隐私的资料,但由于涉及隐私,且该系统作为学习之用,并不会真的存储实际隐私数据,可以不需填写真实资料,只是作学习使用]
CREATE DATABASE MusicHouse;
USE MusicHouse;

/* MH后台菜单表 -- 设置后台菜单,分一、二级菜单 */
# 后台菜单表记录后台的各种操作[名称/跳转URL地址等]
CREATE TABLE mh_menu
(
  id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(28) NOT NULL DEFAULT '' COMMENT '菜单名称',
  icon VARCHAR(18) DEFAULT '' COMMENT '菜单图标',
  pid TINYINT UNSIGNED DEFAULT 0 COMMENT '菜单的父ID [如果是二级菜单则该字段记录一级菜单的ID]',
  url VARCHAR(255) NOT NULL DEFAULT '' COMMENT '菜单对应的URL跳转地址',
  level TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '菜单的优先级 [后台左侧菜单栏显示顺序]',
  status BIT NOT NULL DEFAULT 1 COMMENT '菜单状态 [默认是 1 正常,还有 0 非正常状态]'
)ENGINE=MyISAM DEFAULT CHARSET=utf8;


/* MH权限表 -- 设置普通用户-5、会员-4、歌手-3、普通管理员-2、超级管理员权限-1 */
# 管理权限表设置不同身份的人的不同权限,可以进行什么操作,后台有什么菜单等
CREATE TABLE mh_power
(
  id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(18) UNIQUE NOT NULL DEFAULT '' COMMENT '权限类型[ superadmin-超级管理员 / admin-普通管理员 / singer-歌手 / member-会员 / user-普通用户 ]',
  operIdList VARCHAR(128) NOT NULL DEFAULT '' COMMENT '该权限下可以操作的菜单列表[记录菜单id列表,用、连接]'
)ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT mh_power(type,operIdList)
  VALUES ('superadmin','1,2,3,4,5,6,7,8,9');
INSERT mh_power(type,operIdList)
  VALUES ('admin','6,7,8,9');




/* MH管理员表 -- 进入后台对整个系统调整 */
# 管理员表记录 Music House 后台的所有管理员合作伙伴的管理角色
CREATE TABLE mh_admin
(
  id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  userId INT UNSIGNED NOT NULL DEFAULT 0,
  realName VARCHAR(25) NOT NULL DEFAULT '' COMMENT '管理员真名[为了确保系统的安全,加入我们都要进行信息确认]',
  IDCardNo CHAR(18) NOT NULL DEFAULT '' COMMENT '管理员证件号码',
  IDCardImg VARCHAR(255) NOT NULL DEFAULT '' COMMENT '管理员证件图片[正反两面,使用 ,分隔 - 长度有可能不足]',
  status BIT NOT NULL DEFAULT 1 COMMENT '管理员账户状态 [默认是 1 正常,还有 0 非正常状态]'
)ENGINE=Innodb DEFAULT CHARSET=utf8;

INSERT mh_admin(userId, realName, IDCardNo, IDCardImg)
  VALUES (5,'苏敬雄','123456789874563212','IDCardImg');


/* MH后台管理系统登陆日志 */
# 登陆日志表记录所有登陆过后台的记录,防止盗号或者其他什么突发意外事情的发生
CREATE TABLE mh_login_log
(
  accountId TINYINT UNSIGNED NOT NULL COMMENT '账户ID',
  accountType TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '账户类型 [1-superadmin-超级管理员 / 2-admin-普通管理员 / 3-singer-歌手 / 4-member-会员 / 5-user-普通用户]',
  loginIp VARCHAR(20) NOT NULL DEFAULT '' COMMENT '账户每次登陆的IP地址',
  loginTime INT UNSIGNED NOT NULL COMMENT '账户每次登陆的时间',
  INDEX loginLog_accountId(accountId)
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH后台系统信息表 */
# 后台信息表是记录只有能登陆进后台管理系统的账号才能接收/发送信息的表,为了反范式[私信表]
CREATE TABLE mh_backstage_message
(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  `fromId` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '发送者ID',
  `fromType` TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '发送类型 [1-superadmin-超级管理员 / 2-admin-普通管理员 / 3-singer-歌手 / 4-member-会员 / 5-user-普通用户]',
  `toId` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '接收者ID',
  `toType` TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '接收类型 [1-superadmin-超级管理员 / 2-admin-普通管理员 / 3-singer-歌手 / 4-member-会员 / 5-user-普通用户]',
  content TEXT NOT NULL COMMENT '信息的内容',
  status BIT NOT NULL DEFAULT 1 COMMENT '信息状态 [默认是 1 未读,还有 0 已读]',
  sendTime INT UNSIGNED NOT NULL COMMENT '信息发送时间',
  INDEX backstageMessage_fromType(`fromType`),
  INDEX backstageMessage_sendTime(sendTime),
  INDEX backstageMessage_toOne(`toId`,`toType`)
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH用户表 -- 普通注册用户 */
# 记录注册用户的常用信息
CREATE TABLE mh_user
(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  username VARCHAR(25) NOT NULL DEFAULT '' COMMENT '用户名',
  phone CHAR(11) NOT NULL DEFAULT '' COMMENT '用户手机',
  salt CHAR(4) NOT NULL DEFAULT '' COMMENT '密码加盐',
  passwd CHAR(32) NOT NULL DEFAULT '' COMMENT '加密后的密码',
  avatar VARCHAR(255) NOT NULL DEFAULT '' COMMENT '用户头像图片',
  powerId TINYINT UNSIGNED NOT NULL DEFAULT '5' COMMENT '权限类型[默认是 5,为普通用户, 1-superadmin-超级管理员 / 2-admin-普通管理员 / 3-singer-歌手 / 4-member-会员 / 5-user-普通用户]',
  status BIT NOT NULL DEFAULT 1 COMMENT '用户账户状态[默认是 1 正常,还有 0 非正常状态]',
  createTime INT UNSIGNED NOT NULL COMMENT '用户账户创建时间[可以用于每天新用户 - 保存在 XX 表中]',
  loginTime INT UNSIGNED NOT NULL COMMENT '用户上一次登录时间[可以用于计算活跃用户 - 保存在 XX 表中]',
  INDEX user_phone(phone),
  INDEX user_power(powerId),
  INDEX user_createTime(createTime),
  INDEX user_loginTime(loginTime)
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH幻灯片表 -- 首页幻灯片信息 */
# 记录幻灯片的信息
CREATE TABLE mh_slider
(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  title VARCHAR(30) NOT NULL DEFAULT '' COMMENT '标题',
  img VARCHAR(255) NOT NULL DEFAULT '' COMMENT '图片',
  url VARCHAR(255) NOT NULL DEFAULT '' COMMENT '跳转链接',
  local BIT NOT NULL DEFAULT 1 COMMENT '跳转的链接是否外部链接',
  level TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '优先级 [显示顺序]',
  descript VARCHAR(500) NOT NULL DEFAULT '描述',
  status BIT NOT NULL DEFAULT 1 COMMENT '状态[默认是 1 正常,还有 0 非正常状态]',
  createTime INT UNSIGNED NOT NULL COMMENT '创建时间'
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH用户表其他信息表 -- 记录用户其他一些不常用的信息 */
# 反范式设计[不常用的用户信息]
CREATE TABLE mh_user_info
(
  userId INT UNSIGNED PRIMARY KEY ,
  sex TINYINT UNSIGNED DEFAULT 0 COMMENT '用户性别[默认是 0 保密秀吉,1 男,3 女]',
  `birth` INT UNSIGNED DEFAULT 0 COMMENT '用户出生日期',
  address VARCHAR(10) DEFAULT '' COMMENT '用户地址',
  description VARCHAR(255) DEFAULT '' COMMENT '用户简介',
  mail VARCHAR(38) DEFAULT '' COMMENT '用户邮箱',
  followNum INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户被其他用户关注的数量',
  createPlayList VARCHAR(200) DEFAULT '' COMMENT '用户创建的歌单',
  collectionPlayList VARCHAR(200) DEFAULT '' COMMENT '用户收藏的歌单',
  followSinger VARCHAR(200) DEFAULT '' COMMENT '用户喜欢的歌手',
  followUser VARCHAR(200) DEFAULT '' COMMENT '用户关注的用户'
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH用户听歌情况表 -- 注册用户之后就会自动产生一个用户听歌表记录所听过的歌曲以及对应听的次数 */
# 听歌表记录用户从注册之后所有的听歌记录,听过什么歌曲,每一首歌曲分别听了多少次
# CREATE TABLE mh_userXX_listen
# (
#   id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
#   songId INT UNSIGNED NOT NULL UNIQUE DEFAULT 0 COMMENT '歌曲对应的ID',
#   listenNum TINYINT UNSIGNED DEFAULT 0 COMMENT '歌曲对应聆听次数',
#   INDEX userListen_listenNum(listenNum)
# )ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH私信表 -- 发送私信内容表 */
# 私信表记录各个账户[用户/会员/歌手/管理员/超级管理员]之间所发送的私信内容
CREATE TABLE mh_message
(
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  fromId INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '发送者ID',
  fromType TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '接收类型 [1-superadmin-超级管理员 / 2-admin-普通管理员 / 3-singer-歌手 / 4-member-会员 / 5-user-普通用户]',
  toId INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '接受者ID',
  toType TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '接收类型 [1-superadmin-超级管理员 / 2-admin-普通管理员 / 3-singer-歌手 / 4-member-会员 / 5-user-普通用户]',
  content TEXT NOT NULL COMMENT '私信的内容',
  status BIT NOT NULL DEFAULT 1 COMMENT '私信状态 [默认是 1 未读,还有 0 已读]',
  sendTime INT UNSIGNED NOT NULL COMMENT '私信发送时间',
  INDEX message_fromType(`fromType`),
  INDEX message_toOne(`toId`,`toType`),
  INDEX message_sendTime(sendTime)
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH会员表 -- 普通用户付钱后成为会员 */
# 会员表记录充了钱你就能变强的会员表会员信息
CREATE TABLE mh_member
(
  userId INT UNSIGNED UNIQUE NOT NULL DEFAULT 0 COMMENT '保存对应的用户id',
  timeOut INT UNSIGNED NOT NULL COMMENT '用户会员到期时间',
  status BIT NOT NULL DEFAULT 1 COMMENT '用户会员账户状态[默认是 1 正常,还有 0 非正常状态]',
  createTime INT UNSIGNED NOT NULL COMMENT '用户开通会员时间[可以用于每天新会员 - 保存在 XX 表中]',
  INDEX member_userId(userId),
  INDEX member_createTime(createTime)
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH歌手表 -- 申请入驻后成为MH的入驻歌手 */
# 歌手表记录了提交了入驻歌手申请后的准歌手信息
CREATE TABLE mh_singer
(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  userId INT UNSIGNED DEFAULT 0 COMMENT '对应的用户账号[0为没有, 有的话则为对应的用户账户ID]',
  singerName VARCHAR(25) NOT NULL DEFAULT '' COMMENT '歌手艺名',
  singerImg VARCHAR(255) DEFAULT '' COMMENT '歌手图片',
  sex TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '歌手性别[ 1-男 / 2-女 / 3-团队 ]',
  styleId TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '歌手歌曲风格id',
  brand VARCHAR(255) DEFAULT '' COMMENT '歌手所属公司/品牌',
  introduction TEXT COMMENT '歌手简介',
  fansNum INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '歌手粉丝数量',
  realName VARCHAR(25) NOT NULL DEFAULT '' COMMENT '歌手真名[审核通过后不能更改]',
  phone CHAR(13) NOT NULL DEFAULT '' COMMENT '歌手手机',
  nationality TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '歌手所属国籍[默认 1-中国]',
  IDCardNo CHAR(18) NOT NULL DEFAULT '' COMMENT '歌手身份证号码',
  IDCardImg VARCHAR(255) NOT NULL DEFAULT '' COMMENT '歌手身份证图片[正反两面,使用 ,分隔 - 长度有可能不足]',
  status BIT NOT NULL DEFAULT 1 COMMENT '歌手账户状态[默认是 1 正常,还有 0 非正常状态]',
  createTime INT UNSIGNED NOT NULL COMMENT '成为入驻歌手时间[可以用于每天新会员 - 保存在 XX 表中]',
  loginTime INT UNSIGNED NOT NULL COMMENT '歌手上一次登录时间',
  INDEX singer_userId(userId),
  INDEX singer_singerName(singerName),
  INDEX singer_styleId(styleId),
  INDEX singer_createTime(createTime)
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH音乐歌手粉丝表 */
# 如果用户关注了某位歌手,即作为某歌手粉丝,则该歌手有 新曲/新专辑 会有系统消息提示
CREATE TABLE mh_fans
(
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  singerId INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '歌手ID',
  userId INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户ID',
  INDEX fans_singerId(singerId),
  INDEX fans_userId(userId)
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH音乐歌手的粉丝黑名单 */
# 如果歌手设置了某用户为黑名单,则不再收到该用户的 私信/关注 消息
CREATE TABLE mh_fans_blacklist
(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  singerId INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '歌手ID',
  userId INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '用户ID',
  tips VARCHAR(255) NOT NULL DEFAULT '' COMMENT '拉黑进黑名单原因备注',
  INDEX fansBlacklist_singerId(singerId),
  INDEX fansBlacklist_userId(userId)
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH音乐风格表 -- 用于搜索歌单 */
# 音乐风格表,提供给歌单/专辑/音乐人选择音乐风格使用,也为了推荐功能使用
CREATE TABLE mh_style
(
  id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  name VARCHAR(15) NOT NULL UNIQUE DEFAULT '' COMMENT '风格名称',
  icon VARCHAR(18) DEFAULT '' COMMENT '一级分类对应图标',
  pid TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '风格的一级父ID,对应mh_style_main表ID[目前只做二级分类]',
  status BIT NOT NULL DEFAULT 1 COMMENT '风格状态[默认是 1 正常,还有 0 非正常状态]',
  INDEX style_parentId(pid)
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH音乐歌单表 -- 歌单分为 1-普通用户歌单,2-歌曲专辑 */
# 记录所有歌单/专辑的信息
CREATE TABLE mh_play_list
(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  playListName VARCHAR(35) NOT NULL DEFAULT '' COMMENT '歌单名称',
  playListImg VARCHAR(255) DEFAULT '' COMMENT '歌单的封面图片所在路径',
  #playListStyle VARCHAR(35) DEFAULT '' COMMENT '歌单所属风格列表[记录风格ID使用 , 分隔且限制只能有三个不同的风格]',
  playListType BIT NOT NULL DEFAULT 0 COMMENT '歌单创建的类型[ 0-普通用户歌单 / 1-歌曲专辑]',
  songIdList TEXT COMMENT '歌单所收集的所有歌曲列表[记录歌曲ID使用 , 分隔]',
  createBy VARCHAR(25) NOT NULL DEFAULT '' COMMENT '创建人是谁',
  createTime INT UNSIGNED NOT NULL COMMENT '该歌单创建时间',
  INDEX playList_playListType(playListType),
  INDEX playList_createBy(createBy)
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH音乐歌单表对应风格 -- 反范式,为了优化搜索提高搜索相似风格的歌单 */
# 反范式设计,为了查询效率,一个歌单的一个风格即为一条记录[一个歌单限制最多只有3种风格]
CREATE TABLE mh_play_list_style
(
  plaiListId INT UNSIGNED ,
  styleId TINYINT UNSIGNED,
  INDEX playListStyle_playListId(plaiListId),
  INDEX playListStyle_styleId(styleId)
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH音乐单曲表 -- 记录每一首歌的详细信息 */
# 记录曲库里每一首歌曲的重要基本信息
CREATE TABLE mh_song
(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  songName VARCHAR(35) NOT NULL DEFAULT '' COMMENT '歌曲名称',
  singerId VARCHAR(35) NOT NULL DEFAULT '' COMMENT '歌曲的创作人列表[记录歌手的ID使用 , 分隔]',
#   lyric VARCHAR(255) DEFAULT '' COMMENT '歌曲的歌词文件所在路径',
#   songImg VARCHAR(255) DEFAULT '' COMMENT '歌曲的封面图片所在路径',
#   songMP3 VARCHAR(255) DEFAULT '' COMMENT '歌曲的MP3内容所在路径',
#   songTime VARCHAR(10) DEFAULT '' COMMENT '歌曲的播放时间长度',
  songPrice SMALLINT UNSIGNED DEFAULT 0 COMMENT '歌曲的价格 -- 如果有设置的话',
  status TINYINT UNSIGNED DEFAULT 1 COMMENT '歌曲的状态[默认是 1 正常,0 为审核状态,-1 为删除状态]',
  publicTime INT UNSIGNED NOT NULL COMMENT '该歌曲发行时间',
  createTime INT UNSIGNED NOT NULL COMMENT '该歌曲创建时间',
  INDEX song_songName(songName),
  INDEX song_singerId(singerId)
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH音乐歌曲交易表 -- 记录每一首歌的交易记录 */
# 歌曲交易表,如果某歌曲需要付钱下载或者聆听则记录该首歌曲的销售记录
CREATE TABLE mh_song_deal
(
  dealID BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  songId INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '歌曲对应的ID',
  userId INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '购买者对应的ID',
  dealTime INT UNSIGNED NOT NULL COMMENT '交易时间',
  INDEX songBuy_dealID(dealID),
  INDEX songBuy_songId(songId),
  INDEX songBuy_userId(userId),
  INDEX songBuy_dealTime(dealTime)
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH音乐歌曲其他信息表 -- 为了效率采用反范式方法创建一个专门记录歌曲聆听次数 & 被购买次数的表 */
# 反范式设计提高效率
CREATE TABLE mh_song_info
(
  songId INT UNSIGNED NOT NULL UNIQUE DEFAULT 0 COMMENT '歌曲对应的ID',
  listenNum BIGINT UNSIGNED DEFAULT 0 COMMENT '歌曲对应聆听次数',
  buyNum BIGINT UNSIGNED DEFAULT 0 COMMENT '歌曲对应购买次数'
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH音乐排行榜 -- 为了效率再次采用反范式方法创建一个专门记录前XX条高聆听的歌曲 */
# 排行榜反范式设计提高效率,单独记录了总聆听次数排名前XX条的歌曲基本信息
CREATE TABLE mh_listen_rank
(
  songId INT UNSIGNED NOT NULL UNIQUE DEFAULT 0 COMMENT '歌曲对应的ID',
  songName VARCHAR(35) NOT NULL UNIQUE DEFAULT '' COMMENT '歌曲对应名称',
  listenNum INT UNSIGNED DEFAULT 0 COMMENT '歌曲对应聆听次数',
  INDEX rank_listenNum(listenNum)
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH歌曲评论表 -- 记录用户对歌曲的评论 */
# 评论表详细记录哪个用户在哪一首歌曲做出的评论,并且收到了多少点赞数量
CREATE TABLE mh_comment
(
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  songId INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '歌曲对应的ID',
  `comment` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '评论内容',
  replyId BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '如果是回复之前已有的回复则该字段记录所要回复的之前已有的回复的ID',
  replyUserId INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '原评论者,为了优化用户新消息提示而反范式',
  likeNum INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '评论点赞数量',
  status TINYINT UNSIGNED NOT NULL DEFAULT 2 COMMENT '评论状态 [ 2-未读 / 1-已读 / 0-删除状态 ]',
  replyTime INT UNSIGNED NOT NULL COMMENT '评论时间',
  INDEX comment_songId(songId),
  INDEX comment_replyUserId(replyUserId)
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH评论点赞表 -- 记录哪个用户点赞了哪条评论 */
# 评论点赞表详细记录了哪个用户分别点赞了哪一条评论
CREATE TABLE mh_comment_like
(
  commentId BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '对应的评论ID',
  userId INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '点赞该评论所对应的用户ID',
  INDEX like_commentId(commentId),
  INDEX like_userId(userId)
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH问卷表 -- 用户反馈所填的问卷情况 */
CREATE TABLE mh_questionnaire
(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  quality TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '问卷调查之服务质量[ 1-很差 / 2-差 / 3-一般 / 4-好 / 5-很好 ]',
  defect TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '问卷调查之网站缺点[ 1-加载速度慢 / 2-歌曲收录少 / 3-曲库更新迟 / 4-歌曲音质差 / 5-会员收费高 / 6-歌曲价格高 / 7-功能不齐全 / 8-推荐不合理 ]',
  idea VARCHAR(500) DEFAULT '' COMMENT '问卷调查之意见收集',
  mail VARCHAR(38) DEFAULT '' COMMENT '填写问卷反馈的邮箱',
  ip VARCHAR(20) DEFAULT '' COMMENT '填写问卷的IP地址',
  status TINYINT UNSIGNED DEFAULT 0 COMMENT '调查问卷状态[ 0-管理员未查看 / 1-管理员已查看未回邮件 / 2-管理员已回邮件 ]',
  sendTime INT UNSIGNED NOT NULL COMMENT '发送时间',
  INDEX questionnaire_status(status)
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH音乐分析表 -- 记录每天 1-新用户、2-新会员数量、3-歌曲交易量 */
CREATE TABLE mh_analysis
(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  newNum INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '每天新增数量',
  type TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '区分不同的类型[ 1-新用户 / 2-新会员数量 / 3-歌曲交易量 ]',
  `date` INT UNSIGNED NOT NULL COMMENT '记录每天日期',
  INDEX analysis_type(type),
  INDEX analysis_date(`date`)
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH搜索记录表 -- 记录用户搜索记录 */
CREATE TABLE mh_search
(
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  `key` VARCHAR(32) NOT NULL DEFAULT '',
  `type` TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '搜索不同的分类[ 1-单曲 / 2-歌单 / 3-歌手 / 4-用户 ]',
  `date` INT UNSIGNED NOT NULL COMMENT '记录每天日期',
  INDEX search_date(`date`)
)ENGINE=Innodb DEFAULT CHARSET=utf8;

