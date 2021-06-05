import _ from "lodash";

export default class Solution {
  constructor(collections: Collections, numberOfFloors = 2, roomsPerFloor = 2) {
    this.solution = {};
    this.rules = [];
    this.collections = collections;
    this.unsolved = [];
    this.numberOfFloors = numberOfFloors;
    this.roomsPerFloor = roomsPerFloor;
    this.map = new RoomMap(collections, numberOfFloors, roomsPerFloor);
    this.itemNames = [];
    this.solved = false;

    for (const collection of collections.toArray()) {
      console.log(collection);
      for (const fullName of collection.itemsFullName) {
        this.itemNames.push(fullName);
      }
    }
    this.unsolved = [...this.itemNames];

    // get a random solution
    for (const name of this.itemNames) {
      this.solution[name] = {
        x: _.random(0, numberOfFloors - 1),
        y: _.random(0, roomsPerFloor - 1),
      };
    }
    this.rules = this.createRules();
  }
}
