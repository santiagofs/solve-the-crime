// Find a better place for this

export type tItemConfig = [string, string];
export type tCollectionConfig = tItemConfig[];

export type tLevelConfig = {
  collections: string[];
  itemsPerCollection: number;
};

export type tCoord = { x: number; y: number };

export type tSolutionMap = { [itemName: string]: tCoord[] };

export type tSolution = { [itemName: string]: tCoord };
export type tRuleConfig = { name: string; coord: tCoord };
export type tDistance = number | "?";
export type tAxis = "x" | "y";
