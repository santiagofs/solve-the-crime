import roomIterator from "./room-iterator";

export default (matrix: LevelMatrix, rule: Rule, boundaries: Coord): void => {
  // really complicated to read :-D
  // if distance is '?', we only know 'b' items muust be greater than the minimun A on the rule axis
  // and 'a' items must be lower thant the maximum B

  let minA = 1000,
    maxB = 0;
  roomIterator(boundaries, rule.a, rule.b, ({ coord, keyA, keyB }) => {
    if (matrix[keyA] && coord[rule.axis] < minA) minA = coord[rule.axis];
    if (matrix[keyB] && coord[rule.axis] > maxB) maxB = coord[rule.axis];
  });
  roomIterator(boundaries, rule.a, rule.b, ({ coord, keyA, keyB }) => {
    if (coord[rule.axis] >= maxB) matrix[keyA] = false;
    if (coord[rule.axis] <= minA) matrix[keyB] = false;
  });
};
