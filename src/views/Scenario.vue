<template>
  <h1>Scenario</h1>

  <board :level="level" :collections="collections" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import _ from "lodash";

import { Level } from "@/classes";
import Board from "@/components/Board.vue";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Scenario",
  components: {
    Board,
  },
  async setup() {
    const store = useStore();
    const level = await Level.forge(1);
    const collections: { [colName: string]: { [itemName: string]: string } } =
      {};
    for (const colName of level.collectionNames) {
      const config: [string, string][] = (
        await import(`@/config/collections/${colName}.ts`)
      ).default;
      collections[colName] = {};
      for (const item of config) {
        const icon: string = await import("@/assets/icons/" + item[1]).then(
          (module) => module.default
        );

        collections[colName][item[0]] = icon;
      }
    }
    store.commit("collections", collections);
    store.commit("matrix", level.matrix);
    store.commit("solution", level.solution);

    // for (const itemConfig of collectionConfig) {
    //   const item = await Item.forge(itemConfig);
    //   items.push(item);
    // }
    // return new Collection(collectionName, items);

    return {
      level,
      collections,
    };
  },
});
</script>
