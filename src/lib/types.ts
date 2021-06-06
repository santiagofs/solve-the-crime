export type Coord = { x: number; y: number };

export type RoomCollectionItem = {
  icon: string;
  status: boolean;
  name: string;
  fullName: string;
  matrixKey: string;
};
export type RoomCollection = { [itemName: string]: RoomCollectionItem };
export type Room = { [collectionName: string]: RoomCollection };
export type Rooms = Room[][];

export type LevelMatrix = {
  [key: string]: boolean;
};

export type LevelSolution = {
  [key: string]: Coord;
};

export type IterateBoundarioesCallback = (x: number, y: number) => void;
