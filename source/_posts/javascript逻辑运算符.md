---
title: javascript逻辑运算符
date: 2018-11-04 15:41:17
tags:
	- 导航
    - javascript
categories: javascript
---

### javascript逻辑运算符

#### 1:逻辑或(||)

##### 示例代码1

	console.log(0 || '我是string，boolean值为true');          // 返回字符串
	console.log(NaN || '我是string，boolean值为true');        // 返回字符串
	console.log('' || '我是string，boolean值为true');         // 返回字符串
	console.log(null || '我是string，boolean值为true');       // 返回字符串
	console.log(undefined || '我是string，boolean值为true');  // 返回字符串

我们知道 0、NaN、' '、null、undefined转换为boolean值都为flase，若第一个值为false，第二个值为true，则返回第二个值。

##### 示例代码2

	console.log(0 || 'NaN');           // 返回 NaN
	console.log(NaN || '');            // 返回 '' 空字符串
	console.log('' || null);           // 返回 null
	console.log(null || 'undefined');  // 返回 undefined
	console.log(undefined || 0);       // 返回 0

结合上面两个例子我们可以发现，** 只要第一个值的布尔值为false，那么永远返回第二个值，**不管第二个值的布尔值是true还是false。

##### 示例代码3

	var obj = {};
	console.log(obj || NaN);      // 返回 obj
	console.log(obj || number);   // 返回 obj
	console.log( 0 || number);    // 报错，number未定义

通过这个例子可以发现逻辑或属于短路操作，只要第一个值的布尔值为true，不再操作第二个值，直接返回第一个值，number变量未定义也不会报错。


#### 2逻辑与(&&)

逻辑与 操作符在JavaScript中主要用在条件判断语句中，极少情况下出现在赋值语句中，特性和 逻辑或 很相似。

##### 示例1

	var obj = {};
	console.log(0 && obj);               // 返回 0
	console.log(NaN && obj);             // 返回 NaN
	console.log('' && obj);              // 返回 '' 空字符串
	console.log(null && obj);            // 返回 null
	console.log(undefined && obj);       // 返回 undefined
	// number 未定义
	console.log(undefined && number);    // 返回 undefined 不会报错
通过上面的代码发现 逻辑与 与 逻辑或 很近似，逻辑与 也属于短路操作；当第一个值的布尔值为false，它不再操作第二个值，同时直接返回第一个值。

##### 示例2

	var obj = {};
	var str = 'Riny';
	
	/* 当第一个值的布尔值为true 返回第二个值 */
	console.log(obj && 0);          // 返回 0
	console.log(obj && NaN);        // 返回 NaN
	console.log(obj && '');         // 返回 '' 空字符串
	console.log(obj && undefined);  // 返回 undefined
	console.log(obj && null);       // 返回 null
	
	/* 当第一个值的布尔值为true 返回第二个值 */
	console.log(obj && str);        // 返回 字符串

通过上面比较可以发现，逻辑与 只要第一个值的布尔值为true，永远返回第二个值。

#### 3总结

##### 逻辑或（||）总结：

只要第一个值的布尔值为false，那么永远返回第二个值。
逻辑或属于短路操作，第一个值为true时，不再操作第二个值，且返回第一个值。

##### 逻辑与（&&）总结：

只要第一个值的布尔值为true，那么永远返回第二个值。
逻辑与属于短路操作，第一个值为false时，不再操作第二个值，且返回第一个值。

链接：https://www.jianshu.com/p/07a1cabe6484
