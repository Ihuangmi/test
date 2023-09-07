// main.js（主线程）
const myWorker = new SharedWorker("./sharedWorker.js");

// myWorker.port.start(); // 开启端口

// myWorker.port.addEventListener("message", (msg) => {
//   console.log(msg.data);
// });

// 采用 onmessage 方法，则默认开启端口
myWorker.port.onmessage = (msg) => {
  console.log(msg.data);
};
