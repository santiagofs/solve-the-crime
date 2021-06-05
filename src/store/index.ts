import { createStore } from "vuex";

const state: {
  collections: { [colName: string]: { [itemName: string]: string } };
} = {
  collections: {},
};

export default createStore({
  state,
  mutations: {
    collections(state, collections) {
      state.collections = collections;
    },
  },
  actions: {},
  modules: {},
});
