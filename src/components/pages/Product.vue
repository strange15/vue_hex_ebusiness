<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
  {{ product }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      product: [],
    };
  },
  methods: {
    getProduct() {
      console.log('id:', this.$route.params.pid);
      let id = this.$route.params.pid;
      const vm = this;
      vm.isLoading = true;
      this.$http
        .get(`${this.API.LIST_PRODUCT_NOT_ADMIN}/${id}`)
        .then(response => {
          vm.product = response.data.product;
          vm.isLoading = false;
        });
    },
  },
  created() {
    this.getProduct();
  },
  computed: {

  },
};
</script>
<style lang="less" scope>

</style>