import roomIterator from "./room-iterator";
import { genKey } from "./gen-keys";

export default (matrix: LevelMatrix, rule: Rule, boundaries: Coord): void => {
  const linesWithA: boolean[] = [];
  const linesWithB: boolean[] = [];
  let keyA: string, keyB: string;

  for (let n = 0; n < boundaries[rule.axis]; n++) {
    const other = rule.axis === "x" ? "y" : "x";
    for (let m = 0; m < boundaries[other]; m++) {
      const [x, y] = rule.axis === "x" ? [n, m] : [m, n];
      const keyA = genKey(x, y, rule.a);
      const keyB = genKey(x, y, rule.b);
      linesWithA[n] = linesWithA[n] || matrix[keyA];
      linesWithB[n] = linesWithB[n] || matrix[keyB];
    }
  }
  roomIterator(
    boundaries,
    rule.a,
    rule.b,
    ({ coord, keyA, keyB, nameA, nameB }) => {
      matrix[keyA] = linesWithA[coord[rule.axis]];
      matrix[keyB] = linesWithB[coord[rule.axis]];
    }
  );
};
