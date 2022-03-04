const segregateArray = <T>(arr: T[], segregator: (t: T) => boolean) =>
  arr.reduce<[T[], T[]]>(
    (acc, t) => (acc[segregator(t) ? 0 : 1].push(t), acc),
    [[], []]
  );

export default segregateArray;
