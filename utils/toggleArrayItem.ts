const toggleArrayItem = <T>(
  item: T,
  arr: T[],
  getKey: (item: T) => unknown = item => item,
): T[] => {
  const i = arr.findIndex(a => getKey(a) === getKey(item));
  if (i === -1) return [...arr, item];
  arr.splice(i, 1);
  return arr;
};

export default toggleArrayItem;
