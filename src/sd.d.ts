// CONFIGURATION
type ItemConfig = [string, string];
type CollectionConfig = ItemConfig[];

type LevelConfig = {
  number: number;
  collections: { [collectionName: string]: CollectionConfig };
  itemsPerCollection: number;
  boundaries: { x: number; y: number };
};

// ASSETS
type IconCollection = { [col: string]: { [item: string]: string } };

// LOGIC
type Coord = { x: number; y: number };

type LevelMatrix = {
  [key: string]: boolean;
};
type ItemCoords = {
  [key: string]: Coord[];
};
type LevelSolution = {
  [key: string]: Coord;
};

type Level = {
  config?: LevelConfig;
  itemNames: string[];
  number: number;
  matrix: LevelMatrix;
  solution: LevelSolution;
  unsolvedItems: string[];
  rules: Rule[];
};
type BoundariesIteratorCallback = (x: number, y: number) => void;

type RoomIteratorCallback = (arg: {
  coord: { x: number; y: number };
  keyA: string;
  keyB: string;
  nameA: string;
  nameB: string;
}) => void;

type CellCollectionItem = {
  icon: string;
  status: boolean;
  name: string;
  fullName: string;
  matrixKey: string;
};
type CellCollection = { [itemName: string]: CellCollectionItem };

type Cell = { [collectionName: string]: CellCollectionItem };
type Board = Cell[][]; // sorted by coords

type RuleDistance = number | "?";
type RuleAxis = "x" | "y";

type RuleItem = {
  x: number;
  y: number;
  name: string;
};

// type RuleConfig = {
//   explicitDistanceWeight: number, // .x float between 0 (no explicit distance) to 1 (all explicit)
// }
type Rule = {
  a: string;
  b: string;
  axis: RuleAxis;
  distance: RuleDistance;
};

// STORE
type sdState = {
  collectionNames: string[];
  currentLevel: Level;
  icons: IconCollection;
  levelCount: number;
  levels: LevelConfig[];
};
