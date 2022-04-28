// Декоратор метода

interface IClientDB {
  create(): void;
  read(): void;
  update(): void;
  delete(): void;
}

class MySQLClient implements IClientDB {
  create(): void {
    console.log("create transaction");
  }

  @LocalStorageDBReader
  read(): void {
    // throw new Error("no way to read database");
    console.log("read transaction");
  }
  update(): void {
    console.log("update transaction");
  }
  delete(): void {
    console.log("delete transaction");
  }
}

//? Вместо того чтобы создавать огромную иерархию классов
//? откуда и как читать, создадим декоратор для метода read

//* class MysqlLocal extends MySQL {
//*   override read(): void {
//*     console.log("read transaction from local storage");
//*   }
//* }
//* class MySqlAPI extends MySQL {
//*   override read(): void {
//*     //   http.get("")
//*     console.log("read transaction from remote storage");
//*   }
//* }

function LocalStorageDBReader(
  target: Object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
): TypedPropertyDescriptor<(...args: any[]) => any> | void {
  //   console.log(target);
  //   console.log(propertyKey);
  //   console.log(descriptor);
  const base = descriptor.value ?? (() => void {});

  descriptor.value = () => {
    console.log("read transaction from local storage");
    base();
  };
}

const mysqlClient = new MySQLClient();
mysqlClient.read();

/**
 * {}                           - Объект класса в котором находится функция (target)
 * read                         - Название декорируемой функции (propertyKey)
 * {                            - Описание того что содержит метод (descriptor)
 *   value: [Function: read],   - Сама функция
 *   writable: true,            - Параметр отвечающий за возможность переопределения функции
 *   enumerable: false,         - Параметр отвечающиий за участие функции в переборе через foreach
 *   configurable: true         - Свойство можно удалять и изменять
 * }
 */
