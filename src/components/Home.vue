<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    
  </div>
</template>

<script>
import Header from "./Header";
export default {
  name: "Home",
  data() {
    return {
    };
  },
  methods: {

  },
  created() {
  },
  components: {
    Header,
  }
};
</script>

<style scoped>

</style>
