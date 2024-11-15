class ComparisonOptions {
  exclude = [''];
  deep = false;
}

export const equals = (from, to, options = new ComparisonOptions()) => {
  if (from === to) return true;
  if ([from, to].includes(null)) return false;
  if ([from, to].includes(undefined)) return false;
  if ([typeof from, typeof to].some((x) => x !== 'object')) return false;

  const obj1 = copy(from);
  const obj2 = copy(to);
  const { exclude, deep } = options;
  const keys1 = Object.keys(obj1).filter((x) => !exclude.includes(x));
  const keys2 = Object.keys(obj2).filter((x) => !exclude.includes(x));

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!Object.hasOwn(obj2, key)) return false;
    const val1 = obj1[key];
    const val2 = obj2[key];
    const valOptions = deep ? options : new ComparisonOptions();
    if (!equals(val1, val2, valOptions)) return false;
  }

  return true;
};

export const copy = (obj) => JSON.parse(JSON.stringify(obj));
export const diff = (from, to, options = new ComparisonOptions()) =>
  !equals(from, to, options);

export default Object.freeze({ equals, copy, diff });
