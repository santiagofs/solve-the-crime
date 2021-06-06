<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/scenario">About</router-link> -->
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "App",
  setup() {
    // block
    const store = useStore();
    const router = useRouter();
    store.dispatch("initialize").then(() => {
      router.push({ path: "/map" });
    });
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
