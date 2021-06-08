import _ from "lodash";
import store from "@/store";
import { genName, genKey } from "./gen-keys";
import createRule from "./create-rule";
import applyRule from "./apply-rule";
import boundariesIterator from "./boundaries-iterator";
import enforceRules from "./enforce-rules";
import matrixToItems from "./matrix-to-items";
import isSolution from "./is-solution";

export default (state: sdState, levelNumber: number): void => {
  state.currentLevel.number = levelNumber;

  const config = { ...store.state.levels[levelNumber - 1] };
  state.currentLevel.config = config;

  const itemNames: string[] = [];
  for (const colName in config.collections) {
    const fullItemNames = _.shuffle(
      config.collections[colName].map((item: ItemConfig) => item[0])
    ).slice(0, config.itemsPerCollection);

    for (const itemName of fullItemNames) {
      itemNames.push(genName(colName, itemName));
    }
  }
  state.currentLevel.itemNames = itemNames;

  const unsolvedItems = [...itemNames];
  state.currentLevel.unsolvedItems = unsolvedItems;

  // matrix generation
  const matrix: LevelMatrix = {};
  boundariesIterator(config.boundaries, (x, y) => {
    for (const itemName of itemNames) {
      const key = genKey(x, y, itemName);
      matrix[key] = true;
    }
  });
  state.currentLevel.matrix = matrix;

  // solution generation
  const solution: LevelSolution = {};
  for (const itemName of itemNames) {
    solution[itemName] = {
      x: _.random(0, config.boundaries.x - 1),
      y: _.random(0, config.boundaries.y - 1),
    };
  }
  state.currentLevel.solution = solution;

  // rules generation
  let solved = false,
    i = 0;
  const maxTries = 1000;
  const matrixClone = { ...matrix };
  console.log(solution);
  const rules: Rule[] = [];
  do {
    i++;
    // get a pair of random items
    // the first one has not yet an unique solution
    // the second one can be any
    const a = _.sample(unsolvedItems);
    if (!a) throw "Unsoleved Item not found for item pair";
    const b = _.sample(
      _.without(unsolvedItems.length > 1 ? unsolvedItems : itemNames, a)
    );
    if (!b) throw "Pair Item not found";

    // const sampleCoords = matrixToItems(matrixClone)
    // const sampleSorted = Object.keys(sampleCoords).sort((a, b) => {
    //   return sampleCoords[a].length - sampleCoords[b].length
    // })
    // console.log(sampleSorted)

    // const a = sampleSorted[0]
    // const b:string = _.sample(_.without(sampleSorted, a)) as string;

    const rule = createRule(
      { name: a, ...solution[a] },
      { name: b, ...solution[b] }
    );
    if (applyRule(rule, matrixClone, config.boundaries)) {
      console.log(rule);
      rules.push(rule);

      enforceRules(rules, matrixClone, config.boundaries);

      console.log({ ...matrixClone });
      const itemCoords = matrixToItems(matrixClone);
      console.log(itemCoords, rule.a);
      if (itemCoords[rule.a].length === 1) _.pull(unsolvedItems, rule.a);
      if (itemCoords[rule.b].length === 1) _.pull(unsolvedItems, rule.b);
      solved = isSolution(itemCoords);
      console.log("rule added");
    } else {
      console.log("rule rejected");
    }
  } while (!solved && i < maxTries);
  state.currentLevel.rules = rules;

  state.currentLevel.errorCount = 0;
  console.log(
    "I shouod have a solution",
    i,
    solved
    // this.isSolution(tempMap.solution())
  );
};
