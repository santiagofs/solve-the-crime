import _ from "lodash";
// import Room from "./room";
// import Item from "./item";

import { tRuleConfig, tDistance, tAxis } from "./types";

export default class Rule {
  axis: tAxis;
  distance: tDistance;
  a: string;
  b: string;

  constructor(a: tRuleConfig, b: tRuleConfig) {
    this.axis =
      a.coord.floor === b.coord.floor
        ? "room"
        : ((a.coord.room === b.coord.room
            ? "floor"
            : _.sample(["room", "floor"])) as "room" | "floor");

    const distance = b.coord[this.axis] - a.coord[this.axis];

    [this.a, this.b] = distance >= 0 ? [a.name, b.name] : [b.name, a.name];
    const options: tDistance[] = [Math.abs(distance)];
    if (distance !== 0) options.push("?");
    this.distance = _.sample(options) as tDistance; //  // _.sample([ Math.abs(distance), '?'])
  }
}
