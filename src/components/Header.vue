<template>
  <div>
    <div class="header" :class="{ 'fixed-header': headerClass === true }">
      header
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerClass: false
    };
  },
  methods: {
    initHeader() {
      let vm = this;
      window.onscroll = function(ev) {
        if (window.scrollY > 0) {
          vm.headerClass = true;
          return;
        }
        vm.headerClass = false;
      };
    }
  },
  created() {
    this.initHeader();
  }
};
</script>
<style scoped>
body {
  height: 110vh !important;
}
.header {
  height: 60px;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.fixed-header {
  position: fixed;
  
}
</style>
