import _ from "lodash";
// import Room from "./room";
import Item from "./item";

import { tRuleConfig, tDistance, tAxis } from "./types";

export default class Rule {
  axis: tAxis;
  distance: tDistance;
  a: Item;
  b: Item;

  constructor(a: tRuleConfig, b: tRuleConfig) {
    this.axis =
      a.coord.x === b.coord.x // in the same column?
        ? "y" // measure the distant in rows
        : ((a.coord.y === b.coord.y // in the same row?
            ? "x" // measure the distant in columns
            : _.sample(["y", "x"])) as tAxis); // choose any

    const distance = b.coord[this.axis] - a.coord[this.axis];

    [this.a, this.b] = distance >= 0 ? [a.item, b.item] : [b.item, a.item];
    const options: tDistance[] = [Math.abs(distance)];
    if (distance !== 0) options.push("?");
    this.distance = _.sample(options) as tDistance; //  // _.sample([ Math.abs(distance), '?'])
  }
}
