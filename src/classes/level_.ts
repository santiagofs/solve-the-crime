// Levels are responsible for loading the scenario configuration and setting it up
import _ from "lodash";

import { tLevelConfig, tCollections } from "./types";

import Collection from "./collection";
import Collections from "./collections";
import Solution from "./solution";

export default class Level {
  level: number;
  collections: Collections;
  itemsPerCollection: number;
  numberOfFloors: number;
  roomsPerFloor: number;
  solution: Solution;

  constructor(
    level: number,
    collections: Collection[],
    itemsPerCollection: number,
    numberOfFloors = 2,
    roomsPerFloor = 2
  ) {
    this.level = level;
    this.collections = new Collections(collections, itemsPerCollection);

    this.itemsPerCollection = itemsPerCollection;
    this.numberOfFloors = numberOfFloors;
    this.roomsPerFloor = roomsPerFloor;

    this.solution = new Solution(
      this.collections,
      numberOfFloors,
      roomsPerFloor
    );
  }

  static async forge(level: number) {
    const levelConfig: tLevelConfig = (
      await import(
        `@/config/levels/level-${_.padStart(level.toString(), 2, "0")}.ts`
      )
    ).default;

    const collections: Collection[] = [];
    for (const collectionName of levelConfig.collections) {
      collections.push(await Collection.forge(collectionName));
    }
    return new Level(level, collections, levelConfig.itemsPerCollection);
  }
}
