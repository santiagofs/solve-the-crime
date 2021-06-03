import { createStore } from "vuex";
import type Collection from "../classes/collection";

const state: { level: { collections: Collection[] } } = {
  level: {
    collections: [],
  },
};

export default createStore({
  state,
  mutations: {},
  actions: {},
  modules: {},
});
