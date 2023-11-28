/*
      Promise.all([promise1, promise2,...]):
      如果所有都成功，则合成Promise的返回值就是所有子Promise的返回值数组。
      如果有一个失败，那么第一个失败的会把自己的理由作为合成Promise的失败理由。
    */
let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise1");
  }, 1000);
});
let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise2");
  }, 1000);
});
let promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("失败了");
  }, 1000);
});

let promise4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("又失败了");
  }, 1000);
});

Promise.all([promise1, promise2])
  .then((res) => {
    console.log(res); // ['promise1', 'promise2']
  })
  .catch((e) => {
    console.error(e);
  });

Promise.all([promise2, promise4, promise3])
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.error(e); // 失败了
  });
