---
title: electron文件上传以及断点上传
date: 2018-11-21 15:40:53
tags:
	- 导航
    - electron
    - 大文件上传
categories: electron
---


### electron文件上传以及断点上传

感谢博文:https://www.cnblogs.com/leejay6567/p/9865373.html

在Electron中实现文件的上传以及断点续传。网上关于h5的上传下载的案例已经非常多，但是关于大文件的上传和续传的很少。

首先上传方案，我们通过将大文件进行分片处理，将大文件切割成固定大小的分片。通过node的fs.createReadStream方法实现：

	singleUpload function(file){
	    let path = file.path; //文件本地路径 
	    let stats = fs.statSync(path);//读取文件信息
	    let chunkSize = 3*1024*1024;//每片分块的大小3M
	    let size = stats.size;//文件大小
	    let pieces = Math.ceil(size / chunkSize);//总共的分片数  
	    function uploadPiece (i){ 
	        //计算每块的结束位置
	        let enddata = Math.min(size, (i + 1) * chunkSize);
	        let arr = [];
	       //创建一个readStream对象，根据文件起始位置和结束位置读取固定的分片
	       let readStream = fs.createReadStream(path, { start: i * chunkSize, end: enddata-1 });
	            //on data读取数据
	            readStream.on('data', (data)=>{
	                arr.push(data)
	            }) 
	            //on end在该分片读取完成时触发
	            readStream.on('end', ()=>{
	                //这里服务端只接受blob对象，需要把原始的数据流转成blob对象，这块为了配合后端才转
	                let blob = new Blob(arr)
	                //新建formdata数据对象
	                var formdata = new FormData();
	                let md5Val = md5(Buffer.concat(arr));
	                formdata.append("file", blob);
	                console.log('blob.size',blob.size)
	                formdata.append("md5", md5Val);
	                formdata.append("size", size + ''); // 数字30被转换成字符串"30"
	                formdata.append("chunk", i + '');//第几个分片，从0开始
	                formdata.append("chunks", pieces + '');//分片数
	                formdata.append("name", name);//文件名
	                post(formdata)//这里是伪代码，实现上传，开发者自己实现
	    }
	}

首先读取文件的基本信息，如路径，大小进行分块，然后将每块上传，我们上传循环上传整个文件的分片，就循环调用uploadpiece方法。那么我们怎么实现断点续传呢？上面的代码中我们计算每块的md5值，这里计算每个md5值就是为了断点续传使用。我们每次上传文件前，我们会先调用预上传接口，预上传接口中，前端传入fileId，后端会将改文件已经上传的分块的md5数组传给前端，前端将该文件的分块的md5值和后端返回的md5值进行逐个对比，跳过已经上传的分块。这样就实现了大文件的上传和断点续传的问题。

流程图方法:

https://img2018.cnblogs.com/blog/1400402/201810/1400402-20181028135505363-1547565923.png

### Electron实现文件的下载和断点续下载功能

介绍在Electron中实现文件的下载和断点下载功能。这里下载的实现的方法较简单，采用流式下载的方案。
通过request库来实现下载。


	downloadFile(fileInfo, downloadPath){
	    var received_bytes = 0;//已经接收到的集结
	    var total_bytes = item.fileInfo;//总字节
	    let path = this.downloadPath+'/'+fileInfo.name; //确定文件下载的本地位置
	    try{
	            let stats = fs.statSync(path);//如果文件已存在读取文件信息
	            if(total_bytes == stats.size){//如果文件已经存在并且已经下载按成则跳过该文件
	                return;
	            }
	            received_bytes = stats.size;
	      }catch (err){
	
	      }
	      let params ={           
	           "method": 'GET',           
	           "url": ''
	      }
	      if(received_bytes>0){
	
	              params.headers['Range'] = 'bytes='+received_bytes;
	        }
	
	      var req = request({
	           "method": 'GET',
	           "url": ''
	      });
	       var out = fs.createWriteStream(path);//创建文件写入
	       req.pipe(out);
	       req.on('response', ( data ) => { 
	            startTime = new Date().getTime();
	        });
	       //接收到文件流事件
	       req.on('data', (chunk) => {
	            received_bytes += chunk.length;
	       })
	      //文件接收结束
	       req.on('end', () => {
	            console.log(`file ${item.name} download complete`)
	            if(received_bytes >= total_bytes){
	                this.dataset.splice(index, 1);
	            }
	        });
	}

这里在每次开始接受字节流时，首先判断该文件是否存在，若存在计算该文件接受的字节流大小，放在header中 Range：bytes=<文件的断点位置>-，这样会继续断点的位置继续下载。