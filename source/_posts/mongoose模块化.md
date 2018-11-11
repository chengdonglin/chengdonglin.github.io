---
title: mongoose模块化
date: 2018-11-11 21:25:12
tags:
	- 导航
    - mongoose
categories: node.js mongodb
---

### mongoose模块化

为了便于管理,代码复用的原则

connect连接的时候mongodb4.x版本会有deprecationwaring警告,为了消除这个,可以在第二个参数传入{userNewParser:true},同时为了监听连接的情况,可以写个回调.

- mongoose连接的代码

		var mongoose = require('mongoose')
		
		mongoose.connect('mongodb数据库地址',{userNewParser:true},function{
			if (err) {
			console.log("数据库连接失败")
			} else {
			console.log("数据库连接成功")
			}
		})



#### mongoose 默认参数

增加数据的时候,如果不传入数据会使用默认配置的数据

- 定义数据表映射  : 字段必须和数据库保持一致

	var UserSchema = mongoose.Schema({
		name:String,
		age:Number,
		status:{
			type:Number,
			default:1 //这就是默认参数
		}	
})

var UserModel = mongoose.model("User",UserSchema,'user')


#### 模块化

- 数据库连接模块

//连接数据库

	var mongoose=require('mongoose');
	
	//useNewUrlParser这个属性会在url里识别验证用户所需的db,未升级前是不需要指定的,升级到一定要指定。

	mongoose.connect('mongodb://127.0.0.1:27017/xxx',{ useNewUrlParser: true },function(err){
	        if(err){
	
	            console.log(err);
	            return;
	        }
	        console.log('数据库连接成功')
	});
	
	module.exports=mongoose;

- 模型定义

		var mongoose=require('./db.js');
		
		
		var UserSchema=mongoose.Schema({
		    name:String,
		    age:Number,
		    status:{
		        type:Number,
		        default:1   
		    }
		})
		
		module.exports=mongoose.model('User',UserSchema,'user')

- 表的使用

	var UserModel=require('./model/user.js');
	var user=new UserModel({
	    name:"李四666",
	    age:40
	})
	user.save(function(err){
	    if(err){
	        console.log(err);
	        return;
	    }
	
	    //获取user表的数据
	    UserModel.find({},function(err,docs){
	        if(err){ 
	            console.log(err);
	            return;
	        }
	        console.log(docs);
	    })
	})

- 性能测试
		
		console.time('user');
		var UserModel=require('./model/user.js');
		console.timeEnd('user');
		console.time('news');
		var NewsModel=require('./model/news.js');
		console.timeEnd('news');







