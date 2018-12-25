---
title: js进阶知识
date: 2018-12-16 12:25:33
tags:
    - javasript
categories: javascript
---


## js进阶知识

### 值类型与引用类型

#### 值类型与引用类型在内存的存储情况

	  变量名 : 具体值
	  针对栈: 变量名 : 具体值
	  针对堆: 变量名 : 地址值
	

1. 栈内存: 值类型存放的位置

	简单类型比如string,number,boolean,null,undefined存放在栈空间

2. 堆内存: 引用内存存放的位置, 内存空间

	比如:function, object, Array

#### 值类型和引用类型与传递

1. 值类型的复制赋值和引用类型的赋值的区别

	引用类型的赋值操作:将引用类型堆上的内存地址进行赋值
2. 函数参数的引用传递和值传递

	- 如果实参的值类型,会复制一个值类型的副本给函数,不会影响原来的传递参数的值类型变量
	- 如果实参是引用类型,传递只是引用类型的一个地址值,在函数内部操作参数对应的引用对象会影响到传递的参数,也就是会改变原来传递参数的值
			
			var a = 9,b;
			var c = {age:9},d;
			//值类型
			b=a
			b=19
			console.log(a)   //9
			console.log(b)   //19
			//引用类型
			d =c;
			d.age = 22,
			console.log(c.age)  //22
			console.log(d.age)  //22


#### 函数的参数

1. arguments参数

	
		//实现max方法,可以接收任意多个参数,返回参数中最大的哪个值
			function myMax(){
			    if (arguments.length <0){
			        return NaN
			    }
			    var max = arguments[0];
			    for (var i=0; i< arguments.length;i++){
			        if (arguments[i]>max) {
			            max = arguments[i]
			        }
			    }
			    return max
			}
			
			const result = myMax(12,4,6,7,8)
			console.log(result)


2. 函数参数的封装

	如果参数多于4个,难于记忆,可以将参数封装成对象来接受,对象的属性无序的,方便开发任意使用

		var rect = {
		    x:19,
		    y:20,
		    width:256,
		    height:256,
		    bgColor:'#ccc'
		}
		function rect(rectObject){
		    console.log(rectObject + ''+ rectObject.y)
		}


### 函数高级

#### javascript事件循环机制(Event Loop)

- 为什么单线程? 

	Javascript执行线程和UI线程是互斥的

	javascript的任务分为同步任务和异步任务

	同步任务:一般赋值操作,循环,分支语句等

	异步任务:DOM事件,Ajax,BOM等api

- 事件循环机制:

	javascript的执行引擎的主线程从队列中获取任务执行,如果任务是异步任务,那么运行到异步任务的时候,异步任务就退出主线程,主线程进行下一个任务的获取处理. 如果异步任务完成,就插入到任务队列的末尾,等待主线程处理.		
#### 变量作用域
- javscript的解释和执行阶段
	- 解释阶段
		- 词法分析
		- 语法分析
		- 作用域规则确定
	- 执行阶段
		- 创建执行上下文
		- 执行函数代码
		- 垃圾回收

- 函数变量作用域
	1. 作用域:就是变量声明的区域,就是变量和函数的可访问范围,在全局声明的变量为全局可见访问的就是全局变量,如果在函数内部声明的变量只能在函数内部访问
	2. 函数的参数只能在函数内部访问,是局部变量
	3. javascript没有块级作用域,只有函数作用域和全局作用域,for循环内部定义的变量是函数级别的作用域,现在可以通过let解决
	4. 变量没有在函数内声明或者声明的时候没有带var就是全局变量,拥有全局作用域,特殊: var a = b = c = 0;b与c是全局变量.
	5. 全局作用域的变量可以在js中任何地方调用,函数作用域的变量只能在字节函数内部调用,包括字节定义的其他函数都可以直接调用
	6. 变量的作用域是以它声明时为准,因为变量的作用域在js代码的解释阶段已经完成规则的制订


			var t = 9 //全局作用域,全部都可以访问
			function f1() { //f1函数全局作用域
			    var t2 = 10 //t2是f1函数内部可访问
			    console.log(t)
			    function f2() {//函数f2是函数f1的作用域
			        var t3 = 200; //t3只能在f2函数内部调用
			        console.log(t2)
			        return t2*t2 //f2函数可以访问f1函数作用域的变量以及f2字节内部变量
			    }
			    return f2()
			}
			var m =f1()
			console.log(m)

函数的声明与变量同名的化,函数优先级较高,函数是一等公民
#### 变量提升与函数提升
- 变量提升
	1. 如果一个声明的变量在函数体内,那么它的作用域就是函数内部,如果是全局环境下声明的,那么它的作用域就是全局的,通过var声明的变量无法用delete删除的
	2. 函数内部的声明的变量会被提升到函数的头部,函数在解释执行的时候,先进行变量声明处理,然后再运行函数内部的代码
	3. 变量和赋值语句仪器书写,在js引擎解析时候,会将其拆成声明和赋值2部分,声明置顶,赋值保留在原来位置
	4. 变量重复声明不会出错,后面会覆盖前面的

			var a =10
			function f1(){
			    //函数的变量提升,因为在函数执行之前,先创建了函数的EC,
			    //在创建EC的时候以及把函数声明的变量以及初始化为undefined
			    console.log(a) //undefined
			    var a = 19
			    console.log(a) //19
			}
			f1()
			console.log(a) //  10

#### 作用域链
1. 作用域链是一个数组
2. 作用域链是控制变量作用域的有序访问js内部实现
3. 作用域链存储在函数的执行上下文,作用域链存放的是执行环境中的VO或者AO
4. 当前函数的作用域对象都是在最前端,而且全局的在最末端
5. 变量(标识符)的搜索都是从作用域链的最前端向后搜索,直到全局作用域,标识符的解析是沿着作用域链一级一级搜索的过程,从第一个对象开始,逐渐向后回溯,直到找到同名标识符为止,找到后不在继续遍历,找不到就报错
#### 函数的arguments
#### 函数执行上下文
- 执行上下文相关

1. 栈的数据结构:先进后出
2. EC:函数执行环境(或执行上下文)
3. ECS:执行环境栈
4. VO变量对象:js的执行上下文中都有个对象用来存放执行上下文中可被访问但是不能被delete的函数标识符,形参,变量声明等.他们会被挂载这个对象上,对象的属性对应他们的名字对象属性的值对应他们的值但这个对象是规范上或者说是引擎实现上的不可在js环境中访问到活动对象.
5. AO激活对象:有了变量对象存每个上下文的东西,但是它是声明时候被访问呢?就是每进入一个执行上下文时,这个执行上下文的变量对象被激活,也就是该上下文的函数标识符,形参/变量声明就可以被访问了

- 执行上下文的执行栈

1. javascript执行在单线程上,使用代码都是排队执行
2. 一开始浏览器执行全局的代码时,首先创建全局的执行上下文,压入执行栈的顶部.
3. 每当进入一个函数的执行就会创建函数的执行上下文,并且把它压入执行栈的顶部.当函数执行完成后,当前函数的执行上下文出栈,并等待垃圾回收.
4. 浏览器的Js执行引擎总是访问栈定的执行上下文
5. 全局上下文只有唯一的一个,在浏览器关闭的时候出栈.

		//(EQ)代码执行之前的时候,就会立即创建一个全局的执行上下文  global excution context
		//在这个例子当中就是这些函数
		//创建完全局的执行上下文之后,把全局的上下文压入执行栈
		function f1(){
		    console.log('f1')
		}
		function f2(){
		    console.log('f2')
		    f3()
		}
		function f3(){
		    console.log('f3')
		    f4()
		}
		function f4(){
		    console.log('f4')
		}
		
		f1() //代码进入f1函数,函数内的代码在执行之前,js执行引擎立即创建一个f1的
		    //执行环境 f1  Excution Context 立即把这个执行环境压入到执行环境栈中ecs
		    //f1() 函数执行完之后,从执行环境栈中弹出f1的执行上下文
		//f2()函数执行之前,创建f2的执行上下文,压栈到执行环境栈中ECS
		//因为f2调用了f3函数,f3函数执行之前也创建了一个f3的执行 上下文,并压栈到执行环境栈中
		//f3函数调用f4函数,创建f4的EC,并把f4的EC压入到ECS中
		//f4执行完成,f4的EC出栈
		//f3执行完成,f3的EC出栈
		//f2执行完成,f2的EC出栈
		f2()  //f2()-> f3()->f4()  //
##### 执行上下文的声明周期

- 总的生命周期: 创建->执行->出栈等待销毁
- 创建阶段:
	1. 创建作用域链
	2. 创建变量对象(AO):首先初始化函数的参数arguments,初始化函数声明,初始化变量(undefined),函数的优先级要高于变量,如果变量和函数重名,变量被忽略.
		- 创建arguments对象,检查上下文,初始化参数名称和值并创建引用的复制
		- 扫描上下文的函数声明(而非函数表达式):
			- 为发现的每一个函数,在变量对象创建一个属性--确切的说是函数的名字,其有一个指向函数在内存中的引用
			- 如果函数的名字已经存在,引用指针将被重写
		- 扫描上下文的变量声明:
			- 为发现的每个变量声明,在变量对象上创建一个属性-就是变量的名字,并且将变量的初始值为undefined
			- 如果变量的名字已经在变量对象里存在,将不会进行任何操作并继续扫描
		- 求出上下文的内部this的值
- 执行阶段:
	- 执行变量赋值,代码执行
- 回收阶段
	- 执行上下文出栈等待虚拟机回收执行上下文

			//变量声明
			var a1 = 19,
			    a2 = 20,
			    a3 = 'sss',
			    b1 = {name:'lcd'}
			//函数声明
			a1 = f1(a1,a2) 
			//函数声明
			function f1(a,b){
			    //f1函数的执行上下文
			    //第一步:扫描参数, a =19, b = 20
			    //第二步:扫描函数声明 f2 = function(){}
			    //第三步:扫描变量声明  t=undefined  m = undifined i = undefined   变量提升
			    var t =0,
			        m =10;
			    for (var i= 0;i< a;i++){
			        console.log(i)
			    }
			    function f2() {
			        console.log(f2)
			    }
			    return a + b;
			}

#### 构造函数内部执行过程
#### 函数的四种调用模式
##### 方法调用模式
如果一个函数作为对象的一个方法属性调用,那么就是方法调用模式

		var a = {}; a.toString() //方法调用模式

			//定义构造函数
		//定义一个Dog类的构造函数
		function Dog(dogName){
		    //如果函数当构造函数来用
		    //第一步:创建一个空对象(新对象),函数上下文===this
		    //第二步:把空对象赋值给函数的上下文, this=新对象
		    this.name = dogName
		    this.age = 0;
		    this.run = function () {
		        console.log(this.name + 'is running')
		    }
		    //如果函数当前当做构造函数调用,并没有返回任何数据的时候,默认返回新对象this
		}
		//当构造函数创建一个Dog类型的实例
		var d = new Dog('lddd') //构造函数的返回值就是默认的新对象this
		d.run()//调用d对象实例的run方法,这就是对象的方法调用模式
		//在方法调用模式中,方法内部的this指向当前调用者的对象 => d
		//this === d  //true
##### 函数调用模式
 1. 如果一个函数直接调用,那么调用者其实就是全局对象: window
 2. 函数调用模式this指向全局对象
 
 		function f() {}   fn()://函数调用模式

			function dog(){
			this.age = 19;
			console.log(this)
			}
			dog()//函数执行模式  => window
			var d = new Dog() //构造函数执行模式  => d对象
##### 构造器调用模式
 	- 构造器调用模式就是构造函数调用
 	- 构造器模式调用必须有关键字new存在
 	- 构造器模式调用this指向创建出来的新对象
 	
			var t = new Dog() //构造器调用模式
	- 构造函数可以返回一个值,但是如果是简单类型会被忽略,如果是引用类型会替换新的插件对象返回

	
			//构造器调用函数  构造函数
			//关键字 :  new
			function Cat(){
			    //第一步:创建一个空对象(新对象)
			    //第二步:给函数上下文赋值 新对象 this = 新对象
			    this.age = 19
			    this.name = "cat"//构造函数内部定义this属性
			    this.run(){
			        console.log(this.name + 'run')
			    }
			    //如果构造函数没有返回值,那么返回this(新对象)
			    //return 3 //即使有返回值,如果返回值类型是简单类型,那么会被忽略
			    //如果返回值是一个引用类型(去掉null)那么新对象会被抛弃,把这个引用类型返回
			    return {
			        name:999,
			        run:function(){
			            console.log('字节返回的{}')
			        }
			    }
			}
			var cat = new Cat()//构造函数调用模式
			//如果使用new关键字+构造函数指向的话触发了构造函数执行模式
			cat.age = 20;
			cat.name = 'www'
			cat.run()//方法调用模式

##### apply/call 调用模式(借用方法模式)

	- apply和call可以改变函数调用的内部this指向
	- apply和call的功能一样,只不够参数不一样,第一个参数都是改变函数内部的this执行
	- 第一个参数如果是null,undefined会被全局对象替代,如果是简单类型会被包装类型替代
	- call第二个参数开始后面都是传给函数的参数,可以有多个,用逗号隔开
	- apply第二个参数是一个传给函数的参数数组

		function sum(a,b) {
		    console.log(this)
		    return a +b
		}
		
		var t = {
		    name:'lcd'
		}
		sum(1,2)  //this => window
		//f.call(context,p1,p2)
		var m = sum.call(t,2,3)  //Object {name:'lcd'}
		console.log(m)//5
		
		var m2 = sum.apply(t,[1,2])//Object {name:'lcd}
		console.log(m2)//3
		sum.call(null,3,5)//window
		sum.call(undeifined,3,5)//window
		sum.call(3,3,5) //返回包装类型  Number{}

###### 函数四种调用模式案例

	//1. 定义按钮类,要求按钮类的构造函数可以接受参数初始化的宽度,高度,坐标
	function Btn(width,height,x,y){
	    //构造函数内部初始化值
	    this.width = width //给this对象上的width属性赋值, width参数的参数值
	    this.height = height
	    this.x = x
	    this.y = y
	}
	var b = new Btn(100,100,30,30)
	
	//2. 借用Math的min方法实现求数组[2,9,33]中的最小值
	Math.min.apply(null,[2,9,33])
	
	//3. 把类数组转为真正的数组
	var t = {} //类数组,跟数组相识,单不是数组
	t[0] =1;
	t[1] = true;
	t[2] = 'lcd'
	t.length = 3
	//t = [1,true,'lcd'] 转为这种类型
	//var m = [1,2,3]
	//m.slice()//如果上面都不传,默认从0索引开始截取到数组最好
	//第一个参数是: 截取开始的位置, startIndex
	//第二个参数是: 截取结束的位置+1, endIndex
	//如果借用数组的slice方法,然后把this指向t对象,那么slice方法就会返回t对象对应的数组
	Array.prototype.slice.call(t,0)
	
	
	//4. 判断代码输出内容
	function Dog(){
	    console.log(this)
	}
	Dog()//window
	var d = new Dog() //this === d
	Dog(null) //借用调用模式, window
#### 没有重载(通过arguments模拟实现)

- javascript函数不能重名,如果重名了后面的会把前面的覆盖
- 原因:所有的函数声明都会创建在Vo或者AO上的一个属性,而后面声明的函数会把前面vo或者ao中的同名属性覆盖
- 重载的概念:在程序中可以定义相同名字.不同参数的形式的不同函数,函数在调用的时候,自动适别不同参数对应的函数,实现了相同函数名不同的函数调用
- javascript中通过arguments实现函数重载
- 数组的slice方法,splice方法等多可以传一个参数或者多个参数,不同参数方法内部实现不一样,就是方法重载.

		function React() { 
		    //如果一个参数,返回正方形
		    if(arguments.length ==1){
		        this.width = arguments[0]
		        this.height = arguments[0]
		    }
		    if(arguments.length > 1) {
		        this.width = arguments[0]
		        this.height = arguments[0]
		    }
			//由于跟原型toString()方法重名,会覆盖原型上的方法
		    this.toString = function () {
		        console.log(width,height)
		    }
		 }
		 var r1 = new React(10)
		 console.log(r1.toString())
#### 函数的属性和方法(.length,.prototype)
- 函数本身也是一种对象,构造函数也是function
 
		funtionName instanceof Object //true

语法: object instance of construct

	1. object:要检测的对象
	2. constructor:某个构造函数
	3. instanceof运算符用力啊检测construcor.prototype是否在于参数object的原型链上
- 函数有内部属性:arguments,可以在函数内步使用
- 函数的自身的属性:length,函数定义的形参个数
- 另外,我们可以自定义函数的其他属性和方法,一般用于全局对象,静态变量,公共存储.

#### 函数的递归调用
- 函数的递归调用就是指:函数调用自身
- arguments.callee就是指向函数自身的变量,所以可以直接用它来代替函数名,在匿名函数非常有用.严格模式下会报错
- 函数表达式方式定义的时候,还可以用命名函数表达式
	例如: var f = function s(){}

#### 函数式编程
- 函数是javascript的一等公民
- 一等公民:指的是函数与其他类型一样,处于平等低位,可以赋值给其他变量,也可以作为参数,传入另一个函数,或者作为别的函数的返回值.
- sort,map,forEach

			t =[47,5,19,23,7]
		 t.sort(function(a,b){
		     return a - b;
		 })

##### map方法
- 方法接受一个回调函数,回调有三个参数:当前项,索引,操作的数组,不影响原数组,返回新数组.
##### forEach
- 没有返回值

### 垃圾回收
#### 垃圾回收的基本知识
- javascript具有自动垃圾回收机制(GC:Garbage Collecation),我们不用关心内存申请和回收
- 垃圾收集器定期找出那些不在继续使用的变量,然后将其释放内存
- js最常用的垃圾回收方式就是标记清楚,当变量进入环境,例如,在函数中声明一个变量,将这个变量标记位"进入环境".从逻辑上讲,永远不能释放进入环境的变量占用的内存,因为只要执行流进入对应的环境,就可能用到,当变量离开环境的时候,将其标记位离开环境,被标记离开环境的变量在下一次垃圾回收启动的时候会被释放掉占用的内存空间.
- javascript引擎基础GC方案是:mark and sweep标记清楚,既
	- 从根对象开始遍历所有可访问的对象
	- 回收已不可访问的对象
#### 垃圾回收的应用
- 数组的清零操作
	- arr=[],虽然能清空arr数组,但是新建了一个[]空数组对象,最好的方法是:arr.length =0//既可清楚数组内容,还不会额外开辟新内存
	- 对象尽量复用,尤其在循环等地方出现创建新对象,能复用就尽量复用,不用的对象,尽可能的设置位null,尽快被垃圾回收掉
	- 在循环中的函数表达式,能复用最好放到循环外面

### 原型链与闭包
#### 原型链
- 函数的原型对象(prototype)
- 原型对象的构造函数(constructor)
- 内部原型(_proto_)
- javascript是基于原型的面向对象语言,也就是说所有对象都是基于原型上进行创建,而不像java和C#等是基于一个类型的模板创建
- 函数都有prototype属性指向函数的原型对象,只有函数根除外
- 所有的对象都有_proto_属性,null除外
- Object是构造函数,也是对象,Object.prototype是所有对象的根
- Function是函数对象的构造函数,Fcuntion的原型对象是所有函数的根,而它的内部原型是Object的原型对象
#### 闭包
- 函数的作用域
- 没有块级作用域
- 闭包的使用
- 沙箱模式


		function foo(x) {
		    let tmp = 3;//定义了一个局部遍历 tmp
		    return function (y) {//把一个函数作为返回值返回
		        console.log(x+y+(++tmp)) 
		    }
		}
		//调用foo方法执行,并把返回的函数赋给了bar变量
		var bar = foo(2) //此时bar指向了匿名函数 , bar是一个闭包, 函数 + x + tmp  ;
		bar(10) // 2 + 10 + 4 = 16
		bar(20) //20 +2 +5 = 27


- 匿名自执行函数----防止污染全局变量--模拟块级作用域
 
		;(function(a){
		    console.log(a)
		})(8)  //8

- 循环注册dom事件中的index


		//循环注册事件的index的典型错误
		for(var i=0;i<lis.lenght;i++){
		    lis[i].click = function (e) {//事件的方法执行是:当事件触发的时候执行
		        //变量i是父函数里面的变量
		        console.log(i)//把当前的索引的值打印出来
		    }
		} // i=5
		
		//解决方法
		//把循环注册事件做成自执行函数来传递变量i
		for(var i=0;i<lis.length;i++){
		    (function(a){
		        lis[a].click = function (e) {
		            console.log(a)
		        }
		    })(i)
		}//0,1,2,3...

- setTimeOut中的闭包应用

		//bom的一个方法,接受两个参数:第一个函数是回调函数;第二个参数是经过的毫秒数
		setTimeout(function(){
		    //当10000毫秒之后,执行当前的函数体
		    console.log(10)
		},1000)
		
		for(var i =0;i<10;i++){
		    setTimeout(function(){
		        console.log(i) //输出都是为0
		    },1000)
		}
		//解决方式:自执行函数
		for(var i =0;i<10;i++){
		    (function(a){
		        setTimeout(function(){
		            console.log(a) //输出都是为0
		        },1000)
		    })(i)
		}

- 闭包的缺点
	1. 闭包会导致js执行效率下降
	2. 闭包导致内存驻留,大量对象的闭包注意内存消耗


### 面向对象
#### 面向对象的概念
- 面向对象就是一种思考问题和组织代码的方式
- 把任何的数据和行为抽象成一个形象的对象,类似人生活中思考的方式就是面向对象
- 继承:相类似的对象进行公共抽象,并公共复用就是继承
#### 对象的创建
##### 对象属性和行为复用
- 工厂的方式创建对象
	- 优点:可以进行批量的创建都有公共默认值和属性的对象
	- 缺点:对象的方法不能跟其他对象共享,占用内存,不能识别对象的原型以及构造函数
	

			//工厂模式创建对象
			function createCat(age,name){
			    var o = new Object()
			    o.age = age,
			    o.name = name
			    o.run = function () {
			        console.log(o.name + 'running')
			    }
			    return o;
			}
			var c = createCat(19,'d')

- 构造函数创建对象
	1. 优点:
	
		- 所有创建出来的对象,都可以找到它的原型和构造函数
		- 公共的属性和方法也可以在创建的时候统一创建和维护
	
	2. 缺点:
		1. 对象的函数,每个对象都会拥有一份内存拷贝,浪费内存

				//构造函数创建对象模式
				function Cat(age,name) {
				    this.age = age
				    this.name = name
				    this.run =function(){
				        console.loh(this.name + 'running')
				    }
				    //当使用new来调用构造函数时
				    //1 创建一个空对象
				    //2 把空对象赋值给this
				    //3 执行构造函数的里面代码的时候,给this的属性做赋值初始化
				    //4 把新创建的对象返回(如果有返回值,返回是简单类型会直接忽略,如果是引用类型,指返回引用类型)
				}
				var c = new Cat(19,'d')
				c.age =20 //修改对象的属性值
				c.run()
				c instanceof Cat//true
				c.constructor === Cat

使用构造函数的主要问题,就是每个方法毒药在每个实例上重新创建一遍,对于不同的对象实例都有run的方法,但是不同实例上的同名函数是步相等的.
创建两个完成同样的function的确没有必要,可以通过函数定义转移到构造函数外部解决这个问题

		function Cat(age,name) {
		    this.age = age
		    this.name = name
		    this.run = run
		}
		function run() {
		     console.log(this.name)
		}

这种方法的两个cat实例对象共享了全局作用域中定义的同一个run方法,这样的确两个函数调用做同一件的问题,但是新问题:在全局作用域中定义的函数实际上只能被某个对象调用,者让全局作用域名不副实,另外,如果对象需要定义很多方法,那么就要定义很多全局函数,那么就没有封装性可言了,者就是原型链模式产生的原因

- 原型创建对象
	- 原型动态性
	- 赋值新对象的原型创建方式以及constructor处理
	- 优点:所有原型上的属性和方法在所有的新对象中可以进行共享
	- 缺点:如果对象需要自己特有的属性值,不与其他对象共享,则必须跟构造函数模式来配合进行

			//原型构建模式
			function Cat() {
			   this.age = 19
			   //如果需要共享的方法和属性一般放到原型中定义 
			}
			Cat.prototype.run = function () {
			    console.log(this.name,this.age)
			}
			Cat.prototype.name = 'black cat'
			
			var c1 = new Cat()
			var c2 = new Cat()
			
			c1.name = 'rw'
			console.log(c1.name)// rw---来自实例
			console.log(c2.name)//black cat ----来自原型

问题:私有属性每个对象独有的

- 混合模式:原型+构造函数(经典组合模式)
	1. 公共的属性和方法放到原型上,独有的属性使用构造函数模式,放到对象自己身上
	2. 优点:既可保证了方法等共享的属性只在内存中保存一份,节省内存,又可以实现每个对象有自己单独存放的属性,是一种京东构建对象的方法
	
			function Cat(age,name) {
			    this.age = age //每个对象有自己的属性,放到构造函数中
			    this.name = name
			}
			//一般类型的方法,放到原型上
			Cat.prototype.run = function () {
			    console.log(this.name + 'running')
			}
			var c1 = new Cat(19,'d')
			var c2 = new Cat(20,'c')
			c1.run === c2.run //true
##### ES6中的表现
	class Point {
	  constructor(){
	    // ...
	  }
	
	  toString(){
	    // ...
	  }
	
	  toValue(){
	    // ...
	  }
	}
	
	// 等同于
	
	Point.prototype = {
	  toString(){},
	  toValue(){}
	};
	class B {}
	let b = new B();
	
	b.constructor === B.prototype.constructor // true



- 寄生构造函数模式
- 稳妥构造函数模式

		function Persion(age,name){
		    var o = {}
		    o.age = age,
		    o.name = name
		    o.run = function () {
		        console.log(o.name + 'runing')
		    }
		    return o
		    //当构造函数有返回值的时候,如果是简单类型会直接忽略
		    //如果是引用类型,直接适应引用类型替换掉新对象
		}
		var c1 = new Persion()
		var c2 = Persion() //不适应new也可以创建对象
		
		优点: 可以共享属性和方法的初始化代码,无论是否用了new还是没有适应new都
		可以返回对象
		缺点:无法追溯对象的原型和构造函数,默认没有公共的属性和方法,内存浪费
#### 面向对象继承
##### 原型继承方式
		
		//在动物基类的原型上添加run方法
		Animal.prototype.run = function () {
		    console.log(this.name + 'running')
		}
		function Cat(age,name){
		    this.age = age
		    this.name = name
		}
		//原型继承方式
		//Cat.prototype.constaructor === Cat
		Cat.prototype = new Animal()
		Cat.prototype.constaructor = Cat
		var c = new Cat(19,'s') //希望cat继承animal的属性和方法
		c.run()
		
		//问题:子类的构造函数的参数无法传递给父类的构造函数
		//子类原型的constructor会被改变.需要自己改变
##### 借用构造函数继承
##### 组合继承

		function Animal(age,name){
		    this.age = age
		    this.name = name
		    this.foods = ['水','苹果']
		}
		//父类的原型上创建一个run方法
		Animal.prototype.run = function(){
		    console.log(this.name + 'running')
		}
		//定义子类
		function Cat(age,name){
		    //Animal(age,name)  this === window 函数执行模式
		    // this === c
		    Animal.call(this,age,name)
		} 
		Cat.prototype = new Animal()//组合原型继承模式 //怎么去掉new
		Cat.prototype.constructor = Cat
		var c = new Cat(19,'ddd')
##### 原型方法继承
- 原型式继承是避免调用父类函数的一种巧妙的方式,本质就是借用对象来构造另外一个对象
- 缺点:原型对象上的引用类型的属性会造成子类对象机械能共享
- //o 就是要借用的对象
		function object(o){
		    function F(){
		        F.prototype = o //让空函数的原型指向o对象
		        return new F() //创建一个f实例,f的内部原型指向o对象
		    }
		}
		
		var m = {age=19,name:'ccc'}
		var m1 = object(m)
		console.log(m1.age)
##### 寄生继承方式
		function object(o){
		    function F(){
		        F.prototype = o //让空函数的原型指向o对象
		        return new F() //创建一个f实例,f的内部原型指向o对象
		    }
		}
		
		function createPersion(p){
		    var o = object(p)
		    o.say = function () {
		        console.log('qqq')
		    }
		    return o
		}
##### 终极方式:寄生组合方式

	function Animal(age,name){
	    this.age = age
	    this.name = name
	    this.foods = ['水','苹果']
	}
	//父类原型上的方法,通过寄生继承的方式进行继承
	Animal.prototype.run = function () {
	    console.log(this.name + 'running')
	}
	function Cat(age,name){
	    //借用构造函数继承来创建实例属性
	    Animal.call(this,age,name)
	}
	Cat.prototype = inheritFrom(Animal.prototype)
	function inheritFrom(o){
	    var t = object(o)
	    t.constructor = Cat
	    return t;
	}
	function object(o) {
	    function F(){
	        F.prototype = o
	        return new F()
	    }
	}
	var c = new Cat(19,'ddd')


### 私有变量
- javaScript中并没有私有变量的概念,但是可以通过模拟,所谓的私有变量:对象的某个只能通过对象的方法进行访问,不能直接通过对象进行访问.
- 构造函数模拟私有变量的方式

1. 第一种模拟私有变量


		function Persion(){
		    var age = 0
		    this.getAge = function(){
		        return age
		    }
		    this.setAge = function (a) {
		        age = a
		    }
		}

2. 第二种模拟私有变量

		function Persion(){
		    var age = 0
		    return {
		    getAge:function(){
		        return age
		    },
		    setAge:function (a) {
		        age = a
		    }
		  }
		}

### 正则表达式

- 什么是正则表达式?

	用于匹配字符串规律的表达式.正则表达式是对字符串操作的一种逻辑公式,就是用事先定义好的一些特定字符以及这些特定字符的组合,组成一个"规定字符串",这个"规定字符串"用来表达对字符串的一种过滤逻辑
- 正则表达式的用途
	- 给定的字符串是否符合正则表达式的过滤逻辑
	- 可以通过正则表达式,从字符串种获取想要的特定部分
	- 强大的字符串替换能力

具体规则查看正则表达式的章节

