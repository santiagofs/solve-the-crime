// A Solution Map holds for which coords an item is present
// Rules are being applied to it until each item is present in only one room
// once each item is present in only one room, the solution attempt can be compared with the real solution
import _ from "lodash";
import { tCoord, tSolution } from "./types";

export default class SolutionMap {
  private _map: { [itemName: string]: tCoord[] } = {};
  private _unsolved: string[];

  constructor(itemNames: string[], numberOfFloors = 2, roomsPerFloor = 3) {
    const allRooms: tCoord[] = [];

    for (let floor = 0; floor <= numberOfFloors; floor++) {
      for (let room = 0; room <= roomsPerFloor; room++) {
        allRooms.push({ floor, room });
      }
    }
    for (const name of itemNames) {
      this._map[name] = [...allRooms];
    }
    this._unsolved = [...itemNames];
  }

  // static getKey (coord: tCoord): string {
  //   return `${coord.floor.toString()}:${coord.room.toString()}`
  // }

  get() {
    return this._map;
  }
  item(name: string) {
    return this._map[name];
  }

  hasSolution() {
    for (const coords in this._map) {
      if (coords.length !== 1) return false;
    }
    return true;
  }

  solution(): tSolution {
    const attempt: tSolution = {};
    for (const name in this._map) {
      attempt[name] = this._map[name][0] || { floor: -1, room: -1 };
    }
    return attempt;
  }

  get unsolvedItems() {
    return this._unsolved;
  }

  get unsolvedItem() {
    return _.sample(this._unsolved);
  }

  // room(coord: tCoord) {
  //   return this._map[SolutionMap.getKey(coord)];
  // }
}
