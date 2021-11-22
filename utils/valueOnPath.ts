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

type GetHead<P extends string> = P extends `[${infer Head}]${any}`
  ? `[${Head}]`
  : P extends `${infer Head}.${any}`
  ? Head extends `${infer SecHead}[${any}`
    ? SecHead
    : Head
  : P extends `${infer Head}[${any}`
  ? Head
  : P;

type RemoveInitialDot<P> = P extends `.${infer S}` ? S : P;

type GetTail<P extends string> = P extends `[${any}]${infer Tail}`
  ? RemoveInitialDot<Tail>
  : P extends `${infer Head}.${infer Tail}`
  ? Head extends `${any}[${infer SecHead}`
    ? `[${SecHead}${Tail}`
    : Tail
  : P extends `${any}[${infer Tail}`
  ? `[${Tail}`
  : "";

type GetArrayElem<A> = A extends (infer E)[] ? E : never;

type GetPathValue<
  O,
  P extends Path<O>,
  R = RemoveNullOrUndefined<O>,
  H = GetHead<P>
> = H extends keyof R
  ? GetPathValue<R[H], GetTail<P>> | (O extends undefined ? undefined : never)
  : H extends `[${any}]`
  ? GetPathValue<GetArrayElem<R>, GetTail<P>> | undefined
  : R;

const getNextAccessor = (s: string): [string | number, string | undefined] => {
  const [accessor, rest] = s.split(
    /(?<=^[^.[]*)\.|(?<=^[^.[]*)(?=\[)|(?<=^\[[^\]]+\])\.?/
  );
  if (accessor.startsWith("["))
    return [Number(accessor.replace(/^\[(.*)\]$/, "$1")), rest];
  return [accessor, rest];
};

export const accessValueOnPath = <O, P extends Path<O>>(o: O, path: P) => {
  let value: any = o;
  let p: string | undefined = path;
  while (p && value) {
    const [accessor, rest] = getNextAccessor(p);
    value = value?.[accessor];
    p = rest;
  }
  return value as GetPathValue<O, P>;
};

export const changeValueOnPath = <O, P extends Path<O>>(
  o: O,
  path: P,
  newValue: GetPathValue<O, P>
) => {
  let value: any = o;
  let accessor: string | number | undefined;
  let rest: string | undefined = path;
  while (rest && value) {
    [accessor, rest] = getNextAccessor(rest);
    if (!rest) break;
    value = value?.[accessor];
  }
  if (!accessor) return newValue as O;
  value[accessor] = newValue;
  return o;
};
