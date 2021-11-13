const segregateArray = <T>(arr: T[], segregator: (t: T) => boolean) =>
  arr.reduce(
    (acc, t) => {
      const [first, second] = acc;
      const arr = segregator(t) ? first : second;
      arr.push(t);
      return acc;
    },
    [[], []] as [T[], T[]]
  );

export default segregateArray;
