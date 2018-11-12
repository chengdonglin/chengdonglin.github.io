---
title: 在koa中应用mongoose模块化实现
date: 2018-11-12 17:25:32
tags:
	- 导航
	- koa
	- mongodb
categories: koa 
---


### 在koa中应用mongoose模块化实现

	为了让项目拥有更好的可读性以及可管理性,那么

- 数据库连接
 
  
			//init.js

			const mongoose = require('mongoose')
			const db = "mongodb://localhost/smile-vue"
			const glob = require('glob')
			const {resolve} = require('path')
			
			//一次性全部导入模型
			exports.initSchemas = ()=>{
			    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
			}
			exports.connect = ()=>{
			    //连接数据库
			    mongoose.connect(db)
			    let  maxConnectTimes = 0
			    return new Promise((resolve,reject)=>{
			         //增加数据库监听事件
			        mongoose.connection.on('disconnected',()=>{
			            console.log('***********数据库断开***********')
			            if(maxConnectTimes<=3){
			                maxConnectTimes++
			                mongoose.connect(db)
			            }else{
			                reject()
			                throw new Error('数据库出现问题')
			            }      
			        })
			        mongoose.connection.on('error',(err)=>{
			            console.log('***********数据库错误')
			            if(maxConnectTimes<=3){
			                maxConnectTimes++
			                mongoose.connect(db)
			            }else{
			                reject(err)
			                throw new Error('数据库出现问题')
			            }
			        })
			        //链接打开的时
			        mongoose.connection.once('open',()=>{
			            console.log('MongoDB connected successfully')           
			            resolve()
			        })
			    })
			}


- shema文件夹创建模型

		//User.js
		const mongoose = require('mongoose')
		const Schema = mongoose.Schema
		let ObjectId = Schema.Types.ObjectId
		const bcrypt = require('bcrypt')
		const SALT_WORK_FACTOR = 10
		
		//创建UserShema
		const userSchema = new Schema({
		    UserId :{type:ObjectId},
		    userName : {unique:true,type:String},
		    password : String,
		    createAt:{type:Date, default:Date.now()},
		    lastLoginAt:{type:Date, default:Date.now()}
		},{
		  collection:'user'  
		}) 
		userSchema.pre('save', function(next){
		    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
		        if(err) return next(err)
		        bcrypt.hash(this.password,salt,(err,hash)=>{
		            if(err) return next(err)
		            this.password = hash
		            next()
		        })
		    })
		})
		
		userSchema.methods={
		    comparePassword:(_password,password)=>{
		        return new Promise((resolve,reject)=>{
		            bcrypt.compare(_password,password,(err,isMatch)=>{
		                if(!err) resolve(isMatch)
		                else reject(err)
		            })
		        })
		    }
		}
		
		
		//发布模型
		mongoose.model('User',userSchema)

-  服务器连接开启数据库并导入模型


			const Koa = require('koa')
			const app = new Koa()
			const { connect , initSchemas } = require('./database/init.js')
			const mongoose = require('mongoose')
			const bodyParser = require('koa-bodyparser')
			const cors = require('koa2-cors')
			const Router = require('koa-router')
			app.use(bodyParser())
			app.use(cors())
			let user = require('./appApi/user.js')
			let home = require('./appApi/home.js')
			let goods = require('./appApi/goods.js')
			
			//装载所有子路由
			let router = new Router()
			router.use('/user',user.routes())
			router.use('/home',home.routes())
			router.use('/goods',goods.routes())
			//egg.js
			
			//加载路由中间件
			app.use(router.routes())
			app.use(router.allowedMethods())
			//这个函数说明立即执行,创建数据库连接导入模型
			;(async ()=>{
			    await connect()
			    initSchemas()
			})()
			app.use(async(ctx)=>{
			    ctx.body='<h1>Hello Koa2</h1>'
			})
			app.listen(3000,()=>{
			    console.log('[Server] starting at port 3000')
			})


- 在路由中使用

		const Router = require('koa-router')
		const mongoose = require('mongoose')
		
		let router = new Router()
		router.get('/',async(ctx)=>{
		    ctx.body="这是用户操作首页"
		})
		
		router.post('/register',async(ctx)=>{
		    const User = mongoose.model('User')
		    let newUser = new User(ctx.request.body)
		    await newUser.save().then(()=>{
		        ctx.body={
		            code:200,
		            message:'注册成功'
		        }
		    }).catch(error=>{
		        ctx.body={
		            code:500,
		            message:error
		        }
		    })
		})
		router.post('/login',async(ctx)=>{
		    let loginUser = ctx.request.body
		    console.log(loginUser)
		    let userName = loginUser.userName
		    let password = loginUser.password
		    //引入User的model
		    const User = mongoose.model('User')
		    await User.findOne({userName:userName}).exec().then(async(result)=>{
		        console.log(result)
		        if(result){
		            let newUser = new User()
		            await newUser.comparePassword(password,result.password)
		            .then(isMatch=>{
		                ctx.body={code:200,message:isMatch}
		            })
		            .catch(error=>{
		                console.log(error)
		                ctx.body={code:500,message:error}
		            })
		        }else{
		            ctx.body={code:200,message:'用户名不存在'}
		        }
		    }).catch(error=>{
		        console.log(error)
		        ctx.body={code:500,message:error}
		    })
		})
		
		module.exports =router