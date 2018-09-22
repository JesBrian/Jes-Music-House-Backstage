-- MySQL dump 10.13  Distrib 5.6.38, for osx10.9 (x86_64)
--
-- Host: 127.0.0.1    Database: MusicHouse
-- ------------------------------------------------------
-- Server version	5.6.38

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
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mh_menu`
--

LOCK TABLES `mh_menu` WRITE;
/*!40000 ALTER TABLE `mh_menu` DISABLE KEYS */;
INSERT INTO `mh_menu` VALUES (1,'菜单模块','',0,'',0,''),(2,'添加菜单','',1,'/menu',0,''),(3,'菜单排序','',1,'/menuOrder',0,''),(4,'管理员模块','',0,'',0,''),(5,'用户模块','',0,'',0,''),(6,'用户列表','',5,'',0,''),(7,'添加用户','',5,'',0,''),(8,'菜单列表','',1,'/menuList',0,''),(9,'歌曲模块','',0,'',0,''),(10,'歌单模块','',0,'',0,''),(11,'歌曲列表','',9,'',0,''),(12,'歌单列表','',10,'',0,''),(13,'新增歌单','',10,'',0,''),(14,'权限模块','',0,'',0,''),(15,'添加功能','',14,'',0,''),(16,'分配权限','',14,'',0,''),(17,'角色模块','',0,'',0,''),(18,'新增角色','',17,'',0,''),(19,'分配角色','',17,'',0,''),(20,'幻灯片模块','',0,'',0,''),(21,'新增幻灯片','',20,'/slider',0,''),(22,'幻灯片列表','',20,'/sliderList',0,''),(23,'幻灯片排序','',20,'/sliderOrder',0,'');
/*!40000 ALTER TABLE `mh_menu` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-23  2:38:01
