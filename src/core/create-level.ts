import _ from "lodash";
import store from "@/store";
import { genName, genKey } from "./gen-keys";
import createRule from "./create-rule";
import applyRule from "./apply-rule";
import boundariesIterator from "./boundaries-iterator";
import enforceRules from "./enforce-rules";

export default (state: State, levelNumber: number): void => {
  state.currentLevel.number = levelNumber;

  const config = { ...store.state.levels[levelNumber - 1] };
  state.currentLevel.config = config;

  const itemNames: string[] = [];
  for (const colName in config.collections) {
    const fullItemNames = _.shuffle(
      config.collections[colName].map((item) => item[0])
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
  const maxTries = 10;
  const matrixClone = { ...matrix };
  const rules: Rule[] = [];
  do {
    i++;
    // get a pair of random items
    // the first one has not yet an unique solution
    // the second one can be any
    const a = _.sample(unsolvedItems);
    if (!a) throw "Unsoleved Item not found for item pair";
    const b = _.sample(_.without(itemNames, a));
    if (!b) throw "Pair Item not found";

    const rule = createRule(
      { name: a, ...solution[a] },
      { name: b, ...solution[b] }
    );
    if (applyRule(rule, matrixClone, config.boundaries)) {
      rules.push(rule);
      console.log("ejejey!!!");
      enforceRules(rules, matrixClone);

      //   //   if (tempMap.coordsByItem(rule.a.fullName).length === 1) {
      //   //     _.pull(this.unsolved, rule.a.fullName);
      //   //   }
      //   //   if (tempMap.coordsByItem(rule.b.fullName).length === 1) {
      //   //     _.pull(this.unsolved, rule.b.fullName);
      //   //   }
      // } else {
      //   console.log("rejected");
    }
  } while (!solved && i < maxTries);
  solved = false;
  console.log(
    "I shouod have a solution",
    solved
    // this.isSolution(tempMap.solution())
  );
};
