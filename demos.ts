import alterObjectValues from "./utils/alterObjectValues";
import keySort from "./utils/keySort";
import {
  convertUndefinedToNull,
  convertNullToUndefined,
} from "./utils/nullishConversion";
import segregateArray from "./utils/segregateArray";
import toggleArrayItem from "./utils/toggleArrayItem";
import { accessValueOnPath, changeValueOnPath } from "./utils/valueOnPath";
import wait from "./utils/wait";

import { prepareLog } from "./utils/expandedConsoleLog";

// Print funcs:
const enumerate = <T>(arr: T[]) => arr.map((v, i) => [v, i] as const);

let total: number;
let count: number = 0;

type Fn<T> = (t: T) => unknown;

const demoPrint = async <T>(arg: T, ...fns: [string, ...Fn<T>[]] | Fn<T>[]) => {
  count++;
  for (const [fn, i] of enumerate(fns)) {
    const counter = `(${count}/${total})`;
    const entry = arg ? `\n\nEntry: ${prepareLog(arg)}` : "";
    const top = (title: string) =>
      i === 0
        ? `\n===== \x1b[1m\x1b[34m${counter} ${title}:\x1b[0m =====${entry}`
        : "";

    process.stdout.write(
      typeof fn === "string"
        ? top(fn)
        : fn
            .toString()
            .replace(
              /^(.*)\(0, ((\w+)_1.default|\w+_1.(\w+))\)(.*)|(.*)/,
              top("$3$4") + "\n\nOperation: $1$3$4$5$6"
            )
    );

    if (typeof fn !== "function") continue;

    const result = await fn(arg);

    if (result) process.stdout.write(`\n\nResult: ${prepareLog(result)}`);
  }
  console.log("\n");
};

// Demos:
const alterObjectValuesDemo = () =>
  demoPrint({ foo: 1, bar: 2 }, (entry) =>
    alterObjectValues(entry, (value) => `baz ${value}`)
  );

const keySortDemo = () =>
  demoPrint([{ foo: 30 }, { foo: 1 }], (entry) => keySort(entry, (o) => o.foo));

const convertUndefinedToNullDemo = () =>
  demoPrint({ foo: undefined, bar: "baz" }, (entry) =>
    convertUndefinedToNull(entry)
  );

const convertNullToUndefinedDemo = () =>
  demoPrint({ foo: null, bar: "baz" }, (entry) =>
    convertNullToUndefined(entry)
  );

const segregateArrayDemo = () =>
  demoPrint([1, 9, 0], (entry) => segregateArray(entry, (o) => o < 9));

const toggleArrayItemDemo = () =>
  demoPrint(
    [1, 9, 0],
    (entry) => toggleArrayItem(9, entry),
    (entry) => toggleArrayItem(9, entry)
  );

const waitDemo = async () => {
  await demoPrint(undefined, () => wait(3000));

  console.log("Result: Tempo concluído.\n");
};

const expandedConsoleLogDemo = async () =>
  demoPrint(undefined, "expandedConsoleLog", () =>
    console.log("\n\nResult:", {
      foo: {
        qox: {
          quux: { quuz: { corge: { grault: { garply: { waldo: 10 } } } } },
        },
      },
      bar: "baz",
    })
  );

const accessValueOnPathDemo = () =>
  demoPrint(
    {
      foo: {
        qox: [
          { quux: { quuz: { corge: { grault: 10 } } } },
          { quux: { quuz: { corge: { grault: 20 } } } },
        ],
      },
      bar: "baz",
    },
    (entry) => accessValueOnPath(entry, "foo.qox[1].quux.quuz.corge")
  );

const changeValueOnPathDemo = () =>
  demoPrint(
    {
      foo: {
        qox: [
          { quux: { quuz: { corge: { grault: 10 } } } },
          { quux: { quuz: { corge: { grault: 20 } } } },
        ],
      },
      bar: "baz",
    },
    (entry) =>
      changeValueOnPath(entry, "foo.qox[1].quux.quuz.corge", { grault: 30 })
  );

const runDemos = async () => {
  const demos = [
    alterObjectValuesDemo,
    keySortDemo,
    convertUndefinedToNullDemo,
    convertNullToUndefinedDemo,
    segregateArrayDemo,
    toggleArrayItemDemo,
    waitDemo,
    expandedConsoleLogDemo,
    accessValueOnPathDemo,
    changeValueOnPathDemo,
  ];

  total = demos.length;

  for (const d of demos) await d();
};

runDemos();
