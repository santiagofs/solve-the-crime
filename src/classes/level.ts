// Levels are responsible for loading the scenario configuration and setting it up
import _ from "lodash";

import { tLevelConfig } from "./types";

import Collection from "./collection";
import Solution from "./solution";

export default class Level {
  level: number;
  collections: Collection[];
  itemsPerCollection: number;
  numberOfFloors: number;
  roomsPerFloor: number;
  solution: Solution;

  constructor(
    level: number,
    collections: Collection[],
    itemsPerCollection: number,
    numberOfFloors = 2,
    roomsPerFloor = 3
  ) {
    this.level = level;
    this.collections = collections.map((collection) => {
      return collection.shuffle().truncate(itemsPerCollection);
    });

    const allItemNames = this.collections.reduce(
      (prev: string[], collection: Collection) => {
        return [...prev, ...collection.itemNames];
      },
      []
    );
    this.itemsPerCollection = itemsPerCollection;
    this.numberOfFloors = numberOfFloors;
    this.roomsPerFloor = roomsPerFloor;

    this.solution = new Solution(allItemNames, numberOfFloors, roomsPerFloor);
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
