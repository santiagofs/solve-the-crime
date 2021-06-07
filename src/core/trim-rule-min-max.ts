import roomIterator from "./room-iterator";

export default (
  matrix: LevelMatrix,
  rule: Rule,
  boundaries: Coord
): { minA: number; maxB: number } => {
  let minA = 1000;
  let maxB = 0;

  roomIterator(boundaries, rule.a, rule.b, ({ coord, keyA, keyB }) => {
    if (matrix[keyA] && coord[rule.axis] < minA) minA = coord[rule.axis];
    if (matrix[keyB] && coord[rule.axis] > maxB) maxB = coord[rule.axis];
  });
  return { minA, maxB };
};
