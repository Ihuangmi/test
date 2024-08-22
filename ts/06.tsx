// const num: number = 10;
// (num as unknown as string).split(""); // 注意，这里和any一样完全可以通过静态检查

// const foo: unknown = "string";
// foo.substr(1); // Error: 静态检查不通过报错
// const bar: any = 10;
// bar.substr(1); // Pass: any类型相当于放弃了静态检查

// function test(input: unknown): number {
//   if (Array.isArray(input)) {
//     return input.length; // Pass: 这个代码块中，类型守卫已经将input识别为array类型
//   }
//   return input.length; // Error: 这里的input还是unknown类型，静态检查报错。如果入参是any，则会放弃检查直接成功，带来报错风险
// }

// function foo(): never {
//   throw new Error("error message");
// } // throw error 返回值是never
// function foo(): never {
//   while (true) {}
// } // 这个死循环的也会无法正常退出
// function foo(): never {
//   let count = 1;
//   while (count) {
//     count++;
//   }
// } // Error: 这个无法将返回值定义为never，因为无法在静态编译阶段直接识别出

// type human = "boy" & "girl"; // 这两个单独的字符串类型并不可能相交，故human为never类型
// type language = "ts" | never; // language的类型还是'ts'类型

// function test() {
//   foo(); // 这里的foo指上面返回never的函数
//   console.log(111); // Error: 编译器报错，此行代码永远不会执行到
// }

// let n: never = 9;
// let o: never = "xxx";
// n = o; // Error: 不能把一个非never类型赋值给never类型，包括any

// function onClick(callback?: () => void) {
//   //   callback?.();
//   callback!(); // 参数是可选入参，加了这个感叹号!之后，TS编译不报错
// }

// let a: null | undefined;
// // let b = a ?? 10;
// // 生成的代码:
// let b = a !== null && a !== void 0 ? a : 10;

// // 数字分隔符_       _可以用来对长数字做任意的分隔，主要设计是为了便于数字的阅读，编译出来的代码是没有下划线的，请放心食用。
// const number = 1_2_345.6_78_9;
// // 12345.6789;

// type Person = {
//   name: string;
//   age: number;
// };
// // type PersonKey = keyof Person; // PersonKey得到的类型为 'name' | 'age'

// // function getValue(p: Person, k: keyof Person) {
// //   return p[k]; // 如果k不如此定义，则无法以p[k]的代码格式通过编译
// // }

// const me: Person = { name: "gzx", age: 16 };
// type P = typeof me; // { name: string, age: number | undefined }
// const you: typeof me = { name: "mabaoguo", age: 69 }; // 可以通过编译

// const typestr = typeof me; // typestr的值为"object"
// type PersonKey = keyof typeof me; // 'name' | 'age'
