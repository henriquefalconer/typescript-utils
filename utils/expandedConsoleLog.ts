const alterObjectValues = (t: object, call: (value: any) => unknown): object =>
  Object.entries(t).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: call(value) }),
    {}
  );

const tabs = "  ";
const maxOneLineSize = 72;

const getSize = (s: string) => s.replace(/\x1b\[[0-9]{1,2}m/g, "").length;

const colorize = (t: any): string => {
  if (t === null) return `\x1b[1m${t}\x1b[0m`;
  if (t === undefined) return `\x1b[2m${t}\x1b[0m`;

  switch (typeof t) {
    case "boolean":
    case "number":
      return `\x1b[33m${t}\x1b[0m`;
    case "string":
      return `\x1b[32m'${t}'\x1b[0m`;
    default:
      throw new Error(`Unrecognized value type: ${typeof t} (${t})`);
  }
};

const increaseIndent = (s: string): string => s.replace(/(\n *)/g, `$1${tabs}`);

const stringifyArray = (t: any[]): string => {
  const oneLine = `[ ${t.join(", ")} ]`;

  return getSize(oneLine) >= maxOneLineSize
    ? `[\n${tabs}${t.map(increaseIndent).join(`,\n${tabs}`)}\n]`
    : oneLine;
};

const stringifyObject = (t: object): string => {
  const oneLine = `{ ${Object.entries(t)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ")} }`;

  return getSize(oneLine) >= maxOneLineSize
    ? `{\n${tabs}${Object.entries(t)
        .map(([key, value]) => `${key}: ${increaseIndent(value)}`)
        .join(`,\n${tabs}`)}\n}`
    : oneLine;
};

export const prepareLog = (t: any, depth = 0): string =>
  depth > 50
    ? "\x1b[36m[Reached depth limit]\x1b[0m"
    : Array.isArray(t)
    ? stringifyArray(t.map((e) => prepareLog(e, depth + 1)))
    : typeof t === "object" && t !== null
    ? stringifyObject(alterObjectValues(t, (e) => prepareLog(e, depth + 1)))
    : depth < 0 || typeof t !== "string"
    ? colorize(t)
    : t;

console.log = (...data: any[]) =>
  data
    .map((d, i) => prepareLog(d) + (i < data.length - 1 ? " " : "\n"))
    .forEach((d) => process.stdout.write(d));
