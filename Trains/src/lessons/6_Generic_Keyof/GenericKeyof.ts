// Необходимо написать функцию группировки, которая принимает массив объектов
// и его ключ, производит группировку по указанному ключу и возращает
// сгруппированный объект.
// Пример:
// ``` js
// [
// 	{ group: 1, name: 'a' },
// 	{ group: 1, name: 'b' },
// 	{ group: 2, name: 'c' },
// ];
// ```

// При группироке по 'group' ---->

// ``` js
// {
// 	'1': [ { group: 1, name: 'a' }, { group: 1, name: 'b' } ],
// 	'2': [ { group: 2, name: 'c' } ]
// }
// ```

interface IData {
  group: number;
  name: string;
}

const ddata: IData[] = [
  { group: 1, name: "a" },
  { group: 1, name: "b" },
  { group: 2, name: "c" },
  { group: 1, name: "c" },
];

function groupByKey<T extends Record<string, any>>(data: T[], key: keyof T) {
  const res: { [key: string]: T[] } = {};

  for (const item of data) {
    if (!res[item[key]]) {
      res[item[key]] = [];
    }
    res[item[key]].push(item);
  }
  return res;
}

console.log(groupByKey(ddata, "group"));

interface IGroup<T> {
  [key: string]: T[];
}

type key = number | string | symbol;

function groupByKey2<T extends Record<key, any>>(
  data: T[],
  key: keyof T
): IGroup<T> {
  return data.reduce<IGroup<T>>((map: IGroup<T>, item: T) => {
    const itemKey = item[key];
    let cur = map[itemKey];

    if (Array.isArray(cur)) {
      cur.push(item);
    } else {
      cur = [item];
    }

    map[itemKey] = cur;
    return map;
  }, {});
}

console.log(groupByKey(ddata, "group"));

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

type direction = keyof typeof Direction;
const D: direction = "Up";

const user = { name: "Vova" };

type keyOfuser = keyof typeof user;
const u: keyOfuser = "name";

interface Role {
  name: string;
}

interface User {
  name: string;
  roles: Role[];
}

const userVova: User = {
  name: "Vova",
  roles: [{ name: "admin" }, { name: "user" }, { name: "moderator" }],
};

type rolesT = User["roles"]; //Role[]
type rolesT2 = User["roles"][number]; //Role

const roles = ["admin", "user", "moderator"] as const;
type TRole = typeof roles[number]; // type TRole = "admin" | "user" | "moderator"

type tRole = typeof userVova["roles"][number]["name"]; // string

type Modifier = "read" | "update" | "create";

type UserRoles = {
  customers?: Modifier;
  projects: Modifier;
  adminPanel?: Modifier;
};

type ModifierToAccess<Type> = {
  +readonly [prop in keyof Type]+?: boolean;
};

//+readonly добавил только для чтения
//+? сделал все опциональными
//-? сделал бы все обязательными
//"prop" - просто имя, так назвал, это тоже самое что и в for(ITEM in Type)
//по итогу мы смапили тип по названию и теперь он возвращает булл вместо Модифаер

type UserAccess = ModifierToAccess<UserRoles>;
/**
 * type UserAccess = {
 *   readonly customers?: boolean | undefined;
 *   readonly projects?: boolean;
 *   readonly adminPanel?: boolean | undefined;
 * }
 */
