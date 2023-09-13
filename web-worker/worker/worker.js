// worker.js（worker线程）

// importScripts("./utils.js", "./utils2.js");

// import { add } from "./utils.js"; // 导入外部js

// console.log(add(1, 2)); // log 3
// console.log(minus(1, 2)); // log -1

// self 代表子线程自身，即子线程的全局对象
// console.log("inside worker:", self);
// 接收到消息
self.onmessage = (e) => {
  console.log(e.data);

  postMessage("Greeting from Worker");

  postMessage("Greeting from Worker2");

  setTimeout(() => {
    console.log("setTimeout run");
    postMessage("Greeting from SetTimeout");
  });

  Promise.resolve().then(() => {
    console.log("Promise run");

    postMessage("Greeting from Promise");
  });

  for (let i = 0; i < 1001; i++) {
    if (i === 1000) {
      console.log("Loop run");
      postMessage("Greeting from Loop");
    }
  }

  self.close(); // 关闭 worker
};

// 当worker内部出现错误时触发
self.onerror = (err) => {
  console.log(err);
};

// 当 message 事件接收到无法被反序列化的参数时触发
self.onmessageerror = (err) => {
  console.log(err);
};

// self.close(); // 直接执行close方法就ok了
