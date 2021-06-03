import _ from "lodash";
import { tCoord, tSolution, tAxis } from "./types";
import type Rule from "./rule";
import Room from "./room";
import type Collection from "./collection";

export type tRoomMap = Collection[][][];

export default class RoomMap {
  _rooms: tRoomMap = [];
  collections: Collection[] = [];
  numberOfFloors: number;
  roomsPerFloor: number;

  static getRoomKey(coord: tCoord) {
    return `${coord.y}:${coord.x}`;
  }
  static getItemKey(collectionName: string, itemName: string) {
    return `${collectionName}:${itemName}`;
  }

  constructor(
    collections: Collection[],
    numberOfFloors = 3,
    roomsPerFloor = 3
  ) {
    this.collections = collections;
    this.numberOfFloors = numberOfFloors;
    this.roomsPerFloor = roomsPerFloor;

    for (let y = 0; y < numberOfFloors; y++) {
      this._rooms[y] = [];
      for (let x = 0; x < roomsPerFloor; x++) {
        this._rooms[y][x] = collections.map((collection) => collection.clone());
      }
    }
  }

  clone() {
    const clone = new RoomMap(
      this.collections,
      this.numberOfFloors,
      this.roomsPerFloor
    );
    const rooms: tRoomMap = [];
    for (let y = 0; y < this._rooms.length - 1; y++) {
      rooms[y] = [];
      for (let x = 0; x < this._rooms[y].length - 1; x++) {
        rooms[y][x] = this._rooms[y][x].map((collection) => collection.clone());
      }
    }
  }
  get rooms() {
    return this._rooms;
  }

  // reverse():{[itemName: string]: tCoord[]} {

  // }
}
