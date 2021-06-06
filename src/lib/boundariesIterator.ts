import { Coord, IterateBoundarioesCallback } from "./types";

export default (boundaries: Coord, callback: IterateBoundarioesCallback) => {
  for (let x = 0; x < boundaries.x; x++) {
    for (let y = 0; y < boundaries.y; y++) {
      callback(x, y);
    }
  }
};
