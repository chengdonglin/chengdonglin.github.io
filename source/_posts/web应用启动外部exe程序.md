---
title: web应用启动外部exe程序
date: 2018-12-07 10:21:14
tags:
	- 导航
categories: electron
---

### web应用启动外部exe程序

有时候，需要在网页上去执行本地的一个EXE文件,但是采用js通常对大部分浏览器不支持,所以采用写注册表是一个比较好的解决方案


#### url protocol方式

在网页上点击的时候，就会弹出QQ，或者迅雷，电驴的下载界面，用的就是这个原理.

	Windows Registry Editor Version 5.00
	
	[HKEY_CLASSES_ROOT\注册表名字]
	@="注册表名字 Protocol"
	"URL Protocol"=""
	
	[HKEY_CLASSES_ROOT\注册表名字\DefaultIcon]
	@="C:\\你的程序安装路径\\程序名字.exe"
	
	[HKEY_CLASSES_ROOT\注册表名字\shell]
	@=""
	
	[HKEY_CLASSES_ROOT\注册表名字\shell\open]
	@=""
	
	[HKEY_CLASSES_ROOT\注册表名字\shell\open\command]
	@="\"C:\\你的程序安装路径\\程序名字.exe\" "


#### html代码

	<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	  <head>
	      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	  </head>
	    <body>
	        <div>
	            <a href="刚才你写的注册表名称://">
	            执行可执行文件
	            </a>
	        </div>
	    </body>
	</html>