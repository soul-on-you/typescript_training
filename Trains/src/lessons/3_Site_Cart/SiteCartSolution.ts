namespace solution {
  class Product {
    constructor(
      public id: number,
      public title: string,
      public price: number
    ) {}
  }

  class Dilivery {
    constructor(public date: Date) {}
  }

  class CourierDilivery extends Dilivery {
    constructor(public date: Date, public adress: string) {
      super(date);
    }
  }

  class ShopDilivery extends Dilivery {
    constructor(public shopID: number) {
      super(new Date());
    }
  }

  type DiliveryOptions = CourierDilivery | ShopDilivery;

  class Cart {
    private _products: Product[] = [];
    private _dilivery!: DiliveryOptions;

    addProduct(product: Product): void {
      this._products.push(product);
    }

    deleteProduct(productID: number): void {
      this._products = this._products.filter(
        (p: Product) => p.id !== productID
      );
    }

    getSum(): number {
      return this._products.reduce(
        (sum: number, p: Product) => sum + p.price,
        0
      );
    }

    setDilivery(dilivery: DiliveryOptions): void {
      this._dilivery = dilivery;
    }

    checkout() {
      if (this._products.length === 0) {
        throw new Error("Нет товаров в корзине");
      }

      if (!this._dilivery) {
        throw new Error("Не указан способ доставки");
      }

      return { success: true };
    }
  }

  const cart = new Cart();

//   console.log(cart.checkout());

  cart.addProduct(new Product(44, "Яблоки ГоденДен", 230));
  cart.addProduct(new Product(20, "Шоколад Milka молочный", 89));
  cart.addProduct(new Product(22, "Шоколад Milka темный", 72));

//   console.log(cart.checkout());

  cart.deleteProduct(20);

  cart.setDilivery(new CourierDilivery(new Date(), "Moscow City 22"));

  console.log(cart.getSum());

  console.log(cart.checkout());
}
