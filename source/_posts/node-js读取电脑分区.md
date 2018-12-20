---
title: node.js读取电脑分区
date: 2018-12-20 15:39:43
tags:
	- 导航
    - node.js
categories: node.js
---


###  node.js读取电脑分区
	
	const fs = require('fs')
	const path = require('path')
	var exec = require('child_process').exec;
	function showLetter(callback) {
	    exec('wmic logicaldisk get caption', function(err, stdout, stderr) {
	        if(err || stderr) {
	            console.log("root path open failed" + err + stderr);
	            return;
	        }
	        callback(stdout);
	    }
	)}
	export const  getCaption =()=>{
	    return new Promise((resolve,reject)=>{
	        showLetter(data=>{
	            const result =data.replace(/\ +/g,"").replace(/[ ]/g,"").replace(/[\r\n]/g,"").replace(/:/g,"")
	            const caption = (result.split("").slice(7))
	            let captionResult = []
	            caption.map(item =>{
	                let Obj = {}
	                Obj.title = `${item}://`
	                Obj.expand = false,
	                Obj.type = 'folder'
	                Obj.path = `${item}://`
	                captionResult.push(Obj)
	            })
	            resolve(captionResult)
	        })
	    })   
	}