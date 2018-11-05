---
title: ES6数据方法
date: 2018-11-05 10:42:07
tags:
	- 导航
    - javascript
    - ES6
categories: javascript
---

### ES6常用数据方法总结

参数  index, array可以忽略


#### 概述

	map():返回一个新的Array，每个元素为调用func的结果 
	filter():返回一个符合func条件的元素数组 
	some():返回一个boolean，判断是否有元素是否符合func条件 
	every():返回一个boolean，判断每个元素是否符合func条件 
	forEach():没有返回值，只是针对每个元素调用func 
	reduce():有返回值，重点是计算数组，返回一个值

	1、map速度比forEach快 
	2、map会返回一个新数组，不对原数组产生影响,foreach不会产生新数组， 
	3、map因为返回数组所以可以链式操作，forEach不能

#### forEach()

	let array = [1,2,3,4];
	array.forEach((item, index, array) => {
	　　console.log(item);
	}); //1,2,3,4

备注:forEach会遍历数组, 没有返回值, 不允许在循环体内写return, 不会改变原来数组的内容.

备注:map 遍历数组, 会返回一个新数组, 不会改变原来数组里的内容

#### map()

	let array = [1, 2, 3, 4];
	let temp = array.map((item, index, array) => {
	    return item * 10;
	});
	console.log(temp);　　//  [10, 20, 30, 40];
	console.log(array);　　// [1, 2, 3, 4]

#### filter()

	let array = [1, 2, 3, 4];
	let temp = array.filter((item, index, array) => {
	　　return item >  3;
	});
	console.log(temp);　　// [4]
	console.log(array);　　// [1, 2, 3, 4]

备注: filter 会过滤掉数组中不满足条件的元素, 把满足条件的元素放到一个新数组中, 不改变原数组

#### reduce()

	let array = [1, 2, 3, 4];
	let temp = array.reduce((x, y) => {
	　　console.log("x": x);
	　　console.log("y": y);
	　　return x + y;
	});
	console.log(temp);　　// 10
	console.log(array);　　// [1, 2, 3, 4]

备注:x 是上一次计算过的值, 第一次循环的时候是数组中的第1个元素
y 是数组中的每个元素, 第一次循环的时候是数组的第2个元素

#### every()

	let array = [1, 2, 3, 4];
	let bo = array.every((item, index, array) => {
	　　return item > 2;
	});
	console.log(bo);　　　　// false;

备注: every遍历数组, 每一项都是true, 则返回true,只要有一个是false,就返回false

#### some()

let array = [1, 2, 3, 4];
let tmep = array.some((item, index, array) => {
　　return item > 1;
});
console.log(temp);　　// true

备注:遍历数组的每一项, 有一个返回true, 就停止循环

#### values()

	let arr=[1,2,234,'sdf',-2];
	for(let a of arr.values()){
	    console.log(a) //结果：1,2,234,sdf,-2 遍历了数组arr的值
	}
备注:values，对数组项的遍历

####  keys()

let arr=[1,2,234,'sdf',-2];
for(let a of arr.keys()){
    console.log(a) //结果：0,1,2,3,4  遍历了数组arr的索引
}

备注: keys，对数组索引的遍历

#### entries()

	let arr=['w','b'];
	for(let a of arr.entries()){
	    console.log(a) //结果：[0,w],[1,b]
	}
	for(let [i,v] of arr.entries()){
	    console.log(i,v) //结果：0 w,1 b
	}

备注:entries，对数组键值对的遍历。
