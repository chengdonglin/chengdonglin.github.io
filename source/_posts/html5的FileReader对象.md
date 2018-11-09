---
title: html5的FileReader对象
date: 2018-11-09 13:16:39
tags:
	- 导航
    - HTML5
categories: HTML5
---


### HTML5的FileReader对象


#### 前言

FileReader主要用于将文件内容读入内存，通过一系列异步接口，可以在主线程中访问本地文件。

使用FileReader对象，web应用程序可以异步的读取存储在用户计算机上的文件(或者原始数据缓冲)内容，可以使用File对象或者Blob对象来指定所要处理的文件或数据。

#### 创建对象

	var reader = new FileReader();

#### 方法

	方法定义                               描述
	abort():void                     终止文件读取操作
	readAsArrayBuffer(file):void     异步按字节读取文件内容，结果用ArrayBuffer对象表示
	readAsBinaryString(file):void    异步按字节读取文件内容，结果为文件的二进制串
	readAsDataURL(file):void         异步读取文件内容，结果用data:url的字符串形式表示
	readAsText(file,encoding):void   异步按字符读取文件内容，结果用字符串形式表示


#### 事件

	事件名称                         描述
	onabort               当读取操作被中止时调用
	onerror               当读取操作发生错误时调用
	onload                当读取操作成功完成时调用
	onloadend			  当读取操作完成时调用,不管是成功还是失败
	onloadstart			  当读取操作将要开始之前调用	
	onprogress			  在读取数据过程中周期性调用


#### 使用方法

FileReader通过异步的方式读取文件内容，结果均是通过事件回调获取，下面是一个读取本地txt文件内容的例子：

	var input  = document.getElementById("file"); //input file
	input.onchange = function(){
	    var file = this.files[0];
	    if(!!file){
	        //读取本地文件，以gbk编码方式输出
	        var reader = new FileReader();
	        reader.readAsText(file,"gbk");
	        reader.onload = function(){
	            //读取完毕后输出结果
	            console.log(this.result);
	        }
	    }
	}


#### 应用场景

- 在线预览本地文件

img的src属性或background的url属性，可以通过被赋值为图片网络地址或base64的方式显示图片。
在文件上传中，我们一般会先将本地文件上传到服务器，上传成功后，由后台返回图片的网络地址再在前端显示。
通过FileReader的readAsDataURL方法，我们可以不经过后台，直接将本地图片显示在页面上。这样做可以减少前后端频繁的交互过程，减少服务器端无用的图片资源，代码如下：

	var input  = document.getElementById("file");   // input file
	input.onchange = function(){
	    var file = this.files[0];
	        if(!!file){
	            var reader = new FileReader();
	            // 图片文件转换为base64
	            reader.readAsDataURL(file);
	            reader.onload = function(){
	                // 显示图片
	                document.getElementById("file_img").src = this.result;
	        }
	    }
	}

对于图片上传，我们也可以先将图片转换为base64进行传输，此时由于传输的图片内容就是一段字符串，故上传接口可以当做普通post接口处理，当图片传输到后台后，可以在转换为文件实体存储。
当然，考虑到base64转换效率及其本身的大小，本方法还是适合于上传内容简单或所占内存较小的文件。

- 二进制数据上传

我们可以直接上传或下载二进制内容，无需像以往一样通过form标签由后端拉取二进制内容。
简单整理下上传逻辑：
1、通过input[type="file"]标签获取本地文件File对象
2、通过FileReader的readAsArrayBuffer方法将File对象转换为ArrayBuffer
3、创建xhr对象，配置请求信息
4、通过xhr.sendAsBinary直接将文件的ArrayBuffer内容装填至post body后发送

	var input  = document.getElementById("file");   // input file
	input.onchange = function(){
	    var file = this.files[0];
	        if(!!file){
	            var reader = new FileReader();
	            reader.readAsArrayBuffer(file);
	            reader.onload = function(){
	                var binary = this.result;
	                upload(binary);
	        }
	    }
	}
	
	//文件上传
	function upload(binary){
	    var xhr = new XMLHttpRequest();
	    xhr.open("POST", "http://xxxx/opload");
	    xhr.overrideMimeType("application/octet-stream");
	    //直接发送二进制数据
	    if(xhr.sendAsBinary){
	        xhr.sendAsBinary(binary);
	    }else{
	        xhr.send(binary);
	    }
	    
	    // 监听变化
	    xhr.onreadystatechange = function(e){
	        if(xhr.readyState===4){
	            if(xhr.status===200){
	                // 响应成功       
	            }
	        }
	    }
	}