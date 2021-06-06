import roomIterator from "./room-iterator";
import trimRule from "./trim-rule";
import { genKey } from "./gen-keys";

export default (matrix: LevelMatrix, rule: Rule, boundaries: Coord): void => {
  trimRule(matrix, rule, boundaries);

  roomIterator(
    boundaries,
    rule.a,
    rule.b,
    ({ coord, keyA, keyB, nameA, nameB }) => {
      if (typeof rule.distance === "string") return;
      if (matrix[keyA] === false) {
        const { x, y }: { x: number; y: number } = {
          ...coord,
          [rule.axis]: coord[rule.axis] + rule.distance,
        };
        matrix[genKey(x, y, nameB)] = false;
      }
      if (matrix[keyB] === false) {
        const { x, y }: { x: number; y: number } = {
          ...coord,
          [rule.axis]: coord[rule.axis] - rule.distance,
        };
        matrix[genKey(x, y, nameA)] = false;
      }
    }
  );
};
