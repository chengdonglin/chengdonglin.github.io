---
title: ES6在条件语句的优雅应用
date: 2018-11-05 09:55:44
tags:
	- 导航
    - javascript
    - ES6
categories: javascript
---

### ES6在条件语句的优雅应用

在用 JavaScript 工作时，我们经常和条件语句打交道，这里有5条让你写出更好/干净的条件语句的建议。

1. 多重判断时使用 Array.includes
2. 更少的嵌套，尽早 return
3. 使用默认参数和解构
4. 倾向于遍历对象而不是 Switch 语句
5. 对所有/部分 判断使用 Array.every & Array.some


#### 多重判断时使用 Array.includes

案例:

	// condition
	function test(fruit) {
	  if (fruit == 'apple' || fruit == 'strawberry') {
	    console.log('red');
	  }
	}

如果我们有更多名字叫 cherry 和 cranberries 的红色水果呢？

可以用 Array.includes (Array.includes)重写条件语句。

	function test(fruit) {
	  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
	
	  if (redFruits.includes(fruit)) {
	    console.log('red');
	  }
	}

判断条件提取到一个数组。这样一来，代码看起来更整洁。

#### 更少的嵌套，尽早 Return

扩展上一个例子让它包含两个条件
1. 如果没有传入参数,抛出错误
2. 接受quantily参数,在quantily大于10 的时候打印出来
	
	function test(fruit, quantity) {
	  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
	
	  // 条件 1: fruit 必须有值
	  if (fruit) {
	    // 条件 2: 必须是red的
	    if (redFruits.includes(fruit)) {
	      console.log('red');
	
	      // 条件 3: quantity大于10
	      if (quantity > 10) {
	        console.log('big quantity');
	      }
	    }
	  } else {
	    throw new Error('No fruit!');
	  }
	}
	
	// 测试结果
	test(null); // error: No fruits
	test('apple'); // print: red
	test('apple', 20); // print: red, big quantity

在上面的代码, 我们有:

1. 1个 if/else 语句筛选出无效的语句
3. 层if嵌套语句 (条件 1, 2 & 3)

/_ 当发现无效语句时，尽早Return _/

	function test(fruit, quantity) {
	  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
	
	  // 条件 1: 尽早抛出错误
	  if (!fruit) throw new Error('No fruit!');
	
	  // 条件 2: 必须是红色的
	  if (redFruits.includes(fruit)) {
	    console.log('red');
	
	    // 条件 3: 必须是大质量的
	    if (quantity > 10) {
	      console.log('big quantity');
	    }
	  }
	}

我们可以通过 倒置判断条件 & 尽早return 进一步减少if嵌套。看下面我们是怎么处理判断 条件2 的:
	
	/_ 当发现无效语句时，尽早Return _/
	
	function test(fruit, quantity) {
	  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
	
	  // 条件 1: 尽早抛出错误
	  if (!fruit) throw new Error('No fruit!');
	  // 条件 2: 当水果不是红色时停止继续执行
	  if (!redFruits.includes(fruit)) return; 
	
	  console.log('red');
	
	  // 条件 3: 必须是大质量的
	  if (quantity > 10) {
	    console.log('big quantity');
	  }
	}

#### 使用默认参数和解构

	function test(fruit, quantity) {
	  if (!fruit) return;
	  // 如果 quantity 参数没有传入，设置默认值为 1
	  const q = quantity || 1; 
	
	  console.log(`We have ${q} ${fruit}!`);
	}
	
	//test results
	test('banana'); // We have 1 banana!
	test('apple', 2); // We have 2 apple!

实际上，我们可以通过声明 默认函数参数 来消除变量 q。

	function test(fruit, quantity = 1) {
	  // 如果 quantity 参数没有传入，设置默认值为 1
	  if (!fruit) return;
	  console.log(`We have ${quantity} ${fruit}!`);
	}
	
	//test results
	test('banana'); // We have 1 banana!
	test('apple', 2); // We have 2 apple!

如果fruit是一个object会怎么样？我们能分配一个默认参数吗?

	function test(fruit) { 
	  // 当值存在时打印 fruit 的值
	  if (fruit && fruit.name)  {
	    console.log (fruit.name);
	  } else {
	    console.log('unknown');
	  }
	}
	
	//test results
	test(undefined); // unknown
	test({ }); // unknown
	test({ name: 'apple', color: 'red' }); // apple

看上面这个例子，我们想打印 fruit 对象中可能存在的 name 属性。否则我们将打印unknown。我们可以通过默认参数以及解构从而避免判断条件 fruit && fruit.name

// 解构 - 仅仅获取 name 属性
// 为其赋默认值为空对象
function test({name} = {}) {
  console.log (name || 'unknown');
}

// test results
test(undefined); // unknown
test({ }); // unknown
test({ name: 'apple', color: 'red' }); // apple

由于我们只需要 name 属性，我们可以用 {name} 解构出参数，然后我们就能使用变量 name 代替 fruit.name。

我们也需要声明空对象 {} 作为默认值。如果我们不这么做，当执行 test(undefined) 时，你将得到一个无法对 undefined 或 null 解构的的错误。因为在 undefined 中没有 name 属性。

#### 倾向于对象遍历而不是Switch语句

让我们看下面这个例子，我们想根据 color 打印出水果:

	function test(color) {
	  // 使用条件语句来寻找对应颜色的水果
	  switch (color) {
	    case 'red':
	      return ['apple', 'strawberry'];
	    case 'yellow':
	      return ['banana', 'pineapple'];
	    case 'purple':
	      return ['grape', 'plum'];
	    default:
	      return [];
	  }
	}
	
	// test results
	test(null); // []
	test('yellow'); // ['banana', 'pineapple']

上面的代码看起来没有错误，但是我找到了一些累赘。用对象遍历实现相同的结果，语法看起来更简洁:

	const fruitColor = {
	  red: ['apple', 'strawberry'],
	  yellow: ['banana', 'pineapple'],
	  purple: ['grape', 'plum']
	};
	
	function test(color) {
	  return fruitColor[color] || [];
	}

或者你也可以使用 Map实现相同的结果:

	 const fruitColor = new Map()
	    .set('red', ['apple', 'strawberry'])
	    .set('yellow', ['banana', 'pineapple'])
	    .set('purple', ['grape', 'plum']);
	
	function test(color) {
	  return fruitColor.get(color) || [];
	}


Map是一种在 ES2015 规范之后实现的对象类型，允许你存储 key 和 value 的值。

#### 重构语法

在上面的例子，我们能够用Array.filter 重构我们的代码，实现相同的效果。

	const fruits = [
	    { name: 'apple', color: 'red' }, 
	    { name: 'strawberry', color: 'red' }, 
	    { name: 'banana', color: 'yellow' }, 
	    { name: 'pineapple', color: 'yellow' }, 
	    { name: 'grape', color: 'purple' }, 
	    { name: 'plum', color: 'purple' }
	];
	
	function test(color) {
	  return fruits.filter(f => f.color == color);
	}


#### 对所有/部分 判断使用Array.every & Array.some

这最后一个建议更多是关于利用 JavaScript Array 的内置方法来减少代码行数。看下面的代码，我们想要检查是否所有水果都是红色:

const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
  ];

function test() {
  let isAllRed = true;

  // 条件：所有水果都是红色
  for (let f of fruits) {
    if (!isAllRed) break;
    isAllRed = (f.color == 'red');
  }

  console.log(isAllRed); // false
}

代码那么长！我们可以通过 Array.every减少代码行数:

const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
  ];

function test() {
  const isAllRed = fruits.every(f => f.color == 'red');

  console.log(isAllRed); // false
}

现在更简洁了，不是吗？相同的方式，如果我们想测试是否存在红色的水果，我们可以使用 Array.some 一行代码实现。

const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
];

function test() {
  // 条件：任何一个水果是红色
  const isAnyRed = fruits.some(f => f.color == 'red');

  console.log(isAnyRed); // true
}


#### 本文链接地址:

https://juejin.im/post/5bdef288e51d450d810a89c6


