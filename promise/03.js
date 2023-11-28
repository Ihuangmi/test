/*
      Promise.race([promise1, promise2,...])：
      数组中最先解决或最先拒绝的Promise，就执行相应后面的.then或者.catch。先以谁作为回调
    */
let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise1");
  }, 100);
});
let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise2");
  }, 200);
});
let promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("失败了");
  }, 300);
});

Promise.race([promise1, promise2, promise3])
  .then((res) => {
    console.log(res); // promise1
  })
  .catch((e) => {
    console.error(e);
  });
