<template>
  <div>
    <a href="#" @click.prevent="signout">登出</a>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    signout() {
      let vm = this;
      const api = "https://vue-course-api.hexschool.io/logout";
      this.$http.post(api).then(response => {
        console.log(response.data);
        if( response.data.success ) vm.$router.push('/login')
      });
    }
  }
};
</script>

<style scoped></style>
