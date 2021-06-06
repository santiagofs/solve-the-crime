export const genKey = (x: number, y: number, itemName: string) => {
  return `${x}.${y}.${itemName}`;
};
export const genName = (colName: string, itemName: string) => {
  return `${colName}.${itemName}`;
};
