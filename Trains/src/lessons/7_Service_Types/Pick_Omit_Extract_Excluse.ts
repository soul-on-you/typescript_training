interface PaymentPersistence {
  id: number;
  sum: number;
  from: string;
  to: string;
}

type omitP = Omit<PaymentPersistence, "id">;
/**
 * type omitP = {
    sum: number;
    from: string;
    to: string;
}
 */

type pickP = Pick<PaymentPersistence, "from" | "to">;
/**
 * type pickP = {
 *  from: string;
 *  to: string;
 * }
 */

type extractP = Extract<"from" | "to" | PaymentPersistence, string>;
const a1aa: extractP = "to"; // "from"
//? извелкло из юниона все типы строкового типа
// type extractP = "from" | "to"

type excludeP = Exclude<"from" | "to" | PaymentPersistence, string>;
//? извелкло из юниона все типы НЕстрокового типа
// type excludeP = PaymentPersistence
