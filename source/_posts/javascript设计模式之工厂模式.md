---
title: javascript设计模式之工厂模式
date: 2018-10-24 18:14:34
tags:
	- 导航
    - ES6
    - 设计模式
categories: 设计模式
---

注意:javascript设计模式跟其他强语音类型稍微有点区别.

## 介绍
1. 将new操作单独封装
2. 我们通常在遇到new的时候,就可以考虑是否需要使用工厂模式了

## 举例
1. 去买汉堡,直接点餐,取餐,不用自己亲手做
2. 商店要封装做汉堡的工作,做好直接给买者

## UML类图

 [](/img/factory.png)


## 代码示例


`

    class Product {

	constructor(name){
		this.name = name
	}
	init(){
		console.log('init方法')
	}
	fun1(){
		console.log('fun1方法')
	}
}



    class Creator(){

	create(name){
		return new Product(name)
	}
	



	let creator = new Creator()
	
	let p = create.create('p1')
	
	p.init()
	
	p.fun1()


## 场景

1. jquery实际上就是应用了工厂模式
2. React.createElement
3. vue异步组件