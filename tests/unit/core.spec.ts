import matrixSample2x2 from "../mocks/matrix-2.2-4.4.json";
import matrixSample3x3 from "../mocks/matrix-3.3-4.4.json";
import { ruleYq, ruleXq } from "../mocks/rules";

import trimRuleMinMax from "@/core/trim-rule-min-max";
import applyRule from "@/core/apply-rule";

describe("Core Functions", () => {
  let matrix2x2: LevelMatrix, matrix3x3: LevelMatrix;
  beforeEach(() => {
    matrix2x2 = { ...matrixSample2x2 };
    matrix3x3 = { ...matrixSample3x3 };
  });

  it("gets min and max", () => {
    let values: { minA: number; maxB: number }[];
    values = trimRuleMinMax(matrix2x2, ruleYq, { x: 2, y: 2 });
    expect(values.length).toEqual(2);

    expect(values[0]).toEqual({ minA: 0, maxB: 1 });
    expect(values[1]).toEqual({ minA: 0, maxB: 1 });

    values = trimRuleMinMax(matrix3x3, ruleXq, { x: 3, y: 3 });
    expect(values.length).toEqual(3);
    expect(values[0]).toEqual({ minA: 0, maxB: 2 });
    expect(values[1]).toEqual({ minA: 0, maxB: 2 });
    expect(values[2]).toEqual({ minA: 0, maxB: 2 });
  });

  it.only("trim vertical", () => {
    const matrix2x2 = { ...matrixSample2x2 };
    const clone2x2 = { ...matrixSample2x2 };
    const rule: Rule = {
      a: "heroes.birdman",
      b: "heroes.hulk",
      axis: "y",
      distance: "?",
    };
    applyRule(rule, matrix2x2, { x: 2, y: 2 });

    clone2x2["0.1.heroes.birdman"] = false;
    clone2x2["1.1.heroes.birdman"] = false;
    clone2x2["0.0.heroes.hulk"] = false;
    clone2x2["1.0.heroes.hulk"] = false;
    expect(matrix2x2).toEqual(clone2x2);

    rule.axis = "x";
    applyRule(rule, matrix2x2, { x: 2, y: 2 });
    clone2x2["1.0.heroes.birdman"] = false;
    clone2x2["1.1.heroes.birdman"] = false;
    clone2x2["0.0.heroes.hulk"] = false;
    clone2x2["0.1.heroes.hulk"] = false;

    // const matrix3x3 = { ...matrixSample3x3 };
    // const clone3x3 = { ...matrixSample3x3 };
    // applyRule(rule, matrix3x3, { x: 3, y: 3 });

    // clone3x3["0.2.heroes.birdman"] = false;
    // clone3x3["1.2.heroes.birdman"] = false;
    // clone3x3["2.2.heroes.birdman"] = false;
    // clone3x3["0.0.heroes.hulk"] = false;
    // clone3x3["1.0.heroes.hulk"] = false;
    // clone3x3["2.0.heroes.hulk"] = false;
    // expect(matrix3x3).toEqual(clone3x3);
  });
});
