<template>
  <div>
    <Header></Header>
    <Alert></Alert>
    <Copy></Copy>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import Alert from "./AlertMessage";
import Copy from "./AlertCopyToClipboard";
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
    Copy
  }
};
</script>

<style scoped>

</style>
