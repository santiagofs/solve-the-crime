import _ from "lodash";
import { tCoord, tCollections, tSolution, tAxis } from "./types";
import type Rule from "./rule";
import Room from "./room";
import type Collection from "./collection";
import Collections from "./collections";

export type tRoomMap = Collections[][];
export type tMapSnapshot = { [coord: string]: string[] };

const coorKey = (coord: tCoord) => `${coord.x}:${coord.y}`;
export default class RoomMap {
  _rooms: tRoomMap = [];
  _allItemNames: string[] = [];

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
      this._allItemNames = collections.allItemNames;
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
    clone._allItemNames = this._allItemNames;
    return clone;
  }
  get rooms() {
    return this._rooms;
  }

  room(x: number, y: number) {
    return this._rooms[y][x];
  }

  coordsByItem(itemFullName: string): tCoord[] {
    const ret: tCoord[] = [];
    this.iterate((coord, room) => {
      if (room.hasItem(itemFullName)) ret.push(coord);
    });
    return ret;
  }
  get solved(): boolean {
    for (const itemFullName of this._allItemNames) {
      if (this.coordsByItem(itemFullName).length > 1) return false;
    }
    return true;
  }
  get solution(): tSolution | false {
    if (!this.solved) return false;
    return this._allItemNames.reduce((ret, itemFullName) => {
      ret[itemFullName] = this.coordsByItem(itemFullName)[0];
      return ret;
    }, {} as tSolution);
  }

  get maxs() {
    const maxY = this._rooms.length;
    const maxX = this._rooms[0] ? this._rooms[0].length : 0;
    return [maxX, maxY];
  }
  iterate(callback: (coord: tCoord, room: Collections) => void) {
    const [maxX, maxY] = this.maxs;
    for (let y = 0; y < maxY; y++) {
      for (let x = 0; x < maxX; x++) {
        callback({ x, y }, this._rooms[y][x]);
      }
    }
  }

  get snapshot(): tMapSnapshot {
    const ret: tMapSnapshot = {};
    this.iterate((coord, room) => {
      ret[coorKey(coord)] = room.allItemNames;
    });
    return ret;
  }

  // reverse():{[itemName: string]: tCoord[]} {

  // }
}
