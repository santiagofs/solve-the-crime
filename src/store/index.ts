import _ from "lodash";
import { createStore } from "vuex";
import state from "./state";

import createLevel from "@/core/create-level";

export default createStore({
  state,
  mutations: {
    icons(state: State, icons: IconCollection) {
      state.icons = icons;
    },
    levels(state: State, levels: LevelConfig[]) {
      state.levels = levels;
    },
    setLevel(state, levelNumber: number) {
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
  actions: {
    async initialize({ commit }) {
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
