import _ from "lodash";
import { tCoord, tCollections, tSolution, tAxis } from "./types";
import type Rule from "./rule";
import Room from "./room";
import type Collection from "./collection";
import Collections from "./collections";

export type tRoomMap = Collections[][];

export default class RoomMap {
  _rooms: tRoomMap = [];

  static getRoomKey(coord: tCoord) {
    return `${coord.y}:${coord.x}`;
  }
  static getItemKey(collectionName: string, itemName: string) {
    return `${collectionName}:${itemName}`;
  }

  constructor(
    collections?: Collections,
    numberOfFloors?: number,
    roomsPerFloor?: number
  ) {
    if (collections && numberOfFloors && roomsPerFloor) {
      for (let y = 0; y < numberOfFloors; y++) {
        this._rooms[y] = [];
        for (let x = 0; x < roomsPerFloor; x++) {
          this._rooms[y][x] = collections.clone();
        }
      }
    }
  }

  clone() {
    const clone = new RoomMap();
    const rooms: tRoomMap = [];
    for (let y = 0; y < this._rooms.length; y++) {
      rooms[y] = [];
      for (let x = 0; x < this._rooms[y].length; x++) {
        rooms[y][x] = this._rooms[y][x].clone();
      }
    }
    clone._rooms = rooms;
    return clone;
  }
  get rooms() {
    return this._rooms;
  }

  // reverse():{[itemName: string]: tCoord[]} {

  // }
}
