<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    // const api = "https://vue-course-api.hexschool.io/api/strange/products";
    // this.$http.get(api).then(response => {
    //   console.log(response.data);
    // });
  }
};
</script>

<style lang="scss">
@import "./assets/scss/all";
</style>
