<template>
  <div class="map">
    <ul>
      <li><button @click="gotoLevel(1)">Level 1</button></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "Roadmap",
  setup() {
    const router = useRouter();
    const store = useStore();
    const gotoLevel = (level: number) => {
      store.commit("setLevel", level);
      router.push({ path: "level" });
    };

    return {
      gotoLevel,
    };
  },
});
</script>
