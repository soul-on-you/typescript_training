interface IClonable<T> {
  clone(): T;
}

class User implements IClonable<User> {
  constructor(public name: string, public age: number) {}
  clone(): User {
    return new User(this.name, this.age);
  }
}

class Employee extends User implements IClonable<Employee> {
  constructor(name: string, age: number, public company: string = "None") {
    super(name, age);
  }

  override clone(): Employee {
    return new Employee(this.name, this.age, this.company);
  }
}

enum CompanyType {
  financal = "финансовый сектор",
  technical = "IT сектор",
  industrial = "промышленный сектор",
  agro = "сельскохозяйственный сектор",
  service = "сектор услуг",
}

class Company implements IClonable<Company> {
  private _employeers: Employee[] = [];
  constructor(
    public name: string,
    public type: CompanyType,
    public employeeCount: number = 0
  ) {}

  public hireWorker(employee: Employee): void {
    if (!this._employeers.includes(employee)) {
      employee.company = this.name;
      this.employeeCount++;
      this._employeers.push(employee);
    }
  }

  public getCompanyReport() {
    return `Компания ${this.name}\nВид деятельности: ${
      this.type
    }\nКоличество работников: ${
      this.employeeCount
    }\nРаботники:\n${this._employeers
      .map(
        (employee) =>
          `Имя: ${employee.name} возрост: ${employee.age} компания: ${employee.company}`
      )
      .join("\n")}`;
  }

  clone(): Company {
    const copy = new Company(this.name, this.type, this.employeeCount);
    this._employeers.forEach((employee) => copy.hireWorker(employee));
    return copy;
  }
}

const Victor: User = new User("Victor", 21);
const VictorCopy = Victor.clone();

VictorCopy.age = 22;

console.log(Victor);
console.log(VictorCopy);

const EVictor = new Employee(VictorCopy.name, VictorCopy.age);

const Diomedialc = new Company("Diomedialc", CompanyType.technical);
Diomedialc.hireWorker(EVictor);

const DiomedialcTech = Diomedialc.clone();

const EVictorCopy = EVictor.clone();
EVictorCopy.name = "VictorCopy";

DiomedialcTech.hireWorker(EVictorCopy);

console.log('\n' + Diomedialc.getCompanyReport());
console.log('\n' + DiomedialcTech.getCompanyReport() + '\n');
