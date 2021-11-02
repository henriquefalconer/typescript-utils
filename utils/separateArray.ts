const separateArray = <T>(arr: T[], segragator: (t: T) => boolean) =>
  arr.reduce(
    (acc, t) => {
      const [first, second] = acc;
      const arr = segragator(t) ? first : second;
      arr.push(t);
      return acc;
    },
    [[], []] as [T[], T[]]
  );

export default separateArray;
