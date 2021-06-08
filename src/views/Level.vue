<template>
  <h1>Level {{ levelNumber }}</h1>

  <board />
  <div>Errors: {{ errorCount }}</div>
  {{ solution }}
</template>

<script lang="ts">
// import _ from "lodash";
import { defineComponent, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import Board from "@/components/Board.vue";

export default defineComponent({
  name: "Level",
  components: {
    Board,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const errorCount = computed(() => store.state.currentLevel.errorCount);
    watch(
      [() => store.state.currentLevel.errorCount, () => store.getters.solved],
      ([count, solved]) => {
        if (count === 3) {
          alert("Lo re sorry");
          router.push({ path: "/map" });
        }
        if (solved) {
          alert("so muy re genio");
          router.push({ path: "/map" });
        }
      }
    );

    return {
      levelNumber: store.state.currentLevel.number,
      board: store.getters.board,
      errorCount,
      solution: store.state.currentLevel.solution,
      // level,
      // collections,
    };
  },
});
</script>
