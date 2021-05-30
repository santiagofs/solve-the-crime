// Items are anything that can be found in a room: a hero, a villain, a weapon, a motive, etc...

export default class Item {
  name: string; // the display name of the item
  icon: string;
  parent: string; // the collection name

  constructor(name: string, icon: string) {
    this.name = name;
    this.icon = icon;
    this.parent = "";
  }

  static async forge(config: [string, string]) {
    const icon: string = await import("@/assets/icons/" + config[1]).then(
      (module) => module.default
    );
    return new Item(config[0], icon);
  }
}
