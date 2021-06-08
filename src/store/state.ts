// import { LevelMatrix, LevelSolution } from "@/classes/level";
// import { LevelConfig, CollectionConfig } from '@/config/types'

const state: sdState = {
  collectionNames: ["heroes", "villains"],
  levelCount: 1,
  levels: [],
  icons: {},
  currentLevel: {
    itemNames: [],
    number: 1,
    matrix: {},
    rules: [],
    solution: {},
    unsolvedItems: [],
    errorCount: 0,
  },
  // matrix: {},
  // solution: {},
};

export default state;
