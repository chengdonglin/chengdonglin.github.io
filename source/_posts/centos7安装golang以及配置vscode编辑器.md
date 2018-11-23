---
title: centos7安装golang以及配置vscode编辑器
date: 2018-11-22 08:50:28
tags:
	- 导航
    - golang
categories: golang
---

### centos7安装golang以及配置vscode编辑器


#### centos7安装golang

- 下载tar包

链接地址  https://studygolang.com/dl

- 解压至指定文件夹

tar -zxvf <包名>

- 解压完毕后在 /usr/local 目录下会有一个go文件夹

- 建立工作目录workspace,新项目将建立在src文件夹下

		mkdir -p /usr/local/goproject
		cd /usr/local/goproject
		mkdir src pkg bin

- 设置环境变量

		在跟目录   ls -a  找到.bashrc文件

- 在文件最后加入如下代码，不要有空行, 保存退出

		export GOROOT=/usr/local/go
		export PATH=$GOROOT/bin:$PATH
		export GOPATH=/usr/local/goproject

- 刷新系统配置

		source .bashrc

- 输入go就可以查看是否安装成功



#### 配置vscode编辑器

主要根据官网:https://code.visualstudio.com/docs/setup/linux

- 注册源

		sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
		sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'


- 更新源并安装

		yum check-update
		sudo yum install code

然后 在终端输入 code就可以启动了,然后可以安装各种插件助你提高开发效率.




