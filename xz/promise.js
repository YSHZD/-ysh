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


