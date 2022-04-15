abstract class Database {
  abstract connect(): void;
  abstract read(): void;
  abstract write(): void;
  //!   joinTables() {} ERROR: Can't join NOSQL database
}

//* class MysqlDatabase extends Database {
//*   connect() {
//*     console.log("Connecting Mysql Database");
//*   }
//*   read() {
//*     console.log("Reading Mysql Database");
//*   }
//*   write() {
//*     console.log("Writting Mysql Database");
//*   }
//*   joinTables() {
//*     console.log("Join tables in Mysql Database");
//*   }
//* }

//* class MongoDatabase extends Database {
//*   connect() {
//*     console.log("Connecting MongoDB Database");
//*   }
//*   read() {
//*     console.log("Reading MongoDB Database");
//*   }
//*   write() {
//*     console.log("Writting MongoDB Database");
//*   }
//*   //? Уже не нужен, т.к. нет в супер классе
//*   //   joinTables() {
//*   //     throw new Error("Can't join NOSQL database");
//*   //   }
//* }

//? НО мы можем дальше декомпозировать ДБ и следать для SQL и NOSQL

abstract class NOSQLDatabase extends Database {
  abstract findObject(): void;
}

abstract class SQLDatabase extends Database {
  abstract joinTables(): void;
}

class MysqlDatabase extends SQLDatabase {
  connect() {
    console.log("Connecting Mysql Database");
  }
  read() {
    console.log("Reading Mysql Database");
  }
  write() {
    console.log("Writting Mysql Database");
  }
  joinTables() {
    console.log("Join tables in Mysql Database");
  }
}

class MongoDatabase extends NOSQLDatabase {
  connect() {
    console.log("Connecting MongoDB Database");
  }
  read() {
    console.log("Reading MongoDB Database");
  }
  write() {
    console.log("Writting MongoDB Database");
  }
  findObject(): void {
    console.log("Finding object in MongoDB Database");
  }

  //! НАРУШАЕТ ПРИНЦИП SINGLE RESPONSIBILITY, но это пример!
  envParse(): void {
    console.log("Parse server .env from config in MongoDB Database");
  }
}

export default function (): void {
  const DatabaseForUsers = new MysqlDatabase();
  const DatabaseForServerData = new MongoDatabase();

  const initDB = (DBs: Database[]): void => {
    for (const DB of DBs) {
      DB.connect();
      DB.read();
      DB.write();
      //   DB.joinTables(); //! ОШИБКА для MongoDB
      console.log();
    }
  };

  const AllDbs: Database[] = [DatabaseForUsers, DatabaseForServerData];

  //? Теперь Try-Catch нам не нужен
  //*   try {
  //*     initDB(AllDbs);
  //*   } catch (e) {
  //*     console.error(e.message);
  //*   }

  initDB(AllDbs);

  DatabaseForUsers.joinTables();

  console.log();

  DatabaseForServerData.findObject();
  DatabaseForServerData.envParse();

  console.log();
}
