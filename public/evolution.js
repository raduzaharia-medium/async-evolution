import { pickRandomNumber } from "./random.js";
import { mutate, crossover, pickBest } from "./operations.js";
import { same } from "./tools.js";

export const createChild = async (parent1, parent2, mutationProbability) => {
  const areSame = await same(parent1, parent2);
  if (areSame) return null;

  const crossPoint = await pickRandomNumber(parent1.length);
  const child = await crossover(parent1, parent2, crossPoint);
  const mutant = await mutate(child, mutationProbability);

  return await pickBest(parent1, parent2, child, mutant);
};

export const evolvePopulation = async (population, mutationProbability) => {
  const result = [];

  const currentBest = await pickBest(...population);
  const mutant = await mutate(currentBest, mutationProbability);
  const best = await pickBest(currentBest, mutant);

  result.push(best);

  for (const element of population) {
    const index = await pickRandomNumber(population.length - 1);
    const child = await createChild(element, population[index]);

    if (child) result.push(child);
  }

  return result;
};
