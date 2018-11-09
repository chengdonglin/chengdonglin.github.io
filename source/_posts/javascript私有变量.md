---
title: javascript私有变量
date: 2018-11-09 17:26:19
tags:
	- 导航
    - javascript
categories: javascript
---

###  javascript私有变量

在javascript中,没有访问级别的修饰符,(比如,无法声明一个私有变量),所以实现封装的唯一方式就是通过函数作用域和闭包,使用一个工厂方法来实现私有变量

	function createPerson(name){
	    const privateProperties = {};
	    const person = {
	        setName: name => {
	            if (!name) throw new Error('A person must have a name')
	            privateProperties.name = name
	        },
	        getName:() =>{
	            return privateProperties.name
	        }
	    };
	    person.setName(name)
	    return person
	}
	
	let a = new createPerson('lcd')
	console.log(a.getName()) //出错  Cannot read property 'name' of undefined
	a.setName('lcd') 
	console.log(a.getName())


