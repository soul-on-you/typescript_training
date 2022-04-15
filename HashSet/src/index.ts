import HashSetNode from "./classes/HashNode";
import HashSet from "./classes/HashSet";

const node1 = new HashSetNode(0, "start");
const node2 = new HashSetNode(1, "middle");
const node3 = new HashSetNode(2, "end");

const hashSet = new HashSet([node1, node2, node3]);
hashSet.Print();

console.log("\n");
console.log(hashSet.SearchNodeKey(0));

console.log("\n");
hashSet.AddOne(2, "last");
hashSet.Print();

console.log("\n");
hashSet.AddOne(3, "last");
hashSet.Print();

// const HashSet = []; //node1, node2, node3
// HashSet.push(node1);
// HashSet.push(node2);
// HashSet.push(node3);

// for (const hashNode of HashSet) {
//   //   console.log(hashNode);
//   console.log(`${hashNode.key}: ${hashNode.value}`);
// }
