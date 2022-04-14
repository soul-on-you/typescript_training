export default class Cat {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }
  /**
   * CAT SAY MEEEEOOW
   */
  public meow(): void {
    console.log(`${this._name}: meow`);
  }
}
