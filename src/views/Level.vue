<template>
  <h1>Level {{ levelNumber }}</h1>

  <board />
</template>

<script lang="ts">
// import _ from "lodash";
import { defineComponent } from "vue";
import { useStore } from "vuex";

import Board from "@/components/Board.vue";

export default defineComponent({
  name: "Level",
  components: {
    Board,
  },
  setup() {
    const store = useStore();

    // const level = await Level.forge(1);
    // const collections: { [colName: string]: { [itemName: string]: string } } =
    //   {};
    // for (const colName of level.collectionNames) {
    //   const config: [string, string][] = (
    //     await import(`@/config/collections/${colName}.ts`)
    //   ).default;
    //   collections[colName] = {};
    //   for (const item of config) {
    //     const icon: string = await import("@/assets/icons/" + item[1]).then(
    //       (module) => module.default
    //     );

    //     collections[colName][item[0]] = icon;
    //   }
    // }
    // store.commit("collections", collections);
    // store.commit("matrix", level.matrix);
    // store.commit("solution", level.solution);

    // for (const itemConfig of collectionConfig) {
    //   const item = await Item.forge(itemConfig);
    //   items.push(item);
    // }
    // return new Collection(collectionName, items);

    return {
      levelNumber: store.state.currentLevel.number,
      board: store.getters.board,
      // level,
      // collections,
    };
  },
});
</script>
