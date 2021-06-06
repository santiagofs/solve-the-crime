import { config } from "@vue/test-utils";
import _ from "lodash";

import { LevelConfig } from "../config/types";
import Rule from "./rule";

export type Coord = { x: number; y: number };
export type LevelMatrix = {
  [key: string]: boolean;
};
export type LevelSolution = {
  [key: string]: Coord;
};
export type BoundariesIteratorCallback = (x: number, y: number) => void;
export type RoomIteratorCallback = (arg: {
  coord: { x: number; y: number };
  keyA: string;
  keyB: string;
  nameA: string;
  nameB: string;
}) => void;
export type RoomCollectionItem = {
  icon: string;
  status: boolean;
  name: string;
  fullName: string;
  matrixKey: string;
};
export type RoomCollection = { [itemName: string]: RoomCollectionItem };
export type Room = { [collectionName: string]: RoomCollection };
export type Rooms = Room[][];

const genKey = (x: number, y: number, itemName: string) => {
  return `${x}.${y}.${itemName}`;
};
const genName = (colName: string, itemName: string) => {
  return `${colName}.${itemName}`;
};

export default class Level {
  private _config: LevelConfig;
  get config() {
    return this._config;
  }
  private _collectionNames: string[] = [];
  get collectionNames() {
    return this._collectionNames;
  }
  private _itemnNames: string[] = [];
  private _unsolvedItems: string[] = [];
  private _levelSolution: LevelSolution = {};
  get solution() {
    return this._levelSolution;
  }
  private _levelMatrix: LevelMatrix = {};
  get matrix() {
    return this._levelMatrix;
  }
  get rooms(): Rooms {
    const ret: Rooms = [];
    for (let x = 0; x < this._config.boundaries.x; x++) {
      ret[x] = [];
      for (let y = 0; y < this._config.boundaries.y; y++) {
        ret[x][y] = {};
        for (const itemFullName of this._itemnNames) {
          const [col, item] = itemFullName.split(".");
          if (!ret[x][y][col]) ret[x][y][col] = {};
          const matrixKey = genKey(x, y, itemFullName);
          ret[x][y][col][item] = {
            name: item,
            fullName: itemFullName,
            status: this._levelMatrix[matrixKey],
            matrixKey,
            icon: "",
          };
        }
      }
    }
    return ret;
  }
  private _rules: Rule[] = [];
  get rules() {
    return this._rules;
  }

  constructor(level: number, config: LevelConfig) {
    this._config = config;
    //this._collectionNames = Object.keys(config.collections)
    for (const colName in config.collections) {
      this._collectionNames.push(colName);
      const itemNames = _.shuffle(
        config.collections[colName].map((item) => item[0])
      ).slice(0, config.itemsPerCollection);
      for (const itemName of itemNames) {
        this._itemnNames.push(genName(colName, itemName));
      }
    }
    this._unsolvedItems = [...this._itemnNames];
    //
    for (let x = 0; x < config.boundaries.x; x++) {
      for (let y = 0; y < config.boundaries.y; y++) {
        for (const itemName of this._itemnNames) {
          const key = genKey(x, y, itemName);
          this._levelMatrix[key] = true;
        }
      }
    }

    for (const itemName of this._itemnNames) {
      this._levelSolution[itemName] = {
        x: _.random(0, config.boundaries.x - 1),
        y: _.random(0, config.boundaries.y - 1),
      };
    }

    this.createRules();
  }

  getItemPair(): [string, string] {
    const a = _.sample(this._unsolvedItems);
    if (!a) throw "Unsoleved Item not found for item pair";
    const b = _.sample(_.without(this._itemnNames, a));
    if (!b) throw "Pair Item not found";
    return [a, b];
  }
  get solved() {
    return false;
  }
  createRules() {
    const maxTries = 200;
    let i = 0;
    const matrix = { ...this._levelMatrix };
    console.log(this._levelSolution);
    do {
      i++;
      // get a pair of random items
      // the first one has not yet an unique solution
      // the second one can be any
      const [a, b] = this.getItemPair();

      // create a rule using the element pair

      const rule = new Rule(
        { name: a, x: this._levelSolution[a].x, y: this._levelSolution[a].y },
        { name: b, x: this._levelSolution[b].x, y: this._levelSolution[b].y }
      );

      if (this.applyRule(rule, matrix)) {
        this._rules.push(rule);
        this.enforceRules(this._rules, matrix);
        //   if (tempMap.coordsByItem(rule.a.fullName).length === 1) {
        //     _.pull(this.unsolved, rule.a.fullName);
        //   }
        //   if (tempMap.coordsByItem(rule.b.fullName).length === 1) {
        //     _.pull(this.unsolved, rule.b.fullName);
        //   }
      } else {
        console.log("rejected");
      }
    } while (!this.solved && i < maxTries);

    console.log(
      "I shouod have a solution"
      // this.isSolution(tempMap.solution())
    );
  }

  applyRule(rule: Rule, otherMatrix: LevelMatrix): boolean {
    const matrix = otherMatrix || this._levelMatrix;
    const clone = { ...matrix }; // used to compare with the matrix and check if there where changes

    // apply the rule
    const distance = rule.distance;
    const axis = rule.axis;

    if (distance === 0) {
      this.iterateRooms(rule.a, rule.b, ({ coord, keyA, keyB }) => {
        if (!matrix[keyA] || !matrix[keyB]) {
          matrix[keyA] = false;
          matrix[keyB] = false;
        }
      });
    } else if (distance == "?") {
      this._trim(matrix, rule);
    } else {
      this._transpose(matrix, rule);
    }

    return !_.isEqual(matrix, clone);
  }
  enforceRules(rules: Rule[], otherMatrix: LevelMatrix): void {
    const matrix = otherMatrix || this._levelMatrix;
    let i = 0;
    let changed: boolean;
    do {
      i++;
      changed = false;
      rules.forEach((rule) => {
        changed = changed || this.applyRule(rule, matrix);
      });
      console.log("enforce", i, changed);
    } while (changed && i < 100);
  }
  checkSolved(matrix: LevelMatrix, nameA: string, nameB: string) {
    let countA = 0,
      countB = 0;
    this.iterateRooms(nameA, nameB, ({ keyA, keyB }) => {
      if (matrix[keyA]) ++countA;
      if (matrix[keyB]) ++countB;
    });
    if (countA === 0 || countB === 0) throw "Item not found";
    if (countA === 1) _.pull(this._unsolvedItems, nameA);
    if (countB === 1) _.pull(this._unsolvedItems, nameB);
  }

  _trim(matrix: LevelMatrix, rule: Rule) {
    // really complicated to read :-D
    // if distance is '?', we only know 'b' items muust be greater than the minimun A on the rule axis
    // and 'a' items must be lower thant the maximum B

    let minA = 1000,
      maxB = 0;
    this.iterateRooms(rule.a, rule.b, ({ coord, keyA, keyB }) => {
      if (matrix[keyA] && coord[rule.axis] < minA) minA = coord[rule.axis];
      if (matrix[keyB] && coord[rule.axis] > maxB) maxB = coord[rule.axis];
    });
    this.iterateRooms(rule.a, rule.b, ({ coord, keyA, keyB }) => {
      if (coord[rule.axis] >= maxB) matrix[keyA] = false;
      if (coord[rule.axis] <= minA) matrix[keyB] = false;
    });
  }
  _transpose(matrix: LevelMatrix, rule: Rule) {
    this._trim(matrix, rule);

    this.iterateRooms(rule.a, rule.b, ({ coord, keyA, keyB, nameA, nameB }) => {
      if (typeof rule.distance === "string") return;
      if (matrix[keyA] === false) {
        const { x, y }: { x: number; y: number } = {
          ...coord,
          [rule.axis]: coord[rule.axis] + rule.distance,
        };
        matrix[genKey(x, y, nameB)] = false;
      }
      if (matrix[keyB] === false) {
        const { x, y }: { x: number; y: number } = {
          ...coord,
          [rule.axis]: coord[rule.axis] - rule.distance,
        };
        matrix[genKey(x, y, nameA)] = false;
      }
    });
  }

  iterateBoundaries(callback: BoundariesIteratorCallback) {
    for (let x = 0; x < this._config.boundaries.x; x++) {
      for (let y = 0; y < this._config.boundaries.y; y++) {
        callback(x, y);
      }
    }
  }
  iterateRooms(nameA: string, nameB: string, callback: RoomIteratorCallback) {
    this.iterateBoundaries((x, y) => {
      callback({
        coord: { x, y },
        keyA: genKey(x, y, nameA),
        keyB: genKey(x, y, nameA),
        nameA,
        nameB,
      });
    });
  }

  static async forge(level: number) {
    const levelConfig: LevelConfig = (
      await import(
        `@/config/levels/level-${_.padStart(level.toString(), 2, "0")}.ts`
      )
    ).default;
    return new Level(level, levelConfig);
  }
}
