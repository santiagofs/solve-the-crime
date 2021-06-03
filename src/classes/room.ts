import Collection from "./collection";

export default class Room {
  x: number;
  room: number;
  collections: Collection[];
  solved: boolean;

  constructor(x: number, room: number, collections: Collection[]) {
    this.x = x;
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
