<template>
  <h1>Scenario</h1>

  <board :level="level" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
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
    const level = await Level.forge(1);
    console.log(level);
    return {
      level,
    };
  },
});
</script>
