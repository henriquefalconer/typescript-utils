export const typedObjectEntries = <O extends object>(o: O) =>
  Object.entries(o) as [keyof O, O[keyof O]][];

const alterObjectValues = <O extends object, T>(
  o: O,
  alter: (o: O[keyof O]) => T
) =>
  typedObjectEntries(o).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: alter(value) }),
    {} as { [key in keyof O]: T }
  );

export default alterObjectValues;
