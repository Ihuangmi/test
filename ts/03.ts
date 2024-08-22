// // 泛型约束-限制泛型的类型范围
// interface LengthType {
//   length: number;
// }

// // 使用关键字"extends"进行类型约束：
// function printLength<T extends LengthType>(arg: T) {
//   console.log(arg.length);
// }

// // printLength(100);  // error
// printLength("123");
// printLength([1, 2, 3]);

// // 通过类型约束避免运行时错误和类型错误：
// function getProperty<T, K extends keyof T>(obj: T, key: K) {
//   return obj[key];
// }
// let person = {
//   name: "Alice",
//   age: 30,
// };
// let myname = getProperty(person, "age");
// console.log(myname);

// //
// function safeParseJson<T>(jsonString: string) {
//   try {
//     console.log(JSON.parse(jsonString));
//     return JSON.parse(jsonString) as T;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }
// safeParseJson<{ name: string }>('{"name": "tony", "age": 20}');
// // safeParseJson("");

// function isNumber(x: any): x is number {
//   return typeof x === "number";
// }
// console.log(isNumber("dd"));

// function prop(obj: Record<string, any>, key: string) {
//   return obj[key];
// }

// const obj = {
//   name: "xxx",
//   age: 18,
// };
// const obj2 = {
//   name: "xm",
//   age: 20,
//   gender: 0,
// };

// type Obj = {
//   name: string;
//   age: number;
// };

// type Obj2 = {
//   name: string;
//   age: number;
//   gender?: 0 | 1;
// };

// function fun(obj: Obj | Obj2) {
//   if ("gender" in obj) {
//     console.log(obj.gender);
//   }
// }
// fun(obj);
// fun(obj2);

// // 条件类型
// type IsString<T> = T extends string ? true : false;

// type C11 = IsString<string>;
// type C22 = IsString<number>;

// type C1 = IsString<"xxx">;
// type C2 = IsString<{}>;

// //
// interface Animal {
//   name: string;
//   live(): void;
// }

// interface Dog extends Animal {
//   woof(): void;
// }

// interface Cat {
//   name: string;
//   age: number;
//   live(): void;
// }

// interface Tree {
//   age: number;
// }

// type IsAnimal<T> = T extends Animal ? number : string;

// type C3 = IsAnimal<Dog>;
// type C4 = IsAnimal<Cat>;
// type C5 = IsAnimal<Tree>;

// // typeof 关键字
// let s = "hello";
// let n: typeof s;

// type Predicate = (x: unknown) => boolean;
// type K = ReturnType<Predicate>;

// function f() {
//   return { x: 10, y: 3 };
// }
// type P = ReturnType<typeof f>;

// // infer 关键字
// type ParamType<T> = T extends (...args: infer P) => any ? P : T;
// // 解释：类型T是否继承自函数，如果是则取函数参数类型，如果不是，取传入的T类型

// interface User {
//   name: string;
//   age: number;
// }

// type Func = (user: User) => void;

// type Param = ParamType<Func>; // Param = User
// type AA = ParamType<string>; // string

// // 泛型
// async function getResource<T>(url: string): Promise<T> {
//   let response = await fetch(url);
//   let body = await response.json();
//   return body as T;
// }

// // 使用
// interface User {
//   name: string;
//   email: string;
// }

// async function getUser(userId: string) {
//   const user = await getResource<User>(`/api/users/${userId}`);
//   console.log(user.name);
// }
