
#[为了系统运行，且学习用途，会收集一些关于个人隐私的资料，但由于涉及隐私，且该系统作为学习之用，并不会真的存储实际隐私数据，可以不需填写真实资料，只是作学习使用]
CREATE DATABASE MusicHouse;
USE MusicHouse;

/* MH后台菜单表 -- 设置后台菜单，分一、二级菜单 */
CREATE TABLE mh_menu
(
  id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(28) NOT NULL DEFAULT '' COMMENT '菜单名称',
  parent_id TINYINT UNSIGNED DEFAULT 0 COMMENT '菜单的父ID [如果是二级菜单则该字段记录一级菜单的ID]',
  level TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '菜单的优先级 [后台左侧菜单栏显示顺序]',
  status BIT NOT NULL DEFAULT 1 COMMENT '菜单状态 [默认是 1 正常，还有 0 非正常状态]'
)ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT mh_menu(name, parent_id, level)
  VALUES ('系统管理',0,127);
INSERT mh_menu(name, parent_id, level)
  VALUES ('菜单管理',1,52);
INSERT mh_menu(name, parent_id, level)
  VALUES ('权限管理',1,48);
INSERT mh_menu(name, parent_id, level)
  VALUES ('角色管理',1,46);
INSERT mh_menu(name, parent_id, level)
  VALUES ('登陆日志',1,44);

INSERT mh_menu(name, parent_id, level)
  VALUES ('人员管理',0,125);
INSERT mh_menu(name, parent_id, level)
  VALUES ('歌手管理',6,52);
INSERT mh_menu(name, parent_id, level)
  VALUES ('会员管理',6,50);
INSERT mh_menu(name, parent_id, level)
  VALUES ('用户管理',6,48);




/* MH权限表 -- 设置普通用户-5、会员-4、歌手-3、普通管理员-2、超级管理员权限-1 */
CREATE TABLE mh_power
(
  id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(18) UNIQUE NOT NULL DEFAULT '' COMMENT '权限类型[ superadmin-超级管理员 / admin-普通管理员 / singer-歌手 / member-会员 / user-普通用户 ]',
  operIdList VARCHAR(128) NOT NULL DEFAULT '' COMMENT '该权限下可以操作的菜单列表[记录菜单id列表，用、连接]'
)ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT mh_power(type,operIdList)
  VALUES ('superadmin','1,2,3,4,5,6,7,8,9');
INSERT mh_power(type,operIdList)
  VALUES ('admin','6,7,8,9');




/* MH管理员表 -- 进入后台对整个系统调整 */
CREATE TABLE mh_admin
(
  id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  loginName VARCHAR(25) NOT NULL DEFAULT '' COMMENT '管理员登录名',
  salt CHAR(4) NOT NULL DEFAULT '' COMMENT '密码加盐',
  passwd CHAR(32) NOT NULL DEFAULT '' COMMENT '加密后的密码',
  realName VARCHAR(25) NOT NULL DEFAULT '' COMMENT '管理员真名[为了确保系统的安全，加入我们都要进行信息确认]',
  phone CHAR(11) NOT NULL DEFAULT '' COMMENT '管理员手机电话',
  IDCardNo CHAR(18) NOT NULL DEFAULT '' COMMENT '管理员证件号码',
  IDCardImg VARCHAR(255) NOT NULL DEFAULT '' COMMENT '管理员证件图片[正反两面，使用 ，分隔 - 长度有可能不足]',
  bankName VARCHAR(30) NOT NULL DEFAULT '' COMMENT '管理员的银行名称',
  bankNo VARCHAR(30) NOT NULL DEFAULT '' COMMENT '管理员的银行账号',
  powerId TINYINT UNSIGNED NOT NULL DEFAULT '2' COMMENT '权限类型[默认是 2，为普通管理员，还有 1 是超级管理员 ]'
)ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT mh_admin(loginName, salt, passwd, realName, phone, IDCardNo, IDCardImg, bankName, bankNo, powerId)
  VALUES ('JesBrian','5354','cdea1aa30d43748122c2e67a92089e12','苏敬雄','12345698745','123456789874563212','IDCardImg','XX银行','12345678987746513',1);




/* MH管理员登陆日志 */
CREATE TABLE mh_login_log
(
  adminId TINYINT UNSIGNED NOT NULL,
  loginTime INT UNSIGNED NOT NULL COMMENT '管理员账户每次登陆时间',
  INDEX login_log_adminId(adminId)
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH用户表 -- 普通注册用户 */
CREATE TABLE mh_user
(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  username VARCHAR(25) NOT NULL DEFAULT '' COMMENT '普通用户名',
  salt CHAR(4) NOT NULL DEFAULT '' COMMENT '密码加盐',
  passwd CHAR(32) NOT NULL DEFAULT '' COMMENT '加密后的密码',
  avatar VARCHAR(255) NOT NULL DEFAULT '' COMMENT '用户头像图片',
  powerId TINYINT UNSIGNED NOT NULL DEFAULT '5' COMMENT '权限类型[默认是 5，为普通用户，还有 4 是会员 ]',
  status BIT NOT NULL DEFAULT 1 COMMENT '用户账户状态[默认是 1 正常，还有 0 非正常状态]',
  createTime INT UNSIGNED NOT NULL COMMENT '用户账户创建时间[可以用于每天新用户 - 保存在 XX 表中]',
  loginTime INT UNSIGNED NOT NULL COMMENT '用户上一次登录时间[可以用于计算活跃用户 - 保存在 XX 表中]',
  INDEX user_power(powerId),
  INDEX user_createTime(createTime),
  INDEX user_loginTime(loginTime)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;


/* MH用户表其他信息表 -- 注册用户之后就会自动产生, 记录用户其他一些不常用的信息 */
CREATE TABLE mh_user_info
(
  userId INT UNSIGNED PRIMARY KEY ,
  sex TINYINT DEFAULT 0 COMMENT '用户性别[默认是 0 男，1 为女，3 为保密秀吉]',
  date INT DEFAULT 0 COMMENT '用户出生日期',
  address VARCHAR(10) DEFAULT '' COMMENT '用户地址',
  description VARCHAR(255) DEFAULT '' COMMENT '用户简介',
  mail VARCHAR(60) DEFAULT '' COMMENT '用户邮箱'
)ENGINE=MyISAM DEFAULT CHARSET=utf8;


/* MH用户听歌情况表 -- 注册用户之后就会自动产生一个用户听歌表记录所听过的歌曲以及对应听的次数 */
CREATE TABLE mh_userXX_listen
(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  songId INT UNSIGNED NOT NULL UNIQUE DEFAULT 0 COMMENT '歌曲对应的ID',
  listenNum INT UNSIGNED DEFAULT 0 COMMENT '歌曲对应聆听次数',
  INDEX userlisten_listenNum(listenNum)
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH会员表 -- 普通用户付钱后成为会员 */
CREATE TABLE mh_member
(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  userId INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '保存对应的用户id',
  timeSpan TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '用户开通会员的时间长度[ 1-一个月 / 2-两个月 / 3-三个月 / 4-半年 / 5-一年]',
  timeOut INT UNSIGNED NOT NULL COMMENT '用户会员到期时间',
  status BIT NOT NULL DEFAULT 1 COMMENT '用户会员账户状态[默认是 1 正常，还有 0 非正常状态]',
  createTime INT UNSIGNED NOT NULL COMMENT '用户开通会员时间[可以用于每天新会员 - 保存在 XX 表中]',
  INDEX user_userId(userId),
  INDEX user_createTime(createTime)
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH歌手表 -- 申请入驻后成为MH的入驻歌手 */
CREATE TABLE mh_singer
(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  userid INT UNSIGNED DEFAULT 0 COMMENT '对应的用户账号[0为没有]',
  singerName VARCHAR(25) NOT NULL DEFAULT '' COMMENT '歌手艺名',
  singerImg VARCHAR(255) DEFAULT '' COMMENT '歌手图片',
  sex TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '歌手性别[ 1-男 / 2-女 / 3-团队 ]',
  styleId TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '歌手歌曲风格id',
  brand VARCHAR(255) DEFAULT '' COMMENT '歌手所属公司/品牌',
  introduction TEXT COMMENT '歌手简介',
  realName VARCHAR(25) NOT NULL DEFAULT '' COMMENT '歌手真名[审核通过后不能更改]',
  phone CHAR(13) NOT NULL DEFAULT '' COMMENT '歌手手机',
  nationality TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '歌手所属国籍[默认 1-中国]',
  IDCardNo CHAR(18) NOT NULL DEFAULT '' COMMENT '歌手身份证号码',
  IDCardImg VARCHAR(255) NOT NULL DEFAULT '' COMMENT '歌手身份证图片[正反两面，使用 ，分隔 - 长度有可能不足]',
  powerId TINYINT UNSIGNED NOT NULL DEFAULT '3' COMMENT '权限类型[默认是 3，为歌手, 不好意思也只能是3 ]',
  status BIT NOT NULL DEFAULT 1 COMMENT '歌手账户状态[默认是 1 正常，还有 0 非正常状态]',
  createTime INT UNSIGNED NOT NULL COMMENT '成为入驻歌手时间[可以用于每天新会员 - 保存在 XX 表中]',
  loginTime INT UNSIGNED NOT NULL COMMENT '歌手上一次登录时间',
  INDEX singer_userid(userid),
  INDEX singer_singername(singerName),
  INDEX singer_styleId(styleId),
  INDEX singer_createTime(createTime)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;


/* MH音乐风格表 -- 用于搜索歌单 */
CREATE TABLE mh_style
(
  id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  styleName VARCHAR(15) NOT NULL UNIQUE DEFAULT '' COMMENT '风格名称',
  parentId TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '风格的一级父ID，如果有的话[目前只做二级分类]',
  INDEX style_parentId(parentId)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;


/* MH音乐歌单表 -- 歌单分为 1-普通用户歌单，2-歌曲专辑 */
CREATE TABLE mh_album
(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  albumName VARCHAR(35) NOT NULL DEFAULT '' COMMENT '歌单名称',
  songIdList TEXT COMMENT '歌单所收集的所有歌曲列表[记录歌曲ID使用 , 分隔]',
  albumImg VARCHAR(255) DEFAULT '' COMMENT '歌单的封面图片所在路径',
  albumStyle VARCHAR(35) DEFAULT '' COMMENT '歌单所属风格列表[记录风格ID使用 , 分隔且限制只能有三个不同的风格]',
  albumType BIT NOT NULL DEFAULT 0 COMMENT '歌单创建的类型[ 0-普通用户歌单 / 1-歌曲专辑]',
  createBy VARCHAR(25) NOT NULL DEFAULT '' COMMENT '创建人是谁',
  createTime INT UNSIGNED NOT NULL COMMENT '该歌单创建时间',
  INDEX album_albumType(albumType),
  INDEX album_createBy(createBy)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;


/* MH音乐单曲表 -- 记录每一首歌的详细信息 */
CREATE TABLE mh_song
(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  songName VARCHAR(35) NOT NULL DEFAULT '' COMMENT '歌曲名称',
  singerId VARCHAR(35) NOT NULL DEFAULT '' COMMENT '歌曲的创作人列表[记录歌手的ID使用 , 分隔]',
  songLyric VARCHAR(255) DEFAULT '' COMMENT '歌曲的歌词文件所在路径',
  songImg VARCHAR(255) DEFAULT '' COMMENT '歌曲的封面图片所在路径',
  songMP3 VARCHAR(255) DEFAULT '' COMMENT '歌曲的MP3内容所在路径',
  songTime VARCHAR(10) DEFAULT '' COMMENT '歌曲的播放时间长度',
  songPrice SMALLINT DEFAULT 0 COMMENT '歌曲的价格 -- 如果有设置的话',
  status BIT DEFAULT 1 COMMENT '歌曲的状态',
  createTime INT UNSIGNED NOT NULL COMMENT '该歌曲创建时间',
  INDEX song_songName(songName),
  INDEX song_singerId(singerId)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;


/* MH音乐歌曲交易表 -- 记录每一首歌的交易记录 */
CREATE TABLE mh_song_buy
(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  songId INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '歌曲对应的ID',
  userId INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '购买者对应的ID',
  INDEX songBuy_songId(songId),
  INDEX songBuy_userId(userId)
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH音乐歌曲其他信息表 -- 为了效率采用反范式方法创建一个专门记录歌曲聆听次数 & 被购买次数的表 */
CREATE TABLE mh_song_info
(
  songId INT UNSIGNED NOT NULL UNIQUE DEFAULT 0 COMMENT '歌曲对应的ID',
  listenNum BIGINT UNSIGNED DEFAULT 0 COMMENT '歌曲对应聆听次数',
  buyNum BIGINT UNSIGNED DEFAULT 0 COMMENT '歌曲对应购买次数'
)ENGINE=Innodb DEFAULT CHARSET=utf8;


/* MH音乐排行榜 -- 为了效率再次采用反范式方法创建一个专门记录前XX条高聆听的歌曲 */
CREATE TABLE mh_listen_rank
(
  songId INT UNSIGNED NOT NULL UNIQUE DEFAULT 0 COMMENT '歌曲对应的ID',
  songName VARCHAR(35) NOT NULL UNIQUE DEFAULT '' COMMENT '歌曲对应名称',
  listenNum INT UNSIGNED DEFAULT 0 COMMENT '歌曲对应聆听次数',
  INDEX rank_listenNum(listenNum)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;


/* MH歌曲评论表 -- 记录用户对歌曲的评论 */
CREATE TABLE mh_comment
(
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  `comment` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '评论内容',
  replayId BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '如果是回复之前已有的回复则该字段记录所要回复的之前已有的回复的ID',
  songId INT UNSIGNED NOT NULL UNIQUE DEFAULT 0 COMMENT '歌曲对应的ID',
  likeNum INT UNSIGNED NOT NULL UNIQUE DEFAULT 0 COMMENT '歌曲对应的ID',
  INDEX comment_songId(songId)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;


/* MH评论点赞表 -- 记录哪个用户点赞了哪条评论 */
CREATE TABLE mh_comment_like
(
  commentId BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '对应的评论ID',
  userId INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '点赞该评论所对应的用户ID',
  INDEX like_commentId(commentId),
  INDEX like_userId(userId)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;


/* MH问卷表 -- 用户反馈所填的问卷情况 */
CREATE TABLE mh_questionnaire
(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  quality TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '问卷调查之服务质量[ 1-很差 / 2-差 / 3-一般 / 4-好 / 5-很好 ]',
  defect TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '问卷调查之网站缺点[ 1-加载速度慢 / 2-歌曲收录少 / 3-曲库更新迟 / 4-歌曲音质差 / 5-会员收费高 / 6-歌曲价格高 / 7-功能不齐全 / 8-推荐不合理 ]',
  idea VARCHAR(500) DEFAULT '' COMMENT '问卷调查之意见收集',
  mail VARCHAR(160) DEFAULT '' COMMENT '填写问卷反馈的邮箱',
  ip VARCHAR(20) DEFAULT '' COMMENT '填写问卷的IP地址',
  status TINYINT DEFAULT 0 COMMENT '调查问卷状态[ 0-管理员未查看 / 1-管理员已查看未回邮件 / 2-管理员已回邮件 ]',
  INDEX questionnaire_status(status)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;


/* MH分析表 -- 记录每天 1-新用户、2-新会员数量、3-歌曲交易量 */
CREATE TABLE mh_analysis
(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
  newNum INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '每天新增人数',
  type TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '区分不同的类型[ 1-新用户 / 2-新会员数量 / 3-歌曲交易量 ]',
  `date` INT UNSIGNED NOT NULL COMMENT '记录每天日期',
  INDEX analysis_type(type),
  INDEX analysis_date(`date`)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;
























