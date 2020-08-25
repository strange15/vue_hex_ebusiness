<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <router-link to="/index" class="navbar-brand col-sm-3 col-md-2 mr-0">
        Strange's Sport
      </router-link>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click="signout">登出</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { API } from "../assets/js/api";

export default {
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    signout() {
      let vm = this;
      vm.isLoading = true;
      this.$http.post(this.API.LOGOUT).then(response => {
        if (response.data.success) vm.$router.push("/login");
        vm.isLoading = false;
      });
    }
  }
};
</script>
