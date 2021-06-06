// import { LevelMatrix, LevelSolution } from "@/classes/level";
// import { LevelConfig, CollectionConfig } from '@/config/types'

const state: State = {
  collectionNames: ["heroes", "villains"],
  levelCount: 1,
  levels: [],
  icons: {},
  currentLevel: {
    itemNames: [],
    number: 1,
    matrix: {},
    solution: {},
    unsolvedItems: [],
  },
  // matrix: {},
  // solution: {},
};

export default state;
