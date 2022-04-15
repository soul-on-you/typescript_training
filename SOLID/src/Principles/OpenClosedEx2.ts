interface ISorter {
  // sort<T>(): T[];
  sort(): any[];
}

class Person {
  constructor(public fullName: string) {}
}

class PersonList implements ISorter {
  //* sort<T extends Person>(): T[] {
  //*    return SortClient.sort<T>(this.persons);
  //* }
  constructor(public persons: Person[]) {}

  sort() {
    return SortClient.sort(this.persons);
  }
}

class Music<TMusic> {
  constructor(public sound: TMusic) {}
}

class MusicList<TMusic> implements ISorter {
  constructor(public sounds: Music<TMusic>[]) {}

  sort() {
    return SortClient.sort(this.sounds);
  }
}

//////////////////////

class Sorter {
  static sort<T>(array: T[]): T[] {
    return array;
  }
}

class BubbleSort extends Sorter {
  static sort<T>(array: T[]): T[] {
    array = array.slice(); // creates a copy of the array

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - 1; j++) {
        if (array[j] > array[j + 1]) {
          let swap = array[j];
          array[j] = array[j + 1];
          array[j + 1] = swap;
        }
      }
    }
    return array;
  }
}

class QuickSort extends Sorter {
  static sort<T>(array: T[]): T[] {
    if (array.length <= 1) return array;

    const pivotIndex = Math.floor(array.length / 2);
    const pivot = array[pivotIndex];

    const less = [];
    const greater = [];

    for (const item of array) {
      if (item === pivot) continue;
      if (item > pivot) {
        greater.push(item);
      } else {
        less.push(item);
      }
    }

    return [...this.sort<T>(less), pivot, ...this.sort<T>(greater)];
  }
}

class MergeSort extends Sorter {
  private static merge<T>(leftArr: T[], rightArr: T[]) {
    const output = [];

    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
      const leftEl = leftArr[leftIndex];
      const rightEl = rightArr[rightIndex];

      if (leftEl < rightEl) {
        output.push(leftEl);
        leftIndex++;
      } else {
        output.push(rightEl);
        rightIndex++;
      }
    }
    return [
      ...output,
      ...leftArr.slice(leftIndex),
      ...rightArr.slice(rightIndex),
    ];
  }

  static sort<T>(array: T[]): T[] {
    if (array.length <= 1) {
      return array;
    }

    const middleIndex = Math.floor(array.length / 2);
    const leftArr = array.slice(0, middleIndex);
    const rightArr = array.slice(middleIndex);

    return this.merge(this.sort(leftArr), this.sort(rightArr));
  }
}

class SortClient {
  static sort<TSortable>(array: TSortable[]): TSortable[] {
    if (array.length < 20) {
      return BubbleSort.sort<TSortable>(array);
    } else if (array.length < 200) {
      return MergeSort.sort<TSortable>(array);
    } else {
      return QuickSort.sort<TSortable>(array);
    }
  }
}

export default function (): void {
  const employeers: Person[] = [];

  employeers.push(new Person("VICTOR CHAOS"));
  employeers.push(new Person("MARK-TARQUINIY"));
  employeers.push(new Person("ANGEL SLAUGHTER"));
  employeers.push(new Person("VERGILIY"));
  employeers.push(new Person("RIMSKY-KORSAKOV"));
  employeers.push(new Person("SAINT-ETIEN"));
  employeers.push(new Person("ROMUL AUGUST"));
  employeers.push(new Person("ANTISPHEN"));
  employeers.push(new Person("FRANSUA RABLES"));
  employeers.push(new Person("VICTOR CHAOS"));
  employeers.push(new Person("MARK-TARQUINIY"));
  employeers.push(new Person("ANGEL SLAUGHTER"));
  employeers.push(new Person("VERGILIY"));
  employeers.push(new Person("RIMSKY-KORSAKOV"));
  employeers.push(new Person("SAINT-ETIEN"));
  employeers.push(new Person("ROMUL AUGUST"));
  employeers.push(new Person("ANTISPHEN"));
  employeers.push(new Person("FRANSUA RABLES"));
  employeers.push(new Person("VICTOR CHAOS"));
  employeers.push(new Person("MARK-TARQUINIY"));
  employeers.push(new Person("ANGEL SLAUGHTER"));
  employeers.push(new Person("VERGILIY"));
  employeers.push(new Person("RIMSKY-KORSAKOV"));
  employeers.push(new Person("SAINT-ETIEN"));
  employeers.push(new Person("ROMUL AUGUST"));
  employeers.push(new Person("ANTISPHEN"));
  employeers.push(new Person("FRANSUA RABLES"));

  const employeeList: PersonList = new PersonList(employeers);
  console.log(employeeList);

  employeeList.sort();
  console.log(employeeList);

  const musics: Music<number>[] = [];

  for (let i = 0; i < 10; i++) {
    musics.push(new Music(Math.random() * 1000));
  }

  const musicList = new MusicList(musics);
  console.log(musicList);

  musicList.sort();
  console.log(musics);
}

/**
 * class BubbleSort<T> implements ISorter<T> {
  sort<T>(array: T[]): T[] {
    array = array.slice(); // creates a copy of the array

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - 1; j++) {
        if (array[j] > array[j + 1]) {
          let swap = array[j];
          array[j] = array[j + 1];
          array[j + 1] = swap;
        }
      }
    }
    return array;
  }
}

class QuickSort<T> implements ISorter<T> {
  sort<T>(array: T[]): T[] {
    if (array.length <= 1) return array;

    const pivotIndex = Math.floor(array.length / 2);
    const pivot = array[pivotIndex];

    const less = [];
    const greater = [];

    for (const item of array) {
      if (item === pivot) continue;
      if (item > pivot) {
        greater.push(item);
      } else {
        less.push(item);
      }
    }

    return [...this.sort<T>(less), pivot, ...this.sort<T>(greater)];
  }
}

class MergeSort<T> implements ISorter<T> {
  merge<T>(leftArr: T[], rightArr: T[]) {
    const output = [];

    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
      const leftEl = leftArr[leftIndex];
      const rightEl = rightArr[rightIndex];

      if (leftEl < rightEl) {
        output.push(leftEl);
        leftIndex++;
      } else {
        output.push(rightEl);
        rightIndex++;
      }
    }
    return [
      ...output,
      ...leftArr.slice(leftIndex),
      ...rightArr.slice(rightIndex),
    ];
  }

  sort<T>(array: T[]): T[] {
    if (array.length <= 1) {
      return array;
    }

    const middleIndex = Math.floor(array.length / 2);
    const leftArr = array.slice(0, middleIndex);
    const rightArr = array.slice(middleIndex);

    return this.merge(this.sort(leftArr), this.sort(rightArr));
  }
}
 */
