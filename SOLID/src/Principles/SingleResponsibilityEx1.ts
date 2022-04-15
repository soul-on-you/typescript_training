class User {
  id: number;
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.id = Math.random() * Date.now();
    this.username = username;
    this.password = password;
  }
}

class UserRepository {
  save(user: User) {
    //save user
  }
}

class UserLogger {
  log(user: User) {
    console.log(user);
  }
}

class UserController {
  send(user: User) {
    // return http.send();
  }
}

export default function (): void {
  const user = new User("Victor", "VVV21-99-99");

  //* нужно сохранить в репозиторий какие-то данные юзера
  //* создаем класс, который будет отвечать за работу с репозиторием
  //* вдруг в будующем на попросят сделать еще возможностей по типу
  //* апдейта или делита записи и мы модифицируем класс репо., а не юзера

  const userRepositoryService = new UserRepository();
  userRepositoryService.save(user);

  //* Аналогично и с сервисами логгирования действий и контролера запросов

  const userLoggerService = new UserLogger();
  userLoggerService.log(user);

  const userControllerService = new UserController();
  userControllerService.send(user);
}
