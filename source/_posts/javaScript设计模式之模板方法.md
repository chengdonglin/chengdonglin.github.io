---
title: javaScript设计模式之模板方法
date: 2018-11-19 14:32:18
tags:
	- 导航
    - 设计模式
categories: 设计模式
---

### javaScript设计模式之模板方法

基于继承的设计模式

#### 定义和组成

模板方法模式由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。通常在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺序。子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。 
如果相同和不同的行为都混合在各个子类的实现中，说明这些相同的行为会在各个子类中重复出现。但实际上，相同的行为可以被搬移到另外一个单一的地方，模板方法模式就是为解决这个问题而生的。

#### 例子 coffer or  tea

	//泡coffer的过程
	var Coffee = function(){};
	Coffee.prototype.boilWater = function(){
	 console.log( '把水煮沸' );
	};
	Coffee.prototype.brewCoffeeGriends = function(){
	 console.log( '用沸水冲泡咖啡' );
	};
	Coffee.prototype.pourInCup = function(){
	 console.log( '把咖啡倒进杯子' );
	};
	Coffee.prototype.addSugarAndMilk = function(){
	 console.log( '加糖和牛奶' );
	};
	Coffee.prototype.init = function(){
	 this.boilWater();
	 this.brewCoffeeGriends();
	this.pourInCup();
	 this.addSugarAndMilk();
	};
	var coffee = new Coffee();
	coffee.init(); 



	//泡茶的过程

	var Tea = function(){};
	Tea.prototype.boilWater = function(){
	 console.log( '把水煮沸' );
	};
	Tea.prototype.steepTeaBag = function(){
	 console.log( '用沸水浸泡茶叶' );
	};
	Tea.prototype.pourInCup = function(){
	 console.log( '把茶水倒进杯子' );
	};
	Tea.prototype.addLemon = function(){
	 console.log( '加柠檬' );
	};
	Tea.prototype.init = function(){
	 this.boilWater();
	 this.steepTeaBag();
	 this.pourInCup();
	 this.addLemon();
	};
	var tea = new Tea()
	tea.init()


这两个过程拥有许多共同点:进行模板化

	var Beverage = function(){};
	Beverage.prototype.boilWater = function(){
	 console.log( '把水煮沸' );
	};
	Beverage.prototype.brew = function(){}; // 空方法，应该由子类重写
	Beverage.prototype.pourInCup = function(){}; // 空方法，应该由子类重写
	Beverage.prototype.addCondiments = function(){}; // 空方法，应该由子类重写
	Beverage.prototype.init = function(){
	 this.boilWater();
	 this.brew();
	 this.pourInCup();
	 this.addCondiments();
	}; 

创建 Coffee 子类和 Tea 子类

	var Coffee = function(){};
	Coffee.prototype = new Beverage(); 
	Coffee.prototype.brew = function(){
	 console.log( '用沸水冲泡咖啡' );
	};
	Coffee.prototype.pourInCup = function(){
	 console.log( '把咖啡倒进杯子' ); 
	};
	Coffee.prototype.addCondiments = function(){
	 console.log( '加糖和牛奶' );
	};
	var Coffee = new Coffee();
	Coffee.init();

至此我们的 Coffee 类已经完成了，当调用 coffee 对象的 init 方法时，由于 coffee 对象和Coffee 构造器的原型 prototype 上都没有对应的 init 方法，所以该请求会顺着原型链，被委托给Coffee 的“父类”Beverage 原型上的 init 方法。

- 茶类

		var Tea = function(){};
		Tea.prototype = new Beverage();
		Tea.prototype.brew = function(){
		 console.log( '用沸水浸泡茶叶' );
		};
		Tea.prototype.pourInCup = function(){
		 console.log( '把茶倒进杯子' );
		};
		Tea.prototype.addCondiments = function(){
		 console.log( '加柠檬' );
		};
		var tea = new Tea();
		tea.init(); 

Beverage.prototype.init 被称为模板方法的原因是，该方法中封装了子类的算法框架，它作为一个算法的模板，指导子类以何种顺序去执行哪些方法。在 Beverage.prototype.init 方法中，算法内的每一个步骤都清楚地展示在我们眼前。


#### JavaScript 没有抽象类的缺点和解决方案

当我们在 JavaScript 中使用原型继承来模拟传统的类式继承时，并没有编译器帮助我们进行任何形式的检查，我们也没有办法保证子类会重写父类中的“抽象方法”。我们知道，Beverage.prototype.init 方法作为模板方法，已经规定了子类的算法框架，代码如下：

			Beverage.prototype.init = function(){
			 this.boilWater();
			 this.brew();
			 this.pourInCup();
			 this.addCondiments();
			}; 

下面提供两种变通的解决方案。
 第 1 种方案是用鸭子类型来模拟接口检查，以便确保子类中确实重写了父类的方法。但模拟接口检查会带来不必要的复杂性，而且要求程序员主动进行这些接口检查，这就要求我们在业务代码中添加一些跟业务逻辑无关的代码。
 第 2 种方案是让 Beverage.prototype.brew 等方法直接抛出一个异常，如果因为粗心忘记编写 Coffee.prototype.brew 方法，那么至少我们会在程序运行时得到一个错误：

	Beverage.prototype.brew = function(){
	 throw new Error( '子类必须重写 brew 方法' );
	};
	Beverage.prototype.pourInCup = function(){
	 throw new Error( '子类必须重写 pourInCup 方法' );
	};
	Beverage.prototype.addCondiments = function(){
	 throw new Error( '子类必须重写 addCondiments 方法' );
	};

### 钩子方法

通过模板方法模式，我们在父类中封装了子类的算法框架。这些算法框架在正常状态下是适用于大多数子类的，但如果有一些特别“个性”的子类呢？

在这个例子里，我们把挂钩的名字定为 customerWantsCondiments，接下来将挂钩放入 Beverage类，看看我们如何得到一杯不需要糖和牛奶的咖啡，代码如下：

	var Beverage = function(){};
	Beverage.prototype.boilWater = function(){
	 console.log( '把水煮沸' );
	};
	Beverage.prototype.brew = function(){
	 throw new Error( '子类必须重写 brew 方法' );
	};
	Beverage.prototype.pourInCup = function(){
	 throw new Error( '子类必须重写 pourInCup 方法' );
	};
	Beverage.prototype.addCondiments = function(){
	 throw new Error( '子类必须重写 addCondiments 方法' );
	};
	Beverage.prototype.customerWantsCondiments = function(){
	 return true; // 默认需要调料
	};
	Beverage.prototype.init = function(){
	 this.boilWater();
	 this.brew();
	 this.pourInCup();
	 if ( this.customerWantsCondiments() ){ // 如果挂钩返回 true，则需要调料
	 this.addCondiments();
	 } 
	};
	var CoffeeWithHook = function(){};
	CoffeeWithHook.prototype = new Beverage();
	CoffeeWithHook.prototype.brew = function(){
	 console.log( '用沸水冲泡咖啡' );
	};
	CoffeeWithHook.prototype.pourInCup = function(){
	 console.log( '把咖啡倒进杯子' );
	};
	CoffeeWithHook.prototype.addCondiments = function(){
	 console.log( '加糖和牛奶' );
	};
	CoffeeWithHook.prototype.customerWantsCondiments = function(){ return window.confirm( '请问需要调料吗？' );
	};
	var coffeeWithHook = new CoffeeWithHook();
	coffeeWithHook.init(); 


#### 好莱坞原则

模板方法模式是好莱坞原则的一个典型使用场景，它与好莱坞原则的联系非常明显，当我们用模板方法模式编写一个程序时，就意味着子类放弃了对自己的控制权，而是改为父类通知子类，哪些方法应该在什么时候被调用。作为子类，只负责提供一些设计上的细节。
除此之外，好莱坞原则还常常应用于其他模式和场景，例如发布订阅模式和回调函数

	var Beverage = function( param ){
	 var boilWater = function(){
	 console.log( '把水煮沸' );
	 };
	 var brew = param.brew || function(){
	 throw new Error( '必须传递 brew 方法' );
	 };
	 var pourInCup = param.pourInCup || function(){
	 throw new Error( '必须传递 pourInCup 方法' );
	 };
	 var addCondiments = param.addCondiments || function(){
	 throw new Error( '必须传递 addCondiments 方法' );
	 };
	 var F = function(){};
	 F.prototype.init = function(){
	 boilWater();
	 brew();
	 pourInCup();
	 addCondiments();
	 }; 
	return F;
	};
	var Coffee = Beverage({
	 brew: function(){
	 console.log( '用沸水冲泡咖啡' );
	 },
	 pourInCup: function(){
	 console.log( '把咖啡倒进杯子' );
	 },
	 addCondiments: function(){
	 console.log( '加糖和牛奶' );
	 }
	}); 
	var Tea = Beverage({
	 brew: function(){
	 console.log( '用沸水浸泡茶叶' );
	 },
	 pourInCup: function(){
	 console.log( '把茶倒进杯子' );
	 },
	 addCondiments: function(){
	 console.log( '加柠檬' );
	 }
	});
	var coffee = new Coffee();
	coffee.init();
	var tea = new Tea();
	tea.init(); 

在这段代码中，我们把 brew、pourInCup、addCondiments 这些方法依次传入 Beverage 函数，
Beverage 函数被调用之后返回构造器 F。F 类中包含了“模板方法”F.prototype.init。跟继承得
到的效果一样，该“模板方法”里依然封装了饮料子类的算法框架。



### ES6的实现


	/父类咖啡
	class Beverage {
	    constructor(name) {
	        //单独调用会报错，所以写constructor里面绑定this，this指向父类
	        this.init = () => {
	            this.boilWater();
	            this.brew();
	            this.pourInCup();
	            if (this.customerWantsCondiments()) { // 如果挂钩返回 true，则需要调料
	                this.addCondiments();
	            }
	        };
	        console.log('构造函数的'+name)
	    };
	    //共用boilWater，子类不会修改它
	    boilWater() {
	        console.log('把水煮沸');
	    };
	    brew() {
	        throw new Error('子类必须重写 brew 方法');
	    };
	    pourInCup() {
	        throw new Error('子类必须重写 pourInCup 方法');
	    };
	    addCondiments() {
	        throw new Error('子类必须重写 addCondiments 方法');
	    };
	    customerWantsCondiments() {
	        return true; // 默认需要调料
	    };
	    //init也可以写在这里，解构之后单独调用时，在es5 ,this会指向window，在es6,this不会指向window，会报错
	    // init() {
	    //     console.log(this);
	    //     this.boilWater();
	    //     this.brew();
	    //     this.pourInCup();
	    //     if (this.customerWantsCondiments()) { // 如果挂钩返回 true，则需要调料
	    //         this.addCondiments();
	    //     }
	    // };
	
	
	}
	//子类咖啡，继承父类饮料
	class CoffeeWithHook extends Beverage {
	    constructor(name) {
	        //调用父类的构造函数,演示一下super怎么用，下面传了‘名字’字符串
	        super(name);
	    }
	    brew() {
	        console.log('用沸水冲泡咖啡');
	    };
	    pourInCup() {
	        console.log('把咖啡倒进杯子');
	    };
	    addCondiments() {
	        console.log('加糖和牛奶');
	    };
	    customerWantsCondiments() {
	        return window.confirm('请问需要调料吗？');
	    };
	
	};
	
	let coffeeWithHook = new CoffeeWithHook('名字');
	//如果不把init写在constructor里面的，下面的解构会报错。在es5 ,this会指向window，在es6,this不会指向window，会报错
	let {init} = coffeeWithHook;//var init = coffeeWithHook.init
	init();


### ES5实现完整
	
	var Beverage = function (param) {
	    var boilWater = function () {
	        console.log('把水煮沸');
	    };
	    var brew = param.brew || function () {
	        throw new Error('必须传递 brew 方法');
	    };
	    var pourInCup = param.pourInCup || function () {
	        throw new Error('必须传递 pourInCup 方法');
	    };
	    var addCondiments = param.addCondiments || function () {
	        throw new Error('必须传递 addCondiments 方法');
	    };
	    var F = function () { };
	    F.prototype.init = function () {
	        boilWater();
	        brew();
	        pourInCup();
	        addCondiments();
	    };
	    return F;
	};
	var Coffee = Beverage({
	    brew: function () {
	        console.log('用沸水冲泡咖啡');
	    },
	    pourInCup: function () {
	        console.log('把咖啡倒进杯子');
	    },
	    addCondiments: function () {
	        console.log('加糖和牛奶');
	    }
	});
	
	var coffee = new Coffee();
	coffee.init();
