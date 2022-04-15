import Cat from "./1_Cat";
import Calculator from "./1_Calculator";
import LambdaFuncHello from "./2_Lambda";
import UnionTest from "./3_Union";
import ObjectsTest from "./4_Objects";
import PsevdonimsTest from "./5_Psevdonims";
import ArrayTest from "./6_Arrays";
import EnumTest from "./7_Enum";
import ClassTest from "./8_Classes";
import AbstractClassesTest from "./9_AbstractClassses";
import InterfaceTest from "./10_Interfaces";
import PreobrazovaniaClassesTest from "./11_PreobrazovaniaClassov";

console.log("\n1_CLASSES_TEST:");
const Belchonok: Cat = new Cat("Belchonok");
Belchonok.meow();

const simpleCalcFunctions = new Calculator();

const a: any = "10";
const b: number = 7;
const c: number = 9;

console.log(simpleCalcFunctions.Sub(a, b, c));
LambdaFuncHello();

type MathOP = (a: number, b: number) => number;

function mathOP(
  x: number,
  y: number,
  //   opFunc: (a: number, b: number) => number
  opFunc: MathOP
): number {
  return opFunc(x, y);
}

console.log(mathOP(a, b, simpleCalcFunctions.Sum));
console.log(mathOP(a, b, simpleCalcFunctions.Sub));
console.log(mathOP(a, b, simpleCalcFunctions.Mul));
console.log(mathOP(a, b, simpleCalcFunctions.Div));

console.log("\n2_LAMBDA:");
type Operation = (a: number, b: number) => number;

function mathOp(x: number, y: number, op: Operation): number {
  return op(x, y);
}

let sum: Operation = function (x: number, y: number): number {
  return x + y;
};

console.log(mathOp(10, 20, sum)); // 30

console.log("\n3_UNION:");
UnionTest();

console.log("\n4_OBJECTS:");
ObjectsTest();

console.log("\n5_PSEVDONIMS:");
PsevdonimsTest();

console.log("\n6_ARRAYS:");
ArrayTest();

console.log("\n7_ENUM:");
EnumTest();

console.log("\n8_CLASSES:");
ClassTest();

console.log("\n9_ABSTARCT_CLASSES:");
AbstractClassesTest();

console.log("\n10_INTERFACES:");
InterfaceTest();

console.log("\n11_PREOBRAZOVANIA_CLASSOV:");
PreobrazovaniaClassesTest();
