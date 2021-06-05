import type Collection from "./collection";
import { tCollections } from "./types";

interface IRawParams {
  [key: string]: any;
}

export default class Collections implements IRawParams {
  [k: string]: any;
  _collections: tCollections = {};
  _allItemNames: string[] = [];

  constructor(collections?: Collection[], itemsPerCollection?: number) {
    if (collections && itemsPerCollection) {
      this._collections = collections
        .map((collection) => {
          return collection.shuffle().truncate(itemsPerCollection);
        })
        .reduce((ret: tCollections, collection) => {
          ret[collection.name] = collection;
          return ret;
        }, {});

      this.calcAllItemNames();
    }

    // return new Proxy<Collections>(this, {
    //   get: function(collections, property: string) {
    //     if(property in collections) return collections[property]
    //     if(property in collections._collections) return collections._collections[property]
    //     throw 'You don\'t know what you\'re asking for'
    //   }
    // })
  }

  get allItemNames() {
    return this._allItemNames;
  }
  get() {
    return this._collections;
  }

  item(itemFullName: string) {
    const [collection, item] = itemFullName.split(".");
    return this._collections[collection].item(item);
  }
  hasItem(itemFullName: string) {
    return !!this.item(itemFullName);
  }

  removeItem(itemFullName: string): void {
    const [collection, item] = itemFullName.split(".");
    this._collections[collection].removeItem(item);
  }
  toArray() {
    return Object.keys(this._collections).map((key) => this._collections[key]);
  }
  calcAllItemNames(): void {
    this._allItemNames = this.toArray().reduce((all: string[], collection) => {
      return [...all, ...collection.itemsFullName];
    }, [] as string[]);
  }
  clone() {
    const collections = new Collections();
    for (const key in this._collections) {
      collections.get()[key] = this._collections[key].clone();
    }
    collections.calcAllItemNames();
    return collections;
  }

  // [Symbol.iterator]() { return Object.keys(this._collections).map(key => this._collections[key].values) }
}
