---
title: javaScript的异步编程解决方案-Promise
date: 2018-11-08 13:27:18
tags:
	- 导航
    - javascript
categories: javascript
---

## javascript异步编程解决方案-promise

主要内容根据阮一峰的书籍ES6第三版


### Promise的含义

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。

### 基本用法

ES6规定: Promise对象是一个构造函数,用来生成Promise示例

	const promise = new Promise(function(resolve,reject){
	            //...some code
	            let a = 3 + 5
	            if (a) {//异步操作成功,保存结果值
	                resolve(a)
	            } else {
	                reject(error)
	            }
	        })
	        promise.then() //Promise {<pending>}
	        console.log(promise.then((value)=>{
	            console.log(value) //8
	        }))


Promise构造函数接收一个函数为参数,该函数的两个参数分别是resolve和reject.(分别是两个函数)

- resolve函数的作用: 将Promise对象的状态从"未完成"变为"成功",既从pending变为resolved,在异步操作成功调用,并将异步操作的结果,作为参数传递出去.

- reject函数的作用:将Promise对象的状态从"未完成"变为失败,既从pending变为reject,在异步操作失败的时候调用,并将异步操作报出的错误作为参数传递出去.

Promise实例生成以后,可以用then方法分别指定resolved状态和rejected状态的回调函数.

	promise.then(function(value) {
	  // success
	}, function(error) {
	  // failure
	});

- then方法可以接受两个回调函数作为参数, 第一个回调函数是Promise对象的状态变为resolved时调用, 第二回调函数是promise对象变为reject时候调用,其中,第二个函数是可选的,不一定要提供,这两个函数都接收Promise对象传出的值作为参数.

#### 一个简单例子

	function timeout(ms) {
	            return new Promise((resolve,reject)=>{
	                setTimeout(resolve,ms,'done')
	            })
	        }
	        
	        timeout(100).then((value)=>{
	            console.log(value) //输出done
	        })

解析: timeout方法返回一个Promise实例,表示一段时间以后才会发送的结果,过了指定参数ms以后,Promise实例的状态变为resolved,就会触发then方法绑定的回调函数.

#### 一个promise知识点:Promise新建后会立即执行

##### 例子

	let test = new Promise(function(resolve,reject){
	        console.log('Promise')
	        resolve()
	    })
	    test.then(function(){
	        console.log('resolved')
	    })
	    console.log('hello promise')
	    //输出的顺序
		//  Promise
	    //  hello promise
	    //  resolved

解析: Promise新建之后立即执行,所以首先输出的是Promise,然后then方法指定的回调韩素华,将在当前脚本所有同步任务执行完才会执行,所有resolved最后输出.

##### 案例

	function loadImageAsync(url){
	        return new Promise(function(resolve,reject){
	            const image = new Image()
	            image.onload = function(){
	                resolve(image)
	            }
	            image.onerror = function(){
	                reject(new Error('could not load image at' + url))
	            }
	            image.src = url
	        })
	    }
	
没给参数调用的结果

	    loadImageAsync().then(function(value){
	        console.log(value)
	    },function(error){
	        console.log(error)
	    })

Error: could not load image atundefined
    at Image.image.onerror (promise.html:54)


##### 用Promise对象实现的 Ajax 操作的例子。

	const getJSON = function(url){
	    const promise = new Promise(function (resolve,reject) {
	        const handler = function(){
	            if (this.readyState !== 4){
	                return
	            }
	            if (this.status === 200) {
	                resolve(this.response)
	            } else {
	                reject(new Error(this.statusText))
	            }
	        }
	        const client = new XMLHttpRequest()
	        client.open("GET",url)
	        client.onreadystatechange = handler
	        client.responseType = "json"
	        client.setRequestHeader("Accept","application/json")
	        client.send()
	      })
	      return promise
	}
	    getJSON("/post.json").then(function(json){
	        console.log('Contents:' + json)
	    },function(error){
	        console.error('c出错了', error)
	    })
上面代码中，getJSON是对 XMLHttpRequest 对象的封装，用于发出一个针对 JSON 数据的 HTTP 请求，并且返回一个Promise对象。需要注意的是，在getJSON内部，resolve函数和reject函数调用时，都带有参数。


如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。reject函数的参数通常是Error对象的实例，表示抛出的错误；resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样。

	
	const p1 = new Promise(function (resolve, reject) {
	  // ...
	});
	
	const p2 = new Promise(function (resolve, reject) {
	  // ...
	  resolve(p1);
	})

注意，这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是resolved或者rejected，那么p2的回调函数将会立刻执行。

	const p1 = new Promise(function (resolve, reject) {
	  setTimeout(() => reject(new Error('fail')), 3000)
	})
	
	const p2 = new Promise(function (resolve, reject) {
	  setTimeout(() => resolve(p1), 1000)
	})
	
	p2
	  .then(result => console.log(result))
	  .catch(error => console.log(error))
	// Error: fail

上面代码中，p1是一个 Promise，3 秒之后变为rejected。p2的状态在 1 秒之后改变，resolve方法返回的是p1。由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。所以，后面的then语句都变成针对后者（p1）。又过了 2 秒，p1变为rejected，导致触发catch方法指定的回调函数。

注意，调用resolve或reject并不会终结 Promise 的参数函数的执行。

	new Promise((resolve, reject) => {
	  resolve(1);
	  console.log(2);
	}).then(r => {
	  console.log(r);
	});
	// 2
	// 1

上面代码中，调用resolve(1)以后，后面的console.log(2)还是会执行，并且会首先打印出来。这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。

一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。所以，最好在它们前面加上return语句，这样就不会有意外。

	new Promise((resolve, reject) => {
	  return resolve(1);
	  // 后面的语句不会执行
	  console.log(2);
	})

### Promise.prototype.then()

Promise 实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。

then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。

	getJSON("/posts.json").then(function(json) {
	  return json.post;
	}).then(function(post) {
	  // ...
	});

上面的代码使用then方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。

采用链式的then，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。

	getJSON("/post/1.json").then(function(post) {
	  return getJSON(post.commentURL);
	}).then(function funcA(comments) {
	  console.log("resolved: ", comments);
	}, function funcB(err){
	  console.log("rejected: ", err);
	});

上面代码中，第一个then方法指定的回调函数，返回的是另一个Promise对象。这时，第二个then方法指定的回调函数，就会等待这个新的Promise对象状态发生变化。如果变为resolved，就调用funcA，如果状态变为rejected，就调用funcB。

如果采用箭头函数，上面的代码可以写得更简洁。

	getJSON("/post/1.json").then(
	  post => getJSON(post.commentURL)
	).then(
	  comments => console.log("resolved: ", comments),
	  err => console.log("rejected: ", err)
	);

### Promise.prototype.catch()

Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。

	getJSON('/posts.json').then(function(posts) {
	  // ...
	}).catch(function(error) {
	  // 处理 getJSON 和 前一个回调函数运行时发生的错误
	  console.log('发生错误！', error);
	});

上面代码中，getJSON方法返回一个 Promise 对象，如果该对象状态变为resolved，则会调用then方法指定的回调函数；如果异步操作抛出错误，状态就会变为rejected，就会调用catch方法指定的回调函数，处理这个错误。另外，then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获。

	
	p.then((val) => console.log('fulfilled:', val))
	  .catch((err) => console.log('rejected', err));
	
	// 等同于
	p.then((val) => console.log('fulfilled:', val))
	  .then(null, (err) => console.log("rejected:", err));

Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。

	getJSON('/post/1.json').then(function(post) {
	  return getJSON(post.commentURL);
	}).then(function(comments) {
	  // some code
	}).catch(function(error) {
	  // 处理前面三个Promise产生的错误
	});

上面代码中，一共有三个 Promise 对象：一个由getJSON产生，两个由then产生。它们之中任何一个抛出的错误，都会被最后一个catch捕获。

一般来说，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。

	// bad
	promise
	  .then(function(data) {
	    // success
	  }, function(err) {
	    // error
	  });
	
	// good
	promise
	  .then(function(data) { //cb
	    // success
	  })
	  .catch(function(err) {
	    // error
	  });

上面代码中，第二种写法要好于第一种写法，理由是第二种写法可以捕获前面then方法执行中的错误，也更接近同步的写法（try/catch）。因此，建议总是使用catch方法，而不使用then方法的第二个参数。


	Promise.resolve()
	.catch(function(error) {
	  console.log('oh no', error);
	})
	.then(function() {
	  console.log('carry on');
	});
	// carry on

上面的代码因为没有报错，跳过了catch方法，直接执行后面的then方法。此时，要是then方法里面报错，就与前面的catch无关了。

一般总是建议，Promise 对象后面要跟catch方法，这样可以处理 Promise 内部发生的错误。catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法。


### Promise.prototype.finally()

finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
	
	promise
	.then(result => {···})
	.catch(error => {···})
	.finally(() => {···});

上面代码中，不管promise最后的状态，在执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数。

	server.listen(port)
	  .then(function () {
	    // ...
	  })
	  .finally(server.stop);

finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

finally本质上是then方法的特例。

	promise
	.finally(() => {
	  // 语句
	});
	
	// 等同于
	promise
	.then(
	  result => {
	    // 语句
	    return result;
	  },
	  error => {
	    // 语句
	    throw error;
	  }
	);

上面代码中，如果不使用finally方法，同样的语句需要为成功和失败两种情况各写一次。有了finally方法，则只需要写一次。

	Promise.prototype.finally = function (callback) {
	  let P = this.constructor;
	  return this.then(
	    value  => P.resolve(callback()).then(() => value),
	    reason => P.resolve(callback()).then(() => { throw reason })
	  );
	};

上面代码中，不管前面的 Promise 是fulfilled还是rejected，都会执行回调函数callback。

从上面的实现还可以看到，finally方法总是会返回原来的值。

	// resolve 的值是 undefined
	Promise.resolve(2).then(() => {}, () => {})
	
	// resolve 的值是 2
	Promise.resolve(2).finally(() => {})
	
	// reject 的值是 undefined
	Promise.reject(3).then(() => {}, () => {})
	
	// reject 的值是 3
	Promise.reject(3).finally(() => {})


### Promise.all()

Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

	const p = Promise.all([p1, p2, p3]);

上面代码中，Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。（Promise.all方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。）

p的状态由p1、p2、p3决定，分成两种情况。

（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
	
	// 生成一个Promise对象的数组
	
	const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
	  return getJSON('/post/' + id + ".json");
	});
	
	Promise.all(promises).then(function (posts) {
	  // ...
	}).catch(function(reason){
	  // ...
	});

上面代码中，promises是包含 6 个 Promise 实例的数组，只有这 6 个实例的状态都变成fulfilled，或者其中有一个变为rejected，才会调用Promise.all方法后面的回调函数。

	const databasePromise = connectDatabase();
	
	const booksPromise = databasePromise
	  .then(findAllBooks);
	
	const userPromise = databasePromise
	  .then(getCurrentUser);
	
	Promise.all([
	  booksPromise,
	  userPromise
	])
	.then(([books, user]) => pickTopRecommentations(books, user));

上面代码中，booksPromise和userPromise是两个异步操作，只有等到它们的结果都返回了，才会触发pickTopRecommentations这个回调函数。

注意，如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。

	const p1 = new Promise((resolve, reject) => {
	  resolve('hello');
	})
	.then(result => result)
	.catch(e => e);
	
	const p2 = new Promise((resolve, reject) => {
	  throw new Error('报错了');
	})
	.then(result => result)
	.catch(e => e);
	
	Promise.all([p1, p2])
	.then(result => console.log(result))
	.catch(e => console.log(e));
	// ["hello", Error: 报错了]

上面代码中，p1会resolved，p2首先会rejected，但是p2有自己的catch方法，该方法返回的是一个新的 Promise 实例，p2指向的实际上是这个实例。该实例执行完catch方法后，也会变成resolved，导致Promise.all()方法参数里面的两个实例都会resolved，因此会调用then方法指定的回调函数，而不会调用catch方法指定的回调函数。

如果p2没有自己的catch方法，就会调用Promise.all()的catch方法。

	const p1 = new Promise((resolve, reject) => {
	  resolve('hello');
	})
	.then(result => result);
	
	const p2 = new Promise((resolve, reject) => {
	  throw new Error('报错了');
	})
	.then(result => result);
	
	Promise.all([p1, p2])
	.then(result => console.log(result))
	.catch(e => console.log(e));
	// Error: 报错了

### Promise.race()

Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

	const p = Promise.race([p1, p2, p3]);
上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

Promise.race方法的参数与Promise.all方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。

下面是一个例子，如果指定时间内没有获得结果，就将 Promise 的状态变为reject，否则变为resolve。

	const p = Promise.race([
	  fetch('/resource-that-may-take-a-while'),
	  new Promise(function (resolve, reject) {
	    setTimeout(() => reject(new Error('request timeout')), 5000)
	  })
	]);
	
	p
	.then(console.log)
	.catch(console.error);

上面代码中，如果 5 秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数。


### Promise.resolve()

有时需要将现有对象转为 Promise 对象，Promise.resolve方法就起到这个作用

	const jsPromise = Promise.resolve($.ajax('/whatever.json'));

上面代码将 jQuery 生成的deferred对象，转为一个新的 Promise 对象。
Promise.resolve等价于下面的写法。

	Promise.resolve('foo')
	// 等价于
	new Promise(resolve => resolve('foo'))


### 应用

#### 加载图片

我们可以将图片的加载写成一个Promise，一旦加载完成，Promise的状态就发生变化。

	const preloadImage = function (path) {
	  return new Promise(function (resolve, reject) {
	    const image = new Image();
	    image.onload  = resolve;
	    image.onerror = reject;
	    image.src = path;
	  });
	};

#### Generator与Promise的结合

使用 Generator 函数管理流程，遇到异步操作的时候，通常返回一个Promise对象。

	function getFoo () {
	  return new Promise(function (resolve, reject){
	    resolve('foo');
	  });
	}
	
	const g = function* () {
	  try {
	    const foo = yield getFoo();
	    console.log(foo);
	  } catch (e) {
	    console.log(e);
	  }
	};
	
	function run (generator) {
	  const it = generator();
	
	  function go(result) {
	    if (result.done) return result.value;
	
	    return result.value.then(function (value) {
	      return go(it.next(value));
	    }, function (error) {
	      return go(it.throw(error));
	    });
	  }
	
	  go(it.next());
	}
	
	run(g);