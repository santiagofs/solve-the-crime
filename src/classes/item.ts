// Items are anything that can be found in a room: a hero, a villain, a weapon, a motive, etc...
import { tItemConfig } from "./types";

export default class Item {
  name: string; // the display name of the item
  icon: string;
  collectionName = "";

  constructor(name: string, icon: string) {
    this.name = name;
    this.icon = icon;
  }

  static async forge(config: tItemConfig) {
    const icon: string = await import("@/assets/icons/" + config[1]).then(
      (module) => module.default
    );
    return new Item(config[0], icon);
  }

  get fullName() {
    return `${this.collectionName}.${this.name}`;
  }

  clone() {
    return new Item(this.name, this.icon);
  }
}
