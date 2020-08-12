<template>
  <div>
    <Header></Header>
    <Alert></Alert>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import Alert from "./AlertMessage";
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
    Footer,
    Alert,
  }
};
</script>

<style scoped>

</style>
