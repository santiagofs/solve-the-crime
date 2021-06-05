export type ItemConfig = [string, string];
export type CollectionConfig = ItemConfig[];

export type LevelConfig = {
  collections: { [collectionName: string]: CollectionConfig };
  itemsPerCollection: number;
  boundaries: { x: number; y: number };
};
