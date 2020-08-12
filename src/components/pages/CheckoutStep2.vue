<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>

    <div class="container main-contant py-5" style="margin-top: 6rem;">
      <section class="form-row align-items-center text-center">
        <div class="col">
          <div class="alert alert-light alert-rounded mb-0" role="alert">1.輸入訂單資料</div>
        </div>
        <div class="col">
          <div class="alert alert-success alert-rounded mb-0" role="alert">2.金流付款</div>
        </div>
        <div class="col">
          <div class="alert alert-light alert-rounded mb-0" role="alert">3.完成</div>
        </div>
      </section>
      <div class="checkout-step2 row justify-content-center">
        <form class="col-md-6" @submit.prevent="payOrder">
          <h5 class="py-3 mt-5 mb-2 text-center bg-light">購物車清單</h5>
          <table class="table">
            <thead>
              <th>品名</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total | currency }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right">總計</td>
                <td class="text-right">{{ order.total | currency }}</td>
              </tr>
            </tfoot>
          </table>

          <table class="table">
            <tbody>
              <tr>
                <th width="100">Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span v-if="!order.is_paid">尚未付款</span>
                  <span v-else class="text-success">付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-right" v-if="order.is_paid === false">
            <button class="btn btn-danger">確認付款去</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      orderId: "",
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
    payOrder() {
      const vm = this;
      vm.isLoading = true;
      this.$http
        .post(`${this.API.PAY_ORDER}/${vm.orderId}`)
        .then((response) => {
          if (response.data.success) {
            this.$router.push({
              name: "CheckoutStep3",
              params: { orderId: this.orderId },
            });
          }
          vm.isLoading = false;
        });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId; // this.$route.params.orderId 此處的 orderId 是對應 router/index.js 路由的 /:orderId
    this.getOrder();
  },
};
</script>
<style lang="less" scope>
</style>