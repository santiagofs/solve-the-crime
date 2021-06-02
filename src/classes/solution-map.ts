// A Solution Map holds for which coords an item is present
// Rules are being applied to it until each item is present in only one room
// once each item is present in only one room, the solution attempt can be compared with the real solution

import _ from "lodash";
import { tCoord, tSolution, tSolutionMap, tAxis } from "./types";
import type Rule from "./rule";

export default class SolutionMap {
  _map: tSolutionMap;
  // _unsolved: string[];
  allItems: string[];

  constructor(itemNames: string[], numberOfFloors = 2, roomsPerFloor = 3) {
    const allRooms: tCoord[] = [];
    this.allItems = [...itemNames];
    this._map = {};

    for (let floor = 0; floor < numberOfFloors; floor++) {
      for (let room = 0; room < roomsPerFloor; room++) {
        allRooms.push({ floor, room });
      }
    }
    for (const name of itemNames) {
      this._map[name] = [...allRooms];
    }
  }

  // static getKey (coord: tCoord): string {
  //   return `${coord.floor.toString()}:${coord.room.toString()}`
  // }

  get() {
    return this._map;
  }
  clone(): SolutionMap {
    const clone = new SolutionMap(this.allItems);
    clone._map = JSON.parse(JSON.stringify(this._map));
    return clone;
  }
  item(name: string) {
    return this._map[name];
  }

  transpose(
    rule: Rule,
    coordsA: tCoord[],
    coordsB: tCoord[]
  ): [tCoord[], tCoord[]] {
    const ndxs = (coords: tCoord[]) => {
      return _.uniq(coords.map((coord) => coord[rule.axis]));
    };
    const distance = rule.distance as number;
    const Bs: number[] = ndxs(coordsA).map((value) => value + distance);
    const As: number[] = ndxs(coordsB).map((value) => value - distance);
    const transA = coordsA.filter((coord) => _.includes(As, coord[rule.axis]));
    const transB = coordsB.filter((coord) => _.includes(Bs, coord[rule.axis]));

    return [transA, transB];
  }

  intersect(a: tCoord[], b: tCoord[]): tCoord[] {
    return _.intersectionWith(a, b, _.isEqual);
  }

  boundaries(rule: Rule): [number, number] {
    // really complicated to read :-D
    // if distance is '?', all what we know is 'b' items muust be greater than the minimun A
    // and 'a' items must be lower thant the maximum B
    const minA = (
      _.minBy(this._map[rule.a], (coord) => coord[rule.axis]) as tCoord
    )[rule.axis];
    const maxB = (
      _.maxBy(this._map[rule.b], (coord) => coord[rule.axis]) as tCoord
    )[rule.axis];
    return [minA, maxB];
  }

  applyRule(rule: Rule) {
    const clone = this.clone().get();

    // we apply the rule
    const distance = rule.distance;
    const axis = rule.axis;

    const coordsA = this._map[rule.a];
    const coordsB = this._map[rule.b];
    if (distance === 0) {
      // coordinates in both items must match, which is the intersection of both arrays
      const intersection = this.intersect(coordsA, coordsB);
      this._map[rule.a] = [...intersection];
      this._map[rule.b] = [...intersection];
    } else if (distance === "?") {
      const [minA, maxB] = this.boundaries(rule);
      this._map[rule.a] = coordsA.filter((coord) => coord[rule.axis] < maxB);
      this._map[rule.b] = coordsB.filter((coord) => coord[rule.axis] > minA);
      // we don't know the distance
    } else {
      const [transA, transB] = this.transpose(rule, coordsA, coordsB);
      console.log(this._map[rule.b], transB);
      this._map[rule.a] = this.intersect(coordsA, transA);
      this._map[rule.b] = this.intersect(coordsB, transB);
    }

    // if the rule has changed the map, the rule is usefull
    console.log(rule, !_.isEqual(this._map, clone));
    console.log(JSON.parse(JSON.stringify(this._map)));
    return !_.isEqual(this._map, clone);
  }

  // we are going to key applying all the rules until the map is not changed anymore
  enforceRules(rules: Rule[]): void {
    let i = 0;
    let changed = false;
    do {
      i++;
      changed = false;
      rules.forEach((rule) => {
        changed = changed || this.applyRule(rule);
        if (this.item(rule.a).length === 0) throw "Something is going wrong A";
        if (this.item(rule.b).length === 0) throw "Something is going wrong B";
      });
    } while (changed && i < 1000);
  }

  get solved() {
    for (const collection in this._map) {
      if (this._map[collection].length > 1) return false;
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

  // room(coord: tCoord) {
  //   return this._map[SolutionMap.getKey(coord)];
  // }
}
