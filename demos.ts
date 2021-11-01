import alterObjectValues from "./utils/alterObjectValues";
import keySort from "./utils/keySort";
import {
  convertUndefinedToNull,
  convertNullToUndefined,
} from "./utils/nullishConversion";
import separateArray from "./utils/separateArray";
import toggleArrayItem from "./utils/toggleArrayItem";
import wait from "./utils/wait";

import { prepareLog } from "./utils/expandedConsoleLog";

// Print funcs:
const enumerate = <T>(arr: T[]) => arr.map((v, i) => [v, i]);

let total: number;
let count: number = 0;

type Fn<T> = (t: T) => unknown;

const demoPrint = async <T>(arg: T, ...fns: (string | Fn<T>)[]) => {
  count++;
  for (const [fn, i] of enumerate(fns)) {
    const name = typeof fn === "string" ? fn : "$3$4";
    const top = `===== \x1b[1m\x1b[34m(${count}/${total}) ${name}:\x1b[0m =====`;
    const entry = arg ? `\n\nEntry: ${prepareLog(arg)}` : "";
    const operation = typeof fn !== "string" ? "\n\nOperation: $1$3$4$5$6" : "";

    process.stdout.write(
      fn
        .toString()
        .replace(
          /^(.*)\(0, ((\w+)_1.default|\w+_1.(\w+))\)(.*)|(.*)/,
          (i === 0 ? `\n${top}${entry}` : "") + operation
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

const separateArrayDemo = () =>
  demoPrint([1, 9, 0], (entry) => separateArray(entry, (o) => o < 9));

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

const runDemos = async () => {
  const demos = [
    alterObjectValuesDemo,
    keySortDemo,
    convertUndefinedToNullDemo,
    convertNullToUndefinedDemo,
    separateArrayDemo,
    toggleArrayItemDemo,
    waitDemo,
    expandedConsoleLogDemo,
  ];

  total = demos.length;

  for (const d of demos) await d();
};

runDemos();
