// function identity<T>(arg: T): T {
//   return arg;
// }
// const output = identity("myString"); // output 类型为 string
// const output2 = identity(true); // output2 类型为 boolean

// function getProperty2<T, K extends keyof T>(obj: T, key: K) {
//   return obj[key];
// }

// let x = { a: 1, b: 2 };

// getProperty2(x, "a"); // Okay
// // getProperty2(x, "m"); // Error!

// // infer 模式匹配
// type Flatten<T> = T extends any[] ? T[number] : T;
// type F1 = Flatten<string[]>; // F1 为 string
// type F2 = Flatten<number[]>; // F2 为 number

// type FlattenInfer<T> = T extends (infer Item)[] ? Item : T;
// type F3 = FlattenInfer<string[]>; // F3 为 string
// type F4 = FlattenInfer<number[]>; // F4 为 number

// // 使用 infer 提取函数返回类型
// type IReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
// type R1 = IReturnType<() => string>; // R1 为 string
// type R2 = IReturnType<(a: number) => { name: string }>; // R2 为 { name: string }
// type R3 = IReturnType<boolean>; // R3 为 any

// //
// type UnionCompositeType = ({ a: string } | { b: string }) & { c: string };

// // 推导
// // ({ a: string } | { b: string }) & { c: string }
// // ==> ({ a: string } & { c: string }) | ({ b: string } & { c: string })
// // ==> { a: string; c: string } | { b: string; c: string }

// const objectA: UnionCompositeType = {
//   // Okay
//   a: "javascript",
//   c: "great",
// };
// const objectB: UnionCompositeType = {
//   // Okay
//   b: "javascript",
//   c: "not bad",
// };
// const objectC: UnionCompositeType = {
//   // Error!
//   // a: "javascript",
//   // b: "javascript",
//   c: "not good enough though",
// };

// //
// type TypeName<T> = T extends string
//   ? "string"
//   : T extends number
//   ? "number"
//   : "other";

// type T1 = TypeName<string | number>; // 'string' | 'number'
// type T2 = TypeName<string | (() => void)>; // 'string' | 'other'
// type T3 = TypeName<boolean | void>; // 'other'

// // type Extract<T, U> = T extends U ? T : never;
// type Extract1 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">; // 'a' | 'c'
// type Extract2 = Extract<"a" | "b", keyof { a: string; c: string }>; // 'a'

// // type Exclude<T, U> = T extends U ? never : T;
// type Exclude1 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">; // 'b' | 'd'
// type Exclude2 = Exclude<string | (() => void), Function>; // string

// type Color = "red" | "blue";
// type Quantity = "one" | "two";

// type SeussFish = `${Quantity | Color} fish`;

// // 问题 A：现有一个工具方法 compose(f, g) 用以整合两个函数，如何添加合适的 type？

// // function compose(f, g) {
// //   return (...args) => g(f(...args));
// // }

// // 第一步：分别列出 f、g、compose 的类型：
// // f: (...args: A) => B
// // g: (arg: B) => C
// // compose: (...args: A) => C

// // 第二步：尝试将上述类型引入 compose 方法中
// // TypeScript 报错：(...args: A) A rest parameter must be of an array type
// // function compose<A, B, C>(f: (...args: A) => B, g: (arg: B) => C) {
// //   return (...args: A) => g(f(...args));
// // }

// // 第三步：添加泛型约束 A extends any[]
// function compose<A extends any[], B, C>(
//   f: (...args: A) => B,
//   g: (arg: B) => C
// ) {
//   return (...args: A) => g(f(...args));
// }

// function getName(obj: { name: string }) {
//   return obj.name;
// }
// function getLength(s: string) {
//   return s.length;
// }
// const lengthOfName = compose(getName, getLength);

// //
// //
// let sample = { name: "Tom", age: 30 };

// // 使用typeof获取sample对象的类型
// type SampleType = typeof sample;

// // 现在我们可以使用SampleType来声明新的变量，而不需要重新定义类型
// const another: SampleType = {
//   name: "Jerry",
//   age: 25,
// };

// // 定义一个条件类型，用于获取函数返回值的类型
// type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// // 使用示例
// function getString() {
//   return "hello";
// }

// function getNumber() {
//   return 123;
// }

// type StringReturnType = ReturnType<typeof getString>; // string
// type NumberReturnType = ReturnType<typeof getNumber>; // number

// // 通过infer R，我们能够在不具体指定函数返回类型的情况下，推断出函数的返回类型。
// // 这对于处理高阶函数或者类型封装时特别有用。

// type Keys = "a" | "b" | "c";

// // 使用in遍历Keys联合类型，为每个键生成一个string类型的属性
// type DynamicObject = {
//   [P in Keys]: string;
// };

// // DynamicObject的类型等价于：
// // {
// //   a: string;
// //   b: string;
// //   c: string;
// // }

// // 这种方式特别适合于需要根据一组固定的键动态生成类型的场景。
// // 例如，当我们想要确保一个对象包含某个键集合的同类型值时，就可以使用这种方法。

// type ArrayElementType<T> = T extends (infer E)[] ? E : T;
// // type of item1 is `number`
// type item1 = ArrayElementType<number[]>;
// // type of item1 is `{name: string}`
// type item2 = ArrayElementType<{ name: string }>;
// type item3 = ArrayElementType<[number, string]>;

// //
// type Bar2<T> = T extends {
//   a: (x: infer U) => void;
//   b: (x: infer U) => void;
// }
//   ? U
//   : never;
// type T21 = Bar2<{
//   a: (x: number) => void;
//   b: (x: number) => void;
// }>;
// type T22 = Bar2<{
//   a: (x: string) => void;
//   b: (x: number) => void;
// }>;

// type MPick<T, K extends keyof T> = {
//   [key in K]: T[key]; // error: 型“key”无法用于索引类型“T”。
// };

// type MyPick<T, Keys extends keyof T> = {
//   [key in Keys]: T[key];
// };
// // 使用
// type Todo = {
//   title: string;
//   description: string;
//   completed: boolean;
// };

// type TodoPreview = MyPick<Todo, "title" | "completed">;

// const todo: TodoPreview = {
//   title: "Clean room",
//   // description: 123, // “description”不在类型“TodoPreview”中。
//   completed: false,
// };

// todo; // ok

// type MyExclude<T, Key> = T extends Key ? never : T;
// type T01 = MyExclude<"a" | "b" | "c", "a">; // type T01 = "b" | "c"

// type T = "a" | "b" | "c";
// type Key = "a";
// // T extends Key
// // "a" | "b" | "c" extends "a"
// // "a" extends "a" | "c" extends "a" | "b" extends "a"

// type T11 = MyExclude<"a" | "b" | "c", "a" | "b">; // type T11 = "c"

// interface Pet {
//   name: string;
// }
// let pet: Pet;
// // dog's inferred type is { name: string; owner: string; }
// let dog = { name: "Lassie", owner: "Rudd Weatherwax" };
// pet = dog;
// console.log(pet);
// pet.name;
// pet.owner;

// type Flatten<T> = T extends any[] ? T[number] : T;

// // Extracts out the element type.
// type Strs = Flatten<string[]>;
// type Str = Flatten<string>;

// // type Str = string

// // Leaves the type alone.
// type Num = Flatten<boolean[]>;

// type StrOrNum = Flatten<boolean | string>;

// type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

// // 当从具有多个调用签名的类型（例如重载函数的类型）进行推断时，会根据最后一个签名进行推断（这可能是最宽松的包罗万象的情况）。无法根据参数类型列表执行重载决议。
// declare function stringOrNum(x: number): string;
// declare function stringOrNum(x: string): number;
// declare function stringOrNum(x: string | number): string | number;

// type T1 = ReturnType<typeof stringOrNum>;

// type ToArray<Type> = Type extends any ? Type[] : never;

// type StrArrOrNumArr = ToArray<string | number>;

// type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

// // 'ArrOfStrOrNum' is no longer a union.
// type ArrOfStrOrNum = ToArrayNonDist<string | number>;
// // const x = "hello" as unknown as number;
