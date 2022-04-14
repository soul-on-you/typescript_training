export default function (): void {
  let list: number[] = [10, 20, 30];
  let colors: string[] = ["red", "green", "blue"];
  console.log(list[0]);
  console.log(colors[1]);

  let names: Array<string> = ["Tom", "Bob", "Alice"];
  console.log(names[1]); // Bob

  const people = ["Tom", "Bob", "Sam"];
  people[1] = "Kate";
  console.log(people[1]); // Kate

  const people2: ReadonlyArray<string> = ["Tom", "Bob", "Sam"];
  // ~ const people: readonly string[]= ["Tom", "Bob", "Sam"];
  // people2[1] = "Kate"; ERROR
  console.log(people2[1]); // Kate
  // people2.push("Kate");    // ! Ошибка -  нельзя добавить новые элементы
  // people2.pop();           // ! Ошибка -  нельзя удалить существующие элементы

  ///////////////////////////////////////////////////////////////////////////
  function printUsers(users: readonly string[]) {
    for (const user of users) {
      console.log(user);
    }
  }

  function usersToString(users: ReadonlyArray<string>): String {
    return users.join(", ");
  }

  const people3: readonly string[] = ["Tom", "Bob", "Sam"];

  printUsers(people3);
  console.log(usersToString(people3));

  ////////////////////////////////////////////////////////////////
  const people4: string[] = ["Tom", "Bob", "Sam"];

  const [first, second, third] = people4;
  console.log(first); // Tom
  console.log(second); // Bob
  console.log(third); // Sam

  ////////////////////////////////////////////////////////////////

  const people5: string[] = ["Tom", "Bob", "Sam"];

  const [first5, ...rest5] = people5;
  console.log(first5); // Tom
  console.log(rest5[0]); // Bob
  console.log(rest5[1]); // Sam

  ////////////////////////////////////////////////////////////////

  const people6: string[] = ["Tom", "Bob", "Sam", "Kate"];

  const [, second6, , forth6] = people6; // пропускаем первый и третий элементы массива
  console.log(second6); // Bob
  console.log(forth6); // Kate
}
