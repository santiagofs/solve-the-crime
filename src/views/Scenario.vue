<template>
  <div class="scenario">halo</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import _ from "lodash";

import { Level } from "@/classes";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Scenario",
  components: {
    // HelloWorld,
  },
  async setup() {
    const level = await Level.forge(1);
    console.log(level);

    // const a = new Set(["a", "b", "c"]);
    // const b = new Set(["a", "c", "b"]);
    // console.log(a == b, _.isEqual(a, b));
    return {};
  },
});
</script>
