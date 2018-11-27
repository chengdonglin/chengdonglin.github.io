---
title: electron-vue学习
date: 2018-11-27 15:22:45
tags:
	- 导航
    - electron
categories: electron
---

### electron-vue学习


#### 隐藏顶部菜单

在创建窗体完成的时候的时候设置

	mainWindow.setMenu(null)

去掉顶部导航 去掉关闭按钮 最大化最小化按钮

	在创建BrowserWindow的时候设置frame的属性未false