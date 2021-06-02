import _ from "lodash";
// import Room from "./room";
// import Item from "./item";

import { tRuleConfig } from "./types";

export default class Rule {
  axis: "room" | "floor";
  distance: number; // modify to accecpt this as not defined '?'
  itemA: string;
  itemB: string;

  constructor(a: tRuleConfig, b: tRuleConfig) {
    this.axis =
      a.coord.floor === b.coord.floor
        ? "room"
        : ((a.coord.room === b.coord.room
            ? "floor"
            : _.sample(["room", "floor"])) as "room" | "floor");
    const distance = b.coord[this.axis] - a.coord[this.axis];
    const [A, B]: [string, string] =
      distance >= 0 ? [a.name, b.name] : [b.name, a.name];

    this.itemA = A;
    this.itemB = B;
    this.distance = Math.abs(distance); // _.sample([ Math.abs(distance), '?'])
  }
}
