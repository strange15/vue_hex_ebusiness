<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <div class="container main-contant py-5" style="margin-top: 6rem;">
      <section class="form-row align-items-center text-center">
        <div class="col">
          <div class="alert step-active alert-rounded mb-0" role="alert">1.輸入訂單資料</div>
        </div>
        <div class="col">
          <div class="alert alert-light alert-rounded mb-0" role="alert">2.金流付款</div>
        </div>
        <div class="col">
          <div class="alert alert-light alert-rounded mb-0" role="alert">3.完成</div>
        </div>
      </section>

      <!-- 購物車列表 -->
      <section class="row justify-content-center mt-5">
        <div class="col-md-8">
          <h5 class="py-3 mt-5 mb-2 text-center bg-light">購物車清單</h5>
          <div class="mt-3">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th width="30"></th>
                  <th width="100"></th>
                  <th>商品名稱</th>
                  <th width="100">數量</th>
                  <th width="80">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td class="align-middle">
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="delCart(item)"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                  <td class="align-middle">
                    <img :src="item.product.imageUrl" class="img-fluid img-thumbnail" />
                  </td>
                  <td class="align-middle">
                    {{ item.product.title }}
                    <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                  </td>
                  <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                  <td class="align-middle text-right">{{ item.final_total | currency }}</td>
                </tr>
                <tr>
                  <td colspan="4" class="text-right">合計</td>
                  <td class="text-right">
                    <strong>{{ cart.final_total | currency }}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="input-group input-group-sm">
            <input type="text" class="form-control" v-model="couponCode" placeholder="請輸入優惠碼" />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="useCoupon()">套用優惠碼</button>
            </div>
          </div>
          <p class="ml-2 mt-1 text-yellow">試營運期間，只要輸入：open5566，即可立即享7折優惠！</p>

          <!-- 購物車表單 -->
          <div class="my-5 row justify-content-center" v-if="cart_length !== 0">
            <form class="col-md-10" @submit.prevent="createOrder">
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

          <div v-else>
            <h5 class="py-3 mt-5 mb-2 text-center bg-light">還沒有商品加入購物車！</h5>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      cart: [],
      cart_length: 0,
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
      },
      couponCode: "",
    };
  },
  methods: {
    getCart() {
      const vm = this;
      vm.isLoading = true;
      this.$http.get(`${this.API.LIST_CART}`).then((response) => {
        vm.cart = response.data.data;
        if (vm.cart) {
          vm.cart_length = vm.cart.carts.length || 0;
        }
        vm.isLoading = false;
      });
    },
    createOrder() {
      const vm = this;
      let order = vm.form;

      vm.$validator.validate().then((valid) => {
        if (!valid) {
          console.log("欄位不完整");
          return;
        }
        vm.isLoading = true;
        this.$http
          .post(`${this.API.CREATE_A_ORDER}`, { data: order })
          .then((response) => {
            // response = {"success":true,"message":"已建立訂單","total":927,"orderId":"-MERdKs2llHOQKIcuhms","create_at":1597134691};
            if (!response.data.success) {
              this.$bus.$emit("message:push", "建立失敗", "danger");
            } else {
              this.$bus.$emit("shoppingcart:get");
              vm.$alert('為您導至付款頁？', '建立成功!', {
                confirmButtonText: '確定',
                callback: action => {
                  vm.$router.push(`Checkout_Step2/${response.data.orderId}`);
                }
              });
            }
            vm.isLoading = false;
          });
      });
    },
    useCoupon() {
      const vm = this;
      vm.isLoading = true;
      let code = {
        code: vm.couponCode,
      };
      this.$http
        .post(`${this.API.USE_COUPON}`, { data: code })
        .then((response) => {
          if (!response.data.success) {
            this.$bus.$emit("message:push", "套用失敗，請確認優惠碼是否正確！", "danger");
          }
          vm.getCart();
          this.$bus.$emit("shoppingcart:get");
          vm.isLoading = false;
        });
    },
    delCart(item) {
      this.tempDelCart = Object.assign({}, item);
      const vm = this;
      vm.isLoading = true;
      let api = `${this.API.DELETE_FROM_CART}/${vm.tempDelCart.id}`;
      this.$http["delete"](api).then((response) => {
        if (!response.data.success) {
          console.log("刪除失敗");
        }
        this.$bus.$emit("message:push", "已刪除此產品！", "success");
        vm.getCart();
        this.$bus.$emit("shoppingcart:get");
        vm.isLoading = false;
      });
    },
    
  },
  created() {
    this.getCart();
  },
  computed: {},
};
</script>
<style lang="less" scope>
.text-yellow {
  color: #ffd700;
}
</style>