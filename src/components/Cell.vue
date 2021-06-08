<template>
  <div class="sc-room">
    <div>{{ x }}, {{ y }}</div>
    <!-- <div>{{room.floorNumber}}, {{room.roomNumber}}</div> -->
    <div
      class="sc-room__collection"
      v-for="(collection, colkey) in cell"
      :key="colkey"
    >
      <span
        v-for="(item, itemkey) in collection"
        :key="itemkey"
        :class="{ 'is-active': item.status }"
        class="sc-room__collection-item"
        @click="removeItem(item.matrixKey)"
      >
        <icon :src="item.icon" />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
// import _ from "lodash";

import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

import Icon from "./Icon.vue";
export default defineComponent({
  name: "Cell",
  components: { Icon },
  props: {
    //   room: { type: Object as PropType<Room>, required: true },
    x: Number,
    y: Number,
  },
  setup(props) {
    const store = useStore();
    const cell = computed(() => {
      if (props.x === undefined || props.y === undefined) return undefined;
      return store.getters.board[props.x][props.y];
    });

    const removeItem = async (matrixKey: string) => {
      const success = await store.dispatch("removeItem", matrixKey);
      console.log(success);
    };
    // // console.log(grid)
    // return {
    //   grid,
    //   removeItem,
    // };
    return {
      board: computed(() => store.getters.board),
      cell,
      removeItem,
    };
  },
});

// export default {
//   name: 'CrimeSceneRoom',
//   props: ['room', 'solution'],
//   components: {Icon},
//   computed: {
//     collections() {
//       const coords = {room: this.room.roomNumber, x: this.room.floorNumber}

//       return this.room.collections.map(col => {
//         return col.items.filter(item => this.solution.itemHasRoom(item.name, coords))
//           .map(item => ({...item, isHere: _.isEqual(this.solution.solution[item.name], coords)}))
//       })
//     }
//   }
// }
</script>
<style lang="scss">
.sc-room {
  display: flex;
  flex-direction: row;
  > div {
    padding: 10px;
  }

  &__collection {
    display: flex;
    flex-direction: column;

    &-item {
      border: 1px solid #fafafa;
      padding: 5px;
      margin: 5px;
      visibility: hidden;
    }
    .is-active {
      // border: 1px solid #f33;
      // color: #f66;
      visibility: visible;
    }
  }
}
</style>
