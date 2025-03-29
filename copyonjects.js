function deepClone(obj, visited = new WeakMap()) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (visited.has(obj)) {
    return visited.get(obj);
  }

  let clone;

  if (obj instanceof Date) {
    clone = new Date(obj);
  }

  else if (Array.isArray(obj)) {
    clone = [];
  }

  else if (obj instanceof Map) {
    clone = new Map();
  }

  else if (obj instanceof Set) {
    clone = new Set();
  }

  else {
    clone = Object.create(Object.getPrototypeOf(obj));
  }
  visited.set(obj, clone);
  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], visited);
    }
  }
  for (let symbol of Object.getOwnPropertySymbols(obj)) {
    clone[symbol] = deepClone(obj[symbol], visited);
  }

  if (obj instanceof Map) {
    obj.forEach((value, key) => {
      clone.set(key, deepClone(value, visited));
    });
  }

  if (obj instanceof Set) {
    obj.forEach((value) => {
      clone.add(deepClone(value, visited));
    });
  }

  return clone;
}

const original = {
  name: "John",
  age: 30,
  hobbies: ["reading", "swimming"],
  details: {
    address: "123 Main St",
    phone: "555-1234",
  },
  map: new Map([
    ["key1", "value1"],
    ["key2", { nested: "object" }],
  ]),
  set: new Set([1, 2, 3]),
  date: new Date(),
};

original.self = original;

const copy = deepClone(original);

console.log('Original')
console.log(original)
console.log('Copy')
console.log(copy);
console.log(copy === original); // false
console.log(copy.details === original.details); // false
console.log(copy.map.get("key2") === original.map.get("key2")); // false
console.log(copy.self === copy); // true
