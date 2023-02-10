import { memoize } from "./tools.js";

export const crossover = async (parent1, parent2, crossPoint) => {
  const finalParent1 = await parent1;
  const finalParent2 = await parent2;

  return Promise.resolve([
    ...finalParent1.slice(0, crossPoint),
    ...finalParent2.slice(crossPoint, parent2.length),
  ]);
};

export const mutate = async (individual, probability) =>
  Promise.resolve(
    individual.map((e) =>
      Math.random() < probability ? e * Math.random() + Math.random() : e
    )
  );

export const fitness = await memoize(async (individual) => {
  const final = await individual;
  const sum = final.reduceRight((result, e, index) => result + e, 0);

  return Promise.resolve(Math.abs(sum - 50));
});

export const pickBest = async (...args) =>
  Promise.resolve(
    args.reduceRight(
      async (result, e) =>
        (await fitness(result)) < (await fitness(e)) ? result : e,
      args[0]
    )
  );
