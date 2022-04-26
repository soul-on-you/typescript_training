class User {
  constructor(public id: number, public name: string) {}
}

function getData(id: number, name: string): User {
  return new User(id, name);
}

type RT = ReturnType<typeof getData>;
// type RT = User

type PT = Parameters<typeof getData>;
// type PT = [id: number, name: string]

type PTindexed = PT[number];
// type PTindexed = string | number

type CP = ConstructorParameters<typeof User>;
// type CP = [id: number, name: string]

const userPersistanse: PT = [22, "Vova"];
console.log(getData(...userPersistanse));
