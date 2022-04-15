export default class HashSetNode {
  private _key: number;
  public get key(): number {
    return this._key;
  }
  private set key(value: number) {
    this._key = value;
  }

  private _value: string;
  public get value(): string {
    return this._value;
  }
  public set value(value: string) {
    this._value = value;
  }

  constructor(key: number, value: string) {
    this._key = key;
    this._value = value;
  }
}
