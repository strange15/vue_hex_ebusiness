<template>
  <div>
    <span class="copy lf" :data-clipboard-text="orderId">复制</span>
  </div>
</template>

<script>
import Clipboard from "clipboard";
export default {
  data() {
    return {
      orderId: "111222333",
      order: {
        user: {},
      },
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      vm.isLoading = true;
      this.$http
        .get(`${this.API.GET_A_ORDER}/${vm.orderId}`)
        .then((response) => {
          vm.order = response.data.order;
          vm.isLoading = false;
        });
    },
  },
  created() {
    // this.getOrder();
    this.clipboard = new Clipboard(".copy");
    //成功回撥
    this.clipboard.on("success", function (e) {
      console.info("Action:", e.action);
      console.info("Text:", e.text);
      console.info("Trigger:", e.trigger);
      e.clearSelection();
    });
    //失敗回撥
    this.clipboard.on("error", function (e) {
      console.error("Action:", e.action);
      console.error("Trigger:", e.trigger);
    });
  },
};
</script>
<style lang="less" scope>
</style>