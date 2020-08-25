<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <div class="container main-contant py-5" style="margin-top: 6rem;">
      <div class="row justify-content-center my-5">
        <div class="col-9 text-center success-block">
          <label for="order" class="h5 text-left order">
            請輸入訂單號碼：
            <input
              type="text"
              v-model="orderId"
              class="form-control mt-3 cursor-pointer"
              @keyup.enter="getOrder"
            />
          </label>
        </div>
      </div>
    </div>
    <!-- TODO -MFZLvQcUNqtuW0kFIQh -->
    <form class="container main-contant py-5 col-md-6 mt-0" @submit.prevent="payOrder" v-if="hasOrder">
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
            <td class="align-middle text-right">{{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-right">總計</td>
            <td class="text-right">{{ order.total }}</td>
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
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      orderId: "",
      order: {},
      hasOrder: false,
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      vm.isLoading = true;
      this.$http
        .get(`${this.API.GET_A_ORDER}/${vm.orderId}`)
        .then((response) => {
          if( response.data.order ) {
            vm.order = response.data.order;
            vm.hasOrder = true;
          }else{
            vm.$bus.$emit("message:push", "查無此訂單！", "danger");
          }
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
  created() {},
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