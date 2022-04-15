export default (): void => {
  interface IUser {
    id: number;
    name: string;
  }

  function printUser(user: IUser): void {
    console.log("id: ", user.id);
    console.log("name: ", user.name);
  }

  const userVova: IUser = { id: 1, name: "Vova I" };
  printUser(userVova);

  ////////////////////////////////////////////////////////////////

  function buildUser(userId: number, userName: string): IUser {
    return { id: userId, name: userName };
  }

  const userGeno = buildUser(2, "Geno");
  printUser(userGeno);

  ////////////////////////////////////////////////////////////////

  interface IUser2 {
    id: number;
    name: string;
    age?: number;
  }
  let employee: IUser2 = {
    id: 1,
    name: "Alice",
    age: 23,
  };
  let manager: IUser2 = {
    id: 2,
    name: "Tom",
  };
  console.log(employee, manager);

  ////////////////////////////////////////////////////////////////

  interface Point {
    readonly x: number;
    readonly y: number;
  }
  let p: Point = { x: 10, y: 20 };
  console.log(p);
  // p.x = 5; //! Ошибка - свойство доступно только для чтения

  ////////////////////////////////////////////////////////////////

  interface IUser3 {
    id: number;
    name: string;
    sayWords(words: string): void;
  }
  let employee3: IUser3 = {
    id: 1,
    name: "Alice",
    sayWords: function (words: string): void {
      console.log(`${this.name} говорит "${words}"`);
    },
  };

  employee3.sayWords("Привет, как дела?");

  ////////////////////////////////////////////////////////////////

  interface IUser4 {
    id: number;
    name: string;
    getFullName(surname: string): string;
  }

  class User implements IUser4 {
    // private id: number;
    id: number;
    name: string;
    age: number;

    constructor(userId: number, userName: string, userAge: number) {
      this.id = userId;
      this.name = userName;
      this.age = userAge;
    }

    getFullName(surname: string): string {
      return this.name + " " + surname;
    }
  }

  let vi = new User(1, "Vi", 23);
  console.log(vi.getFullName("Silver Hand"));

  ////////////////////////////////////////////////////////////////////////

  //? РАСШИРЕНИЕ ИНТЕРФЕЙСОВ

  interface IUser77 {
    id: number;
    name: string;
  }

  interface IUser77 {
    age: number;
  }

  let employee77: IUser77 = {
    id: 1,
    name: "Alice",
    age: 31,
  };

  function printUser77(user: IUser77): void {
    console.log(`id: ${user.id}  name: ${user.name}  age: ${user.age}`);
  }

  printUser77(employee77);

  /////////////////////////////////////////////////////////////////////////

  interface IMovable {
    speed: number;
    move(): void;
  }
  interface ICar extends IMovable {
    fill(): void;
  }
  class Car implements ICar {
    speed: number = 0;
    move(): void {
      console.log("Машина едет со скоростью " + this.speed + " км/ч");
    }

    fill(): void {
      console.log("Заправляем машину топливом");
    }
  }

  let auto = new Car();
  auto.speed = 60;
  auto.fill();
  auto.move();

  ////////////////////////////////////////////////////////////////////////

  interface FullNameBuilder {
    (name: string, surname: string): string;
  }

  //? ТАК ТОЖЕ МОЖНО
  //   let simpleBuilder: FullNameBuilder = function (
  //     name: string,
  //     surname: string
  //   ): string {
  //     return "Mr. " + name + " " + surname;
  //   };

  let simpleBuilder: FullNameBuilder = (
    name: string,
    surname: string
  ): string => {
    return "Mr. " + name + " " + surname;
  };

  let fullName = simpleBuilder("Edgar", "Chernov");
  console.log(fullName); // Mr. Edgar Chernov

  ///////////////////////////////////////////////////////////////////////

  interface StringArray {
    [index: number]: string;
  }

  let phones: StringArray;
  phones = ["iPhone 7", "HTC 10", "HP Elite x3"];

  let myPhone: string = phones[0];
  console.log(myPhone);

  ///////////////////////////////////////////////////////////////////////

  interface Dictionary {
    [index: string]: string;
  }

  const colors: Dictionary = {};
  colors["red"] = "#ff0000";
  colors["green"] = "#00ff00";
  colors["blue"] = "#0000ff";

  console.log(colors["red"]);

  /////////////////////////////////////////////////////////////////////

  interface PersonInfo {
    (name: string, surname: string): void;
    fullName: string;
    password: string;
    authenticate(): void;
  }

  function personBuilder(): PersonInfo {
    let person = <PersonInfo>function (name: string, surname: string): void {
      person.fullName = name + " " + surname;
    };

    person.authenticate = function () {
      console.log(
        person.fullName + " входит в систему с паролем " + person.password
      );
    };

    return person;
  }

  let QW = personBuilder();
  QW("QW", "Simpson");
  QW.password = "qwerty";

  console.log(QW);
};
