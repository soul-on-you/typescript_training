// Необходимо реализовать абстрактный класс Logger с 2-мя методами
// абстрактным - log(message): void
// printDate - выводящий в log дату
// К нему необходимо сделать реальный класс, который бы имел метод: logWithDate,
// выводящий сначала дату, а потом заданное сообщение

namespace me {
  abstract class Logger {
    abstract log(message: string): void;

    printDate() {
      return new Date();
    }
  }

  class AuthLogger extends Logger {
    log(message: string): void {
      console.log(`${this.printDate()}: ${message}`);
    }
  }

  const logger = new AuthLogger();
  logger.log("Авторизация...");
  logger.log("Ожидание ответа от БД...");
  logger.log("Загрузка SPA админки...");
  logger.log("Готово к работе");
}

//! РЕШЕНИЕ

namespace solution {
  abstract class Logger {
    abstract log(message: string): void;

    printDate() {
      this.log(new Date().toString());
    }
  }

  class MyLogger extends Logger {
    log(message: string): void {
      console.log(message);
    }

    logWithDate(message: string): void {
      this.printDate();
      this.log(message);
    }
  }

  const logger = new MyLogger();
  logger.log("Авторизация...");
  logger.log("Ожидание ответа от БД...");
  logger.log("Загрузка SPA админки...");
  logger.log("Готово к работе");
}
