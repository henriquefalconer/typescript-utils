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

type RemoveFirstBracket<P extends string> = P extends `${any}].${infer Tail}`
  ? `${Tail}`
  : P extends `${any}]${infer Tail}`
  ? `${Tail}`
  : P;

type SplitHead<P extends string> = P extends `${infer Head}.${any}`
  ? Head extends `${infer SecHead}[${any}`
    ? SecHead
    : Head
  : P extends `[${infer Head}]${any}`
  ? `[${Head}]`
  : P extends `${infer Head}[${any}`
  ? Head
  : P;

type SplitTail<P extends string> = P extends `[${any}`
  ? RemoveFirstBracket<P>
  : P extends `${infer Head}[${infer Tail}`
  ? Head extends `${any}.${infer SecTail}`
    ? `${SecTail}[${Tail}`
    : `[${Tail}`
  : P extends `${any}[${infer Tail}`
  ? `[${Tail}`
  : "";

type RemoveBrackets<S extends string> = S extends `[${infer Tail}]` ? Tail : S;

type GetPathValue<O, P extends Path<O>, N = SplitHead<P>> = N extends keyof O
  ? GetPathValue<O[N], SplitTail<P>>
  : N extends `[${any}]`
  ? O extends Array<infer E>
    ? GetPathValue<E, SplitTail<P>>
    : never
  : O;

type MockObject = {
  name: string;
  weight: number[];
  data: {
    birthdate: string;
    right: { real: boolean }[][];
    favoriteWord: string;
  };
  evaluations: {
    mark: number;
    id: string;
    awnsers: string[];
  }[];
}[];

const noBrackets: RemoveBrackets<"[0901]"> = "";

const bracket: RemoveFirstBracket<"[0][2][3]"> = "";

const head: SplitHead<"aap.d[3].c.d[2][4].pa"> = "";
const tail: SplitTail<"aap.d[3].c.d[2][4].pa"> = "";

const item: GetPathValue<MockObject, "[0].weight"> = "";

const path: Path<MockObject> = "[1].evaluations[0]";

const getNextAccessor = <O, P extends Path<O> = Path<O>, N = SplitHead<P>>(
  s: P & string
): [N, SplitTail<P>] => s.split(/(?<=^[^.[]*)[.[]/) as [N, SplitTail<P>];

const accessValueFromPath = <O, P extends Path<O> = Path<O>>(
  o: O,
  path: P
): GetPathValue<O, P> => {
  if (!path) return o as GetPathValue<O, P>;
  const [accessor, rest] = getNextAccessor<O>(path);
  return accessValueFromPath(o[accessor], rest);
};

export default accessValueFromPath;
