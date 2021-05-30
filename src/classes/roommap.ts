export interface iCoord {
  floor: number;
  room: number;
}

const getKey = (coord: iCoord): string =>
  `${coord.floor.toString()}:${coord.room.toString()}`;

export default class RoomMap {
  private _map: { [coords: string]: string[] } = {};

  constructor(itemNames: string[], numberOfFloors = 2, roomsPerFloor = 3) {
    for (let floor = 0; floor <= numberOfFloors; floor++) {
      for (let room = 0; room <= roomsPerFloor; room++) {
        this._map[getKey({ floor, room })] = itemNames;
      }
    }
  }

  get() {
    return this._map;
  }

  room(coord: iCoord) {
    return this._map[getKey(coord)];
  }
}
