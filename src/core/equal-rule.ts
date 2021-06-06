import roomIterator from "./room-iterator";

export default (matrix: LevelMatrix, rule: Rule, boundaries: Coord): void => {
  roomIterator(boundaries, rule.a, rule.b, ({ keyA, keyB }) => {
    if (!matrix[keyA] || !matrix[keyB]) {
      matrix[keyA] = false;
      matrix[keyB] = false;
    }
  });
};
