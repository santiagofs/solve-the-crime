import Collection from "./collection";

export default class Room {
  floor: number;
  room: number;
  collections: Collection[];
  solved: boolean;

  constructor(floor: number, room: number, collections: Collection[]) {
    this.floor = floor;
    this.room = room;
    this.collections = collections;

    this.solved = false;
  }

  removeItem(collectionName: string, itemName: string) {
    const collection = this.collections.find(
      (col) => col.name === collectionName
    );
    if (collection) collection.removeItem(itemName);
  }
}
