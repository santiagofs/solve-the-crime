<template>
  <div class="sc-rule" :class="[mode]">
    <div class="sc-rule__item sc-rule__item-a">
      <icon :src="iconA" />
    </div>
    <div class="sc-rule__distance">{{ rule.distance }}</div>
    <div class="sc-rule__item sc-rule__item-b">
      <icon :src="iconB" />
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from "vue";
import Icon from "./Icon";
import { useStore } from "vuex";

export default defineComponent({
  name: "Rule",
  props: { rule: { type: Object } },
  components: { Icon },
  setup(props) {
    const store = useStore();
    const mode = props.rule.axis === "y" ? "is-horizontal" : "is-vertical";
    const [colA, itemA] = props.rule.a.split(".");
    const [colB, itemB] = props.rule.b.split(".");

    const iconA = store.state.collections[colA][itemA];
    const iconB = store.state.collections[colB][itemB];
    return {
      mode,
      iconA,
      iconB,
    };
  },
});
</script>
<style lang="scss">
.sc-rule {
  display: inline-flex;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 5px;
  padding: 5px;

  &__item {
    height: 70px;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__distance {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 70px;
    width: 70px;
    font-weight: bold;
    font-size: 32px;
  }
  &.is-horizontal {
    flex-direction: row;
    height: 70px;
  }
  &.is-vertical {
    flex-direction: column;
    width: 70px;
  }
}
</style>
