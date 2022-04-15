class User {
  _name: string;
  _age: number;

  constructor(name: string = "Default", age: number = 0) {
    this._name = name;
    this._age = age;
  }
  print(): void {
    console.log(`Имя: ${this._name}  age: ${this._age}\n`);
  }
}

class Employee extends User {
  _company: string;
  constructor(name: string = "Default", age: number = 0, company: string) {
    super(name, age);
    this._company = company;
  }
  //   work(): void {
  //     console.log(`${this._name} работает в компании ${this._company}\n`);
  //   }
  print(): void {
    super.print();
    console.log(`${this._name} работает в компании ${this._company}\n`);
  }
}

export default function (): void {
  const tom = new User();
  tom.print();
  tom._name = "Tom";
  tom._age = 44;
  tom.print();

  const bob = new User("Bob", 22);
  bob.print();

  const victor = new Employee("Victor", 22, "MOEX");
  victor.print();
  //   victor.work();
}
