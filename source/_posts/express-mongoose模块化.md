---
title: express-mongoose模块化
date: 2018-11-12 18:24:59
tags:
	- 导航
    - mongoose
categories: node.js
---


#  Express与MongoDB

## 前奏
### Express 是什么？

Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，它提供一系列强大的特性，帮助你创建各种 Web 和移动设备应用。

## 一  连接MongoDB 抽象出模型

### 在项目根目录下新建/lib/mongo.js

    var mongoose = require("mongoose");
    var db = mongoose.connect('mongodb://localhost:27017/myblog',function(){});
    module.exports = db
**要连接的数据库为myblog**

### 二 Schema

一种以文件形式存储的数据库模型骨架，无法直接通往数据库端，不具备对数据库的操作能力，仅仅只是数据库模型在程序片段中的一种表现，可以说是数据属性模型(传统意义的表结构)，又或着是“集合”的模型骨架.


#### 在项目根目录下新建/model/user.js

    var mongoose = require("mongoose");
    var db = require('../lib/mongo');
    //一个用户模型
    var UserSchema = new mongoose.Schema({
    	username: { type:String },
    	password: {type: String},
    	avatar  : {type: String},
    	age : { type:Number, default:0 },
    	description : { type: String},
    	email   : { type: String },
    	github  : { type: String },
    	time: { type:Date, default:Date.now }
    });
    //创建Model
    var UserModel = db.model("user", UserSchema );
    module.exports = UserModel

**user：数据库中的集合名称,当我们对其添加数据时如果user已经存在，则会保存到其目录下，如果不存在，则会创建user集合，然后在保存数据。
拥有了Model，我们也就拥有了操作数据库的金钥匙，就可以使用Model来进行增删改查的具体操作。**

## Entity

Entity–由Model创建的实体，使用save方法保存数据，Model和Entity都有能影响数据库的操作，但Model比Entity更具操作性。所以此项目主要用的Model。

    var UserEntity = new UserModel({
    	name : "hzzly",
    	age  : 21,
    	email: "hjingren@aliyun.com",
    	github: 'https://github.com/hzzly'
    });
    UserEntity.save(function(error,doc){
    	if(error){
    		console.log("error :" + error);
    	}else{
    		console.log(doc);
    	}
    });
    


## 三、封装数据库的CURD

**在lib文件下新建api.js
采用Promise封装对数据库的操作，避免回调地狱，使得代码能够更好的被读懂和维护**

    var UserModel = require('../models/users');
    module.exports = {
    	/**
    	 * 添加数据
    	 * @param  {[type]} data 需要保存的数据对象
    	 */
    	save(data) {
    		return new Promise((resolve, reject) => {
    			//model.create(保存的对象,callback)
    			UserModel.create(data, (error, doc) => {
    				if(error){
    					reject(error)
    				}else{
    					resolve(doc)
    				}
    			})
    		})
    	},
    	find(data={}, fields=null, options={}) {
    		return new Promise((resolve, reject) => {
    			//model.find(需要查找的对象(如果为空，则查找到所有数据), 属性过滤对象[可选参数], options[可选参数], callback)
    			UserModel.find(data, fields, options, (error, doc) => {
    				if(error){
    					reject(error)
    				}else{
    					resolve(doc)
    				}
    			})
    		})
    	},
    	findOne(data) {
    		return new Promise((resolve, reject) => {
    			//model.findOne(需要查找的对象,callback)
    			UserModel.findOne(data, (error, doc) => {
    				if(error){
    					reject(error)
    				}else{
    					resolve(doc)
    				}
    			})
    		})
    	},
    	findById(data) {
    		return new Promise((resolve, reject) => {
    			//model.findById(需要查找的id对象 ,callback)
    			UserModel.findById(data, (error, doc) => {
    				if(error){
    					reject(error)
    				}else{
    					resolve(doc)
    				}
    			})
    		})
    	},
    	update(conditions, update) {
    		return new Promise((resolve, reject) => {
    			//model.update(查询条件,更新对象,callback)
    			UserModel.update(conditions, update, (error, doc) => {
    				if(error){
    					reject(error)
    				}else{
    					resolve(doc)
    				}
    			})
    		})
    	},
    	remove(conditions) {
    		return new Promise((resolve, reject) => {
    			//model.update(查询条件,callback)
    			UserModel.remove(conditions, (error, doc) => {
    				if(error){
    					reject(error)
    				}else{
    					resolve(doc)
    				}
    			})
    		})
    	}
    }
    


## 四、使用

**在/routers/index.js中使用**

    var api = require('../lib/api');
    router.post('/login', function(req, res, next) {
    	var user = {
    		username : req.body.username,
    		password: req.body.password
    	};
    	api.findOne(user)
    		.then(result => {
    			console.log(result)
    		})
    })
    router.post('/sign_up', function(req, res, next) {
    	var user = {
    		username : req.body.username,
    		password: req.body.password,
    		email: req.body.email
    	};
    	api.save(user)
    		.then(result => {
    			console.log(result)			
    		})
    })
    router.get('/user_list', function(req, res, next) {
    	//返回所有用户
    	api.find({})
    		.then(result => {
    			console.log(result)			
    		})
    	//返回只包含一个键值name、age的所有记录
    	api.find({},{name:1, age:1, _id:0})
    		.then(result => {
    			console.log(result)			
    		})
    	//返回所有age大于18的数据
    	api.find({"age":{"$gt":18}})
    		.then(result => {
    			console.log(result)			
    		})
    	//返回20条数据
    	api.find({},null,{limit:20})
    		.then(result => {
    			console.log(result)			
    		})
    	//查询所有数据，并按照age降序顺序返回数据
    	api.find({},null,{sort:{age:-1}}) //1是升序，-1是降序
    		.then(result => {
    			console.log(result)			
    		})
    })