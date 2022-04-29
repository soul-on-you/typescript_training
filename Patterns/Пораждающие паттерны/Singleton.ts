class MyMap {
  private static instance: MyMap;
  map: Map<number, string> = new Map();

  private constructor() {}

  clean() {
    this.map = new Map();
  }

  public static getInstance(): MyMap {
    if (!this.instance) {
      this.instance = new MyMap();
    }

    return this.instance;
  }
}

class Service1 {
  addMap(key: number, value: string): void {
    const myMap = MyMap.getInstance();
    myMap.map.set(key, value);
  }
}

class Service2 {
  addMap(key: number): void {
    const myMap = MyMap.getInstance();

    const value = myMap.map.get(key);

    if (value) {
      console.log(`Nекущее значение: ${myMap.map.get(key)}`);
      myMap.clean();
      console.log(`Очистка, текущее значение: ${myMap.map.get(key)}`);
    } else {
      console.log("Нет данных по ключу");
    }
  }
}

new Service1().addMap(1, "Work");
new Service2().addMap(2);
new Service2().addMap(1);
