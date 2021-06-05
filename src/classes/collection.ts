import Item from "./item";
export type CollectionConfig = [string, string][];

export default class Collection {
  name: string;
  items: Item[];

  constructor(name: string, items: Item[] = []) {
    this.name = name;
    this.items = items.map((item) => {
      item.collectionName = this.name; // use a key instead of binding the collection object to avoid circular references in render
      return item;
    });
  }

  static async forge(collectionName: string) {
    const items: Item[] = [];
    const collectionConfig: CollectionConfig = (
      await import(`@/config/collections/${collectionName}.ts`)
    ).default;

    for (const itemConfig of collectionConfig) {
      const item = await Item.forge(itemConfig);
      items.push(item);
    }
    return new Collection(collectionName, items);
  }
}
