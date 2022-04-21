class Product {
  constructor(public id: number, public name: string, public price: number) {}
  static isProduct(product: any): product is Product {
    return product instanceof Product;
  }
}

interface IDiliveryData {
  date: Date;
  clientId: number;
}

interface ICourierIDiliveryData extends IDiliveryData {
  adress: string;
}

function isICourierIDiliveryData(
  data: IDiliveryData
): data is ICourierIDiliveryData {
  return (data as ICourierIDiliveryData)?.adress !== undefined;
}

interface IPickupIDiliveryData extends IDiliveryData {
  shopID: number;
}

function isIPickupIDiliveryData(
  data: IDiliveryData
): data is IPickupIDiliveryData {
  return (data as IPickupIDiliveryData)?.shopID !== undefined;
}

enum DiliveryMethods {
  Courier = "Курьером",
  Pickup = "Самовывоз",
}

interface ICourierIDilivery {
  method: DiliveryMethods.Courier;
  data: ICourierIDiliveryData;
}
interface IPickupIDilivery {
  method: DiliveryMethods.Pickup;
  data: IPickupIDiliveryData;
}

type TDilivery = ICourierIDilivery | IPickupIDilivery;

class Cart {
  private _products: Product[] = [];
  private _dilivery!: TDilivery;

  add(product: Product): void;
  add(product: Product[]): void;
  add(productOrProducts: Product | Product[]) {
    if (Array.isArray(productOrProducts)) {
      productOrProducts.forEach((product) => this._products.push(product));
    } else {
      this._products.push(productOrProducts);
    }
  }

  delete(product: Product): void;
  delete(productID: number): void;
  delete(productOrProductID: Product | number): void {
    if (Product.isProduct(productOrProductID)) {
      const index = this._products.indexOf(productOrProductID);
      if (index >= 0) this._products.splice(index, 1);
    } else {
      const produc = this._products.find(
        (product) => product.id === productOrProductID
      );
      if (produc) this._products.splice(this._products.indexOf(produc), 1);
    }
  }

  totalPrice(): number {
    const price = this._products.reduce(
      (res: number, product: Product) => res + product.price,
      0
    );

    return price;
  }

  chooseDiliver(
    diliveryMethods: DiliveryMethods,
    data: ICourierIDiliveryData | IPickupIDiliveryData
  ): void {
    if (diliveryMethods === DiliveryMethods.Courier) {
      if (isICourierIDiliveryData(data)) {
        this._dilivery = {
          method: DiliveryMethods.Courier,
          data: {
            date: new Date(),
            clientId: Math.round(Math.random() * 100),
            adress: "Moscow city",
          },
        };
      }
    } else if (diliveryMethods === DiliveryMethods.Pickup) {
      if (isIPickupIDiliveryData(data)) {
        this._dilivery = {
          method: DiliveryMethods.Pickup,
          data: {
            date: new Date(),
            clientId: Math.round(Math.random() * 100),
            shopID: Math.round(Math.random() * 10),
          },
        };
      }
    } else {
      throw new Error(`Invalid argument types`);
    }
  }

  checkout(): void {
    if (this._products.length === 0) {
      return console.log("\nВыберите товары, корзина пуста!\n");
    }
    if (!this._dilivery) {
      return console.log("\nВыберите способ доставки!\n");
    }

    console.log("\nКорзина:");
    this._products.forEach((product) =>
      console.log(
        `Товар: ${product.id} Наименование: ${product.name} Стоимость: ${product.price}`
      )
    );

    console.log("\nДоставка:");
    console.log(`Тип доставки: ${this._dilivery.method}`);
    console.log(`Номер заказа: ${this._dilivery.data.clientId}`);
    console.log(`Дата получения с ${this._dilivery.data.date}`);
    if (isICourierIDiliveryData(this._dilivery.data)) {
      console.log(`Адресс доставки: ${this._dilivery.data.adress}`);
    } else {
      console.log(`Можно получить в магазине: ${this._dilivery.data.shopID}`);
    }

    console.log(`\nИтоговая сумма заказа: ${this.totalPrice()}`);
  }
}

const userCart = new Cart();

userCart.checkout();

userCart.add(new Product(1, "Зубная счетка", 200));
userCart.add(new Product(15, "Цыпленок для запекания", 400));
userCart.add(new Product(44, "Яблоки ГоденДен", 230));

userCart.delete(44);

userCart.add([
  new Product(45, "Яблоки Макинтош", 219),
  new Product(72, "Виноград Изабель", 337),
]);

userCart.checkout();

userCart.chooseDiliver(DiliveryMethods.Courier, {
  date: new Date(),
  clientId: Math.random(),
  adress: "Moscow City 22",
});

userCart.checkout();
