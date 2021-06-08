import { genKey } from "./gen-keys";

export default (
  boundaries: Coord,
  names: string[],
  matrix: LevelMatrix,
  icons: IconCollection
): Board => {
  const ret: Board = [];
  for (let x = 0; x < boundaries.x; x++) {
    ret[x] = [];
    for (let y = 0; y < boundaries.y; y++) {
      ret[x][y] = {};
      for (const name of names) {
        const [col, item] = name.split(".");
        if (!ret[x][y][col]) ret[x][y][col] = {};

        const matrixKey = genKey(x, y, name);
        const cellItem: CellCollectionItem = {
          name: item,
          fullName: name,
          status: matrix[matrixKey],
          matrixKey,
          icon: icons[col][item],
        };

        ret[x][y][col][name] = cellItem;
        // ret[x][y][col][name] = cellItem
      }
    }
  }
  return ret;
};
