import _ from "lodash";
import RoomMap, { iCoord } from "./roommap";
// import Rule from './rule'

export interface iSolution {
  [itemName: string]: iCoord;
}

export default class Solution {
  solution: iSolution; // a solution is a dictionary with item names as keys and a coordinate as value
  constructor(itemNames: string[], numberOfFloors = 2, roomsPerFloor = 3) {
    this.solution = {};
    for (const name of itemNames) {
      this.solution[name] = {
        floor: _.random(0, numberOfFloors),
        room: _.random(0, roomsPerFloor),
      };
    }

    console.log(this.solution);

    const map = new RoomMap(itemNames, numberOfFloors, roomsPerFloor);
    console.log(map.get());
    console.log(map.room({ floor: 1, room: 2 }));
  }

  isSolution(attemp: iSolution) {
    return _.isEqual(this.solution, attemp);
  }
}
