<template>
  <div>
    <div class="container main-contant py-5" style="margin-top: 6rem;margin-bottom: 3.5rem;">
      <section class="form-row align-items-center text-center">
        <div class="col">
          <div class="alert alert-light alert-rounded mb-0" role="alert">1.輸入訂單資料</div>
        </div>
        <div class="col">
          <div class="alert alert-light alert-rounded mb-0" role="alert">2.金流付款</div>
        </div>
        <div class="col">
          <div class="alert alert-success alert-rounded mb-0" role="alert">3.完成</div>
        </div>
      </section>
      <div class="row justify-content-center my-5">
        <div class="col-9 text-center success-block">
          <h1 class="text-orange mb-5 aboutus">已成功付款！</h1>
          <label for="order" class="h5 text-left order">
            訂單編號 ：
            <input :value="orderId" type="text" class="form-control mt-3 cursor-pointer" />
            <i
              v-if="!isCopied"
              class="far fa-copy copy pointer"
              aria-hidden="true"
              :data-clipboard-text="orderId"
            ></i>
            <i v-else class="fas fa-check"></i>
            <p v-if="isCopied">已成功複製訂單編號</p>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard";
export default {
  data() {
    return {
      orderId: "",
      isCopied: false
    };
  },
  methods: {
    initClipboard() {
      let vm = this;
      this.clipboard = new Clipboard(".copy");
      //成功回撥
      this.clipboard.on("success", function (e) {
        // console.info("Action:", e.action);
        // console.info("Text:", e.text);
        // console.info("Trigger:", e.trigger);
        // e.clearSelection();
        vm.isCopied = true;
      });
      //失敗回撥
      this.clipboard.on("error", function (e) {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.initClipboard();
  },
};
</script>
<style lang="less" scope>
.order {
  position: relative;
  input {
    padding-right: 2.5rem;
  }
  i {
    position: absolute;
    right: 10px;
    top: 50px;
  }
}
</style>