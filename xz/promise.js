Promise 对象
Promise 的含义
Promise 是异步编程的一种解决方案，比传统的解决方案 —— 回调函数和事件 —— 更合理和更强大。它由社区
最早提出和实现， ES6 将其写进了语言标准，统一了用法，原生提供了 Promise  对象。
所谓 Promise  ，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结
果。从语法上说， Promise 是一个对象，从它可以获取异步操作的消息。 Promise 提供统一的 API ，各种异步操
作都可以用同样的方法进行处理。
Promise  对象有以下两个特点。
（ 1 ）对象的状态不受外界影响。 Promise  对象代表一个异步操作，有三种状态： Pending  （进行
中）、 Resolved  （已完成，又称 Fulfilled ）和 Rejected  （已失败）。只有异步操作的结果，可以决定当
前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise  这个名字的由来，它的英语意思就
是 “ 承诺 ” ，表示其他手段无法改变。
（ 2 ）一旦状态改变，就不会再变，任何时候都可以得到这个结果。 Promise  对象的状态改变，只有两种可
能：从 Pending  变为 Resolved  和从 Pending  变为 Rejected  。只要这两种情况发生，状态就凝固了，
不会再变了，会一直保持这个结果。就算改变已经发生了，你再对 Promise  对象添加回调函数，也会立即
得到这个结果。这与事件（ Event ）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果
的。
有了 Promise  对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此
外， Promise  对象提供统一的接口，使得控制异步操作更加容易。
Promise  也有一些缺点。首先，无法取消 Promise  ，一旦新建它就会立即执行，无法中途取消。其次，
如果不设置回调函数， Promise  内部抛出的错误，不会反应到外部。第三，当处于 Pending  状态时，无
法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
如果某些事件不断地反复发生，一般来说，使用 stream 模式是比部署 Promise  更好的选择。


基本用法
ES6 规定， Promise 对象是一个构造函数，用来生成 Promise 实例。
下面代码创造了一个 Promise 实例。
var promise = new Promise(function(resolve, reject) {
// ... some code
if (/*  异步操作成功 */){
resolve(value);
} else {
reject(error);
}
});
Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve  和 reject  。它们是两个函
数，由 JavaScript 引擎提供，不用自己部署。
resolve  函数的作用是，将 Promise 对象的状态从 “ 未完成 ” 变为 “ 成功 ” （即从 Pending 变为 Resolved ），在异
步操作成功时调用，并将异步操作的结果，作为参数传递出去； reject  函数的作用是，将 Promise 对象的
状态从 “ 未完成 ” 变为 “ 失败 ” （即从 Pending 变为 Rejected ），在异步操作失败时调用，并将异步操作报出的错
误，作为参数传递出去。
Promise 实例生成以后，可以用 then 方法分别指定 Resolved 状态和 Reject 状态的回调函数。
promise.then(function(value) {
// success
}, function(error) {
// failure
});
then  方法可以接受两个回调函数作为参数。第一个回调函数是 Promise 对象的状态变为 Resolved 时调用，第
二个回调函数是 Promise 对象的状态变为 Reject 时调用。其中，第二个函数是可选的，不一定要提供。这两个
函数都接受 Promise 对象传出的值作为参数。
下面是一个 Promise 对象的简单例子。
function timeout(ms) {
return new Promise((resolve, reject) => {
setTimeout(resolve, ms, 'done');
});
}
timeout(100).then((value) => {
console.log(value);
});
上面代码中， timeout  方法返回一个 Promise 实例，表示一段时间以后才会发生的结果。过了指定的时间
（ ms  参数）以后， Promise 实例的状态变为 Resolved ，就会触发 then  方法绑定的回调函数。
Promise 新建后就会立即执行。
let promise = new Promise(function(resolve, reject) {
console.log('Promise');
resolve();
});
promise.then(function() {
console.log('Resolved.');
});
console.log('Hi!');
// Promise
// Hi!
// Resolved
上面代码中， Promise 新建后立即执行，所以首先输出的是 “Promise” 。然后， then  方法指定的回调函数，
将在当前脚本所有同步任务执行完才会执行，所以 “Resolved” 最后输出。
下面是异步加载图片的例子。
function loadImageAsync(url) {
return new Promise(function(resolve, reject) {
var image = new Image();
image.onload = function() {
resolve(image);
};
image.onerror = function() {
reject(new Error('Could not load image at ' + url));
};
image.src = url;
});
}
下面是一个用 Promise 对象实现的 Ajax 操作的例子。
var getJSON = function(url) {
var promise = new Promise(function(resolve, reject){
var client = new XMLHttpRequest();
client.open("GET", url);
client.onreadystatechange = handler;
client.responseType = "json";
client.setRequestHeader("Accept", "application/json");
client.send();
function handler() {
if (this.readyState !== 4) {
return;
}
if (this.status === 200) {
resolve(this.response);
} else {
reject(new Error(this.statusText));
}
};
});
return promise;
};
getJSON("/posts.json").then(function(json) {
console.log('Contents: ' + json);
}, function(error) {
console.error(' 出错了 ', error);
});
上面代码中， getJSON  是对 XMLHttpRequest 对象的封装，用于发出一个针对 JSON 数据的 HTTP 请求，并且
返回一个 Promise 对象。需要注意的是，在 getJSON  内部， resolve  函数和 reject  函数调用时，都带有
参数。
如果调用 resolve  函数和 reject  函数时带有参数，那么它们的参数会被传递给回调函数。 reject  函
数的参数通常是 Error 对象的实例，表示抛出的错误； resolve  函数的参数除了正常的值以外，还可能是另
一个 Promise 实例，表示异步操作的结果有可能是一个值，也有可能是另一个异步操作，比如像下面这样。
var p1 = new Promise(function(resolve, reject){
// ...
});
var p2 = new Promise(function(resolve, reject){
// ...
resolve(p1);
})
上面代码中， p1  和 p2  都是 Promise 的实例，但是 p2  的 resolve  方法将 p1  作为参数，即一个异步
操作的结果是返回另一个异步操作。
注意，这时 p1  的状态就会传递给 p2  ，也就是说， p1  的状态决定了 p2  的状态。如果 p1  的状态
是 Pending  ，那么 p2  的回调函数就会等待 p1  的状态改变；如果 p1  的状态已经是 Resolved  或
者 Rejected  ，那么 p2  的回调函数将会立刻执行。
var p1 = new Promise(function (resolve, reject) {
setTimeout(() => reject(new Error('fail')), 3000)
})
var p2 = new Promise(function (resolve, reject) {
setTimeout(() => resolve(p1), 1000)
})
p2.then(result => console.log(result))
p2.catch(error => console.log(error))
// Error: fail
上面代码中， p1  是一个 Promise ， 3 秒之后变为 rejected  。 p2  的状态由 p1  决定， 1 秒之后， p2  调
用 resolve  方法，但是此时 p1  的状态还没有改变，因此 p2  的状态也不会变。又过了 2 秒， p1  变
为 rejected  ， p2  也跟着变为 rejected  。基本用法
ES6 规定， Promise 对象是一个构造函数，用来生成 Promise 实例。
下面代码创造了一个 Promise 实例。
var promise = new Promise(function(resolve, reject) {
// ... some code
if (/*  异步操作成功 */){
resolve(value);
} else {
reject(error);
}
});
Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve  和 reject  。它们是两个函
数，由 JavaScript 引擎提供，不用自己部署。
resolve  函数的作用是，将 Promise 对象的状态从 “ 未完成 ” 变为 “ 成功 ” （即从 Pending 变为 Resolved ），在异
步操作成功时调用，并将异步操作的结果，作为参数传递出去； reject  函数的作用是，将 Promise 对象的
状态从 “ 未完成 ” 变为 “ 失败 ” （即从 Pending 变为 Rejected ），在异步操作失败时调用，并将异步操作报出的错
误，作为参数传递出去。
Promise 实例生成以后，可以用 then 方法分别指定 Resolved 状态和 Reject 状态的回调函数。
promise.then(function(value) {
// success
}, function(error) {
// failure
});
then  方法可以接受两个回调函数作为参数。第一个回调函数是 Promise 对象的状态变为 Resolved 时调用，第
二个回调函数是 Promise 对象的状态变为 Reject 时调用。其中，第二个函数是可选的，不一定要提供。这两个
函数都接受 Promise 对象传出的值作为参数。
下面是一个 Promise 对象的简单例子。
function timeout(ms) {
return new Promise((resolve, reject) => {
setTimeout(resolve, ms, 'done');
});
}
timeout(100).then((value) => {
console.log(value);
});
上面代码中， timeout  方法返回一个 Promise 实例，表示一段时间以后才会发生的结果。过了指定的时间
（ ms  参数）以后， Promise 实例的状态变为 Resolved ，就会触发 then  方法绑定的回调函数。
Promise 新建后就会立即执行。
let promise = new Promise(function(resolve, reject) {
console.log('Promise');
resolve();
});
promise.then(function() {
console.log('Resolved.');
});
console.log('Hi!');
// Promise
// Hi!
// Resolved
上面代码中， Promise 新建后立即执行，所以首先输出的是 “Promise” 。然后， then  方法指定的回调函数，
将在当前脚本所有同步任务执行完才会执行，所以 “Resolved” 最后输出。
下面是异步加载图片的例子。
function loadImageAsync(url) {
return new Promise(function(resolve, reject) {
var image = new Image();
image.onload = function() {
resolve(image);
};
image.onerror = function() {
reject(new Error('Could not load image at ' + url));
};
image.src = url;
});
}
下面是一个用 Promise 对象实现的 Ajax 操作的例子。
var getJSON = function(url) {
var promise = new Promise(function(resolve, reject){
var client = new XMLHttpRequest();
client.open("GET", url);
client.onreadystatechange = handler;
client.responseType = "json";
client.setRequestHeader("Accept", "application/json");
client.send();
function handler() {
if (this.readyState !== 4) {
return;
}
if (this.status === 200) {
resolve(this.response);
} else {
reject(new Error(this.statusText));
}
};
});
return promise;
};
getJSON("/posts.json").then(function(json) {
console.log('Contents: ' + json);
}, function(error) {
console.error(' 出错了 ', error);
});
上面代码中， getJSON  是对 XMLHttpRequest 对象的封装，用于发出一个针对 JSON 数据的 HTTP 请求，并且
返回一个 Promise 对象。需要注意的是，在 getJSON  内部， resolve  函数和 reject  函数调用时，都带有
参数。
如果调用 resolve  函数和 reject  函数时带有参数，那么它们的参数会被传递给回调函数。 reject  函
数的参数通常是 Error 对象的实例，表示抛出的错误； resolve  函数的参数除了正常的值以外，还可能是另
一个 Promise 实例，表示异步操作的结果有可能是一个值，也有可能是另一个异步操作，比如像下面这样。
var p1 = new Promise(function(resolve, reject){
// ...
});
var p2 = new Promise(function(resolve, reject){
// ...
resolve(p1);
})
上面代码中， p1  和 p2  都是 Promise 的实例，但是 p2  的 resolve  方法将 p1  作为参数，即一个异步
操作的结果是返回另一个异步操作。
注意，这时 p1  的状态就会传递给 p2  ，也就是说， p1  的状态决定了 p2  的状态。如果 p1  的状态
是 Pending  ，那么 p2  的回调函数就会等待 p1  的状态改变；如果 p1  的状态已经是 Resolved  或
者 Rejected  ，那么 p2  的回调函数将会立刻执行。
var p1 = new Promise(function (resolve, reject) {
setTimeout(() => reject(new Error('fail')), 3000)
})
var p2 = new Promise(function (resolve, reject) {
setTimeout(() => resolve(p1), 1000)
})
p2.then(result => console.log(result))
p2.catch(error => console.log(error))
// Error: fail
上面代码中， p1  是一个 Promise ， 3 秒之后变为 rejected  。 p2  的状态由 p1  决定， 1 秒之后， p2  调
用 resolve  方法，但是此时 p1  的状态还没有改变，因此 p2  的状态也不会变。又过了 2 秒， p1  变
为 rejected  ， p2  也跟着变为 rejected  。

Promise.prototype.then()
Promise 实例具有 then  方法，也就是说， then  方法是定义在原型对象 Promise.prototype 上的。它的作用是
为 Promise 实例添加状态改变时的回调函数。前面说过， then  方法的第一个参数是 Resolved 状态的回调函
数，第二个参数（可选）是 Rejected 状态的回调函数。
then  方法返回的是一个新的 Promise 实例（注意，不是原来那个 Promise 实例）。因此可以采用链式写法，
即 then  方法后面再调用另一个 then  方法。
getJSON("/posts.json").then(function(json) {
return json.post;
}).then(function(post) {
// ...
});
上面的代码使用 then  方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参
数，传入第二个回调函数。
采用链式的 then  ，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一
个 Promise 对象（即有异步操作），这时后一个回调函数，就会等待该 Promise 对象的状态发生变化，才会被
调用。
getJSON("/post/1.json").then(function(post) {
return getJSON(post.commentURL);
}).then(function funcA(comments) {
console.log("Resolved: ", comments);
}, function funcB(err){
console.log("Rejected: ", err);
});
上面代码中，第一个 then  方法指定的回调函数，返回的是另一个 Promise 对象。这时，第二个 then  方法
指定的回调函数，就会等待这个新的 Promise 对象状态发生变化。如果变为 Resolved ，就调用 funcA  ，如果
状态变为 Rejected ，就调用 funcB  。
如果采用箭头函数，上面的代码可以写得更简洁。
getJSON("/post/1.json").then(
post => getJSON(post.commentURL)
).then(
comments => console.log("Resolved: ", comments),
err => console.log("Rejected: ", err)
);

Promise.prototype.catch()
Promise.prototype.catch  方法是 .then(null, rejection)  的别名，用于指定发生错误时的回调函数。
getJSON("/posts.json").then(function(posts) {
// ...
}).catch(function(error) {
//  处理 getJSON  和 前一个回调函数运行时发生的错误
console.log(' 发生错误！ ', error);
});
上面代码中， getJSON  方法返回一个 Promise 对象，如果该对象状态变为 Resolved  ，则会调用 then  方
法指定的回调函数；如果异步操作抛出错误，状态就会变为 Rejected  ，就会调用 catch  方法指定的回调
函数，处理这个错误。另外， then  方法指定的回调函数，如果运行中抛出错误，也会被 catch  方法捕
获。
p.then((val) => console.log("fulfilled:", val))
.catch((err) => console.log("rejected:", err));
//  等同于
p.then((val) => console.log(fulfilled:", val))
.then(null, (err) => console.log("rejected:", err));
下面是一个例子。
var promise = new Promise(function(resolve, reject) {
throw new Error('test');
});
promise.catch(function(error) {
console.log(error);
});
// Error: test
上面代码中， promise  抛出一个错误，就被 catch  方法指定的回调函数捕获。注意，上面的写法与下面
两种写法是等价的。
//  写法一
var promise = new Promise(function(resolve, reject) {
try {
throw new Error('test');
} catch(e) {
reject(e);
}
});
promise.catch(function(error) {
console.log(error);
});
//  写法二
var promise = new Promise(function(resolve, reject) {
reject(new Error('test'));
});
promise.catch(function(error) {
console.log(error);
});
比较上面两种写法，可以发现 reject  方法的作用，等同于抛出错误。
如果 Promise 状态已经变成 Resolved  ，再抛出错误是无效的。
var promise = new Promise(function(resolve, reject) {
resolve('ok');
throw new Error('test');
});
promise
.then(function(value) { console.log(value) })
.catch(function(error) { console.log(error) });
// ok
上面代码中， Promise 在 resolve  语句后面，再抛出错误，不会被捕获，等于没有抛出。
Promise 对象的错误具有 “ 冒泡 ” 性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一
个 catch  语句捕获。
getJSON("/post/1.json").then(function(post) {
return getJSON(post.commentURL);
}).then(function(comments) {
// some code
}).catch(function(error) {
//  处理前面三个 Promise 产生的错误
});
上面代码中，一共有三个 Promise 对象：一个由 getJSON  产生，两个由 then  产生。它们之中任何一个抛
出的错误，都会被最后一个 catch  捕获。
一般来说，不要在 then  方法里面定义 Reject 状态的回调函数（即 then  的第二个参数），总是使
用 catch  方法。
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
上面代码中，第二种写法要好于第一种写法，理由是第二种写法可以捕获前面 then  方法执行中的错误，也
更接近同步的写法（ try/catch  ）。因此，建议总是使用 catch  方法，而不使用 then  方法的第二个参
数。
跟传统的 try/catch  代码块不同的是，如果没有使用 catch  方法指定错误处理的回调函数， Promise 对象
抛出的错误不会传递到外层代码，即不会有任何反应。
var someAsyncThing = function() {
return new Promise(function(resolve, reject) {
//  下面一行会报错，因为 x 没有声明
resolve(x + 2);
});
};
someAsyncThing().then(function() {
console.log('everything is great');
});
上面代码中， someAsyncThing  函数产生的 Promise 对象会报错，但是由于没有指定 catch  方法，这个错
误不会被捕获，也不会传递到外层代码，导致运行后没有任何输出。注意， Chrome 浏览器不遵守这条规定，
它会抛出错误 “ReferenceError: x is not defined” 。
var promise = new Promise(function(resolve, reject) {
resolve("ok");
setTimeout(function() { throw new Error('test') }, 0)
});
promise.then(function(value) { console.log(value) });
// ok
// Uncaught Error: test
上面代码中， Promise 指定在下一轮 “ 事件循环 ” 再抛出错误，结果由于没有指定使用 try...catch  语句，就
冒泡到最外层，成了未捕获的错误。因为此时， Promise 的函数体已经运行结束了，所以这个错误是在
Promise 函数体外抛出的。
Node.js 有一个 unhandledRejection  事件，专门监听未捕获的 reject  错误。
process.on('unhandledRejection', function (err, p) {
console.error(err.stack)
});
上面代码中， unhandledRejection  事件的监听函数有两个参数，第一个是错误对象，第二个是报错的
Promise 实例，它可以用来了解发生错误的环境信息。。
需要注意的是， catch  方法返回的还是一个 Promise 对象，因此后面还可以接着调用 then  方法。
var someAsyncThing = function() {
return new Promise(function(resolve, reject) {
//  下面一行会报错，因为 x 没有声明
resolve(x + 2);
});
};
someAsyncThing()
.catch(function(error) {
console.log('oh no', error);
})
.then(function() {
console.log('carry on');
});
// oh no [ReferenceError: x is not defined]
// carry on
上面代码运行完 catch  方法指定的回调函数，会接着运行后面那个 then  方法指定的回调函数。如果没有
报错，则会跳过 catch  方法。
Promise.resolve()
.catch(function(error) {
console.log('oh no', error);
})
.then(function() {
console.log('carry on');
});
// carry on
上面的代码因为没有报错，跳过了 catch  方法，直接执行后面的 then  方法。此时，要是 then  方法里
面报错，就与前面的 catch  无关了。
catch  方法之中，还能再抛出错误。
var someAsyncThing = function() {
return new Promise(function(resolve, reject) {
//  下面一行会报错，因为 x 没有声明
resolve(x + 2);
});
};
someAsyncThing().then(function() {
return someOtherAsyncThing();
}).catch(function(error) {
console.log('oh no', error);
//  下面一行会报错，因为 y 没有声明
y + 2;
}).then(function() {
console.log('carry on');
});
// oh no [ReferenceError: x is not defined]
上面代码中， catch  方法抛出一个错误，因为后面没有别的 catch  方法了，导致这个错误不会被捕获，
也不会传递到外层。如果改写一下，结果就不一样了。
someAsyncThing().then(function() {
return someOtherAsyncThing();
}).catch(function(error) {
console.log('oh no', error);
//  下面一行会报错，因为 y 没有声明
y + 2;
}).catch(function(error) {
console.log('carry on', error);
});
// oh no [ReferenceError: x is not defined]
// carry on [ReferenceError: y is not defined]
上面代码中，第二个 catch  方法用来捕获，前一个 catch  方法抛出的错误。
Promise.all()
Promise.all  方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
var p = Promise.all([p1, p2, p3]);
上面代码中， Promise.all  方法接受一个数组作为参数， p1  、 p2  、 p3  都是 Promise 对象的实例，如
果不是，就会先调用下面讲到的 Promise.resolve  方法，将参数转为 Promise 实例，再进一步处理。
（ Promise.all  方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。
）
p  的状态由 p1  、 p2  、 p3  决定，分成两种情况。
（ 1 ）只有 p1  、 p2  、 p3  的状态都变成 fulfilled  ， p  的状态才会变成 fulfilled  ，此
时 p1  、 p2  、 p3  的返回值组成一个数组，传递给 p  的回调函数。
（ 2 ）只要 p1  、 p2  、 p3  之中有一个被 rejected  ， p  的状态就变成 rejected  ，此时第一个
被 reject  的实例的返回值，会传递给 p  的回调函数。
下面是一个具体的例子。
//  生成一个 Promise 对象的数组
var promises = [2, 3, 5, 7, 11, 13].map(function (id) {
return getJSON("/post/" + id + ".json");
});
Promise.all(promises).then(function (posts) {
// ...
}).catch(function(reason){
// ...
});
上面代码中， promises  是包含 6 个 Promise 实例的数组，只有这 6 个实例的状态都变成 fulfilled  ，或者
其中有一个变为 rejected  ，才会调用 Promise.all  方法后面的回调函数。
下面是另一个例子。
const databasePromise = connectDatabase();
const booksPromise = databaseProimse
.then(findAllBooks);
const userPromise = databasePromise
.then(getCurrentUser);
Promise.all([
booksPromise,
userPromise
])
.then(([books, user]) => pickTopRecommentations(books, user));
上面代码中， booksPromise  和 userPromise  是两个异步操作，只有等到它们的结果都返回了，才会触
发 pickTopRecommentations  这个回调函数。
Promise.race()
Promise.race  方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
var p = Promise.race([p1,p2,p3]);
上面代码中，只要 p1  、 p2  、 p3  之中有一个实例率先改变状态， p  的状态就跟着改变。那个率先改
变的 Promise 实例的返回值，就传递给 p  的回调函数。
Promise.race  方法的参数与 Promise.all  方法一样，如果不是 Promise 实例，就会先调用下面讲到
的 Promise.resolve  方法，将参数转为 Promise 实例，再进一步处理。
下面是一个例子，如果指定时间内没有获得结果，就将 Promise 的状态变为 reject  ，否则变
为 resolve  。
var p = Promise.race([
fetch('/resource-that-may-take-a-while'),
new Promise(function (resolve, reject) {
setTimeout(() => reject(new Error('request timeout')), 5000)
})
])
p.then(response => console.log(response))
p.catch(error => console.log(error))
上面代码中，如果 5 秒之内 fetch  方法无法返回结果，变量 p  的状态就会变为 rejected  ，从而触
发 catch  方法指定的回调函数。
Promise.resolve()
有时需要将现有对象转为 Promise 对象， Promise.resolve  方法就起到这个作用。
var jsPromise = Promise.resolve($.ajax('/whatever.json'));
上面代码将 jQuery 生成的 deferred  对象，转为一个新的 Promise 对象。
Promise.resolve  等价于下面的写法。
Promise.resolve('foo')
//  等价于
new Promise(resolve => resolve('foo'))
Promise.resolve  方法的参数分成四种情况。
（ 1 ）参数是一个 Promise 实例
如果参数是 Promise 实例，那么 Promise.resolve  将不做任何修改、原封不动地返回这个实例。
（ 2 ）参数是一个 thenable  对象
thenable  对象指的是具有 then  方法的对象，比如下面这个对象。
let thenable = {
then: function(resolve, reject) {
resolve(42);
}
};
Promise.resolve  方法会将这个对象转为 Promise 对象，然后就立即执行 thenable  对象的 then  方法。
let thenable = {
then: function(resolve, reject) {
resolve(42);
}
};
let p1 = Promise.resolve(thenable);
p1.then(function(value) {
console.log(value); // 42
});
上面代码中， thenable  对象的 then  方法执行后，对象 p1  的状态就变为 resolved  ，从而立即执行最
后那个 then  方法指定的回调函数，输出 42 。
（ 3 ）参数不是具有 then  方法的对象，或根本就不是对象
如果参数是一个原始值，或者是一个不具有 then  方法的对象，则 Promise.resolve  方法返回一个新的
Promise 对象，状态为 Resolved  。
var p = Promise.resolve('Hello');
p.then(function (s){
console.log(s)
});
// Hello
上面代码生成一个新的 Promise 对象的实例 p  。由于字符串 Hello  不属于异步操作（判断方法是它不是具
有 then 方法的对象），返回 Promise 实例的状态从一生成就是 Resolved  ，所以回调函数会立即执
行。 Promise.resolve  方法的参数，会同时传给回调函数。
（ 4 ）不带有任何参数
Promise.resolve  方法允许调用时不带参数，直接返回一个 Resolved  状态的 Promise 对象。
所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用 Promise.resolve  方法。
var p = Promise.resolve();
p.then(function () {
// ...
});
上面代码的变量 p  就是一个 Promise 对象。
Promise.reject()
Promise.reject(reason)  方法也会返回一个新的 Promise 实例，该实例的状态为 rejected  。它的参数用
法与 Promise.resolve  方法完全一致。
var p = Promise.reject(' 出错了 ');
//  等同于
var p = new Promise((resolve, reject) => reject(' 出错了 '))
p.then(null, function (s){
console.log(s)
});
//  出错了
上面代码生成一个 Promise 对象的实例 p  ，状态为 rejected  ，回调函数会立即执行。
两个有用的附加方法
ES6 的 Promise API 提供的方法不是很多，有些有用的方法可以自己部署。下面介绍如何部署两个不在 ES6 之
中、但很有用的方法。
done()
Promise 对象的回调链，不管以 then  方法或 catch  方法结尾，要是最后一个方法抛出错误，都有可能无
法捕捉到（因为 Promise 内部的错误不会冒泡到全局）。因此，我们可以提供一个 done  方法，总是处于回
调链的尾端，保证抛出任何可能出现的错误。
asyncFunc()
.then(f1)
.catch(r1)
.then(f2)
.done();
它的实现代码相当简单。
Promise.prototype.done = function (onFulfilled, onRejected) {
this.then(onFulfilled, onRejected)
.catch(function (reason) {
//  抛出一个全局错误
setTimeout(() => { throw reason }, 0);
});
};
从上面代码可见， done  方法的使用，可以像 then  方法那样用，提供 Fulfilled  和 Rejected  状态的
回调函数，也可以不提供任何参数。但不管怎样， done  都会捕捉到任何可能出现的错误，并向全局抛出。
finally()
finally  方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。它与 done  方法的最大区别，
它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。
下面是一个例子，服务器使用 Promise 处理请求，然后使用 finally  方法关掉服务器。
server.listen(0)
.then(function () {
// run test
})
.finally(server.stop);
它的实现也很简单。
Promise.prototype.finally = function (callback) {
let P = this.constructor;
return this.then(
value => P.resolve(callback()).then(() => value),
reason => P.resolve(callback()).then(() => { throw reason })
);
};
上面代码中，不管前面的 Promise 是 fulfilled  还是 rejected  ，都会执行回调函数 callback  。
应用
加载图片
我们可以将图片的加载写成一个 Promise  ，一旦加载完成， Promise  的状态就发生变化。
const preloadImage = function (path) {
return new Promise(function (resolve, reject) {
var image = new Image();
image.onload = resolve;
image.onerror = reject;
image.src = path;
});
};
Generator 函数与 Promise 的结合
使用 Generator 函数管理流程，遇到异步操作的时候，通常返回一个 Promise  对象。
function getFoo () {
return new Promise(function (resolve, reject){
resolve('foo');
});
}
var g = function* () {
try {
var foo = yield getFoo();
console.log(foo);
} catch (e) {
console.log(e);
}
};
function run (generator) {
var it = generator();
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
上面代码的 Generator 函数 g  之中，有一个异步操作 getFoo  ，它返回的就是一个 Promise  对象。函
数 run  用来处理这个 Promise  对象，并调用下一个 next  方法。
async 函数
async 函数与 Promise 、 Generator 函数一样，是用来取代回调函数、解决异步操作的一种方法。它本质上是
Generator 函数的语法糖。 async 函数并不属于 ES6 ，而是被列入了 ES7 ，但是 traceur 、 Babel.js 、 regenerator 等转
码器已经支持这个功能，转码后立刻就能使用。
async 函数的详细介绍，请看《异步操作》一章。
异步操作和 Async 函数


异步编程对 JavaScript 语言太重要。 Javascript 语言的执行环境是 “ 单线程 ” 的，如果没有异步编程，根本没法
用，非卡死不可。
ES6 诞生以前，异步编程的方法，大概有下面四种。
回调函数
事件监听
发布 / 订阅
Promise  对象
ES6 将 JavaScript 异步编程带入了一个全新的阶段， ES7 的 Async  函数更是提出了异步编程的终极解决方案。
基本概念
异步
所谓 " 异步 " ，简单说就是一个任务分成两段，先执行第一段，然后转而执行其他任务，等做好了准备，再回
过头执行第二段。
比如，有一个任务是读取文件进行处理，任务的第一段是向操作系统发出请求，要求读取文件。然后，程序
执行其他任务，等到操作系统返回文件，再接着执行任务的第二段（处理文件）。这种不连续的执行，就叫
做异步。
相应地，连续的执行就叫做同步。由于是连续执行，不能插入其他任务，所以操作系统从硬盘读取文件的这
段时间，程序只能干等着。
回调函数
JavaScript 语言对异步编程的实现，就是回调函数。所谓回调函数，就是把任务的第二段单独写在一个函数里
面，等到重新执行这个任务的时候，就直接调用这个函数。它的英语名字 callback ，直译过来就是 " 重新调
用 " 。
读取文件进行处理，是这样写的。
fs.readFile('/etc/passwd', function (err, data) {
if (err) throw err;
console.log(data);
});
上面代码中， readFile 函数的第二个参数，就是回调函数，也就是任务的第二段。等到操作系统返回
了 /etc/passwd  这个文件以后，回调函数才会执行。
一个有趣的问题是，为什么 Node.js 约定，回调函数的第一个参数，必须是错误对象 err （如果没有错误，该参
数就是 null ）？原因是执行分成两段，在这两段之间抛出的错误，程序无法捕捉，只能当作参数，传入第二
段。
Promise
回调函数本身并没有问题，它的问题出现在多个回调函数嵌套。假定读取 A 文件之后，再读取 B 文件，代码如
下。
fs.readFile(fileA, function (err, data) {
fs.readFile(fileB, function (err, data) {
// ...
});
});
不难想象，如果依次读取多个文件，就会出现多重嵌套。代码不是纵向发展，而是横向发展，很快就会乱成
一团，无法管理。这种情况就称为 " 回调函数噩梦 " （ callback hell ）。
Promise 就是为了解决这个问题而提出的。它不是新的语法功能，而是一种新的写法，允许将回调函数的横向
加载，改成纵向加载。采用 Promise ，连续读取多个文件，写法如下。
var readFile = require('fs-readfile-promise');
readFile(fileA)
.then(function(data){
console.log(data.toString());
})
.then(function(){
return readFile(fileB);
})
.then(function(data){
console.log(data.toString());
})
.catch(function(err) {
console.log(err);
});
上面代码中，我使用了 fs-readfile-promise 模块，它的作用就是返回一个 Promise 版本的 readFile 函数。 Promise 提
供 then 方法加载回调函数， catch 方法捕捉执行过程中抛出的错误。
可以看到， Promise  的写法只是回调函数的改进，使用 then 方法以后，异步任务的两段执行看得更清楚了，除
此以外，并无新意。
Promise  的最大问题是代码冗余，原来的任务被 Promise  包装了一下，不管什么操作，一眼看去都是一堆
then ，原来的语义变得很不清楚。
那么，有没有更好的写法呢？
Generator 函数
协程
传统的编程语言，早有异步编程的解决方案（其实是多任务的解决方案）。其中有一种叫做 " 协
程 " （ coroutine ），意思是多个线程互相协作，完成异步任务。
协程有点像函数，又有点像线程。它的运行流程大致如下。
第一步，协程 A 开始执行。
第二步，协程 A 执行到一半，进入暂停，执行权转移到协程 B 。
第三步，（一段时间后）协程 B 交还执行权。
第四步，协程 A 恢复执行。
上面流程的协程 A ，就是异步任务，因为它分成两段（或多段）执行。
举例来说，读取文件的协程写法如下。
function *asnycJob() {
// ... 其他代码
var f = yield readFile(fileA);
// ... 其他代码
}
上面代码的函数 asyncJob  是一个协程，它的奥妙就在其中的 yield  命令。它表示执行到此处，执行权将
交给其他协程。也就是说， yield  命令是异步两个阶段的分界线。
协程遇到 yield  命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最大优点，就是代码
的写法非常像同步操作，如果去除 yield 命令，简直一模一样。
Generator 函数的概念
Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。
整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都
用 yield  语句注明。 Generator 函数的执行方法如下。
function* gen(x){
var y = yield x + 2;
return y;
}
var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }
上面代码中，调用 Generator 函数，会返回一个内部指针（即遍历器） g  。这是 Generator 函数不同于普通函数
的另一个地方，即执行它不会返回结果，返回的是指针对象。调用指针 g 的 next 方法，会移动内部指针（即执
行异步任务的第一段），指向第一个遇到的 yield 语句，上例是执行到 x + 2  为止。
换言之， next 方法的作用是分阶段执行 Generator 函数。每次调用 next 方法，会返回一个对象，表示当前阶段的
信息（ value 属性和 done 属性）。 value 属性是 yield 语句后面表达式的值，表示当前阶段的值； done 属性是一个
布尔值，表示 Generator 函数是否执行完毕，即是否还有下一个阶段。
Generator 函数的数据交换和错误处理
Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。除此之外，它还有两个特性，
使它可以作为异步编程的完整解决方案：函数体内外的数据交换和错误处理机制。
next 方法返回值的 value 属性，是 Generator 函数向外输出数据； next 方法还可以接受参数，这是向 Generator 函
数体内输入数据。
function* gen(x){
var y = yield x + 2;
return y;
}
var g = gen(1);
g.next() // { value: 3, done: false }
g.next(2) // { value: 2, done: true }
上面代码中，第一个 next 方法的 value 属性，返回表达式 x + 2  的值（ 3 ）。第二个 next 方法带有参数 2 ，这个
参数可以传入 Generator  函数，作为上个阶段异步任务的返回结果，被函数体内的变量 y 接收。因此，这一步
的 value  属性，返回的就是 2 （变量 y 的值）。
Generator  函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。
function* gen(x){
try {
var y = yield x + 2;
} catch (e){
console.log(e);
}
return y;
}
var g = gen(1);
g.next();
g.throw(' 出错了 ');
//  出错了
上面代码的最后一行， Generator 函数体外，使用指针对象的 throw 方法抛出的错误，可以被函数体内的 try
...catch 代码块捕获。这意味着，出错的代码与处理错误的代码，实现了时间和空间上的分离，这对于异步编
程无疑是很重要的。
异步任务的封装
下面看看如何使用 Generator  函数，执行一个真实的异步任务。
var fetch = require('node-fetch');
function* gen(){
var url = 'https://api.github.com/users/github';
var result = yield fetch(url);
console.log(result.bio);
}
上面代码中， Generator 函数封装了一个异步操作，该操作先读取一个远程接口，然后从 JSON 格式的数据解析
信息。就像前面说过的，这段代码非常像同步操作，除了加上了 yield 命令。
执行这段代码的方法如下。
var g = gen();
var result = g.next();
result.value.then(function(data){
return data.json();
}).then(function(data){
g.next(data);
});
上面代码中，首先执行 Generator 函数，获取遍历器对象，然后使用 next  方法（第二行），执行异步任务的第
一阶段。由于 Fetch 模块返回的是一个 Promise 对象，因此要用 then 方法调用下一个 next  方法。
可以看到，虽然 Generator  函数将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段、
何时执行第二阶段）。

Thunk 函数
参数的求值策略
Thunk 函数早在上个世纪 60 年代就诞生了。
那时，编程语言刚刚起步，计算机学家还在研究，编译器怎么写比较好。一个争论的焦点是 " 求值策略 " ，即
函数的参数到底应该何时求值。
var x = 1;
function f(m){
return m * 2;
}
f(x + 5)
上面代码先定义函数 f ，然后向它传入表达式 x + 5  。请问，这个表达式应该何时求值？
一种意见是 " 传值调用 " （ call by value ），即在进入函数体之前，就计算 x + 5  的值（等于 6 ），再将这个值
传入函数 f  。 C 语言就采用这种策略。
f(x + 5)
//  传值调用时，等同于
f(6)
另一种意见是 " 传名调用 " （ call by name ），即直接将表达式 x + 5  传入函数体，只在用到它的时候求值。
Haskell 语言采用这种策略。
f(x + 5)
//  传名调用时，等同于
(x + 5) * 2
传值调用和传名调用，哪一种比较好？回答是各有利弊。传值调用比较简单，但是对参数求值的时候，实际
上还没用到这个参数，有可能造成性能损失。
function f(a, b){
return b;
}
f(3 * x * x - 2 * x - 1, x);
上面代码中，函数 f 的第一个参数是一个复杂的表达式，但是函数体内根本没用到。对这个参数求值，实际上
是不必要的。因此，有一些计算机学家倾向于 " 传名调用 " ，即只在执行时求值。

Thunk 函数的含义
编译器的 " 传名调用 " 实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时
函数就叫做 Thunk 函数。
function f(m){
return m * 2;
}
f(x + 5);
//  等同于
var thunk = function () {
return x + 5;
};
function f(thunk){
return thunk() * 2;
}
上面代码中，函数 f 的参数 x + 5  被一个函数替换了。凡是用到原参数的地方，对 Thunk  函数求值即可。
这就是 Thunk 函数的定义，它是 " 传名调用 " 的一种实现策略，用来替换某个表达式。

JavaScript 语言的 Thunk 函数
JavaScript 语言是传值调用，它的 Thunk 函数含义有所不同。在 JavaScript 语言中， Thunk 函数替换的不是表达
式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数。
//  正常版本的 readFile （多参数版本）
fs.readFile(fileName, callback);
// Thunk 版本的 readFile （单参数版本）
var readFileThunk = Thunk(fileName);
readFileThunk(callback);
var Thunk = function (fileName){
return function (callback){
return fs.readFile(fileName, callback);
};
};
上面代码中， fs 模块的 readFile 方法是一个多参数函数，两个参数分别为文件名和回调函数。经过转换器处
理，它变成了一个单参数函数，只接受回调函数作为参数。这个单参数版本，就叫做 Thunk 函数。
任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式。下面是一个简单的 Thunk 函数转换器。

var Thunk = function(fn){
return function (){
var args = Array.prototype.slice.call(arguments);
return function (callback){
args.push(callback);
return fn.apply(this, args);
}
};
};
使用上面的转换器，生成 fs.readFile  的 Thunk 函数。
var readFileThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback);

Thunkify 模块
生产环境的转换器，建议使用 Thunkify 模块。
首先是安装。
$ npm install thunkify
使用方式如下。
var thunkify = require('thunkify');
var fs = require('fs');
var read = thunkify(fs.readFile);
read('package.json')(function(err, str){
// ...
});
Thunkify 的源码与上一节那个简单的转换器非常像。

Generator  函数的流程管理
你可能会问， Thunk 函数有什么用？回答是以前确实没什么用，但是 ES6 有了 Generator 函数， Thunk 函数现在
可以用于 Generator 函数的自动流程管理。
以读取文件为例。下面的 Generator 函数封装了两个异步操作。
var fs = require('fs');
var thunkify = require('thunkify');
var readFile = thunkify(fs.readFile);
var gen = function* (){
var r1 = yield readFile('/etc/fstab');
console.log(r1.toString());
var r2 = yield readFile('/etc/shells');
console.log(r2.toString());
};
上面代码中， yield 命令用于将程序的执行权移出 Generator 函数，那么就需要一种方法，将执行权再交还给
Generator 函数。
这种方法就是 Thunk 函数，因为它可以在回调函数里，将执行权交还给 Generator 函数。为了便于理解，我们
先看如何手动执行上面这个 Generator 函数。
var g = gen();
var r1 = g.next();
r1.value(function(err, data){
if (err) throw err;
var r2 = g.next(data);
r2.value(function(err, data){
if (err) throw err;
g.next(data);
});
});
上面代码中，变量 g 是 Generator 函数的内部指针，表示目前执行到哪一步。 next 方法负责将指针移动到下一
步，并返回该步的信息（ value 属性和 done 属性）。
仔细查看上面的代码，可以发现 Generator 函数的执行过程，其实是将同一个回调函数，反复传入 next 方法的
value 属性。这使得我们可以用递归来自动完成这个过程。

Thunk 函数的自动流程管理
Thunk 函数真正的威力，在于可以自动执行 Generator 函数。下面就是一个基于 Thunk 函数的 Generator 执行器。
function run(fn) {
var gen = fn();
function next(err, data) {
var result = gen.next(data);
if (result.done) return;
result.value(next);
}
next();
}
run(gen);
上面代码的 run 函数，就是一个 Generator 函数的自动执行器。内部的 next 函数就是 Thunk 的回调函数。 next 函数
先将指针移到 Generator 函数的下一步（ gen.next 方法），然后判断 Generator 函数是否结束（ result.done  属
性），如果没结束，就将 next 函数再传入 Thunk 函数（ result.value 属性），否则就直接退出。
有了这个执行器，执行 Generator 函数方便多了。不管有多少个异步操作，直接传入 run  函数即可。当然，
前提是每一个异步操作，都要是 Thunk 函数，也就是说，跟在 yield  命令后面的必须是 Thunk 函数。
var gen = function* (){
var f1 = yield readFile('fileA');
var f2 = yield readFile('fileB');
// ...
var fn = yield readFile('fileN');
};
run(gen);
上面代码中，函数 gen  封装了 n  个异步的读取文件操作，只要执行 run  函数，这些操作就会自动完
成。这样一来，异步操作不仅可以写得像同步操作，而且一行代码就可以执行。
Thunk 函数并不是 Generator 函数自动执行的唯一方案。因为自动执行的关键是，必须有一种机制，自动控制
Generator 函数的流程，接收和交还程序的执行权。回调函数可以做到这一点， Promise  对象也可以做到这一
点。

co 模块
基本用法
co 模块是著名程序员 TJ Holowaychuk 于 2013 年 6 月发布的一个小工具，用于 Generator 函数的自动执行。
比如，有一个 Generator 函数，用于依次读取两个文件。
var gen = function* (){
var f1 = yield readFile('/etc/fstab');
var f2 = yield readFile('/etc/shells');
console.log(f1.toString());
console.log(f2.toString());
};
co 模块可以让你不用编写 Generator 函数的执行器。
var co = require('co');
co(gen);
上面代码中， Generator 函数只要传入 co 函数，就会自动执行。
co 函数返回一个 Promise 对象，因此可以用 then 方法添加回调函数。
co(gen).then(function (){
console.log('Generator  函数执行完成 ');
})
上面代码中，等到 Generator 函数执行结束，就会输出一行提示。

co 模块的原理
为什么 co 可以自动执行 Generator 函数？
前面说过， Generator 就是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，能够自
动交回执行权。
两种方法可以做到这一点。
（ 1 ）回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。
（ 2 ） Promise  对象。将异步操作包装成 Promise 对象，用 then 方法交回执行权。
co 模块其实就是将两种自动执行器（ Thunk 函数和 Promise 对象），包装成一个模块。使用 co 的前提条件
是， Generator 函数的 yield 命令后面，只能是 Thunk 函数或 Promise 对象。
上一节已经介绍了基于 Thunk 函数的自动执行器。下面来看，基于 Promise 对象的自动执行器。这是理解 co 模
块必须的。

基于 Promise 对象的自动执行
还是沿用上面的例子。首先，把 fs 模块的 readFile 方法包装成一个 Promise 对象。
var fs = require('fs');
var readFile = function (fileName){
return new Promise(function (resolve, reject){
fs.readFile(fileName, function(error, data){
if (error) reject(error);
resolve(data);
});
});
};
var gen = function* (){
var f1 = yield readFile('/etc/fstab');
var f2 = yield readFile('/etc/shells');
console.log(f1.toString());
console.log(f2.toString());
};
然后，手动执行上面的 Generator 函数。
var g = gen();
g.next().value.then(function(data){
g.next(data).value.then(function(data){
g.next(data);
});
})
手动执行其实就是用 then 方法，层层添加回调函数。理解了这一点，就可以写出一个自动执行器。
function run(gen){
var g = gen();
function next(data){
var result = g.next(data);
if (result.done) return result.value;
result.value.then(function(data){
next(data);
});
}
next();
}
run(gen);
上面代码中，只要 Generator 函数还没执行到最后一步， next 函数就调用自身，以此实现自动执行。

co 模块的源码
co 就是上面那个自动执行器的扩展，它的源码只有几十行，非常简单。
首先， co 函数接受 Generator 函数作为参数，返回一个 Promise  对象。
function co(gen) {
var ctx = this;
return new Promise(function(resolve, reject) {
});
}
在返回的 Promise 对象里面， co 先检查参数 gen 是否为 Generator 函数。如果是，就执行该函数，得到一个内部
指针对象；如果不是就返回，并将 Promise 对象的状态改为 resolved 。
function co(gen) {
var ctx = this;
return new Promise(function(resolve, reject) {
if (typeof gen === 'function') gen = gen.call(ctx);
if (!gen || typeof gen.next !== 'function') return resolve(gen);
});
}
接着， co 将 Generator 函数的内部指针对象的 next 方法，包装成 onFulfilled 函数。这主要是为了能够捕捉抛出的
错误。


含义
ES7 提供了 async  函数，使得异步操作变得更加方便。 async  函数是什么？一句话， async  函数就是
Generator 函数的语法糖。
前文有一个 Generator 函数，依次读取两个文件。
var fs = require('fs');
var readFile = function (fileName){
return new Promise(function (resolve, reject){
fs.readFile(fileName, function(error, data){
if (error) reject(error);
resolve(data);
});
});
};
var gen = function* (){
var f1 = yield readFile('/etc/fstab');
var f2 = yield readFile('/etc/shells');
console.log(f1.toString());
console.log(f2.toString());
};
写成 async  函数，就是下面这样。
var asyncReadFile = async function (){
var f1 = await readFile('/etc/fstab');
var f2 = await readFile('/etc/shells');
console.log(f1.toString());
console.log(f2.toString());
};
一比较就会发现， async  函数就是将 Generator 函数的星号（ *  ）替换成 async  ，将 yield  替换
成 await  ，仅此而已。

async  函数对 Generator  函数的改进，体现在以下四点。
（ 1 ）内置执行器。 Generator 函数的执行必须靠执行器，所以才有了 co  模块，而 async  函数自带执行
器。也就是说， async  函数的执行，与普通函数一模一样，只要一行。
var result = asyncReadFile();
上面的代码调用了 asyncReadFile  函数，然后它就会自动执行，输出最后结果。这完全不像 Generator 函
数，需要调用 next  方法，或者用 co  模块，才能得到真正执行，得到最后结果

（ 2 ）更好的语义。 async  和 await  ，比起星号和 yield  ，语义更清楚了。 async  表示函数里有异步
操作， await  表示紧跟在后面的表达式需要等待结果。
（ 3 ）更广的适用性。 co  模块约定， yield  命令后面只能是 Thunk 函数或 Promise 对象，而 async  函数
的 await  命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操
作）。
（ 4 ）返回值是 Promise 。 async  函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方
便多了。你可以用 then  方法指定下一步的操作。
进一步说， async  函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而 await  命令就是内
部 then  命令的语法糖。
正常情况下， await  命令后面是一个 Promise 对象，否则会被转成 Promise 。
下面是一个完整的例子。
async function getTitle(url) {
let response = await fetch(url);
let html = await response.text();
return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)
// "ECMAScript 2017 Language Specification"
async 函数的实现
async  函数的实现，就是将 Generator  函数和自动执行器，包装在一个函数里。
async function fn(args){
// ...
}
//  等同于
function fn(args){
return spawn(function*() {
// ...
});
}
所有的 async  函数都可以写成上面的第二种形式，其中的 spawn  函数就是自动执行器。
下面给出 spawn  函数的实现，基本就是前文自动执行器的翻版。
function spawn(genF) {
return new Promise(function(resolve, reject) {
var gen = genF();
function step(nextF) {
try {
var next = nextF();
} catch(e) {
return reject(e);
}
if(next.done) {
return resolve(next.value);
}
Promise.resolve(next.value).then(function(v) {
step(function() { return gen.next(v); });
}, function(e) {
step(function() { return gen.throw(e); });
});
}
step(function() { return gen.next(undefined); });
});
}
async  函数是非常新的语法功能，新到都不属于 ES6 ，而是属于 ES7 。目前，它仍处于提案阶段，但是转
码器 Babel  和 regenerator  都已经支持，转码后就能使用


async  函数的用法
同 Generator 函数一样， async  函数返回一个 Promise 对象，可以使用 then  方法添加回调函数。当函数执
行的时候，一旦遇到 await  就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。
下面是一个例子。
async function getStockPriceByName(name) {
var symbol = await getStockSymbol(name);
var stockPrice = await getStockPrice(symbol);
return stockPrice;
}
getStockPriceByName('goog').then(function (result) {
console.log(result);
});
上面代码是一个获取股票报价的函数，函数前面的 async  关键字，表明该函数内部有异步操作。调用该函
数时，会立即返回一个 Promise  对象。
下面的例子，指定多少毫秒后输出一个值。
function timeout(ms) {
return new Promise((resolve) => {
setTimeout(resolve, ms);
});
}
async function asyncPrint(value, ms) {
await timeout(ms);
console.log(value)
}
asyncPrint('hello world', 50);
上面代码指定 50 毫秒以后，输出 "hello world" 。
Async 函数有多种使用形式。
//  函数声明
async function foo() {}
//  函数表达式
const foo = async function () {};
//  对象的方法
let obj = { async foo() {} }
//  箭头函数
const foo = async () => {};
注意点
第一点， await  命令后面的 Promise 对象，运行结果可能是 rejected ，所以最好把 await  命令放
在 try...catch  代码块中。
async function myFunction() {
try {
await somethingThatReturnsAPromise();
} catch (err) {
console.log(err);
}
}
//  另一种写法
async function myFunction() {
await somethingThatReturnsAPromise().catch(function (err){
console.log(err);
};
}
第二点，多个 await  命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
let foo = await getFoo();
let bar = await getBar();
上面代码中， getFoo  和 getBar  是两个独立的异步操作（即互不依赖），被写成继发关系。这样比较耗
时，因为只有 getFoo  完成以后，才会执行 getBar  ，完全可以让它们同时触发。
//  写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);
//  写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
上面两种写法， getFoo  和 getBar  都是同时触发，这样就会缩短程序的执行时间。
第三点， await  命令只能用在 async  函数之中，如果用在普通函数，就会报错。
async function dbFuc(db) {
let docs = [{}, {}, {}];
//  报错
docs.forEach(function (doc) {
await db.post(doc);
});
}
上面代码会报错，因为 await 用在普通函数之中了。但是，如果将 forEach  方法的参数改成 async  函数，
也有问题。
async function dbFuc(db) {
let docs = [{}, {}, {}];
//  可能得到错误结果
docs.forEach(async function (doc) {
await db.post(doc);
});
}
上面代码可能不会正常工作，原因是这时三个 db.post  操作将是并发执行，也就是同时执行，而不是继发
执行。正确的写法是采用 for  循环。
async function dbFuc(db) {
let docs = [{}, {}, {}];
for (let doc of docs) {
await db.post(doc);
}
}
如果确实希望多个请求并发执行，可以使用 Promise.all  方法。
async function dbFuc(db) {
let docs = [{}, {}, {}];
let promises = docs.map((doc) => db.post(doc));
let results = await Promise.all(promises);
console.log(results);
}
//  或者使用下面的写法
async function dbFuc(db) {
let docs = [{}, {}, {}];
let promises = docs.map((doc) => db.post(doc));
let results = [];
for (let promise of promises) {
results.push(await promise);
}
console.log(results);
}
ES6 将 await  增加为保留字。使用这个词作为标识符，在 ES5 是合法的，在 ES6 将抛出 SyntaxError 。



与 Promise 、 Generator 的比较
我们通过一个例子，来看 Async 函数与 Promise 、 Generator 函数的区别。

首先是 Promise 的写法。
function chainAnimationsPromise(elem, animations) {
//  变量 ret 用来保存上一个动画的返回值
var ret = null;
//  新建一个空的 Promise
var p = Promise.resolve();
//  使用 then 方法，添加所有动画
for(var anim in animations) {
p = p.then(function(val) {
ret = val;
return anim(elem);
})
}
//  返回一个部署了错误捕捉机制的 Promise
return p.catch(function(e) {
/*  忽略错误，继续执行 */
}).then(function() {
return ret;
});
}
虽然 Promise 的写法比回调函数的写法大大改进，但是一眼看上去，代码完全都是 Promise 的 API （ then 、 catch
等等），操作本身的语义反而不容易看出来。


接着是 Generator 函数的写法。
function chainAnimationsGenerator(elem, animations) {
return spawn(function*() {
var ret = null;
try {
for(var anim of animations) {
ret = yield anim(elem);
}
} catch(e) {
/*  忽略错误，继续执行 */
}
return ret;
});
}
上面代码使用 Generator 函数遍历了每个动画，语义比 Promise 写法更清晰，用户定义的操作全部都出现在
spawn 函数的内部。这个写法的问题在于，必须有一个任务运行器，自动执行 Generator 函数，上面代码的
spawn 函数就是自动执行器，它返回一个 Promise 对象，而且必须保证 yield 语句后面的表达式，必须返回一个
Promise 。
最后是 Async 函数的写法。

接着是 Generator 函数的写法。
function chainAnimationsGenerator(elem, animations) {
return spawn(function*() {
var ret = null;
try {
for(var anim of animations) {
ret = yield anim(elem);
}
} catch(e) {
/*  忽略错误，继续执行 */
}
return ret;
});
}
上面代码使用 Generator 函数遍历了每个动画，语义比 Promise 写法更清晰，用户定义的操作全部都出现在
spawn 函数的内部。这个写法的问题在于，必须有一个任务运行器，自动执行 Generator 函数，上面代码的
spawn 函数就是自动执行器，它返回一个 Promise 对象，而且必须保证 yield 语句后面的表达式，必须返回一个
Promise 。
最后是 Async 函数的写法。










