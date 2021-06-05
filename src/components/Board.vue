<template>
  <div class="sc-scene">
    <div class="sc-scene__house">
      <table>
        <tr v-for="(x, nx) in level.config.boundaries.x" :key="x">
          <td v-for="(y, ny) in level.config.boundaries.y" :key="y">
            <room :x="nx" :y="ny" :room="rooms[nx][ny]" />
          </td>
        </tr>
      </table>
    </div>

    <div class="sc-scene__rules">
      <rule
        v-for="(rule, ndx) in level.rules"
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
import { defineComponent, PropType, computed } from "vue";

import Room from "@/components/Room.vue";
import Rule from "@/components/Rule.vue";
import type Level from "@/classes/level";
//import { Level, Scenario } from '../models'

export default defineComponent({
  name: "Board",
  components: { Room, Rule },
  props: {
    level: { type: Object as PropType<Level> },
    collections: { type: Object },
  },
  setup(props) {
    const rooms = computed(() => (props.level ? props.level.rooms : []));

    return {
      rooms,
    };
  },
  // data() {
  //   return {
  //     scenario: new Scenario(this.level)
  //   }
  // },
  // computed: {
  //   grid() {
  //     console.log('the grid')
  //     return this.scenario.solution.rooms
  //   },
  //   rules() {
  //     return [
  //       { a: 0, b: 2, axis: 'x', distance: 1 },
  //       { a: 1, b: 3, axis: 'y', distance: 1 },
  //       { a: 0, b: 3, axis: 'y', distance: '?' }
  //     ]
  //   },
  //   isUnique() {
  //     return false
  //     // return checkUniqueness(this.elements)
  //   }
  // },
  // methods: {
  //   applyRule(rule) {
  //     this.scenario.solution.applyRule(rule)
  //   },
  //   createRule() {
  //     this.scenario.solution.createRule()
  //     this.scenario.solution.applyRules(false)
  //   },
  //   createRules() {
  //     this.scenario.solution.createRules()
  //   },
  //   hint() {
  //     this.scenario.solution.hint()
  //   }
  // }
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
