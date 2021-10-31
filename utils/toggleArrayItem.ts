const toggleArrayItem = <T>(
  item: T,
  arr: T[],
  getKey: (item: T) => unknown = item => item,
): T[] => {
  const index = arr.findIndex(a => getKey(a) === getKey(item));
  if (index === -1) return [...arr, item];
  arr.splice(index, 1);
  return arr;
};

export default toggleArrayItem;
