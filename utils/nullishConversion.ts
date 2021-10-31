type SingleParse<T, N> = T extends null | undefined ? N : T;

type NullishParser<T, N> = { [P in keyof T]: SingleParse<T[P], N> };

export type ConvertToUndefined<T> = NullishParser<T, undefined>;
export type ConvertToNull<T> = NullishParser<T, null>;

const buildNullishConvertion =
  <N>(n: N) =>
  <T extends object, U = NullishParser<T, N>>(o: T): U =>
    Object.entries(o).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value ?? n }),
      {} as U,
    );

export const convertUndefinedToNull = buildNullishConvertion(null);
export const convertNullToUndefined = buildNullishConvertion(undefined);
