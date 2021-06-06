<template>
  <div class="sc-room">
    <div>{{ x }}, {{ y }}</div>
    <!-- <div>{{room.floorNumber}}, {{room.roomNumber}}</div> -->
    <div
      class="sc-room__collection"
      v-for="collection in grid"
      :key="collection"
    >
      <span
        v-for="item in collection"
        :key="item.name"
        :class="{ 'is-active': item.status }"
        class="sc-room__collection-item"
        @click="removeItem(item)"
      >
        <icon :src="item.icon" />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
// import _ from "lodash";

import { defineComponent, PropType, computed, ComputedRef } from "vue";
import { useStore } from "vuex";

import Icon from "./Icon.vue";
import { Room, RoomCollection, RoomCollectionItem } from "@/classes/level";

export default defineComponent({
  name: "Room",
  components: { Icon },
  props: {
    room: { type: Object as PropType<Room>, required: true },
    x: Number,
    y: Number,
  },
  setup(props) {
    const store = useStore();
    const grid: ComputedRef<Room> = computed(() => {
      const ret: Room = {};
      for (const col in props.room) {
        ret[col] = { ...props.room[col] };
        for (const item in props.room[col]) {
          const matrixKey = props.room[col][item].matrixKey;
          ret[col][item] = {
            ...props.room[col][item],
            status: store.state.matrix[matrixKey],
            icon: store.state.collections[col][item],
          };
        }
      }
      return ret;
    });

    const removeItem = (item: RoomCollectionItem) => {
      store.commit("removeMatrixItem", {
        ...item,
        coord: { x: props.x, y: props.y },
      });
    };
    // console.log(grid)
    return {
      grid,
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
