---
title: xorm自动生成models
date: 2019-05-10 08:37:24
tags:
	- 导航
    - golang
categories: golang
---

# golang自动生成数据库models

## 介绍

 根据数据表结构创建对应的 struct 模型。因为 golang 的使用首字母控制可见范围，我们经常要设计 struct 字段名和数据库字段名的对应关系。久而久之，这是一个非常繁琐的过程。

xorm是一个简单而强大的Go语言ORM库. 通过它可以使数据库操作非常简便。

- xorm 工具
	1. xorm 是一组数据库操作命令的工具，包含如下命令：

	2. reverse 反转一个数据库结构，生成代码
	3. shell 通用的数据库操作客户端，可对数据库结构和数据操作
	4. dump Dump数据库中所有结构和数据到标准输出
	5. source 从标注输入中执行SQL文件
	6. driver 列出所有支持的数据库驱动


## 使用步骤

1. 安装依赖
 
		go get github.com/go-xorm/cmd/xorm
		go get github.com/go-xorm/xorm

2. 到GOPATH\src\github.com\go-xorm\cmd\xorm 目录下，执行
	
		go build

此时会再当前文件夹下生成xorm.exe工具


3. 执行命令行生成models

		database	command
		sqlite	xorm reverse sqite3 test.db templates/goxorm C:\temp
		mysql	xorm reverse mysql "root:123456@(127.0.0.1:3306)/test?charset=utf8" templates/goxorm C:\temp
		mymysql	xorm reverse mymysql xorm_test2/root/ templates/goxorm C:\temp
		postgres	xorm reverse postgres "user=postgres password=123456 dbname=test host=127.0.0.1 port=5432 sslmode=disable" templates/goxorm C:\temp
		mssql	xorm reverse mssql "server=127.0.0.1;user id=testid;password=testpwd;database=testdb" templates/goxorm C:\temp