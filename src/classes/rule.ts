import _ from "lodash";

export type Distance = number | "?";
export type Axis = "x" | "y";

export type RuleItem = {
  x: number;
  y: number;
  name: string;
};

export default class Rule {
  a: string;
  b: string;
  axis: Axis;
  distance: Distance = 0;

  constructor(a: RuleItem, b: RuleItem) {
    this.axis =
      a.x === b.x // in the same column?
        ? "y" // measure the distant in rows
        : ((a.y === b.y // in the same row?
            ? "x" // measure the distant in columns
            : _.sample(["y", "x"])) as Axis); // choose any

    const distance = b[this.axis] - a[this.axis];

    [this.a, this.b] = distance >= 0 ? [a.name, b.name] : [b.name, a.name];
    const options: Distance[] = [Math.abs(distance)];
    if (distance !== 0) options.push("?");
    this.distance = _.sample(options) as Distance; //  // _.sample([ Math.abs(distanc

    // [this.a, this.b] = distance >= 0 ? [a.item, b.item] : [b.item, a.item];
  }
}
