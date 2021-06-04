import _ from "lodash";
import { tSolution, tCoord, tRuleConfig } from "./types";
import Rule from "./rule";
import type Collection from "./collection";
import type Collections from "./collections";
import type Item from "./item";
import RoomMap, { tRoomMap } from "./room-map";

export default class Solution {
  itemNames: string[];
  unsolved: string[];
  solution: tSolution; // a solution is a dictionary with item names as keys and a coordinate as value
  rules: Rule[];
  map: RoomMap; //SolutionMap;
  collections: Collections;
  solved: boolean;

  constructor(collections: Collections, numberOfFloors = 2, roomsPerFloor = 2) {
    this.solution = {};
    this.rules = [];
    this.collections = collections;
    this.unsolved = [];
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
    const b = this.collections.item(
      _.sample(_.without(this.itemNames, a.fullName)) as string
    );
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
        //       if (tempMap.item(rule.a).length === 1) {
        //         _.pull(this.unsolved, rule.a);
        //       }
        //       if (tempMap.item(rule.b).length === 1) {
        //         _.pull(this.unsolved, rule.b);
        //       }
        //       tempMap.enforceRules(rules);
      }
    } while (!this.solved && i < maxTries);

    //   console.log(
    //     "I shouod have a solution",
    //     this.isSolution(tempMap.solution())
    //   );
    //   console.log(rules);
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
      return false;
    } else if (distance === "?") {
      return true;
    } else {
      return true;
    }
    return true;
  }
}
