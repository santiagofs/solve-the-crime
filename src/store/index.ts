import _ from "lodash";
import { createStore } from "vuex";
import state from "./state";

import createLevel from "@/core/create-level";
import createBoard from "@/core/create-board";

export default createStore({
  state,
  mutations: {
    icons(state: sdState, icons: IconCollection) {
      state.icons = icons;
    },
    levels(state: sdState, levels: LevelConfig[]) {
      state.levels = levels;
    },
    setLevel(state: sdState, levelNumber: number) {
      createLevel(state, levelNumber);
      console.log(state.currentLevel);
    },
    // matrix(state, matrix) {
    //   state.matrix = matrix;
    // },
    // solution(state, solution) {
    //   state.solution = solution;
    // },
    // removeMatrixItem(state, item) {
    //   console.log(item);
    //   console.log(state.solution);
    //   if (_.isEqual(state.solution[item.fullName], item.coord))
    //     throw "bad move";
    //   state.matrix[item.matrixKey] = false;
    // },
  },
  modules: {},
  getters: {
    board(state): Board {
      if (!state.currentLevel || !state.currentLevel.config) return [];
      const boundaries = state.currentLevel.config.boundaries;
      const itemNames = state.currentLevel.itemNames;
      const matrix = state.currentLevel.matrix;
      return createBoard(boundaries, itemNames, matrix);
    },
    rules(state): Rule[] {
      // TODO: filter only rules that can change the board
      return state.currentLevel.rules;
    },
    icon:
      (state) =>
      (name: string): string => {
        const [colName, itemName] = name.split(".");
        return state.icons[colName][itemName];
      },
  },
  // actions:
  actions: {
    async initialize({ commit, state }) {
      const cols = state.collectionNames;
      const icons: IconCollection = {};

      for (const col of cols) {
        const config: [string, string][] = (
          await import(`@/config/collections/${col}.ts`)
        ).default;

        icons[col] = {};
        for (const item of config) {
          const icon: string = await import("@/assets/icons/" + item[1]).then(
            (module) => module.default
          );

          icons[col][item[0]] = icon;
        }
      }
      commit("icons", icons);

      const levels = [];
      for (let level = 1; level <= state.levelCount; level++) {
        const levelConfig: LevelConfig = (
          await import(
            `@/config/levels/level-${_.padStart(level.toString(), 2, "0")}.ts`
          )
        ).default;
        levels.push(levelConfig);
      }
      commit("levels", levels);
      return true;
    },
  },
});
