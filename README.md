# TypeScript Utilities

Useful functions for node projects. All type-checked and without any node dependencies.

### alterObjectValues:

```node
// Entry: 
{ foo: 1, bar: 2 }

// Operation: 
(entry) => alterObjectValues(entry, (value) => `baz ${value}`)

// Result: 
{ foo: 'baz 1', bar: 'baz 2' }
```

---

### keySort:

```node
// Entry: 
[ { foo: 30 }, { foo: 1 } ]

// Operation: 
(entry) => keySort(entry, (o) => o.foo)

// Result: 
[ { foo: 1 }, { foo: 30 } ]
```

---

### convertUndefinedToNull:

```node
// Entry: 
{ foo: undefined, bar: 'baz' }

// Operation: 
(entry) => convertUndefinedToNull(entry)

// Result: 
{ foo: null, bar: 'baz' }
```

---

### convertNullToUndefined:

```node
// Entry: 
{ foo: null, bar: 'baz' }

// Operation: 
(entry) => convertNullToUndefined(entry)

// Result: 
{ foo: undefined, bar: 'baz' }
```

---

### separateArray:

```node
// Entry: 
[ 1, 9, 0 ]

// Operation: 
(entry) => separateArray(entry, (o) => o < 9)

// Result: 
[ [ 1, 0 ], [ 9 ] ]
```

---

### toggleArrayItem:

```node
// Entry: 
[ 1, 9, 0 ]

// Operation: 
(entry) => toggleArrayItem(9, entry)

// Result: 
[ 1, 0 ]

// Operation: 
(entry) => toggleArrayItem(9, entry)

// Result: 
[ 1, 0, 9 ]
```

---

### wait:

```node
// Operation: 
() => wait(3000)

// 3 seconds later:
// Program resumes operation
```

---

### expandedConsoleLog:

```node
import "./utils/expandedConsoleLog";

// Operation: 
() => console.log({
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
