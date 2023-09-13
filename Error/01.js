async function fn() {
  //   console.log("🚀 ~ file: 01.js:30 ~ fn2 ~ num:", num);
  const p = await new Promise(async (resolve, reject) => {
    const arr = [1, 2, 3];
    // console.log("🚀 ~ file: 01.js:30 ~ fn2 ~ num:", num);

    arr.forEach((num) => {
      //   console.log("🚀 ~ file: 01.js:6 ~ arr.forEach ~ num:", num);
      if (num === 2) {
        resolve(num);
        // throw new Error("不能等于2");
      }
    });
  });

  console.log("🚀 ~ file: 01.js:17 ~ fn ~ p:", p);
  return p;
}

async function fn3() {
  //   return new Promise(async (resolve, reject) => {
  // try {
  // console.log("🚀 ~ file: 01.js:30 ~ fn2 ~ num:", num);

  const num = await fn();
  console.log("🚀 ~ file: 01.js:30 ~ fn2 ~ num:", num);

  //   if (num > 1) {
  //     throw new Error("num不能大于1");
  //   }
  return num;

  // resolve("xxx");
  // reject("出错了");
  // throw new Error("num不能大于1");
  // } catch (error) {
  //   console.log("🚀 ~ file: 01.js:26 ~ returnnewPromise ~ error:", error);
  // }
  //   });
}

async function fn2() {
  try {
    // if (a === 100) {
    //   throw new Error("出错了");
    // }

    // fn().then((res) => {
    //   console.log("🚀 ~ file: 01.js:40 ~ fn ~ res:", res);
    // });

    const num = await fn3();
    console.log("🚀 ~ file: 01.js:30 ~ fn2 ~ num:", num);

    // const x = await fn3();
    // console.log("🚀 ~ file: 01.js:14 ~ returnnewPromise ~ x:", x);

    // fn3()
    //   .then((res) => {
    //     console.log("🚀 ~ file: 01.js:43 ~ fn3 ~ res:", res);
    //   })
    //   .catch((err) => {
    //     console.log("🚀 ~ file: 01.js:47 ~ fn3 ~ err:", err);
    //   });

    console.log("end");
  } catch (error) {
    console.log("🚀 ~ file: 01.js:38 ~ fn2 ~ error:", error);
    console.error(error);
  }
}

fn2();

/**
 * 小结：使用 try{}catch{} 来捕获错误，无法捕获 promise 中的错误；
 * 如果要捕获 promise 中的错误使用 promise().then().catch(error=> {}) 来进行捕获
 */
