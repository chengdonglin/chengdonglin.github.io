---
title: HTML5的Blob对象
date: 2018-11-09 13:31:53
tags:
	- 导航
    - HTML5
categories: HTML5
---


### HTML的Blob对象

####前言
一直以来，JS都没有比较好的可以直接处理二进制的方法。而Blob的存在，允许我们可以通过JS直接操作二进制数据。

#### Blob对象
一个Blob对象就是一个包含有只读原始数据的类文件对象。Blob对象中的数据并不一定得是JavaScript中的原生形式。File接口基于Blob，继承了Blob的功能,并且扩展支持了用户计算机上的本地文件。

Blob对象可以看做是存放二进制数据的容器，此外还可以通过Blob设置二进制数据的MIME类型.

#### 创建Blob

	var blob = new Blob(dataArr:Array<any>, opt:{type:string});

- dataArray：数组，包含了要添加到Blob对象中的数据，数据可以是任意多个ArrayBuffer，ArrayBufferView， Blob，或者 DOMString对象。
- opt：对象，用于设置Blob对象的属性（如：MIME类型）

- 创建一个装填DOMString对象的Blog对象

	var s = " <div>hello world!!</div> "

	var blob = new Blob([s],{type:"text/xml"})

	blob
	
	Blob(24) {size: 24, type: "text/xml"}

- 创建一个装填ArrayBuffer对象的Blob对象

		var abf = new ArrayBuffer(8)
		var blob = new Blob([abf],{type:"text/plain"})
		blob
		Blob{size:8,type:"text/plain"}

- 创建一个装填ArrayBufferView对象的Blob对象(ArrayBufferView可基于ArrayBuffer创建,返回值是一个类数组),如下:创建一个8字节的ArrayBuffer,在其上创建一个每个数组元素为2字节的视图

		var abf = new ArrayBuffer(8)
		var abv = new Int16Array(abf)
		var blob = new Blob(abv,{type:"text/plain"})
		blob
		Blob{size:4,type:"text/plain"}

- 通过Blob.slice()

此方法返回一个新的BLob对象,包含了原对象指定范围内的数据

	Blob.slice(start:number,end:number,contentType:string)

- start: 开始索引,默认为0
- end: 截取结束索引(不包括end)
- contentType:新的Blob的MIME类型,默认为空字符串

		var b = new Blob(["zxxxffggggff"],{type:"text/plain"})
		var b2 = b.slice(0,5,"text/plain")
		b2
		Blob{size:5,type:"text/plain"}

- 通过canvas.toBlob()

		var canvas = document.getElementById("canvas");
		canvas.toBlob(function(blob){
		    console.log(blob);
		});


#### 应用场景

前面提到，File接口基于Blob，继承了Blob的功能并进行了扩展，故我们可以像使用Blob一样使用File对象。

- 分片上传

通过Blob.slice方法，可以将大文件分片，轮循向后台提交各文件片段，即可实现文件的分片上传。

分片上传逻辑如下：

- 获取要上传文件的File对象，根据chunk（每片大小）对文件进行分片
- 通过post方法轮循上传每片文件，其中url中拼接querystring用于描述当前上传的文件信息；
- post body中存放本次要上传的二进制数据片段
- 接口每次返回offset，用于执行下次上传

下面是分片上传的简单实现：

	initUpload();
	
	//初始化上传
	function initUpload() {
	    var chunk = 100 * 1024;   //每片大小
	    var input = document.getElementById("file");    //input file
	    input.onchange = function (e) {
	        var file = this.files[0];
	        var query = {};
	        var chunks = [];
	        if (!!file) {
	            var start = 0;
	            //文件分片
	            for (var i = 0; i < Math.ceil(file.size / chunk); i++) {
	                var end = start + chunk;
	                chunks[i] = file.slice(start , end);
	                start = end;
	            }
	            
	            // 采用post方法上传文件
	            // url query上拼接以下参数，用于记录上传偏移
	            // post body中存放本次要上传的二进制数据
	            query = {
	                fileSize: file.size,
	                dataSize: chunk,
	                nextOffset: 0
	            }
	
	            upload(chunks, query, successPerUpload);
	        }
	    }
	}
	
	// 执行上传
		function upload(chunks, query, cb) {
		    var queryStr = Object.getOwnPropertyNames(query).map(key => {
		        return key + "=" + query[key];
		    }).join("&");
		    var xhr = new XMLHttpRequest();
		    xhr.open("POST", "http://xxxx/opload?" + queryStr);
		    xhr.overrideMimeType("application/octet-stream");
		    
		    //获取post body中二进制数据
		    var index = Math.floor(query.nextOffset / query.dataSize);
		    getFileBinary(chunks[index], function (binary) {
		        if (xhr.sendAsBinary) {
		            xhr.sendAsBinary(binary);
		        } else {
		            xhr.send(binary);
		        }
		
		    });
		
		    xhr.onreadystatechange = function (e) {
		        if (xhr.readyState === 4) {
		            if (xhr.status === 200) {
		                var resp = JSON.parse(xhr.responseText);
		                // 接口返回nextoffset
		                // resp = {
		                //     isFinish:false,
		                //     offset:100*1024
		                // }
		                if (typeof cb === "function") {
		                    cb.call(this, resp, chunks, query)
		                }
		            }
		        }
		    }
		}
		
		// 每片上传成功后执行
		function successPerUpload(resp, chunks, query) {
		    if (resp.isFinish === true) {
		        alert("上传成功");
		    } else {
		        //未上传完毕
		        query.offset = resp.offset;
		        upload(chunks, query, successPerUpload);
		    }
		}
		
		// 获取文件二进制数据
		function getFileBinary(file, cb) {
		    var reader = new FileReader();
		    reader.readAsArrayBuffer(file);
		    reader.onload = function (e) {
		        if (typeof cb === "function") {
		            cb.call(this, this.result);
		        }
		    }
		}

以上是文件分片上传前端的简单实现，当然，此功能还可以更加完善，如后台需要对合并后的文件大小进行校验；或者前端加密文件，全部上传完毕后后端解密校验等.

- 通过url下载文件

window.URL对象可以为Blob对象生成一个网络地址，结合a标签的download属性，可以实现点击url下载文件.

	createDownload("download.txt","download file");
	
	function createDownload(fileName, content){
	    var blob = new Blob([content]);
	    var link = document.createElement("a");
	    link.innerHTML = fileName;
	    link.download = fileName;
	    link.href = URL.createObjectURL(blob);
	    document.getElementsByTagName("body")[0].appendChild(link);
	}

- 通过url显示图片

我们知道，img的src属性及background的url属性，都可以通过接收图片的网络地址或base64来显示图片，同样的，我们也可以把图片转化为Blob对象，生成URL（URL.createObjectURL(blob)），来显示图片。

Blob对象作为一个装填二进制数据的基本对象，其作用也仅仅是一个容器，而真正的业务功能则需要通过FileReader、URL、Canvas等对象实现