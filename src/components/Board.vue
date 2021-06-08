<template>
  <div class="sc-scene">
    <div class="sc-scene__house">
      <table>
        <tr v-for="(y, ny) in boundaries.y" :key="y">
          <td v-for="(x, nx) in boundaries.x" :key="x">
            <cell :x="nx" :y="ny" />
          </td>
        </tr>
      </table>
    </div>

    <div class="sc-scene__rules">
      <rule
        v-for="(rule, ndx) in rules"
        :key="ndx"
        :rule="rule"
        @click="applyRule(rule)"
      />
    </div>
    <!-- <h1>{{isUnique}}</h1>
    <button @click="createRule">Create Rule</button>
    <button @click="createRules">Create Rules</button>
    <button @click="hint">Hint</button> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

import Cell from "@/components/Cell.vue";
import Rule from "@/components/Rule.vue";

export default defineComponent({
  name: "Board",
  components: {
    Cell,
    Rule,
  },

  setup() {
    const store = useStore();
    const boundaries = computed(() => {
      if (!store.state.currentLevel || !store.state.currentLevel.config) {
        return { x: 0, y: 0 };
      }
      return store.state.currentLevel.config.boundaries;
    });
    return {
      boundaries,
      board: computed(() => store.getters.board),
      _board: store.getters.board,
      rules: computed(() => store.getters.rules),
    };
  },
});
</script>

<style lang="scss" scoped>
.sc-scene {
  display: flex;
  justify-content: flex-start;
  &__house {
    margin-right: 50px;
  }
  &__rules {
    border: 1px solid #fafafa;
    padding: 10px;
    flex: 1 0 auto;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 115px 115px 115px;

    .is-vertical {
      grid-row-start: span 2;
    }
    .is-horizontal {
      grid-column-start: span 2;
    }
  }
}
td {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
