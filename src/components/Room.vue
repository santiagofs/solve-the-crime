<template>
  <div class="sc-room">
    <div>{{ x }}, {{ y }}</div>

    <!-- <div>{{room.floorNumber}}, {{room.roomNumber}}</div> -->
    <div
      class="sc-room__collection"
      v-for="collection in room"
      :key="collection"
    >
      {{ collection }}
      <span
        v-for="item in collection.items"
        :key="item.name"
        :class="{ 'is-active': false }"
        class="sc-room__collection-item"
      >
        <icon :src="item.icon" />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import _ from "lodash";
import Icon from "./Icon.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Room",
  components: { Icon },
  props: {
    room: { type: Object, required: true },
    x: Number,
    y: Number,
  },
  setup(props) {
    const store = useStore();
    const grid = computed(() => {
      return props.room.map((value: string) => {
        const [col, item] = value.split(".");
        return {
          icon: store.state.collections[col][item],
          status: props.room[value],
        };
      });
    });
    return {
      grid,
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
    }
    .is-active {
      border: 1px solid #f33;
      color: #f66;
    }
  }
}
</style>
