<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
  },
};
</script>

<style lang="scss">
  @import "./assets/all";
  #app{
    width: 100%;
    height: 100%;
  }
</style>
