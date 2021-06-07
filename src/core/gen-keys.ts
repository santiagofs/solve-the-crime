export const genKey = (x: number, y: number, itemName: string) => {
  return `${x}.${y}.${itemName}`;
};
export const splitKey = (
  key: string
): {
  x: number;
  y: number;
  colName: string;
  itemName: string;
  fullName: string;
} => {
  const [x, y, colName, itemName] = key.split(".");
  return {
    x: parseInt(x),
    y: parseInt(y) as number,
    colName,
    itemName,
    fullName: genName(colName, itemName),
  };
};
export const genName = (colName: string, itemName: string) => {
  return `${colName}.${itemName}`;
};
