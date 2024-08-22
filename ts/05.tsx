// type ParamType<T> = T extends (arg: infer P) => any ? P : T;

// // function foo(): any {
// //   return 1;
// // }

// // let bar = "hey";
// // bar = foo(); // Error: 不能把一个 number 类型赋值给 string 类型

// // declare type JQuery = any;
// // declare var $: JQuery;

// // declare module "jquery";
// // import * as $ from "jquery";

// // 示例 A
// // declare const myPoint: { x: number; y: number };

// // 示例 B
// // interface Point {
// //   x: number;
// //   y: number;
// // }
// // declare const myPoint: Point;

// // // Lib a.d.ts
// // interface Point {
// //   x: number;
// //   y: number;
// // }
// // declare const myPoint: Point;

// // // Lib b.d.ts
// // interface Point {
// //   z: number;
// // }

// // // Your code
// // myPoint.x; // Allowed!
// // myPoint.z; // Allowed!

// interface Point {
//   x: number;
//   y: number;
//   z: number;
// }

// class MyPoint implements Point {
//   x: number;
//   y: number; // Same as Point
//   z: number;
// }

// const foo: Point = new MyPoint();

// enum Color2 {
//   Red, // 0
//   Green, // 1
//   Blue, // 2
// }

// let col = Color2.Red;
// col = 0; // 有效的，这也是 Color.Red

// enum Color3 {
//   DarkRed = 3, // 3
//   DarkGreen, // 4
//   DarkBlue, // 5
// }

// // 在这里，我们使用了左移的位运算符，将数字 1 的二进制向左移动位置得到数字 0001、0010、0100 和 1000（换成十进制结果是：1, 2, 4, 8）
// // enum AnimalFlags {
// //   None = 0,
// //   HasClaws = 1 << 0,
// //   CanFly = 1 << 1,
// //   EatsFish = 1 << 2,
// //   Endangered = 1 << 3,
// // }

// enum AnimalFlags {
//   None = 0,
//   HasClaws = 1 << 0,
//   CanFly = 1 << 1,
// }

// interface Animal {
//   flags: AnimalFlags;
//   [key: string]: any;
// }

// function printAnimalAbilities(animal: Animal) {
//   var animalFlags = animal.flags;
//   if (animalFlags & AnimalFlags.HasClaws) {
//     console.log("animal has claws");
//   }
//   if (animalFlags & AnimalFlags.CanFly) {
//     console.log("animal can fly");
//   }
//   if (animalFlags == AnimalFlags.None) {
//     console.log("nothing");
//   }
// }

// var animal = { flags: AnimalFlags.None };
// printAnimalAbilities(animal); // nothing
// animal.flags |= AnimalFlags.HasClaws;
// printAnimalAbilities(animal); // animal has claws
// animal.flags &= ~AnimalFlags.HasClaws;
// printAnimalAbilities(animal); // nothing
// animal.flags |= AnimalFlags.HasClaws | AnimalFlags.CanFly;
// printAnimalAbilities(animal); // animal has claws, animal can fly

// enum Tristate {
//   False,
//   True,
//   Unknown,
// }

// const lie = Tristate.False;

// // variable annotation
// let sampleVariable: { bar: number };

// // function parameter annotation
// function foo2(sampleParameter: { bar: number }) {}

// function doSome(x: number | string) {
//   if (typeof x === "string") {
//     // 在这个块中，TypeScript 知道 `x` 的类型必须是 `string`
//     console.log(x.subtr(1)); // Error: 'subtr' 方法并没有存在于 `string` 上
//     console.log(x.substr(1)); // ok
//   }

//   x.substr(1); // Error: 无法保证 `x` 是 `string` 类型
// }

// interface A {
//   x: number;
// }

// interface B {
//   y: string;
// }

// function doStuff(q: A | B) {
//   if ("x" in q) {
//     // q: A
//   } else {
//     // q: B
//   }
// }

// type MyKey = "a" | "b" | "c";

// // 使用in遍历Keys联合类型，为每个键生成一个string类型的属性
// type Dynamic = {
//   [P in MyKey]: string;
// };
// // DynamicObject的类型：
// // {
// //   a: string;
// //   b: string;
// //   c: string;
// // }

// // 这种方式特别适合于需要根据一组固定的键动态生成类型的场景。
// // 例如，当我们想要确保一个对象包含某个键集合的同类型值时，就可以使用这种方法。
