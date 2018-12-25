---
title: git的使用
date: 2018-12-24 21:14:27
tags:
	- 导航
    - git
categories: git
---

### git的使用
#### 版本控制
- 分布式版本控制系统(对应svn的集中式管理)
- 强大的"分支"管理系统

#### 配置git用户和邮箱
	git config --global user.name "你的github用户名"
	git config --global user.email "你的github邮箱"

##### 查看配置
	git config --global user.name
	git config --global user.email
##### 查看所有配置
	git config --list

#### 初始化git
- 先创建一个空目录 ，然后进入此目录
- 点击右键选择Git-Bash打开命令行
- 输入git init命令把这个目录变成Git可以管理的仓库

通过ls -al命令查看所有文件

#### git的三个区

- 工作流
	1. 工作区
		- 通过git add添加到暂存区
		 
				git add '文件名'
	2. 暂存区
		- 特点:过渡的作用，避免误操作，保护工作区和历史区，分支处理
		- 通过git commit 添加到历史区

				git commit -m "注释内容"
	3. 历史区
		- 查看历史状态
		
				git log
		- 修改时通过git status查看当前状态

#### git diff
不同区的代码比较

##### 工作区和暂存区
	git diff
##### 暂存区和历史区
	git diff -cached (--staged)
##### 工作区和版本库
	git diff master

#### 撤销
##### 撤回git add的内容
	git reset Head "文件名"
##### 撤回文件
- 先从缓存区撤销,缓存区无内容，从历史区域撤销

	 	git checkout "文件名"

有的时候我们希望提交时合并到上一次的提交 git commit --amend

#### 删除
##### 删除暂存区和工作区
- 删除暂存区中的内容,并且保证工作区中的内容已经不存在
	
		git rm "文件名"

若本地文件存在则不能删除，需要通过-f参数删除
##### 仅删除缓存区
- git rm --cached "文件名"

#### 恢复
##### 恢复某个版本文件
	git checkout commit_id filename 某个文件

##### 通过版本id恢复
	git reset --hard commit_id

##### 恢复未来
- 查看当时回滚的版本

		git reflog

##### 快速版本回退 
	git reset --hard HEAD^
	git reset --hard HEAD~3

#### 同步远程仓库

##### github
- 注册账号
- 新建项目
##### 版本远程仓库
	git remote add origin "地址"
##### 添加忽略文件
	$ touch .gitignore
	$ echo .DS_Store
	$ echo node_modules
	$ echo .idea

##### 推送代码
	git push origin master
##### 查看
git remote 查看名字
git remote -v 查看地址

#### 代码的合并
##### git fetch
	git fetch
拉取过来手动合并

	git diff master origin/master
	$ git merge origin/master
##### git pull

拉取并合并

	git pull

#### 分支
	git branch
	git branch 创建分支
	git checkout a
	git checkout -b c切换分支
	在master  git merge
	git checkout b
	git branch --merged 合并了哪些分支
	git branch --no-merged 合并了哪些分支
	git branch -d a 删除分支
	git branch -D a 删除分支
