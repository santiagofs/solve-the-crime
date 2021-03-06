// A group of items related by type: heroes, villains, weapons, motives, etc...
import _ from "lodash";

import { computed } from "vue";
import { tCollectionConfig } from "./types";
import Item from "./item";

export default class Collection {
  name: string;
  items: Item[];

  constructor(name: string, items: Item[] = []) {
    this.name = name;
    this.items = items.map((item) => {
      item.collectionName = this.name; // use a key instead of binding the collection object to avoid circular references in render
      return item;
    });
    //this.itemNames = computed(() => this.items.map(item => item.name)) as unknown as string[]
    // this.solution = _.shuffle(this.items)[0] // this is only for the second part, once we know what element is in which room
  }

  static async forge(collectionName: string) {
    const items: Item[] = [];
    const collectionConfig: tCollectionConfig = (
      await import(`@/config/collections/${collectionName}.ts`)
    ).default;

    // const collectionConfig = (await import(
    //   `@/config/collections/${collectionName}.json`
    // ).then((module) => module.default)) as tCollectionConfig;

    for (const itemConfig of collectionConfig) {
      const item = await Item.forge(itemConfig);
      items.push(item);
    }
    return new Collection(collectionName, items);
  }

  shuffle(): Collection {
    this.items = _.shuffle(this.items);
    return this;
  }

  truncate(max: number): Collection {
    this.items = this.items.slice(0, max);
    return this;
  }

  get itemNames(): string[] {
    return this.items.map((item) => item.name);
  }
  get itemsFullName(): string[] {
    return this.items.map((item) => item.fullName);
  }

  item(name: string): Item | undefined {
    return _.find(this.items, { name });
  }

  removeItem(name: string) {
    _.remove(this.items, { name });
    // const ndx = this.items.findIndex(e => e.name === itemName)
    // if (ndx === -1)
    //   throw `item '${itemName}' not found int collection '${this.name}'`
    // this.items.splice(ndx, 1)
  }

  clone() {
    // const items = this.items.map(item => item.clone())
    // Items don't need to be cloned, they are just for display and will keep the same state always
    return new Collection(this.name, [...this.items]);
  }
}
