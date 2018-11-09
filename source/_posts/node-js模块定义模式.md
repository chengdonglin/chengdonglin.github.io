---
title: node.js模块定义模式
date: 2018-11-09 08:52:42
tags:
	- 导航
    - node.js
categories: node.js
---

### 模块定义模式

模块除了用于加载依赖关系的机制之外,还用于定义API工具,最大限度地隐藏信息和API可用性,可扩展性和代码复用.

#### 命名导出

最基本的方法,把要公开的值赋给由exports(或者module.exports)引用对象的属性.生成导出对象为一组相关功能的容器或命名空间.


##### 案例

- 定义模块



		//file  logger.js
		exports.info = (message) => {
		    console.log('info:'+message)
		}
		
		exports.verbose = (message) => {
		    console.log('verbose' + message)
		}

- 引用模块
 

		const logger = require('./logger')
		
		logger.info('this is info')
		
		logger.verbose('this is a verbose')

#### 导出函数 --substack模式

最流行的一种模块定义模式是将整个module.exports变量重新分配给一个函数,主要优点只暴露一个单一的功能,提供明确的入口点,遵守小接触面的原则,也称为substack模式

##### 案例

- 定义导出函数模块

		//logger.js
		module.exports = (message) => {//默认导出的
		    console.log(`info:${message}`)
		}
		
		module.exports.verbose = (message) => {
		    console.log(`verbose:${message}`)
		}

- 引用模块
		
		//file main.js
		
		const logger = require('./module')
		
		logger('this is info default function')
		
		logger.verbose('this is verbose function')

虽然只输出一个函数看上去是一种限制,实际上它是一种完美的方式,把重心放在一个模块最重要的单一功能,减低内部的可见性同时,导出函数本身的属性,node.js的模块快极大鼓励采用单一责任原则,每个模块应该对单个功能负责,该责任完全由模块封装.


#### 导出构造函数

导出构造函数的模块是导出函数模块的特别化, 区别在于:使用该模式,允许用户使用构造函数创建新实例,还可以扩展其原型并创建新类

- 定义构造函数模块
	
		//logger.js
		function Logger(name) {
		    this.name = name
		}
		
		Logger.prototype.log = function(message){
		    console.log(`[${this.name}] ${message}`)
		}
		
		Logger.prototype.verbose = function(message) {
		    this.log(`info:${message}`)
		}
		
		Logger.prototype.info = function(message) {
		    this.log(`info:${message}`)
		}
		
		module.exports = Logger

- 引用构造函数
 
	
		const Logger = require('./module')
		const dblog = new Logger('db')
		
		dblog.info('this info fun')
		
		const accessLogger = new Logger('adcb')
		accessLogger.verbose('this is verbose fun')


- ES6方式

		class Logger {
		    constructor(name) {
		        this.name = name
		    }
		    log(message) {
		        console.log(`[${this.name}] [${message}]`)
		    }
		    info(message) {
		        this.log(`info:${message}`)
		    }
		    verbose(message) {
		        this.log(`verbose:${message}`)
		    }
		}
		
		module.exports = Logger;
