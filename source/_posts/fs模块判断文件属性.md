---
title: fs模块操作文件封装
date: 2018-12-20 15:43:42
	- 导航
    - node.js
categories: node.js
---

### fs模块判断文件属性


	/**
	 *  检查每一项是文件还是文件夹
	 *
	 * @param {Array}  result文件path
	 * @param {*}        
	 * @returns     数组对象
	 */
	export const inspectDescribeFiles=(result)=>{
	    let childrenResult =[]
	    for (let i=0;i<result.length;i++){
	        fs.stat(result[i],(err,stat)=>{
	            let pathObj = {
	                title:path.basename(result[i]),
	                path:result[i],
	                type:'',
	                expand:false
	            }
	            if (err){
	                console.log(err)
	            } else {
	                if (stat.isFile()){
	                    pathObj.type = 'file'
	                    const ext = path.parse(result[i]).ext
	                    if(ext == '.TMAP'){
	                        childrenResult.push(pathObj)
	                    }
	                }
	                if (stat.isDirectory()){
	                    pathObj.type = 'folder'
	                    childrenResult.push(pathObj)
	                }
	            
	            }
	        })
	    } 
	    return childrenResult
	}

### fs模块绝对路径封装

	/**
	 *  返回绝对路径的方法
	 *
	 * @param {*} folderPath  传入盘符的路径  C:\\  D:\\
	 * @param {*} files       files就是文件名
	 * @returns      返回每个files的绝对路径
	 */
	function resolvePath(folderPath,files){
	    const resolvePathResult = []
	    for (let i = 0; i <files.length;i++){
	        const resolvePath= path.resolve(folderPath,files[i])
	        resolvePathResult.push(resolvePath)
	    }
	    return resolvePathResult
	}