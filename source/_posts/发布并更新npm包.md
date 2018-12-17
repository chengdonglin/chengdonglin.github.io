---
title: 发布并更新npm包
date: 2018-12-17 13:52:58
tags:
	- node.js
categories: node.js
---


### 发布并更新npm包

#### 发布包

1. 新建一个文件夹 
2. 文件夹下新建一个lib文件夹
3. 创建package.json,并初始化字节的信息
4. 创建readme.md文件
5. 在lib文件夹写你的方法
6. 根文件夹下创建一个index.js主入口文件,并把lib下的方法暴露
7. 开始上传npm包
	1. npm adduser
	2. npm publish

#### 更新包

1. 进行你的代码修改
2. 用命令：npm version <update_type>进行修改,update_type 有三个参数
	1.  第一个是patch, 补丁
	2.  第二个是minor, 小修小改
	3.  第三个是 major，大改

3. 再次npm publish既可
