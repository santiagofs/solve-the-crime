// Find a better place for this

export type tItemConfig = [string, string];
export type tCollectionConfig = tItemConfig[];

export type tLevelConfig = {
  collections: string[];
  itemsPerCollection: number;
};

export type tCoord = { floor: number; room: number };
export type tSolution = { [itemName: string]: tCoord };

export type tRuleConfig = { name: string; coord: tCoord };
