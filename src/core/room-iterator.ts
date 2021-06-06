import boundariesIterator from "./boundaries-iterator";
import { genKey } from "./gen-keys";

export default (
  boundaries: Coord,
  nameA: string,
  nameB: string,
  callback: RoomIteratorCallback
): void => {
  boundariesIterator(boundaries, (x, y) => {
    callback({
      coord: { x, y },
      keyA: genKey(x, y, nameA),
      keyB: genKey(x, y, nameA),
      nameA,
      nameB,
    });
  });
};
