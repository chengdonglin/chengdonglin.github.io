---
title: vue的一些工具方法
date: 2018-11-09 10:17:33
tags:
	- 导航
	- javascript
categories: vue
---


### 常常应用的到的一些方法



	  /**
	 * 判断两个对象是否相等
	 * @param {*} obj1 
	 * @param {*} obj2 
	 */
	export const objEqual = (obj1, obj2) => {
	    const keysArr1 = Object.keys(obj1) //获取属性名
	    const keysArr2 = Object.keys(obj2)
	    if (keysArr1.length !== keysArr2.length) return false
	    else if (keysArr1.length === 0 && keysArr2.length === 0) return true
	    else return !keysArr1.some(key => obj1[key] !== obj2[key])// some有一条相同返回true,取反为false
	  }


	/**
	 * 根据路由的params生成对象
	 * * */
	  export const getRouteById = id => {
	    let res = {}
	    if (id.includes('&')) {
	      res.query = getObjBySplitStr(id, '&')
	      id = id.split('&')[0]
	    }
	    if (id.includes(':')) {
	      res.params = getObjBySplitStr(id, ':')
	      id = id.split(':')[0]
	    }
	    res.name = id
	    return res
	  }

	
	 export const routeEqual = (route1, route2) => {
	    const params1 = route1.params || {} //逻辑或,route1.params不为空的话就返回他,或者返回{}空对象
	    const params2 = route2.params || {}
	    const query1 = route1.query || {} //因为路由传参有两种方式,所以要使用两种方式获取参数
	    const query2 = route2.query || {}
	    return route1.name === route2.name && objEqual(params1, params2) && objEqual(query1, query2)
	  }

- 点击上传Csv文件

	
		/**
		 * @param {Object} file 从上传组件得到的文件对象
		 * @returns {Promise} resolve参数是解析后的二维数组
		 * @description 从Csv文件中解析出表格，解析成二维数组
		 */
		export const getArrayFromFile = (file) => {
		    let nameSplit = file.name.split('.') //按照指定符号.切割文件
		    let format = nameSplit[nameSplit.length - 1] //[-1]得到文件名
		    return new Promise((resolve, reject) => {//返回promise可以用then来获取
		      let reader = new FileReader() //h5创建读取文件
		      reader.readAsText(file) // 以文本格式读取
		      let arr = []
		      reader.onload = function (evt) {//event事件里面有各种属性
		        let data = evt.target.result // 读到的数据
		        let pasteData = data.trim() 
		        //正则:[]指匹配里面任何一个都可以 \n 匹配一个换行符, \u0085匹配下一行 \u2028行分割 \u2029分段符号
		        // \r 回车符 \n?匹配换行0此或者一次 /g代表全局匹配  \t匹配水平制表符
		        arr = pasteData.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(row => {
		          return row.split('\t')
		        }).map(item => {
		          return item[0].split(',')
		        })
		        if (format === 'csv') resolve(arr)
		        else reject(new Error('[Format Error]:你上传的不是Csv文件'))
		      }
		    })
		  }
	
		/**
		 * @param {Array} array 表格数据二维数组
		 * @returns {Object} { columns, tableData }
		 * @description 从二维数组中获取表头和表格数据，将第一行作为表头，用于在iView的表格中展示数据
		 */
		export const getTableDataFromArray = (array) => {
		  let columns = []
		  let tableData = []
		  if (array.length > 1) {
		    let titles = array.shift() //删除数组中的第一个元素（red），并返回被删除元素的值
		    columns = titles.map(item => {
		      return {
		        title: item,
		        key: item
		      }
		    })
		    tableData = array.map(item => {
		      let res = {}
		      item.forEach((col, i) => {
		        res[titles[i]] = col
		      })
		      return res
		    })
		  }
		  return {
		    columns,
		    tableData
		  }
		}
	
		iview Upload组件的beforeUpload应用
	
		beforeUpload (file) {//beforeUpload得到文件对象
		      getArrayFromFile(file).then(data => {
		        let {columns, tableData} = getTableDataFromArray(data)
		        this.columns = columns
		        this.tableData = tableData
		      }).catch(() => {
		        this.$Notice.warning({
		          title: '只能上传Csv文件',
		          desc: '只能上传Csv文件，请重新上传'
		        })
		      })
		      return false
		    }


- 数组的交集

		/**
		 * @param {Array} arr1
		 * @param {Array} arr2
		 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
		 */
		export const getIntersection = (arr1, arr2) => {
		  let len = Math.min(arr1.length, arr2.length)
		  let i = -1
		  let res = []
		  while (++i < len) {
		    const item = arr2[i]
		    if (arr1.indexOf(item) > -1) res.push(item)
		  }
		  return res
		}

- 数组的并集

		/**
		 * @param {Array} arr1
		 * @param {Array} arr2
		 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
		 */
		export const getUnion = (arr1, arr2) => {
		  return Array.from(new Set([...arr1, ...arr2]))
		}


- 判断数组


		/**
		 * @param {Array} target 目标数组
		 * @param {Array} arr 需要查询的数组
		 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
		 */
		export const hasOneOf = (target, arr) => {
		  return target.some(_ => arr.indexOf(_) > -1)
		}


- 验证

		/**
		 * @param {String|Number} value 要验证的字符串或数值
		 * @param {*} validList 用来验证的列表
		 */
		export function oneOf (value, validList) {
		  for (let i = 0; i < validList.length; i++) {
		    if (value === validList[i]) {
		      return true
		    }
		  }
		  return false
		}

		
		/**
		 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
		 * 如果没有传入key这个参数，则判断obj对象是否有键值对
		 */
		export const hasKey = (obj, key) => {
		  if (key) return key in obj
		  else {
		    let keysArr = Object.keys(obj)
		    return keysArr.length
		  }
		}