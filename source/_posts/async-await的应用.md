---
title: async/await的应用
date: 2018-11-11 14:01:55
tags:
	- 导航
    - javascript
categories: javascript
---


### 异步策略解决方式-async/await

 ES2017 中的 async/await 特性编写出相比于 promise chain 和 callback hell 更容易阅读理解的代码。await 关键字接收一个 promise，终止代码的执行，直到 promise 状态变为 resolved 或者 rejected，这种特性能让我们的异步代码阅读起来更像是同步代码。

- 初始代码

		const fetch = require('node-fetch')
		
		function getZhihuColumn(id) {
		    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`
		    fetch(url)
		        .then(response => response.json())
		        .then(column => {
		            console.log(`NAME:${column.name}`)
		            console.log(`INTRO:${column.info}`)
		        })
		}
		
		getZhihuColumn('feweekly')

如何把这个代码改的更加扁平呢?

#### async/await 函数

	const fetch = require('node-fetch')
	
	async function getZhihuColumn(id) {
	    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`
	    const response = await fetch(url)
	    const column = await response.json()
	    console.log(`NAME:${column.name}`)
	    console.log(`INTRO:${column.info}`)
	}
	
	getZhihuColumn('feweekly')

定义函数的时候前缀改为async,在函数体内使用await等待数据完成

#### 将async函数用在promise Chain***


	const fetch = require('node-fetch')
	
	async function getZhihuColumn(id) {
	    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`
	    const response = await fetch(url)
	    const column = await response.json()
	    return column
	    //上面两行可以直接写成
	    //return await response.json()
	}
	
	getZhihuColumn('feweekly')
	    .then(column => {
	        console.log(`NAME:${column.name}`)
	    console.log(`INTRO:${column.info}`)
	    })

#### 将任意类型的函数转为async风格

	const fetch = require('node-fetch')
	
	const getZhihuColumn= async (id) => {
	    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`
	    const response = await fetch(url)
	    const column = await response.json()
	    return column
	}
	
	//立即执行
	(async()=>{
	    const column = await getZhihuColumn('feweekly')
	    console.log(`NAME:${column.name}`)
	    console.log(`INTRO:${column.info}`)
	})()

#### 在class类中使用async风格

	class APIClient {
	    async getColumn(id) {
	        const url = `https://zhuanlan.zhihu.com/api/columns/${id}`
	        const response = await fetch(url)
	        const column = await response.json()
	        return column
	    }
	}
	
	//立即执行
	(async()=>{
	    const client = new APIClient()
	    const column = await client.getColumn('feweekly')
	    console.log(`NAME:${column.name}`)
	    console.log(`INTRO:${column.info}`)
	})()

#### 处理 async 函数中的错误

	const fetch = require('node-fetch')
	
	async function getZhihuColumn(id) {
	    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`
	    const response = await fetch(url)
	    if (response.status !== 200) {
            throw new Error(response.status)
        }
        return await response.json()
	}

    //方式一
	getZhihuColumn('feweekly')
	    .then(column => {
	       console.log(`NAME:${column.name}`)
	       console.log(`INTRO:${column.info}`)
	   }).catch(err=>{
	       console.log(err)
	   })
	
	   //方式二
	
	   const showColumnsInfo = async(id) => {
	      try {
	        const column = await getZhihuColumn(id)
	        console.log(`NAME:${column.name}`)
	        console.log(`INTRO:${column.info}`)
	      } catch (error) {
	          console.log(error)
	      }
	   }
	   showColumnsInfo('feweek123')

#### 正确处理多个await操作的并行串行

	const fetch = require('node-fetch')
		
		async function getZhihuColumn(id) {
		    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`
		    const response = await fetch(url)
	        return await response.json()
		}
	
	//串行
	   const showColumnsInfo = async() => {
	        const column = await getZhihuColumn('feweely')
	        const toolingtips = await getZhihuColumn('toolingtips')
	        console.log(`NAME:${column.name}`)
	        console.log(`INTRO:${column.info}`)
	        console.log(`NAME:${toolingtips.name}`)
	        console.log(`INTRO:${toolingtips.info}`)
	   }
	showColumnsInfo()
	
	//并行
	const showColumnsInfo = async() => {
	    const columnPromise = getZhihuColumn('feweely')
	    const toolingtipsPromise = getZhihuColumn('toolingtips')
	    const feweekly = await columnPromise
	    const toolingtips = await toolingtipsPromise
	    console.log(`NAME:${feweekly.name}`)
	    console.log(`INTRO:${feweekly.info}`)
	    console.log(`NAME:${toolingtips.name}`)
	    console.log(`INTRO:${toolingtips.info}`)
	}

#### 使用Promise.all()让多个await 操作并行

	const fetch = require('node-fetch')
		
		async function getZhihuColumn(id) {
		    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`
		    const response = await fetch(url)
	        return await response.json()
		}
	
	
	const showColumnsInfo = async() => {
	        const [feweekly,toolingtips] = await Promise.all([//展开操作符
	            getZhihuColumn('feweekly'),
	            getZhihuColumn('toolingtips')
	        ])
	        console.log(`$name:${feweekly.name}`)
	        console.log(`$name:${feweekly.info}`)
	        console.log(`$name:${toolingtips.name}`)
	        console.log(`$name:${toolingtips.info}`)
	   }
	showColumnsInfo()

#### 在for循环中正确的使用await

	const fetch = require('node-fetch')	
		async function getZhihuColumn(id) {
		    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`
		    const response = await fetch(url)
	        return await response.json()
	    }
	    /**
	     * 串行
	     */
	const showColumnsInfo = async() => {
	    const names = ['feweekly','toolingtips']
	    for (const name of names) {
	        const column = await getZhihuColumn(name)
	        console.log(`NAME:${column.name}`)
	        console.log(`NAME:${column.intro}`)
	    }
	   }
	   /*
	   * 并行
	   **/
	  const showColumnsInfo = async() => {
	    const names = ['feweekly','toolingtips']
	    const promise = names.map(x => getZhihuColumn(x))
	    for (const name of promise) {
	        const column = await getZhihuColumn(name)
	        console.log(`NAME:${column.name}`)
	        console.log(`NAME:${column.intro}`)
	    }
	   }  
	
	
	showColumnsInfo()


#### 来源

微信公众号: 前端周刊

作者:王仕军