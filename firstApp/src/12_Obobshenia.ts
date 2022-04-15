export default function (): void {
  function getId(id: any): any {
    return id;
  }
  let result = getId(5);
  console.log(result);

  function getIdTyped<T>(id: T): T {
    return id;
  }
  let result1 = getIdTyped<number>(5);
  console.log(result1);
  let result2 = getIdTyped<string>("abc");
  console.log(result2);

  function getString<T>(arg: Array<T>): string {
    return arg.join(", ");
  }

  let result3 = getString<number>([1, 2, 34, 5]);
  console.log(result3);

  ///////////////////////////////////////////////////////////

  class User<T> {
    private _id: T;
    constructor(id: T) {
      this._id = id;
    }
    getId(): T {
      return this._id;
    }
  }

  let tom = new User<number>(3);
  console.log(tom.getId()); // возвращает number
  //tom = new User<string>("vsf"); //! ошибка Тип "User<string>" не может быть назначен
  //! для типа "User<number>". Тип "string" не может быть назначен для типа "number".

  let alice = new User<string>("vsf");
  console.log(alice.getId()); // возвращает string

  ////////////////////////////////////////////////////////////

  interface IUser<T> {
    getId(): T;
  }

  class User2<T> implements IUser<T> {
    private _id: T;
    constructor(id: T) {
      this._id = id;
    }
    getId(): T {
      return this._id;
    }
  }

  const roman = new User2<string>("roman");
  const name: string = roman.getId();
  console.log(name);

  /////////////////////////////////////////////////////////////

  //   function compareName<T>(obj1: T, obj2: T): void {
  //     if (obj1.name === obj2.name) {               //! Ошибка: Свойство "name" не существует в типе "T".
  //       console.log("Имена совпадают");
  //     } else {
  //       console.log("Имена различаются");
  //     }
  //   }

  //? НО мы можем сказать что в шаблоне обобщения тип "T" будет ограничен типами если добавим "extends"
  //* 	<T extends критерий_типов>

  function compareName<T extends { name: string }>(obj1: T, obj2: T): void {
    if (obj1.name === obj2.name) {
      console.log("Имена совпадают");
    } else {
      console.log("Имена различаются");
    }
  }

  let tom33: { name: string } = { name: "Tom" };
  let sam33: { name: string; age: number } = { name: "Sam", age: 333 };
  compareName<{ name: string }>(tom33, sam33);

  // ЕЩЕ ПРИМЕРЫ КАК МОЖНО

  class User555 {
    constructor(public name: string, public age: number) {}
  }
  let bob = new User555("Bob", 38);
  let bobic = new User555("Bob", 24);
  compareName<User555>(bob, bobic);

  type Person = { id: number; name: string };
  let jack: Person = { id: 1, name: "Jack" };
  let six: Person = { id: 2, name: "Six" };
  compareName<Person>(jack, six);

  ////////////////////////////////////////////////////////////

  //? ТАКЖЕ можно делать и с ограничением типа через интерфейсы

  interface Named {
    name: string;
  }
  class NameInfo<T extends Named> {
    printName(obj: T): void {
      console.log(`Name: ${obj.name}`);
    }
  }

  class User881 {
    constructor(public name: string, public age: number) {}
  }

  let oleg = new User881("Oleg", 38);

  let nameInfo1 = new NameInfo<User881>();
  nameInfo1.printName(oleg);

  type Person881 = { id: number; name: string };
  let boris: Person881 = { id: 1, name: "Boris" };

  let nameInfo2 = new NameInfo<Person881>();
  nameInfo2.printName(boris);

  ////////////////////////////////////////////////////////////////

  // Создание типов "T" через "new"

  //? Чтобы создать новый объект в коде обобщений, нам надо указать, что 
  //? обобщенный тип T имеет конструктор. Это означает, что вместо параметра 
  //? type:T нам надо указать type: {new(): T;}.

  //   function UserFactory<T>(): T {
  //     return new T(); //! ошибка компиляции
  //   }

  //? Чтобы интерфейс начал работать, используем слово new:

  function UserFactory<T>(type: { new (): T }): T {
    return new type();
  }

  class User711 {
    constructor() {
      console.log("создан объект User711");
    }
  }

  let user: User711 = UserFactory(User711);
}
