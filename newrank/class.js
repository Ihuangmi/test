const obj = {
  age: 18,
};

class Person {
  constructor(options) {
    console.log("🚀 ~  options:", options);
    this.userInfo = Object.assign(obj, options);
    console.log("🚀 ~  this.userInfo:", this.userInfo);
  }

  getName() {
    const { name } = this.userInfo;
    console.log(name);
  }
}

const person1 = new Person({ name: "小明", hobby: "跳舞" });
console.log("🚀 ~ file: class.js:19 ~ person1:", person1);
const person2 = new Person({ age: 20 });
console.log("🚀 ~ file: class.js:21 ~ person2:", person2);

person1.getName();
person2.getName();
