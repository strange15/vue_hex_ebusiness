<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">
              {{
              item.category
              }}
            </span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">原價 {{ item.origin_price }} 元</div>
              <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.itemLoading === item.id"></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addToCart(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.itemLoading === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 購物車列表 -->
    <div class="cart-list">
      <table class="table">
        <thead>
          <th></th>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in cart.carts">
            <td class="align-middle">
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="delFromCart(item.id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
            <td class="align-middle">
              {{ item.product.title }}
              <div class="text-success" v-if="item.coupon">已套用優惠券</div>
            </td>
            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="align-middle text-right">{{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-right">總計</td>
            <td class="text-right">{{ cart.total }}</td>
          </tr>
          <tr v-if="cart.tota !== cart.final_total">
            <td colspan="3" class="text-right text-success">折扣價</td>
            <td class="text-right text-success">{{ cart.final_total }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" v-model="couponCode" placeholder="請輸入優惠碼" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="useCoupon()">套用優惠碼</button>
        </div>
      </div>
    </div>

    <!-- 購物車表單 -->
    <div class="my-5 row justify-content-center" v-if="cart_length !== 0">
      <form class="col-md-6" @submit.prevent="createOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="useremail"
            v-model="form.user.email"
            placeholder="請輸入 Email"
            v-validate="'required|email'"
          />
          <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input
            type="text"
            class="form-control"
            :class="{'is-invalid': errors.has('name')}"
            name="name"
            id="username"
            v-model="form.user.name"
            placeholder="輸入姓名"
            v-validate="'required'"
          />
          <span class="text-danger" v-if="errors.has('name')">必須輸入姓名</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input
            type="text"
            name="tel"
            class="form-control"
            id="usertel"
            v-model="form.user.tel"
            placeholder="請輸入手機號碼, 不需要加'-', ex:0910123456"
            v-validate="'required|mobile'"
          />
          <span class="text-danger" v-if="errors.has('tel')">{{ errors.first('tel') }}</span>
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input
            type="text"
            class="form-control"
            name="address"
            id="useraddress"
            v-model="form.user.address"
            placeholder="請輸入地址"
            v-validate="'required'"
          />
          <span class="text-danger" v-if="errors.has('address')">{{ errors.first('address') }}</span>
        </div>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea
            name
            id="comment"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>

    <!-- 單一商品(查看更多) modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{ product.title }}</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt />
            <blockquote class="blockqoute mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockqoute-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">原價 {{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
          </div>
          <select name class="form-control mt-3" v-model="product.num">
            <option :value="num" v-for="num in 10">選購 {{ num }} {{ product.unit }}</option>
          </select>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{ product.num * product.price }}</strong>
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addToCart(product.id, product.num)"
            >加到購物車</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "",
  data() {
    return {
      isLoading: false,
      products: [],
      product: [],
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        }
      },
      cart: [],
      cart_length: 0,
      status: {
        itemLoading: ""
      },
      couponCode: ""
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      vm.isLoading = true;
      this.$http
        .get(`${this.API.LIST_ALL_PRODUCTS_NOT_ADMIN}`)
        .then(response => {
          vm.products = response.data.products;
          vm.isLoading = false;
        });
    },
    getProduct(id) {
      const vm = this;
      vm.status.itemLoading = id;
      this.$http
        .get(`${this.API.LIST_PRODUCT_NOT_ADMIN}/${id}`)
        .then(response => {
          vm.product = response.data.product;
          $("#productModal").modal("show");
          vm.status.itemLoading = "";
        });
    },
    addToCart(id, qty = 1) {
      const vm = this;
      vm.status.itemLoading = id;
      const cart = {
        product_id: id,
        qty
      };
      this.$http
        .post(`${this.API.ADD_TO_CART}`, { data: cart })
        .then(response => {
          vm.getCart();
          $("#productModal").modal("hide");
          vm.status.itemLoading = "";
        });
    },
    delFromCart(id) {
      const vm = this;
      vm.isLoading = true;
      let api = `${this.API.DELETE_FROM_CART}/${id}`;
      this.$http["delete"](api).then(response => {
        if (!response.data.success) {
          console.log("刪除失敗");
        }
        // TODO 先跳 confirm 提醒
        vm.getCart();
        vm.isLoading = false;
      });
    },
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
    useCoupon() {
      const vm = this;
      vm.isLoading = true;
      let code = {
        code: vm.couponCode
      };
      this.$http
        .post(`${this.API.USE_COUPON}`, { data: code })
        .then(response => {
          console.log("useCoupon", response);
          if (!response.data.success) {
            console.log("套用失敗"); // TODO 改為跳 alert 通知 message
          }
          vm.getCart();
          vm.isLoading = false;
        });
    },
    createOrder() {
      const vm = this;
      let order = vm.form;

      vm.$validator.validate().then(valid => {
        if (!valid) {
          console.log("欄位不完整");
          return;
        }
        vm.isLoading = true;
        this.$http
          .post(`${this.API.CREATE_A_ORDER}`, { data: order })
          .then(response => {
            console.log("createOrder", response);
            if (!response.data.success) {
              console.log("建立失敗"); // TODO 改為跳 alert 通知 message
            } else {
              vm.$router.push(`customer_checkout/${response.data.orderId}`);
            }
            vm.isLoading = false;
          });
      });
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  },
  // computed: {
  //   cart_length: function() {
  //     return this.cart.carts.length;
  //   }
  // }
};
</script>

<style scoped>
.cart-list {
  width: 50%;
  margin: 0 auto;
}
</style>
