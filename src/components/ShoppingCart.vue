<template>
  <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
  <div class="dropdown">
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <button class="btn btn-sm btn-cart" data-toggle="dropdown" data-flip="false">
      <i class="fa fa-shopping-cart text-dark fa-2x" aria-hidden="true"></i>
      <span class="badge badge-pill badge-danger">{{ cart_length || 0 }}</span>
      <span class="sr-only">unread messages</span>
    </button>
    <div class="dropdown-menu dropdown-menu-right p-3" style="min-width: 300px" data-offset="400">
      <h6 v-if="cart_length !== 0">已選擇商品</h6>
      <table class="table table-sm" v-if="cart_length !== 0">
        <tbody>
          <tr v-for="item in cart.carts" :key="item.id">
            <td class="align-middle text-center">
              <a
                class="text-muted pointer"
                @click="delCart(item)"
              >
                <i class="far fa-trash-alt"></i>
              </a>
            </td>
            <td class="align-middle">{{ item.product.title }}</td>
            <td class="align-middle">{{ item.qty }} {{ item.product.unit }}</td>
            <td class="align-middle text-right">${{ item.final_total }}</td>
          </tr>
        </tbody>
      </table>
      <!-- TODO 到 step1 -->
      <a href="shoppingCart-checkout.html" class="btn btn-block" v-if="cart_length !== 0">
        <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
      </a>
      <div v-if="cart_length === 0">還沒有商品加入購物車！</div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ShoppingCart",
  props: {},
  data() {
    return {
      cart: [],
      cart_length: 0,
      tempDelCart: {},
      isLoading: false,
    };
  },
  methods: {
    getCart() {
      const vm = this;
      vm.isLoading = true;
      this.$http.get(`${this.API.LIST_CART}`).then(response => {
        vm.cart = response.data.data;
        if( vm.cart ) {
          vm.cart_length = vm.cart.carts.length || 0;
        }
        vm.isLoading = false;
      });
    },
    delCart(item) {
      this.tempDelCart = Object.assign({}, item);
      const vm = this;
      vm.isLoading = true;
      let api = `${this.API.DELETE_FROM_CART}/${vm.tempDelCart.id}`;
      this.$http["delete"](api).then(response => {
        if (!response.data.success) {
          console.log("刪除失敗");
        }
        // TODO show success alert (message:push)
        vm.getCart();
        vm.isLoading = false;
      });
    },
  },
  created() {
    let vm = this;
    vm.getCart();
    // 註冊 getCart 事件為 'shoppingcart:get', 給其他 compoment 呼叫
    vm.$bus.$on('shoppingcart:get', () => {
      vm.getCart();
    });
  },
  mounted() {
  },
};
</script>

<style lang="less" scope>
// TODO cart style
.shopping-cart {
  cursor: pointer;
}
.dropdown-menu {
  .btn {
    background-color: #202f95;
    color: #fff;
  }
}
</style>
