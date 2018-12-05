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

#### electron中使用nedb数据库

使用 electron 的一大好处是可以访问用户的文件系统。这使你可以读取和写入本地系统上的文件。为了避免 Chromium 的限制以及对应用程序内部文件的改写，请确保使用 electron 的 API，特别是 app.getPath(name) 函数。这个帮助函数可以使你获得指向系统目录的文件路径，如用户的桌面、系统临时文件等等.

##### 使用案例

	yarn add nedb # 或 npm install nedb --save

src/renderer/datastore.js

我们设置 NeDB 并将其指向我们的 userData 目录。这个空间专门为我们的应用程序所保留，所以，我们可以确信，其他程序 或 与其他用户的交互不应该篡改这个文件空间。至此，我们可以在 renderer 进程中导入 datastore.js 并使用它。

	import Datastore from 'nedb'
	import path from 'path'
	import { remote } from 'electron'
	
	export default new Datastore({
	  autoload: true,
	  filename: path.join(remote.app.getPath('userData'), '/data.db')
	})


app.getPath你可以通过名称请求以下的路径:

	home 用户的 home 文件夹（主目录）
	appData 当前用户的应用数据文件夹，默认对应：
	
	%APPDATA% Windows 中
	$XDG_CONFIG_HOME or ~/.config Linux 中
	~/Library/Application Support macOS 中
	userData 储存你应用程序设置文件的文件夹，默认是 appData 文件夹附加应用的名称
	temp 临时文件夹
	exe当前的可执行文件
	module The libchromiumcontent 库
	desktop 当前用户的桌面文件夹
	documents 用户文档目录的路径
	downloads 用户下载目录的路径
	music 用户音乐目录的路径
	pictures 用户图片目录的路径
	videos 用户视频目录的路径
	logs应用程序的日志文件夹
	pepperFlashSystemPlugin Pepper Flash 插件的系统版本的完成路径。

src/renderer/main.js

为了更进一步，我们可以将数据存储导入到 src/renderer/main.js 里，并将其附加到 Vue 的 原型 (prototype) 上。通过在所有组件文件中使用 this.$db，我们现在可以访问数据存储的 API。

	import db from './datastore'

/* 其它代码 */

	Vue.prototype.$db = db


##### jsx

	npm install babel-plugin-syntax-jsx babel-plugin-transform-vue-jsx babel-helper-vue-jsx-merge-props babel-preset-env --save-dev

	"renderer": {
	      "presets": [
	        ["env", {
	          "modules": false
	        }],
	        "stage-0"
	      ],
	      "plugins": ["transform-vue-jsx"]
	    },


##### 弹出框

在electron-vue项目中由于使用组件UI的弹出框会有警告,所以采用原生的dialog的API来实现

	this.$electron.remote.dialog.showMessageBox({
	                            type:'info',
	                            title:'删除节点操作',
	                            message:`您确认要删除节点${data.title}吗?`,
	                            buttons:['ok','cancel']
	                        },(index)=>{
	                            if (index == 0){
	                                this.remove(root,node,data)
	                                this.$Message.success({
	                                     content: '删除成功',
	                                     duration: 3
	                                })
	                            } else {
	                                this.$Message.error({
	                                     content: '删除失败',
	                                     duration: 3
	                                })
	                            }
	                        })


