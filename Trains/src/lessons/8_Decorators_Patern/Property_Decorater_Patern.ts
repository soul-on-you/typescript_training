const Max = (max: number) => {
  return (target: Object, propertyKey: string) => {
    let value: number;
    const set = (newValue: number) => {
      if (newValue > max) {
        console.error(`Нельзя устатновить значение больше ${max}`);
      } else value = newValue;
    };
    const get = () => {
      return value;
    };

    Object.defineProperty(target, propertyKey, { get, set });
  };
};

class Employeers {
  @Max(100)
  workers: number = 10000;
}

const factoryWorkers = new Employeers();
console.log(factoryWorkers.workers);

factoryWorkers.workers = 99;
console.log(factoryWorkers.workers);

// target - Employeers
// propertyKey - workers
