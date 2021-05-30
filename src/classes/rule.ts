import _ from "lodash";
import Room from "./room";
import Item from "./item";

interface ruleParam {
  room: Room;
  item: Item;
}

export class Rule {
  axis: "room" | "floor";
  distance: number; // modify to accecpt this as not defined '?'
  itemA: Item;
  itemB: Item;

  constructor(a: ruleParam, b: ruleParam) {
    this.axis =
      a.room.floor === b.room.floor
        ? "room"
        : ((a.room.room === b.room.room
            ? "floor"
            : _.sample(["room", "floor"])) as "room" | "floor");
    const distance = b.room[this.axis] - a.room[this.axis];
    const [A, B]: [Item, Item] =
      distance >= 0 ? [a.item, b.item] : [b.item, a.item];

    this.itemA = A;
    this.itemB = B;
    this.distance = Math.abs(distance); // _.sample([ Math.abs(distance), '?'])
  }
}
