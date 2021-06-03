import _ from "lodash";
import SolutionMap from "./solution-map";
import { tSolution, tCoord, tRuleConfig } from "./types";
import Rule from "./rule";
import type Collection from "./collection";
import RoomMap from "./room-map";

export default class Solution {
  itemNames: string[];
  unsolved: string[];
  solution: tSolution; // a solution is a dictionary with item names as keys and a coordinate as value
  rules: Rule[];
  map: RoomMap; //SolutionMap;
  collections: Collection[];

  constructor(
    collections: Collection[],
    numberOfFloors = 2,
    roomsPerFloor = 2
  ) {
    this.solution = {};
    this.rules = [];
    this.collections = collections;
    this.unsolved = [];
    this.map = new RoomMap(collections, numberOfFloors, roomsPerFloor);
    this.itemNames = [];

    // this.itemNames = collections.reduce(
    //   (prev: string[], collection: Collection) => {
    //     return [...prev, ...collection.itemNames];
    //   },
    //   []
    // );
    // this.unsolved = [... this.itemNames];

    // for (const name of this.itemNames) {
    //   this.solution[name] = {
    //     x: _.random(0, numberOfFloors - 1),
    //     room: _.random(0, roomsPerFloor - 1),
    //   };
    // }

    // this.map = new SolutionMap(this.itemNames, numberOfFloors, roomsPerFloor);
    // console.log("solution constructor");
    // this.createRules();
  }

  // isSolution(attemp: tSolution) {
  //   return _.isEqual(this.solution, attemp);
  // }

  // get unsolvedItem() {
  //   const item = _.sample(this.unsolved);
  //   if (item === undefined) throw "Don't ask what you dont have";
  //   return item;
  // }

  // get itemPair(): [string, string] {
  //   const a = this.unsolvedItem;
  //   const b = _.sample(_.without(this.itemNames, a)) as string;
  //   return [a, b];
  // }

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

  // createRules() {
  //   const tempMap = this.map.clone();
  //   const rules: Rule[] = [];
  //   const maxTries = 1000;
  //   let i = 0;
  //   console.log("the so lution", this.solution);
  //   // console.log(JSON.parse(JSON.stringify(tempMap.get())));
  //   do {
  //     i++;
  //     console.log("i", i);
  //     const [a, b] = this.itemPair;
  //     // we look in the solution for those elements and create a rule
  //     const rule = new Rule(
  //       { name: a, coord: this.solution[a] },
  //       { name: b, coord: this.solution[b] }
  //     );

  //     if (tempMap.applyRule(rule)) {
  //       rules.push(rule);
  //       if (tempMap.item(rule.a).length === 1) {
  //         _.pull(this.unsolved, rule.a);
  //       }
  //       if (tempMap.item(rule.b).length === 1) {
  //         _.pull(this.unsolved, rule.b);
  //       }
  //       tempMap.enforceRules(rules);
  //     }
  //   } while (!tempMap.solved && i < maxTries);

  //   console.log(
  //     "I shouod have a solution",
  //     this.isSolution(tempMap.solution())
  //   );
  //   console.log(rules);
  // }
}
