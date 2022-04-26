interface UseR {
  name: string;
  age?: number;
  email: string;
}

type partialU = Partial<UseR>;
const p: partialU = {};
/**
 * type partialU = {
 *  name?: string | undefined;
 *  age?: number | undefined;
 *  email?: string | undefined;
 * }
 */

type requiredU = Required<UseR>;
const req: requiredU = { name: "U", age: 29, email: "j2rfhfhgs" };
/**
 * type requiredU = {
 *  name: string;
 *  age: number;
 *  email: string;
 * } */

type readonlyU = Readonly<UseR>;
const ronlyU: readonlyU = { name: "U", email: "j2rfhfhgs" };
/**
 * type readonlyU = {
 *  readonly name: string;
 *  readonly age?: number | undefined;
 *  readonly email: string;
 * }
 */

type requiredAndreadonlyU = Required<Readonly<UseR>>;
const reqAndRonlyU: requiredAndreadonlyU = {
  name: "U",
  age: 29,
  email: "j2rfhfhgs",
};
/**
 * type readonlyU = {
 *  readonly name: string;
 *  readonly age: number;
 *  readonly email: string;
 * }
 */
