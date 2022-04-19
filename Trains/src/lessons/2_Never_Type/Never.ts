function generateError(message: string): never {
  throw new Error(message);
}

function infDump(): never {
  // НЕ СРАБОТАЕТ
  let a = 1;
  while (++a) {}

  // А ТУТ УЖЕ ОПРЕДЕЛИТ КАК NEVER
  while (true) {}
}

function recure(): never {
  return recure();
}

//? ОШИБКА НЕ ПОДСВЕЧИВАЕТСЯ
type paymentAction = "refund" | "checkout";

//? ОШИБКА ПОДСВЕЧИВАЕТСЯ!!!!
//! type paymentAction = "refund" | "checkout" | "wait";

function processAction(action: paymentAction) {
  switch (action) {
    case "refund": // code:refund
      break;
    case "checkout": // code:checkout
      break;
    default: //! ТУТ БУДЕТ ОШИБКА ЕСЛИ ЕСТЬ НЕОБРАБОТАННЫЙ SWITCH
      //! ИСПОЛЬЗУЕМ NEVER ЧТОБЫ ПОДСВЕТИЛО ОШИБКУ НЕ В RUNTIME, А В COMPILE
      const _: never = action;
      throw new Error(`Unknown payment action`);
  }
}

function isString(input: string | number): boolean {
  if (typeof input === "string") return true;
  else if (typeof input === "number") return false;

  const a = input;
  generateError("Invalid imput");
}
