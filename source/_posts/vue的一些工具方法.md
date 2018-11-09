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

