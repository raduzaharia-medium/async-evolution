export const memoize = async (func) => {
  const cache = {};

  return async (...args) => {
    const key = JSON.stringify(args);

    if (!cache[key]) cache[key] = await func(...args);
    return Promise.resolve(cache[key]);
  };
};

export const same = async (a, b) => {
  const finalA = await a;
  const finalB = await b;

  return Promise.resolve(finalA.every((v, i) => v === finalB[i]));
};

export const roundAll = (array) =>
  Promise.resolve(array.map((e) => e.toFixed(2)));
