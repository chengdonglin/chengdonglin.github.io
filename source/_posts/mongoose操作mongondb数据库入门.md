---
title: mongoose操作mongondb数据库入门
date: 2018-11-10 20:34:17
tags:
	- 导航
    - mongoose
categories: node.js mongodb
---

### mongoose操作mongodb数据库入门

#### 介绍

Mongoose是在node.js异步环境下对mongodb进行的对象模型工具.

特点:

- 通过关系型数据库的思想来设计非关系型数据库
- 基于mongodb驱动,简化操作

#### mongoose的安装以及使用

1. 安装

		npm install mongoose --save

2. 引入mongoose并连接数据库

		const mongoose = require(''mongoose)
		
		mongoose.connect("mongodb://127.0.0.1:27017/数据库名")

3. 定义Schema


数据库中的Schema,为数据库对象的集合.schema是mongoose里会用到的一种数据模式,可以理解为表结构的定义;每个schema会映射到mongodb中的一个collection,不具备操作数据库的能力.

		var UserSchema = mongoose.Schema({
			name:String,
			age:Number,
			status:'number' //这种方式也可以
		})


4. 创建数据模型

定义好了Schema,接下来就是生成Model.model是由schema生成的模型,可以对数据库进行操作

- 备注:mongoose.model里面可以传入两个参数,也可以传入三个参数

		mongoose.model(参数1:模型名称(首字母大写),参数2:Schema)
		mongoose.model(参数1:模型名称(首字母大写),参数2:Schema,参数3:数据库集合名称)

如果传入2个参数:这个模型会模型名称相同的复数的数据库建立连接:如通过下面方法创建模型,那么这个模型将会操作users这个集合

如果传入三个参数的话,模型默认操作第三个参数定义的集合名称

	var User = mongoose.model("User",UserSchema)

- . 查找数据

		User.find({},function(err,docs){
			if (err) {
			console.log(err)
			return
			}
			console.log(docs)
		})

- . 增加数据

		var u = new User({//实例化模型,传入增加的数据
			name:"wt",
			age:"20",
			status:true	
		})
		
		u.save()


- . 修改数据

User.updateOne({name:"wt"},{name:"lcd"},function(err,res){
	if (err) {
	console.log(err)
	return
}
	console.log("修改数据成功")
})


- . 删除数据

		User.deleteOne({_id:"127f77hjk45"},function(err){
			if(err){//只会删除一条数据
			console.log(err)
			return
		}
			console.log("删除数据成功")
		})

- .保存成功查找


		var u = new User({
			name:"lks",
			age:20,
			status:true
		})  
		u.save(function(err,docs){
			if (err){
			console.log(err)
			return
		}
			User.find({},function(err,docs){
			if (err) {
		      //
			}
			//
		})
		})


通过上述我们可以看到可以和你容易操作mongodb数据库,但是这种方式在应用过程会很麻烦,后面我们会采取模块化进行来管理.