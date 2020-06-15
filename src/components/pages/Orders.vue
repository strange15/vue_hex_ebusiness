<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <table class="table mt-4">
      <thead>
        <th width="80">購買時間</th>
        <th width="120">Email</th>
        <th width="120">購買款項</th>
        <th width="60">應付金額</th>
        <th width="100">是否付款</th>
      </thead>
      <tbody>
        <tr v-for="(order, key) in orders" :key="key">
          <td>{{ order.create_at | date }}</td>
          <td>{{ order.user.email }}</td>
          <td class="">
            <div v-for="product in order.products" :key="product.id">
              <!-- {{ product.product.title }} -->
              {{ product.product.title }}：{{ product.product.num }}{{ product.product.unit }}
            </div>
          </td>
          <td class="text-right">{{ order.total | currency }}</td>
          <td>
            <span v-if="order.is_paid" class="text-success">已付款</span>
            <span v-else>未付款</span>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pagination="pagination" @getOrders="getOrders"></pagination>
    
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "../Pagination";

export default {
  data() {
    return {
      orders: [],
      isLoading: false,
      pagination: {},
    };
  },
  components: {Pagination},
  methods: {
    getOrders(page = 1) {
      const vm = this;
      vm.isLoading = true;
      this.$http.get(`${this.API.GET_ORDERS}?page=${page}`).then(response => {
        console.log('getOrders', response.data);
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getOrders();
  },
  watch: {
    buy_date() {
      const vm = this;
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      vm.tempCoupon.due_date = timestamp;
    },
  },
};
</script>
