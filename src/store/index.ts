import _ from "lodash";
import { createStore } from "vuex";
import state from "./state";

import createLevel from "@/core/create-level";
import createBoard from "@/core/create-board";
import isItemSolution from "@/core/is-item-solution";
import isSolution from "@/core/is-solution";
import matrixToItems from "@/core/matrix-to-items";
import applyRule from "@/core/apply-rule";

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
    incrementErrorCount(state: sdState) {
      state.currentLevel.errorCount += 1;
    },
    removeItem(state: sdState, matrixKey: string) {
      state.currentLevel.matrix[matrixKey] = false;
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
      return createBoard(boundaries, itemNames, matrix, state.icons);
    },
    rules(state): Rule[] {
      // TODO: filter only rules that can change the board
      const matrix = state.currentLevel.matrix;
      const config = state.currentLevel.config;
      if (!matrix || !config) return state.currentLevel.rules;

      const items = matrixToItems(matrix);

      const allRules = state.currentLevel.rules;
      return allRules.filter((rule) => {
        const matrix = { ...state.currentLevel.matrix };
        if (items[rule.a].length === 1)
          return applyRule(rule, matrix, config.boundaries);
        if (items[rule.b].length === 1)
          return applyRule(rule, matrix, config.boundaries);
        return items[rule.a].length > 1 || items[rule.b].length > 1;
      });
    },
    icon:
      (state) =>
      (name: string): string => {
        const [colName, itemName] = name.split(".");
        return state.icons[colName][itemName];
      },
    solved(state): boolean {
      const matrix = state.currentLevel.matrix;
      const items = matrixToItems(matrix);
      const solved = isSolution(items);
      console.log(matrix, items, solved);
      return solved;
    },
    // itemSolved: (state) =>
    //   (name: string): boolean => {

    //     return items[name].length === 1
    //   }
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
    async removeItem({ commit, state }, matrixKey) {
      if (isItemSolution(matrixKey, state.currentLevel.solution)) {
        commit("incrementErrorCount");
        console.log(state.currentLevel.errorCount);
        return false;
      }
      commit("removeItem", matrixKey);
      return true;
    },
  },
});
