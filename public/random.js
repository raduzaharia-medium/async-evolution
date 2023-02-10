export const pickRandomNumber = (max) =>
  Promise.resolve(Math.round(Math.random() * max));

export const createRandomArray = (length) =>
  Promise.resolve([...new Array(length)].map(() => Math.random()));

export const createRandomMatrix = async (length, width) =>
  Promise.resolve(
    [...new Array(length)].map(async () => await createRandomArray(width))
  );
