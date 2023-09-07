// sharedWorker.js

let num = 0;
const workerList = [];

// 当有新的客户端连接时，该 connect 事件将在共享 SharedWorker中触发
self.onconnect = function (e) {
  // port 新的客户端对象
  const port = e.ports[0];
  console.log("🚀 ~ port:", port);

  port.onmessage = (e) => {
    console.log("🚀 e.data:", e.data);

    num += e.data === "add" ? 1 : -1;

    // 遍历所有已开启的port，发送消息
    workerList.forEach((port) => {
      port.postMessage(num);
    });
  };

  // 启动端口
  port.start();

  workerList.push(port); // 存储已连接的port
  //   port.postMessage(num); // 初始化
};
