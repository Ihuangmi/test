// // 常用的12种工具类型

// function get(url: string) {
//   return fetch("xxx").then((res) => res.json() as Promise<{ ok: boolean }>);
// }

// type GetFunc = typeof get; // 获取函数类型
// type Param = Parameters<GetFunc>; // 获取参数类型
// type Return = ReturnType<GetFunc>; // 获取返回值类型
// type Data = Awaited<Return>; // 获取Promise中的结果类型，<>中必须是Promise类型

// // 1、keyof 索引查询
// type Point = {
//   name: string;
//   age: number;
// };
// type P = keyof Point;
// // P = 'name' | 'age'

// interface Eg {
//   name: string;
//   readonly age: number;
// }
// type T = keyof Eg;
// const t: T = "age";

// type Arrayish = { [n: number]: unknown };
// type A = keyof Arrayish;
// // A = number

// type Mapish = { [k: string]: unknown };
// type M = keyof Mapish;
// // M = string | number
// // 注：在ts中支持2种索引签名，number和string类型，js在执行索引操作时会将number转化为string

// type Test = keyof any;
// // Test = string | number | symbol

// class CusEvent {
//   private name: string;
//   public readonly age: number;
//   public readonly age2: number;
//   protected home: string;
// }
// type Cus = keyof CusEvent;
// // Cus = "age" | "age2"
// const cus: Cus = "age2";

// // 2、typeof 类型运算符
// let text = "hello";
// let aaa: typeof text;

// type Predicate = (x: unknown) => boolean;
// type B = ReturnType<Predicate>;
// // B = boolean

// function func() {
//   return { x: 10, y: "xxx" };
// }
// type Func = typeof func;
// type FuncReturn = ReturnType<Func>;

// // 3、Record
// interface Person {
//   name: string;
//   age: number;
// }
// type Key = "jack" | "susan";
// type People = Record<Key, Person>;
// type AnyPeople = Record<string, Person>;

// // 4、Pick
// interface IPerson {
//   name: string;
//   age: number;
//   children: boolean;
// }
// type IPerson2 = Pick<IPerson, "name">;
// type IPerson3 = Pick<IPerson, "name" | "age">;

// // 5、Omit
// type IPerson4 = Omit<IPerson, "children">;
// type IPerson5 = Omit<IPerson, "children" | "age">;

// // 6、Partial
// type Person6 = Partial<IPerson>;

// // 7、Readonly
// type Person7 = Readonly<IPerson>;

// // 8、Required
// type Person8 = Required<Person6>;

// // 9、Exclude
// type AType = number | string | boolean;
// type BType = number | boolean;
// type CType = Exclude<AType, BType>;

// type DType = {
//   kind: "a";
//   a: string;
//   b: number;
//   c: boolean;
// };
// type EType = {
//   kind: "b";
//   b: number;
//   c: boolean;
// };
// type FType = Exclude<DType | EType, { kind: "a" }>;
