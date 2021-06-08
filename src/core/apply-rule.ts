import _ from "lodash";
import trimRule from "./trim-rule";
import equalRule from "./equal-rule";
import transposeRule from "./transpose-rule";

export default (
  rule: Rule,
  matrix: LevelMatrix,
  boundaries: Coord
): boolean => {
  const clone = { ...matrix }; // used to compare with the matrix and check if there where changes

  // apply the rule

  if (rule.distance === 0) {
    console.log("skip");
    // equalRule(matrix, rule, boundaries);
  } else if (rule.distance == "?") {
    trimRule(matrix, rule, boundaries);
    //this._trim(matrix, rule);d
  } else {
    console.log("skip");
    //transposeRule(matrix, rule, boundaries);
  }

  return !_.isEqual(matrix, clone);
};
