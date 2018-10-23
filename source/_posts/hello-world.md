---
title: 开篇:ES6环境搭建
date: 2018-10-23 15:44:54
tags:
	- 导航
    - ES6
    - 设计模式
categories: 设计模式
---

  为了更好的利用ES6语法来学习Javascript设计模式,我们通过webpack来搭建一个合适ES6运行的环境.

## 搭建开发环境

### 1. 目录结构

--

	dist    //生成的bundle.js文件

	node_modules //依赖模块
	
	src //业务代码

	index.html //前端页面展示

	//...其余配置

	


### 2. package.json

  `

	{    "name": "design-pattern-test",

      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --config ./webpack.config.js --mode development"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-polyfill": "^6.26.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-latest": "^6.24.1",
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.20.2",
    "webpack-cli": "^3.1.2",
    "webpack-dev-server": "^3.1.9"
  }
}

`

### 3 webpack.config.js

    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    module.exports = {
      entry: './src/index.js',
      output: {
      path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
      },
      module:{
    rules:[{
    test:/\.js?$/,
    exclude:/(node_modules)/,
    loader:"babel-loader"
    }]
      },
      plugins:[
      new HtmlWebpackPlugin({
      template:'./index.html'
      })
      ],
      devServer:{
      contentBase:path.join(__dirname,'./dist'),
      open:true,
      port:9000
      }
    };




   
   
