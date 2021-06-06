import _ from "lodash";

export default (a: RuleItem, b: RuleItem, explicitDistanceWeight = 0): Rule => {
  const axis: RuleAxis =
    a.x === b.x // in the same column?
      ? "y" // measure the distant in rows
      : ((a.y === b.y // in the same row?
          ? "x" // measure the distant in columns
          : _.sample(["y", "x"])) as RuleAxis); // choose any

  const distance: number = b[axis] - a[axis];

  const [itemA, itemB] = distance >= 0 ? [a.name, b.name] : [b.name, a.name];

  const rule: Rule = { axis, distance, a: itemA, b: itemB };

  if (distance === 0) return rule;

  const weight = Math.floor(explicitDistanceWeight * 10);
  const options: RuleDistance[] = [
    ...Array(weight).fill(Math.abs(distance)),
    ...Array(10 - weight).fill("?"),
  ];

  rule.distance = _.sample(options) as RuleDistance; //
  return rule;
};
