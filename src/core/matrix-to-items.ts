import { splitKey } from "./gen-keys";

export default (matrix: LevelMatrix): ItemCoords => {
  const ret: ItemCoords = {};
  for (const key in matrix) {
    if (!matrix[key]) continue;

    const { x, y, fullName } = splitKey(key);
    if (!ret[fullName]) ret[fullName] = [];
    ret[fullName].push({ x, y });
  }

  return ret;
};
