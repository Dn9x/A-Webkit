/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50067
Source Host           : localhost:3306
Source Database       : awebkit

Target Server Type    : MYSQL
Target Server Version : 50067
File Encoding         : 65001

Date: 2014-03-06 15:33:46
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `class`
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `id` int(11) NOT NULL auto_increment COMMENT '主键ID自增',
  `name` varchar(255) NOT NULL COMMENT '科目名称',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO class VALUES ('1', '语文');
INSERT INTO class VALUES ('2', '数学');
INSERT INTO class VALUES ('3', '英语');

-- ----------------------------
-- Table structure for `score`
-- ----------------------------
DROP TABLE IF EXISTS `score`;
CREATE TABLE `score` (
  `id` int(11) NOT NULL auto_increment COMMENT '主键ID自增',
  `uid` int(11) NOT NULL COMMENT '用户ID',
  `cid` int(11) NOT NULL COMMENT '科目ID',
  `score` int(11) NOT NULL COMMENT '分数',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of score
-- ----------------------------
INSERT INTO score VALUES ('8', '6', '1', '78');
INSERT INTO score VALUES ('9', '7', '1', '89');
INSERT INTO score VALUES ('10', '10', '1', '68');
INSERT INTO score VALUES ('11', '12', '1', '97');
INSERT INTO score VALUES ('12', '12', '2', '99');
INSERT INTO score VALUES ('13', '11', '2', '87');
INSERT INTO score VALUES ('14', '10', '2', '96');
INSERT INTO score VALUES ('15', '7', '2', '56');
INSERT INTO score VALUES ('16', '6', '3', '34');
INSERT INTO score VALUES ('17', '7', '3', '88');
INSERT INTO score VALUES ('18', '10', '3', '76');
INSERT INTO score VALUES ('19', '11', '3', '45');
INSERT INTO score VALUES ('20', '12', '3', '73');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL auto_increment COMMENT '主键ID自增',
  `login` varchar(20) default NULL COMMENT '登陆账号',
  `pswd` varchar(30) default NULL COMMENT '登陆密码',
  `name` varchar(10) NOT NULL COMMENT '显示名称',
  `type` char(1) NOT NULL COMMENT '用户类型T表示老师S表示学生',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO users VALUES ('1', 'teacher', '1234', '王老师', 'T');
INSERT INTO users VALUES ('6', null, null, '小明', 'S');
INSERT INTO users VALUES ('7', null, null, '小红', 'S');
INSERT INTO users VALUES ('10', null, null, '小王', 'S');
INSERT INTO users VALUES ('11', null, null, '小李', 'S');
INSERT INTO users VALUES ('12', null, null, '小强', 'S');
