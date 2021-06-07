import { genKey } from "./gen-keys";

export default (
  boundaries: Coord,
  names: string[],
  matrix: LevelMatrix
): Board => {
  const ret: Board = [];
  for (let x = 0; x < boundaries.x; x++) {
    ret[x] = [];
    for (let y = 0; y < boundaries.y; y++) {
      ret[x][y] = {};
      for (const name of names) {
        const [col, item] = name.split(".");
        //if (!ret[x][y][col]) ret[x][y][col] = {};
        const matrixKey = genKey(x, y, name);
        const cellItem = {
          name: item,
          fullName: name,
          status: [matrixKey],
          matrixKey,
          icon: "",
        };

        //   const matrixKey = genKey(x, y, itemFullName);
        //   ret[x][y][col][item] = {
        //     name: item,
        //     fullName: itemFullName,
        //     status: this._levelMatrix[matrixKey],
        //     matrixKey,
        //     icon: "",
        //   };
      }
    }
  }
  return ret;
};
