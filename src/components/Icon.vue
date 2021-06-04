<template>
  <div class="sc-icon">
    <img :src="src" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Icon",
  props: {
    src: String,
  },
});
</script>
<style lang="scss">
.sc-icon {
  height: 60px;
  width: 60px;
  padding: 5px;
  border-radius: 4px;
  // box-shadow: 2px 2px 2px rgba(0, 0, 0, .2);
  cursor: pointer;
}
</style>
