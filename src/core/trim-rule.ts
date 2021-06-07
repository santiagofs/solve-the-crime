import roomIterator from "./room-iterator";
import trimRuleMinMax from "./trim-rule-min-max";

export default (matrix: LevelMatrix, rule: Rule, boundaries: Coord): void => {
  // really complicated to read :-D
  // if distance is '?', we only know 'b' items muust be greater than the minimun A on the rule axis
  // and 'a' items must be lower thant the maximum B

  const { minA, maxB } = trimRuleMinMax(matrix, rule, boundaries);

  roomIterator(boundaries, rule.a, rule.b, ({ coord, keyA, keyB }) => {
    if (coord[rule.axis] >= maxB) matrix[keyA] = false;
    if (coord[rule.axis] <= minA) matrix[keyB] = false;
  });
};
