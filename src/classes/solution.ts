import _ from "lodash";
import { tSolution, tCoord, tRuleConfig } from "./types";
import Rule from "./rule";
import type Collection from "./collection";
import type Collections from "./collections";
import type Item from "./item";
import RoomMap, { tRoomMap } from "./room-map";
import Room from "./room";

type tIteratorCallback = (x: number, y: number) => void;

export default class Solution {
  itemNames: string[];
  unsolved: string[];
  solution: tSolution; // a solution is a dictionary with item names as keys and a coordinate as value
  rules: Rule[];
  map: RoomMap; //SolutionMap;
  collections: Collections;
  solved: boolean;
  numberOfFloors: number;
  roomsPerFloor: number;

  constructor(collections: Collections, numberOfFloors = 2, roomsPerFloor = 2) {
    this.solution = {};
    this.rules = [];
    this.collections = collections;
    this.unsolved = [];
    this.numberOfFloors = numberOfFloors;
    this.roomsPerFloor = roomsPerFloor;
    this.map = new RoomMap(collections, numberOfFloors, roomsPerFloor);
    this.itemNames = [];
    this.solved = false;

    for (const collection of collections.toArray()) {
      console.log(collection);
      for (const fullName of collection.itemsFullName) {
        this.itemNames.push(fullName);
      }
    }
    this.unsolved = [...this.itemNames];

    // get a random solution
    for (const name of this.itemNames) {
      this.solution[name] = {
        x: _.random(0, numberOfFloors - 1),
        y: _.random(0, roomsPerFloor - 1),
      };
    }
    this.rules = this.createRules();
  }

  // isSolution(attemp: tSolution) {
  //   return _.isEqual(this.solution, attemp);
  // }

  get unsolvedItem() {
    const item = _.sample(this.unsolved);
    if (item === undefined) throw "Don't ask what you dont have";
    return item;
  }

  get itemPair(): [Item, Item] {
    const a = this.collections.item(this.unsolvedItem);
    if (!a) throw "Unsoleved Item not found for item paire";
    const b = this.collections.item(
      _.sample(_.without(this.itemNames, a.fullName)) as string
    );
    if (!b) throw "Pair Item not found";
    return [a, b];
  }

  // createRule(tempMap: SolutionMap): Rule {
  //   const maxTries = 1000;
  //   let i = 0;
  //   do {
  //     i++;

  //     // we pick to random elements from all available
  //     const [a, b] = this.itemPair;
  //     // we look in the solution for those elements and create a rule
  //     const rule = new Rule(
  //       { name: a, coord: this.solution[a] },
  //       { name: b, coord: this.solution[b] }
  //     );
  //     if (tempMap.applyRule(rule)) return rule;
  //   } while (i < maxTries);

  //   throw "No valid rule found after too much tries";
  // }

  createRules() {
    console.log(this.map);
    const tempMap = this.map.clone();
    console.log(tempMap);
    const rules: Rule[] = [];
    const maxTries = 20;
    let i = 0;
    console.log("the solution", this.solution);
    //   // console.log(JSON.parse(JSON.stringify(tempMap.get())));
    do {
      i++;
      // get a pair of random items
      // the first one has not yet an unique solution
      // the second one can be any
      const [a, b] = this.itemPair;

      // create a rule using the element pair
      const rule = new Rule(
        { item: a, coord: this.solution[a.fullName] },
        { item: b, coord: this.solution[b.fullName] }
      );

      if (this.applyRule(rule, tempMap)) {
        rules.push(rule);
        this.enforceRules(rules, tempMap);

        if (tempMap.coordsByItem(rule.a.fullName).length === 1) {
          _.pull(this.unsolved, rule.a.fullName);
        }
        if (tempMap.coordsByItem(rule.b.fullName).length === 1) {
          _.pull(this.unsolved, rule.b.fullName);
        }
      }
    } while (!this.solved && i < maxTries);

    console.log(
      "I shouod have a solution"
      // this.isSolution(tempMap.solution())
    );
    console.log(rules);
    return rules;
  }

  applyRule(rule: Rule, otherMap?: RoomMap): boolean {
    const map = otherMap || this.map;
    const clone = map.clone(); // will use this to check if the map has changed after applying the rule

    // apply the rule
    const distance = rule.distance;
    const axis = rule.axis;

    if (distance === 0) {
      // // coordinates in both items must match, which is the intersection of both arrays
      // const intersection = this.intersect(coordsA, coordsB);
      // this._map[rule.a] = [...intersection];
      // this._map[rule.b] = [...intersection];
      console.log(distance);
    } else if (distance === "?") {
      // boundaries
      console.log(distance);
      this._trim(map, rule);
      console.log(map.snapshot, rule);
    } else {
      console.log(distance);
    }
    console.log(
      map.snapshot,
      clone.snapshot,
      _.isEqual(map.snapshot, clone.snapshot)
    );
    return _.isEqual(map.snapshot, clone.snapshot);
  }
  // we are going to key applying all the rules until the map is not changed anymore
  enforceRules(rules: Rule[], otherMap?: RoomMap): void {
    const map = otherMap || this.map;
    let i = 0;
    let changed: boolean;
    do {
      i++;
      changed = false;
      rules.forEach((rule) => {
        changed = changed || this.applyRule(rule);
        if (map.coordsByItem(rule.a.fullName).length === 0)
          throw "Something is going wrong A";
        if (map.coordsByItem(rule.b.fullName).length === 0)
          throw "Something is going wrong B";
      });
    } while (changed && i < 1000);
  }
  _trim(map: RoomMap, rule: Rule) {
    // really complicated to read :-D
    // if distance is '?', we only know 'b' items muust be greater than the minimun A on the rule axis
    // and 'a' items must be lower thant the maximum B

    let minA = 1000,
      maxB = 0;
    const validA: tCoord[] = [];
    const validB: tCoord[] = [];
    map.iterate((coord, room) => {
      if (room.hasItem(rule.a.fullName) && coord[rule.axis] < minA)
        minA = coord[rule.axis];
      if (room.hasItem(rule.b.fullName) && coord[rule.axis] > maxB)
        maxB = coord[rule.axis];
    });
    map.iterate((coord, room) => {
      if (coord[rule.axis] >= maxB) room.removeItem(rule.a.fullName);
      if (coord[rule.axis] <= minA) room.removeItem(rule.b.fullName);
    });

    // console.log(minA, maxB)
    // const coordsA = map.coordsByItem(rule.a.fullName)
    // console.log(coordsA)
    //return [minA, maxB];
  }
  _iterate(callback: tIteratorCallback) {
    for (let y = 0; y < this.numberOfFloors; y++) {
      for (let x = 0; x < this.roomsPerFloor; x++) {
        callback(x, y);
      }
    }
  }
}
