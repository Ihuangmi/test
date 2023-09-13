// main.js（主线程）

// 创建worker
const myWorker = new Worker("./worker.js", {
  type: "module",
});

// console.log("created worker:", myWorker);

// 接收消息

myWorker.onmessage = (msg) => {
  console.log(msg.data);
  // myWorker.terminate(); // 关闭worker
};

// 这种写法也可以
// myWorker.addEventListener("message", (e) => {
//   console.log(e.data);
// });

// 向 worker 线程发送消息，对应 worker 线程中的 e.data
myWorker.postMessage("你好我是主线程");

myWorker.onerror = (err) => {
  console.log(err.message);
};

myWorker.onmessageerror = (err) => {
  console.log(err.message);
};

// myWorker.terminate(); // 关闭worker
