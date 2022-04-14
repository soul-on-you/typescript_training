export default function (): void {
  let person1 = { name: "Tom", age: 23 };
  console.log(person1.name);
  // альтернативный вариант получения свойства
  console.log(person1["name"]);

  let person2 = { name: "Tom", age: 23 };
  //   person2 = { name: "Bob" }; // ! Ошибка

  let person3: { name: string; age: number } = { name: "Tom", age: 23 };
  console.log(person3.name);

  let person4 = { name: "Tom", age: 23 };
  person4 = { name: "Bob", age: 35 }; // Норм

  let person5: { name: string; age?: number }; // Свойство age - необязательное
  person5 = { name: "Bob" }; // Норм, свойство age - необязательное
  console.log(person5.name); // Bob
  console.log(person5.age); // undefined
  person5 = { name: "Tom", age: 23 };
  console.log(person5.name); // Tom

  function printUser(user: { name: string; age: number }) {
    console.log(`name: ${user.name}  age: ${user.age}`);
  }
  let tom = { age: 36, name: "Tom" };
  printUser(tom);

  function printUser2(user: { name: string; age: number }) {
    console.log(`name: ${user.name}  age: ${user.age}`);
  }
  let bob = { name: "Bob", age: 44, isMarried: true }; // лишнее свойство true, НО это НОРМ
  printUser2(bob);

  let tom2: { name: string; age?: number } = { name: "Tom2", age: 23 };
  let bob2: { name: string; age?: number } = { name: "Bob2" };
  function printUser3(user: { name: string; age?: number }) {
    if ("age" in user) {
      console.log(`Name: ${user.name} Age: ${user.age}`);
    } else {
      console.log(`Name: ${user.name}`);
    }
  }
  printUser3(tom2);
  printUser3(bob2);
}
