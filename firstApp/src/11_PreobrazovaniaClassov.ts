export default function (): void {
  class Person {
    name: string;
    constructor(userName: string) {
      this.name = userName;
    }
  }

  class Employee extends Person {
    company: string;
    constructor(userName: string, company: string) {
      super(userName);
      this.company = company;
    }
  }

  let tom: Person = new Employee("Tom", "Microsoft");
  // console.log(tom.company); //! ошибка - в классе Person нет свойства company
  console.log(tom); // Employee { name: 'Tom', company: 'Microsoft' }
  //* класс Employee и имеет все поля, но не можем обратиться к свойству

  //?НО мы можем получить досту к этому полю если приведем тип
  console.log((<Employee>tom).company); // Microsoft
  console.log(<Employee>tom); // Employee { name: 'Tom', company: 'Microsoft' }

  interface IPerson {
    name: string;
  }

  function printPerson(user: IPerson): void {
    console.log(`IPerson ${user.name}`);
  }

  printPerson(tom); // let tom: Person = new Employee("Tom", "Microsoft");
  //? тип приведется неявно, главное чтобы было свойство name
  printPerson(<Employee>tom); // let tom: Person = new Employee("Tom", "Microsoft");
  printPerson({ name: "Vi" });
  //! printPerson({ name: "Vi", company: "Microsoft" });
  //? но если приведем тип явно то все будет работать
  printPerson({ name: "Vi", company: "Microsoft" } as IPerson);

  //? С помощью оператора instanceOf можно проверить, принадлежит ли объект определенному классу:

  let edgarChe = new Employee("EdgarChe", "Microsoft");
  if (edgarChe instanceof Person) {
    console.log("EdgarChe is a Person");
  } else {
    console.log("EdgarChe is not a Person");
  }
}
