import { ActionContext, createStore } from "vuex";

export default createStore({
  actions: {
    async initialize({ commit, state }: ActionContext<sdState, sdState>) {
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
