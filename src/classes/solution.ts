import _ from "lodash";
import SolutionMap from "./solution-map";
import { tSolution } from "./types";
import type Rule from "./rule";
// { tCoord }

export default class Solution {
  solution: tSolution; // a solution is a dictionary with item names as keys and a coordinate as value
  rules: Rule[];

  constructor(itemNames: string[], numberOfFloors = 2, roomsPerFloor = 3) {
    this.solution = {};
    this.rules = [];

    for (const name of itemNames) {
      this.solution[name] = {
        floor: _.random(0, numberOfFloors),
        room: _.random(0, roomsPerFloor),
      };
    }

    const map = new SolutionMap(itemNames, numberOfFloors, roomsPerFloor);
  }

  isSolution(attemp: tSolution) {
    return _.isEqual(this.solution, attemp);
  }

  _createRules() {
    return false;
  }
}
