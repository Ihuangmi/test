// import dayjs from "dayjs";

// // interface Animal {
// //   name: string;
// //   age: number;
// // }

// // interface Bear extends Animal {
// //   honey: boolean;
// // }

// // const bear: Bear = {
// //   name: "xxx",
// //   age: 10,
// //   honey: false,
// // };

// type Animal = {
//   name: string;
// };

// type Bear = Animal & {
//   honey: boolean;
// };

// const bear: Bear = {
//   name: "xxx",
//   honey: false,
// };

// // 声明函数类型
// type Fn = (v: number) => void;

// type Callback = {
//   (n: number): void;
//   desc: string;
// };
// function dosomething(fn: Callback) {
//   fn(12);
//   fn.desc;
// }

// //
// type Ctor = {
//   new (k: string): Date;
//   (v: number): Date;
// };
// function fn2(ctor: Ctor) {
//   new ctor("hello");
//   ctor(123);
// }

// // 函数重载
// function formatDate(date: Date): void;
// function formatDate(date: string): void;
// function formatDate(timestamp: number, unit: string): void;
// function formatDate(timestamp: Record<string, string>, unit: string): void;

// function formatDate(
//   date: number | string | Date | Record<string, string>,
//   unit?: string
// ) {
//   if (typeof date === "number") {
//     switch (unit) {
//       case "ms":
//         return dayjs(new Date(date)).format("YYYY/MM/DD hh:mm:ss");
//       case "s":
//         return dayjs(new Date(date * 1000)).format("YYYY/MM/DD hh:mm:ss");
//     }
//   } else {
//     return dayjs(new Date(date)).format("YYYY/MM/DD hh:mm:ss");
//   }
// }

// console.log(formatDate(new Date()));
// console.log(formatDate("2024-2-21"));
// console.log(formatDate(1708505173856, "ms"));
// console.log(formatDate(1708505173, "s"));

// // 泛型函数
// function getFirstElem<T>(a: T[]): T {
//   return a[0];
// }

// getFirstElem([1, 2, 3]);
// getFirstElem(["hello", "world"]);
// getFirstElem([true, false]);

// //
// function doSomeThing<T, P>(arr: T[], callback: (n: T) => P) {
//   return arr.map(callback);
// }
// console.log(doSomeThing([1, 2, 3], (p) => p.toString()));
