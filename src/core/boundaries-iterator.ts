export default (
  boundaries: Coord,
  callback: BoundariesIteratorCallback
): void => {
  for (let x = 0; x < boundaries.x; x++) {
    for (let y = 0; y < boundaries.y; y++) {
      callback(x, y);
    }
  }
};
