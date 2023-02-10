import { createRandomMatrix } from "./random.js";
import { evolvePopulation } from "./evolution.js";
import { pickBest, fitness } from "./operations.js";
import { roundAll } from "./tools.js";

let population = await createRandomMatrix(5000, 20);

for (let i = 0; i < 5000; i++) {
  population = await evolvePopulation(population, 0.4);

  const best = await pickBest(...population);
  const rounded = await roundAll(best);

  const item = document.createElement("p");
  const values = document.createElement("span");
  const meter = document.createElement("meter");

  meter.min = 0;
  meter.max = 50;
  meter.value = (50 - (await fitness(best))).toFixed(2);
  meter.style.width = "100%";
  meter.style.height = "100%";
  values.innerText = `${rounded.join(" ")}: ${(
    50 - (await fitness(best))
  ).toFixed(2)}`;

  item.style.display = "grid";
  item.style.gridTemplateColumns = "5em 1fr";
  item.style.columnGap = "1em";

  item.appendChild(meter);
  item.appendChild(values);
  document.querySelector("main").appendChild(item);
}
