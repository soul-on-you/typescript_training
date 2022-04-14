export default function (): void {
  type id = number | string;

  let userId: id = 2;
  console.log(`Id: ${userId}`);
  userId = "qwerty";
  console.log(`Id: ${userId}`);

  function printId(inputId: id) {
    console.log(`Id: ${inputId}`);
  }
  // тип результата - псевдоним
  function getId(isNumber: boolean): id {
    if (isNumber) return 1;
    else return "1";
  }
  // применение функций
  printId(12345);
  printId("qwerty");
  console.log(getId(true));

  type Person = { name: string; age: number };

  let tom: Person = { name: "Tom", age: 36 };
  let bob: Person = { name: "Bob", age: 41 };

  function printPerson(user: Person) {
    console.log(`Name: ${user.name}  Age: ${user.age}`);
  }

  printPerson(tom);
  printPerson(bob);

  type Person1 = { name: string; age: number };
  type Employee = Person1 & { company: string }; // => {name: string; age: number; company: string};

  let tom2: Person = { name: "Tom2", age: 36 };
  let bob2: Employee = { name: "Bob2", age: 41, company: "Microsoft" };

  function printPerson2(user: Person) {
    console.log(`Name: ${user.name}  Age: ${user.age}`);
  }

  printPerson2(tom2);
  printPerson2(bob2); // bob представляет Employee, но он также соответствует псевдониму Person
}
