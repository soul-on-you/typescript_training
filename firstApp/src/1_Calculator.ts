export default class Calculator {
  public Sum(a: number, b: number, c: number = 0, d?: number): number {
    if (d) return a + b + c + d;
    return a + b + c;
  }
  public Sub(a: number, b: number, c: number = 0, d?: number): number {
    if (d) return a - b - c - d;
    return a - b - c;
  }
  public Mul(a: number, b: number, c: number = 1, d?: number): number {
    if (d) return a * b * c * d;
    return a * b * c;
  }
  public Div(a: number, b: number, c: number = 1, d?: number): number {
    if (d) return a / b / c / d;
    return a / b / c;
  }
}
