/**
 * Promise.allSettled() 静态方法将一个 Promise 可迭代对象作为输入，并返回一个单独的 Promise。
 * 当所有输入的 Promise 都已敲定时（包括传入空的可迭代对象时），返回的 Promise 将被兑现，
 * 并带有描述每个 Promise 结果的对象数组。
 */

const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, "foo")
);
const promises = [promise1, promise2];

Promise.allSettled(promises).then((results) => {
  console.log("🚀 ~ file: 04.js:14 ~ Promise.allSettled ~ results:", results);
  // log:
  // [
  //   {
  //     status: "fulfilled",
  //     value: 3,
  //   },
  //   {
  //     status: "rejected",
  //     reason: "foo",
  //   },
  // ];

  results.forEach((result) => console.log(result.status));
});
