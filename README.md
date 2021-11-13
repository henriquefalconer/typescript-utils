# TypeScript Utilities

Useful functions for node projects. All type-checked and without any node dependencies.

### alterObjectValues:

```node
// Data: 
const data = { foo: 1, bar: 2 }

// Operation: 
const result = alterObjectValues(data, (value) => `baz ${value}`)

// Result: 
{ foo: 'baz 1', bar: 'baz 2' }
```

---

### keySort:

```node
// Data: 
const data = [ { foo: 30 }, { foo: 1 } ]

// Operation: 
const result = keySort(data, (o) => o.foo)

// Result: 
[ { foo: 1 }, { foo: 30 } ]
```

---

### convertUndefinedToNull:

```node
// Data: 
const data = { foo: undefined, bar: 'baz' }

// Operation: 
const result = convertUndefinedToNull(data)

// Result: 
{ foo: null, bar: 'baz' }
```

---

### convertNullToUndefined:

```node
// Data: 
const data = { foo: null, bar: 'baz' }

// Operation: 
const result = convertNullToUndefined(data)

// Result: 
{ foo: undefined, bar: 'baz' }
```

---

### separateArray:

```node
// Data: 
const data = [ 1, 9, 0 ]

// Operation: 
const result = separateArray(data, (o) => o < 9)

// Result: 
[ [ 1, 0 ], [ 9 ] ]
```

---

### toggleArrayItem:

```node
// Data: 
const data = [ 1, 9, 0 ]

// Operation: 
let result = toggleArrayItem(9, data)

// Result: 
[ 1, 0 ]

// Operation: 
result = toggleArrayItem(9, result)

// Result: 
[ 1, 0, 9 ]
```

---

### wait:

```node
const call = async () => {
  // Operation: 
  await wait(3000) // Waits for 3000 milliseconds
}

call()
```

---

### expandedConsoleLog:

```node
import "./utils/expandedConsoleLog";

// Operation: 
console.log({
    foo: {
        qox: {
            quux: { quuz: { corge: { grault: { garply: { waldo: 10 } } } } },
        },
    },
    bar: "baz",
})

// Result: 
{
  foo: {
    qox: { quux: { quuz: { corge: { grault: { garply: { waldo: 10 } } } } } }
  },
  bar: 'baz'
}
// Expands instead of limiting representantion simply to `[Object]` or `[Array]`
```
