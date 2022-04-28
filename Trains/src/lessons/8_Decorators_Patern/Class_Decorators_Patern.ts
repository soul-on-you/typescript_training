interface IUserService {
  users: number;
  getUsersInDB(): number;
}

//? @nullUser // вызывается до создания класа и записывает в прототип 0, но он перезаписывается 1000
//? @threeUserSet // чтобы перезаписать свойства сдлаем декоратор для класса
@CreatedAt
@SetUsers(10)
class UserService implements IUserService {
  users: number = 1000;
  getUsersInDB(): number {
    return this.users;
  }
}

function NullUser(target: Function) {
  target.prototype.users = null;
}

function SetUsers(users: number) {
  return <T extends { new (...args: any[]): {} }>(constructor: T) => {
    return class extends constructor {
      users = users;
    };
  };
}

function ThreeUserSet<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    users = 3;
  };
}

//! Декораторы пишут с большой буквы
function CreatedAt<T extends { new (...args: any[]): {} }>(base: T) {
  return class extends base {
    createdAt = new Date();
  };
}

//! мы не увидим поле декоратора потому что возвращаем
//! анонимный класс, но создаем UserService без createdAt
//? Создадим тип по названию декоратора чтобы было понятна
//? их связь, но необязательно чтобы они совпадали
type CreatedAt = {
  createdAt: Date;
};

//? Создавая класс обернутый в декоратор, если хотим иметь
//? доступ к новым декорирующим свойствам и методам, то указываем
//? что тип нашего класса это объединение UserService & CreatedAt
const userService = new UserService() as UserService & CreatedAt;
console.log(userService.getUsersInDB());
console.log(userService);
console.log(userService.createdAt);
