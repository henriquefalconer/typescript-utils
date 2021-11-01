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
const trimLeft = (s: string) => s.replace(/(?<=^|\n)[ \t]+/g, "");

const demoPrint = (strings: TemplateStringsArray, ...vars: any[]) =>
  console.log(
    strings.reduce(
      (acc, s, i) =>
        `${acc}${trimLeft(s)}${i < vars.length ? prepareLog(vars[i]) : ""}`,
      ""
    )
  );

// Demos:
const alterObjectValuesDemo = () => {
  const entry = {
    foo: 1,
    bar: 2,
  };

  demoPrint`
    ===== (1/8) alterObjectValues: =====

    Antes: ${entry}

    Operação: alterObjectValues(entry, value => \`baz \${value}\`)

    Depois: ${alterObjectValues(entry, (value) => `baz ${value}`)}
  `;
};

const keySortDemo = () => {
  const entry = [{ foo: 30 }, { foo: 1 }];

  demoPrint`
    ===== (2/8) keySort: =====

    Antes: ${[...entry]}

    Operação: keySort(entry, o => o.foo)

    Depois: ${keySort(entry, (o) => o.foo)}
  `;
};

const convertUndefinedToNullDemo = () => {
  const entry = {
    foo: undefined,
    bar: "baz",
  };

  demoPrint`
    ===== (3/8) convertUndefinedToNull: =====

    Antes: ${entry}

    Operação: convertUndefinedToNull(entry)

    Depois: ${convertUndefinedToNull(entry)}
  `;
};

const convertNullToUndefinedDemo = () => {
  const entry = {
    foo: null,
    bar: "baz",
  };

  demoPrint`
    ===== (4/8) convertNullToUndefined: =====

    Antes: ${entry}

    Operação: convertNullToUndefined(entry)

    Depois: ${convertNullToUndefined(entry)}
  `;
};

const separateArrayDemo = () => {
  const entry = [1, 9, 0];

  demoPrint`
    ===== (5/8) separateArray: =====

    Antes: ${[...entry]}

    Operação: separateArray(entry, o => o < 9)

    Depois: ${separateArray(entry, (o) => o < 9)}
  `;
};

const toggleArrayItemDemo = () => {
  const entry = [1, 9, 0];

  demoPrint`
    ===== (6/8) toggleArrayItem: =====

    Antes: ${[...entry]}

    Operação: toggleArrayItem(9, entry)

    Depois: ${toggleArrayItem(9, entry)}

    Operação: toggleArrayItem(9, entry)

    Depois: ${toggleArrayItem(9, entry)}
  `;
};

const waitDemo = async () => {
  demoPrint`
    ===== (7/8) wait: =====

    Operação: wait(3000) (esperar 3 segundos)
  `;

  await wait(3000);

  demoPrint`Tempo concluído.\n `;
};

const expandedConsoleLogDemo = async () => {
  demoPrint`
    ===== (8/8) expandedConsoleLog: =====

    Operação: console.log({ foo: { qox: { quux: { quuz: { corge: { grault: { garply: { waldo: 10 } } } } } } }, bar: 'baz' }) (com a importação do arquivo expandedConsoleLog)

    Resultado:`;

  console.log({ foo: { qox: { quux: { quuz: { corge: { grault: { garply: { waldo: 10 } } } } } } }, bar: 'baz' });
};

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

  for (const d of demos) await d();
};

runDemos();
