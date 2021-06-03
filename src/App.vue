<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/scenario">About</router-link> -->
  </div>
  <Suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <span>I'm a loading screen, I'm waiting the view to be ready!</span>
    </template>
  </Suspense>
</template>

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
