---
title: node.js跨域问题
date: 2019-05-05 09:00:41
tags:
	- 导航
    - node.js
categories: node.js
---

## 跨域

有时候后端与前端vue.js之间进行联调的时候,会出现安全性的问题以及include方面的问题的时候

	app.all('*', function(req, res, next) {
	        if(JSON.stringify(req.headers.origin)){
	            const origin = JSON.parse(JSON.stringify(req.headers.origin));
	            res.header("Access-Control-Allow-Origin",origin);
	        } 
	        res.header("Access-Control-Allow-Headers", "X-Requested-With");
	        res.header("Access-Control-Allow-Credentials", "true");
	        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	        res.header("Content-Type", "application/json;charset=utf-8");
	        next();
	    });