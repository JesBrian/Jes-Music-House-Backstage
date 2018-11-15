-- MySQL dump 10.13  Distrib 5.6.34, for Win32 (AMD64)
--
-- Host: 127.0.0.1    Database: musichouse
-- ------------------------------------------------------
-- Server version	5.6.34-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `mh_admin`
--

DROP TABLE IF EXISTS `mh_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mh_admin` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(10) unsigned NOT NULL DEFAULT '0',
  `realName` varchar(25) NOT NULL DEFAULT '' COMMENT '管理员真名[为了确保系统的安全,加入我们都要进行信息确认]',
  `IDCardNo` char(18) NOT NULL DEFAULT '' COMMENT '管理员证件号码',
  `IDCardImg` varchar(255) NOT NULL DEFAULT '' COMMENT '管理员证件图片[正反两面,使用 ,分隔 - 长度有可能不足]',
  `status` bit(1) NOT NULL DEFAULT b'1' COMMENT '管理员账户状态 [默认是 1 正常,还有 0 非正常状态]',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mh_admin`
--

INSERT INTO `mh_admin` VALUES (1,5,'苏敬雄','123456789874563212','IDCardImg','');

--
-- Table structure for table `mh_menu`
--

DROP TABLE IF EXISTS `mh_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mh_menu` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(28) NOT NULL DEFAULT '' COMMENT '菜单名称',
  `icon` varchar(18) DEFAULT '' COMMENT '菜单图标',
  `pid` tinyint(3) unsigned DEFAULT '0' COMMENT '菜单的父ID [如果是二级菜单则该字段记录一级菜单的ID]',
  `url` varchar(255) NOT NULL DEFAULT '' COMMENT '菜单对应的URL跳转地址',
  `level` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '菜单的优先级 [后台左侧菜单栏显示顺序]',
  `status` bit(1) NOT NULL DEFAULT b'1' COMMENT '菜单状态 [默认是 1 正常,还有 0 非正常状态]',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mh_menu`
--

INSERT INTO `mh_menu` VALUES (1,'菜单模块','',0,'',0,''),(2,'添加菜单','',1,'menu',0,''),(3,'菜单排序','',1,'menuOrder',0,''),(4,'管理员模块','',0,'',0,''),(5,'用户模块','',0,'',0,''),(6,'用户列表','',5,'userList',0,''),(7,'添加用户','',5,'user',0,''),(8,'菜单列表','',1,'menuList',0,''),(9,'歌曲模块','',0,'',0,''),(10,'歌单模块','',0,'',0,''),(11,'歌曲列表','',9,'songList',0,''),(12,'歌单列表','',10,'playListList',0,''),(13,'新增歌单','',10,'playList',0,''),(14,'权限模块','',0,'',0,''),(15,'添加功能','',14,'',0,'\0'),(16,'分配权限','',14,'assignPermissions',0,''),(17,'角色模块','',0,'',0,''),(18,'新增角色','',17,'role',0,''),(19,'分配角色','',17,'roleList',0,''),(20,'幻灯片模块','',0,'',0,''),(21,'新增幻灯片','',20,'slide',0,''),(22,'幻灯片列表','',20,'slideList',0,''),(23,'幻灯片排序','',20,'slideOrder',0,''),(24,'添加管理员','',4,'',0,''),(25,'管理员列表','',4,'',0,'');

--
-- Table structure for table `mh_search`
--

DROP TABLE IF EXISTS `mh_search`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mh_search` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(32) NOT NULL DEFAULT '',
  `type` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '搜索不同的分类[ 1-单曲 / 2-歌单 / 3-歌手 / 4-用户 ]',
  `date` int(10) unsigned NOT NULL COMMENT '记录每天日期',
  PRIMARY KEY (`id`),
  KEY `search_date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mh_search`
--


--
-- Table structure for table `mh_slide`
--

DROP TABLE IF EXISTS `mh_slide`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mh_slide` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL DEFAULT '' COMMENT '标题',
  `img` varchar(255) NOT NULL DEFAULT '' COMMENT '图片',
  `url` varchar(255) NOT NULL DEFAULT '' COMMENT '跳转链接',
  `local` bit(1) NOT NULL DEFAULT b'1' COMMENT '跳转的链接是否外部链接',
  `level` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '优先级 [显示顺序]',
  `descript` varchar(500) NOT NULL DEFAULT '描述',
  `status` bit(1) NOT NULL DEFAULT b'1' COMMENT '状态[默认是 1 正常,还有 0 非正常状态]',
  `createTime` int(10) unsigned NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mh_slide`
--

INSERT INTO `mh_slide` VALUES (1,'test1','https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=124155087,2314196803&fm=26&gp=0.jpg','','',0,'描述1','',1111),(2,'test2','https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3184350632,1307615993&fm=200&gp=0.jpg','','',5,'描述2','',1112),(3,'test3','https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=222952879,1105828417&fm=200&gp=0.jpg','','',0,'描述3','',1113),(4,'test4','https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1678298956,136203425&fm=26&gp=0.jpg','','',4,'描述4','',1114),(5,'test5','https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2460613335,2392222141&fm=26&gp=0.jpg','','',0,'描述5','',1115);

--
-- Table structure for table `mh_style`
--

DROP TABLE IF EXISTS `mh_style`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mh_style` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL DEFAULT '' COMMENT '风格名称',
  `icon` varchar(18) DEFAULT '' COMMENT '一级分类对应图标',
  `pid` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '风格的一级父ID,对应mh_style_main表ID[目前只做二级分类]',
  `status` bit(1) NOT NULL DEFAULT b'1' COMMENT '风格状态[默认是 1 正常,还有 0 非正常状态]',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `style_parentId` (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mh_style`
--

INSERT INTO `mh_style` VALUES (1,'语种','earth',0,''),(2,'风格','instrument',0,''),(3,'场景','coffee',0,''),(4,'情感','exciting',0,''),(5,'主题','theme',0,''),(6,'华语','',1,''),(7,'欧美','',1,''),(8,'日语','',1,''),(9,'韩语','',1,''),(10,'粤语','',1,''),(11,'小语种','',1,''),(12,'流行','',2,''),(13,'摇滚','',2,''),(14,'民谣','',2,''),(15,'电子','',2,''),(16,'舞曲','',2,''),(17,'说唱','',2,''),(18,'轻音乐','',2,''),(19,'爵士','',2,''),(20,'乡村','',2,''),(21,'R&B/Soul','',2,''),(22,'古典','',2,''),(23,'民族','',2,''),(24,'英伦','',2,''),(25,'金属','',2,''),(26,'朋克','',2,''),(27,'蓝调','',2,''),(28,'雷鬼','',2,''),(29,'世界音乐','',2,''),(30,'拉丁','',2,''),(31,'另类/独立','',2,''),(32,'New Age','',2,''),(33,'古风','',2,''),(34,'后摇','',2,''),(35,'Bossa Nova','',2,''),(36,'清晨','',3,''),(37,'夜晚','',3,''),(38,'学习','',3,''),(39,'工作','',3,''),(40,'午休','',3,''),(41,'下午茶','',3,''),(42,'地铁','',3,''),(43,'驾车','',3,''),(44,'运动','',3,''),(45,'旅行','',3,''),(46,'散步','',3,''),(47,'酒吧','',3,''),(48,'怀旧','',4,''),(49,'清新','',4,''),(50,'浪漫','',4,''),(51,'性感','',4,''),(52,'伤感','',4,''),(53,'治愈','',4,''),(54,'放松','',4,''),(55,'孤独','',4,''),(56,'兴奋','',4,''),(57,'快乐','',4,''),(58,'安静','',4,''),(59,'思念','',4,''),(60,'影视原声','',5,''),(61,'ACG','',5,''),(62,'儿童','',5,''),(63,'游戏','',5,''),(64,'校园','',5,''),(65,'70后','',5,''),(66,'80后','',5,''),(67,'90后','',5,''),(68,'00后','',5,''),(69,'KTV','',5,''),(70,'经典','',5,''),(71,'翻唱','',5,''),(72,'吉他','',5,''),(73,'钢琴','',5,''),(74,'器乐','',5,''),(75,'榜单','',5,''),(76,'网络歌曲','',5,'');

--
-- Table structure for table `mh_user`
--

DROP TABLE IF EXISTS `mh_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mh_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL DEFAULT '' COMMENT '用户名',
  `phone` char(11) NOT NULL DEFAULT '' COMMENT '用户手机',
  `salt` char(4) NOT NULL DEFAULT '' COMMENT '密码加盐',
  `passwd` char(32) NOT NULL DEFAULT '' COMMENT '加密后的密码',
  `avatar` varchar(255) NOT NULL DEFAULT '' COMMENT '用户头像图片',
  `powerId` tinyint(3) unsigned NOT NULL DEFAULT '5' COMMENT '权限类型[默认是 5,为普通用户, 1-superadmin-超级管理员 / 2-admin-普通管理员 / 3-singer-歌手 / 4-member-会员 / 5-user-普通用户]',
  `status` bit(1) NOT NULL DEFAULT b'1' COMMENT '用户账户状态[默认是 1 正常,还有 0 非正常状态]',
  `createTime` int(10) unsigned NOT NULL COMMENT '用户账户创建时间[可以用于每天新用户 - 保存在 XX 表中]',
  `loginTime` int(10) unsigned NOT NULL COMMENT '用户上一次登录时间[可以用于计算活跃用户 - 保存在 XX 表中]',
  PRIMARY KEY (`id`),
  KEY `user_phone` (`phone`),
  KEY `user_createTime` (`createTime`),
  KEY `user_loginTime` (`loginTime`),
  KEY `user_power` (`powerId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mh_user`
--

INSERT INTO `mh_user` VALUES (5,'158169436578','15816943656','WVQK','ee6d117115b2b7ddb20a415a275d6197','',1,'',1529134214,1542283796),(6,'15616943656','15616943656','czHY','98cf457f826875cca8f5eb48215a540a','',5,'',1530186779,1530186779);

--
-- Table structure for table `mh_user_info`
--

DROP TABLE IF EXISTS `mh_user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mh_user_info` (
  `userId` int(10) unsigned NOT NULL,
  `sex` tinyint(3) unsigned DEFAULT '0' COMMENT '用户性别[默认是 0 保密秀吉,1 男,3 女]',
  `birth` int(10) unsigned DEFAULT '0' COMMENT '用户出生日期',
  `address` varchar(10) DEFAULT '' COMMENT '用户地址',
  `description` varchar(255) DEFAULT '' COMMENT '用户简介',
  `mail` varchar(38) DEFAULT '' COMMENT '用户邮箱',
  `followNum` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '用户被其他用户关注的数量',
  `createPlayList` varchar(200) DEFAULT '' COMMENT '用户创建的歌单',
  `collectionPlayList` varchar(200) DEFAULT '' COMMENT '用户收藏的歌单',
  `followSinger` varchar(200) DEFAULT '' COMMENT '用户喜欢的歌手',
  `followUser` varchar(200) DEFAULT '' COMMENT '用户关注的用户',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mh_user_info`
--

INSERT INTO `mh_user_info` VALUES (5,0,0,'擦拭擦拭','cvvdsbsdf','5@163.com',0,'','','',''),(6,0,0,'','','',0,'','','','');
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-15 20:28:41
