import _ from "lodash";
import { createStore } from "vuex";
import { LevelMatrix, LevelSolution } from "@/classes/level";

const state: {
  collections: { [colName: string]: { [itemName: string]: string } };
  matrix: LevelMatrix;
  solution: LevelSolution;
} = {
  collections: {},
  matrix: {},
  solution: {},
};

export default createStore({
  state,
  mutations: {
    collections(state, collections) {
      state.collections = collections;
    },
    matrix(state, matrix) {
      state.matrix = matrix;
    },
    solution(state, solution) {
      state.solution = solution;
    },
    removeMatrixItem(state, item) {
      console.log(item);
      console.log(state.solution);
      if (_.isEqual(state.solution[item.fullName], item.coord))
        throw "bad move";
      state.matrix[item.matrixKey] = false;
    },
  },
  actions: {},
  modules: {},
});
