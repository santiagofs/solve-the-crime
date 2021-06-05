// Find a better place for this

import type Item from "./item";
import type Collection from "./collection";

export type tItemConfig = [string, string];
export type tCollectionConfig = tItemConfig[];
export type tCollections = { [collectionName: string]: Collection };

export type tCoord = { x: number; y: number };

export type tSolutionMap = { [itemName: string]: tCoord[] };

export type tSolution = { [itemName: string]: tCoord };

export type tRuleConfig = { item: Item; coord: tCoord };
export type tDistance = number | "?";
export type tAxis = "x" | "y";
