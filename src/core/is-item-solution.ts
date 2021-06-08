import _ from "lodash";
import { splitKey } from "./gen-keys";

export default (matrixKey: string, solution: LevelSolution): boolean => {
  const { x, y, fullName } = splitKey(matrixKey);
  return _.isEqual(solution[fullName], { x, y });
};
