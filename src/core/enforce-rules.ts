import applyRule from "./apply-rule";

export default (
  rules: Rule[],
  matrix: LevelMatrix,
  boundaries: Coord
): void => {
  let i = 0,
    changed: boolean;

  do {
    i++;
    changed = false;
    rules.forEach((rule) => {
      changed = changed || applyRule(rule, matrix, boundaries);
    });
  } while (changed && i < 100);
};
