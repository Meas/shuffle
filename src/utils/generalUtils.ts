export const removeDuplicatesByKey = (array: any[], key: string) => {
  const lookup = new Set();
  return array.filter((obj) => !lookup.has(obj[key]) && lookup.add(obj[key]));
};
