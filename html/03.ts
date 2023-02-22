// myAdd has the full function type
// let myAdd = function (x: number, y: number): number {
//   return x + y;
// };

// // The parameters `x` and `y` have the type number
// let myAdd2: (baseValue: number, increment: number) => number = function (x, y) {
//   return x + y;
// };

// function buildName(firstName: string, lastName: string) {
//   return firstName + " " + lastName;
// }

// let result1 = buildName("Bob"); // error, too few parameters
// let result2 = buildName("Bob", "Adams", "Sr."); // error, too many parameters
// let result3 = buildName("Bob", "Adams"); // ah, just right

// function buildName(firstName: string, lastName = "Smith") {
//   return firstName + " " + lastName;
// }

// let result1 = buildName("Bob"); // works correctly now, returns "Bob Smith"
// let result2 = buildName("Bob", undefined); // still works, also returns "Bob Smith"
// let result3 = buildName("Bob", "Adams", "Sr."); // error, too many parameters
// let result4 = buildName("Bob", "Adams"); // ah, just right

// let deck = {
//   suits: ["hearts", "spades", "clubs", "diamonds"],
//   cards: Array(52),
//   createCardPicker: function () {
//     return function () {
//       let pickedCard = Math.floor(Math.random() * 52);
//       let pickedSuit = Math.floor(pickedCard / 13);

//       return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
//     };
//   },
// };

// let cardPicker = deck.createCardPicker();
// let pickedCard = cardPicker();

// alert("card: " + pickedCard.card + " of " + pickedCard.suit);

// let suits = ["hearts", "spades", "clubs", "diamonds"];

// function pickCard(x): any {
//   // Check to see if we're working with an object/array
//   // if so, they gave us the deck and we'll pick the card
//   if (typeof x == "object") {
//     let pickedCard = Math.floor(Math.random() * x.length);
//     return pickedCard;
//   }
//   // Otherwise just let them pick the card
//   else if (typeof x == "number") {
//     let pickedSuit = Math.floor(x / 13);
//     return { suit: suits[pickedSuit], card: x % 13 };
//   }
// }

// let myDeck = [
//   { suit: "diamonds", card: 2 },
//   { suit: "spades", card: 10 },
//   { suit: "hearts", card: 4 },
// ];
// let pickedCard1 = myDeck[pickCard(myDeck)];
// alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

// let pickedCard2 = pickCard(15);
// alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

// // 重载
// let suits = ["hearts", "spades", "clubs", "diamonds"];

// function pickCard(x: { suit: string; card: number }[]): number;
// function pickCard(x: number): { suit: string; card: number };
// function pickCard(x): any {
//   // Check to see if we're working with an object/array
//   // if so, they gave us the deck and we'll pick the card
//   if (typeof x == "object") {
//     let pickedCard = Math.floor(Math.random() * x.length);
//     return pickedCard;
//   }
//   // Otherwise just let them pick the card
//   else if (typeof x == "number") {
//     let pickedSuit = Math.floor(x / 13);
//     return { suit: suits[pickedSuit], card: x % 13 };
//   }
// }

// let myDeck = [
//   { suit: "diamonds", card: 2 },
//   { suit: "spades", card: 10 },
//   { suit: "hearts", card: 4 },
// ];
// let pickedCard1 = myDeck[pickCard(myDeck)];
// alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

// let pickedCard2 = pickCard(15);
// alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

// let x = [0, 1, null];

interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}

function getSmallPet(): Fish | Bird {
  // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay
// pet.swim();    // errors

// // 每一个成员访问都会报错
// if (pet.swim) {
//   pet.swim();
// } else if (pet.fly) {
//   pet.fly();
// }

// // 类型断言：
// if ((<Fish>pet).swim) {
//   (<Fish>pet).swim();
// } else {
//   (<Bird>pet).fly();
// }

// function isFish(pet: Fish | Bird): pet is Fish {
//   return (<Fish>pet).swim !== undefined;
// }

interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}
type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
  }
}
