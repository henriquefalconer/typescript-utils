type RemoveNullOrUndefined<T> = T extends null | undefined ? never : T;

type Path<
  O,
  S extends string = "",
  Start = true,
  R = RemoveNullOrUndefined<O>,
  K extends keyof R & string = keyof R & string
> = R extends object
  ? K extends keyof R
    ?
        | (R extends Array<infer E>
            ? Path<E, `${S}[${number}]`, false>
            : Path<R[K], `${S}${Start extends true ? "" : "."}${K}`, false>)
        | S
    : S
  : S;

type RemoveFirstBracket<P extends string> = P extends `${any}]${infer Rest}`
  ? Rest extends `.${infer Tail}`
    ? Tail
    : Rest
  : P;

type GetHead<P extends string> = P extends `${infer Head}.${any}`
  ? Head extends `[${infer SecHead}][${any}`
    ? `[${SecHead}]`
    : Head extends `[${infer SecHead}]${any}`
    ? `[${SecHead}]`
    : Head extends `${infer SecHead}[${any}`
    ? SecHead
    : Head
  : P extends `[${infer Head}]${any}`
  ? `[${Head}]`
  : P extends `${infer Head}[${any}`
  ? Head
  : P;

type GetTail<P extends string> = P extends `[${any}`
  ? RemoveFirstBracket<P>
  : P extends `${infer Head}[${infer Tail}`
  ? Head extends `${any}.${infer SecTail}`
    ? `${SecTail}[${Tail}`
    : `[${Tail}`
  : P extends `${any}[${infer Tail}`
  ? `[${Tail}`
  : P extends `${any}.${infer Tail}`
  ? Tail
  : "";

type GetPathValue<O, P extends Path<O>, H = GetHead<P>> = H extends keyof O
  ? GetPathValue<O[H], GetTail<P>>
  : H extends `[${any}]`
  ? O extends Array<infer E>
    ? GetPathValue<E, GetTail<P>> | undefined
    : never
  : O;

const getNextAccessor = (s: string): [string | number, string] => {
  const [accessor, rest] = s.split(
    /(?<=^[^.[]*)\.|(?<=^[^.[]*)(?=\[)|(?<=^\[[^\]]+\])\.?/
  );
  if (accessor.startsWith("["))
    return [Number(accessor.replace(/^\[(.*)\]$/, "$1")), rest];
  return [accessor, rest];
};

const accessValueFromPath = <O, P extends Path<O> = Path<O>>(o: O, path: P) => {
  let value: any = o;
  let p: string | number | undefined = path;
  while (p && value) {
    const [accessor, rest] = getNextAccessor(p);
    value = value?.[accessor];
    p = rest;
  }
  return value as GetPathValue<O, P>;
};

export default accessValueFromPath;
