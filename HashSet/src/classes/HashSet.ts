import HashSetNode from "./HashNode";

export default class HashSet {
  private _hashSet: HashSetNode[];
  constructor(_startNodes: HashSetNode[] = []) {
    this._hashSet = [];

    for (const node of _startNodes) {
      this._hashSet.push(node);
    }
  }

  public AddOne(key: number, value: string): void {
    if (this.isUniqueKey(key)) {
      this._hashSet.push(new HashSetNode(key, value));
    } else {
      console.error("Error: Duplicate key\n");
    }
  }

  public SearchNodeKey(key: number): HashSetNode | null {
    for (const node of this._hashSet) {
      if (node.key === key) return node;
    }

    return null;
  }

  private isUniqueKey(key: number): boolean {
    if (this.SearchNodeKey(key)) {
      return false;
    }
    return true;
  }

  public Print(): void {
    console.log("HASH_SET:");
    this._hashSet.forEach((node) => {
      console.log(`${node.key}: ${node.value}`);
    });
  }
}
