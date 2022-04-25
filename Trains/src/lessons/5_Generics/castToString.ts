function _toString<T>(value: T): string | undefined {
  if (Array.isArray(value)) {
    return value.toString();
  }
  switch (typeof value) {
    case "string":
      return value;

    case "number":
    case "boolean":
    case "bigint":
    case "symbol":
      return value.toString();

    case "object":
      return JSON.stringify(value);
  }
  return undefined;
}

console.log(_toString("123"));
console.log(_toString(1223));
console.log(_toString("3"));
console.log(_toString(true));
console.log(_toString({ a: 3, b: true }));
console.log(_toString(_toString));
console.log(_toString(undefined));
console.log(_toString(null)); // попадает в case object

// Необходимо написать функцию сортировки любых
// объектов, которые имеют id по убыванию и по возрастанию

const data = [
  { id: 2, name: "Петя" },
  { id: 1, name: "Вася" },
  { id: 3, name: "Надя" },
];

interface Numerables {
  id: number;
}

function sortByID<T extends Numerables>(
  data: T[],
  type: "asc" | "desc" = "asc"
): T[] {
  return data.sort((a, b) => {
    switch (type) {
      case "asc":
        return a.id - b.id;
      case "desc":
        return b.id - a.id;
    }
  });
}

console.log(data);

sortByID(data);

console.log(data);

sortByID(data, "desc");

console.log(data);
