export default (itemCoords: ItemCoords): boolean => {
  for (const item in itemCoords) {
    if (itemCoords[item].length > 1) return false;
  }
  return true;
};
