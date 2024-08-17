// A hash table is a data structure that is used to store keys/value pairs. 
// It uses a hash function to compute an index into an array in which an element will be inserted or searched. 
// By using a good hash function, hashing can work well.

// 1st way to implement hash table in js:

let objectHashTable = new Object();

objectHashTable['key1'] = 'value1';
objectHashTable['key2'] = 'value2';
objectHashTable['key3'] = 'value3';

// getting size of hash table
console.log(Object.keys(objectHashTable).length)

// delete from hash table
delete objectHashTable['key2']

// iterating
for (var key in objectHashTable) {
  if (objectHashTable.hasOwnProperty(key)) {
    console.log(key + ' = ' + objectHashTable[key]);
  }
}




// 2nd way to implement hash table in js:

let mapHashTable = new Map();

mapHashTable.set('key1', 'value1');
mapHashTable.set('key2', 'value2');
mapHashTable.set('key3', 'value3');

// getting size of hash table
console.log(mapHashTable.size);

// delete from hash table
mapHashTable.delete('key2');

// iterating
for (const [key, value] of mapHashTable) {
  console.log(key + ' = ' + value);
}




// manual implementation of hash table
// source: https://www.freecodecamp.org/news/javascript-hash-table-associative-array-hashing-in-js/

class HashTable {
  constructor() {
    this.table = new Array(127);
    this.size = 0;
  }

  // hash function that calculates hashcode by ASCII code and table length
  #hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.table.length;
  }

  set(key, value) {
    const index = this.#hash(key);
    
    if (this.table[index]) {
      // updating value in case of index collision
      for (let i = 0; i < this.table[index].length; i++) {
        if (this.table[index][i][0] === key) {
          this.table[index][i][1] = value;
          return;
        }
      }
      // if value have not found, just add array to the end of current values
      this.table[index].push([key, value]);
    } else {
      this.table[index] = [];
      this.table[index].push([key, value]);
    }
    this.size++;
  }

  get(key) {
    const index = this.#hash(key);
    if (this.table[index]) {
      // iterating values array to find our key and return value
      for (let i = 0; i < this.table.length; i++) {
        if (this.table[index][i][0] === key) {
          return this.table[index][i][1];
        }
      }
    }
    return undefined;
  }

  remove(key) {
    const index = this.#hash(key);

    if (this.table[index] && this.table[index].length) {
      // iterating values array to find our key and make splice
      for (let i = 0; i < this.table.length; i++) {
        if (this.table[index][i][0] === key) {
          this.table[index].splice(i, 1);
          this.size--;
          return true;
        }
      }
    }
    return false;
    
  }

  display() {
    this.table.forEach((values, index) => {
      const chainedValues = values.map(
        ([key, value]) => `[ ${key}: ${value} ]`
      );
      console.log(`${index}: ${chainedValues}`);
    });
  }
}
