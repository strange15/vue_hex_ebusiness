<template>
  <!-- 單一商品頁  -->
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <div class="container main-content mb-1">
      <div class="row">
        <div class="col-md-4 mb-5">
          <div>
            <h1 class="h2">
              {{  product.title }}
            </h1>
            <div class="d-flex my-3 align-items-end justify-content-end">
              <del class="text-muted">售價 ${{  product.origin_price }}</del>
              <div class="h3 mb-0 ml-auto text-danger">
                <small>網路價 NT$</small>
                <strong>{{  product.price }}</strong>
              </div>
            </div>
            <hr />
            <!-- TODO 煥至右手邊 -->
            <div class="input-group mt-3">
              <select name class="form-control mr-1" v-model="product.num">
                <option :value="num" v-for="num in 5" :key="num">選購 {{ num }} {{ product.unit }}</option>
              </select>
              <a href="" class="btn btn-primary" @click.prevent="addToCart(product.id, product.num)">
                <i class="fa fa-cart-plus" aria-hidden="true"></i> 加入購物車
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <h2>{{ product.description }}</h2>
          <img
              class="card-img-top mt-2"
              :src="product.imageUrl"
              alt="Card image cap"
            />
          <div class="mt-2">
            {{ product.content }}
          </div>
          <div class="alert alert-secondary mt-4" role="alert">
            <h2 class="text-center">購物說明</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, at! Totam, exercitationem repellat. Saepe facere
              amet expedita perferendis voluptatem dicta dignissimos tempora ut atque, rerum doloribus? Magni, blanditiis.
              Assumenda, distinctio!
            </p>
          </div>
        </div>
      </div>
    </div>
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
      let id = this.$route.params.pid;
      if( !id ){ this.$router.push({name:'Index'}); }
      const vm = this;
      vm.isLoading = true;
      this.$http
        .get(`${this.API.LIST_PRODUCT_NOT_ADMIN}/${id}`)
        .then((response) => {
          vm.product = response.data.product;
          vm.product.num = 1; // init option num
          vm.isLoading = false;
        });
    },
    // 加入購物車
    addToCart(id, qty = 1) {
      const vm = this;
      const cart = {
        product_id: id,
        qty
      };
      this.$http
        .post(`${this.API.ADD_TO_CART}`, { data: cart })
        .then(response => {
          this.$bus.$emit("shoppingcart:get");
        });
    },
  },
  created() {
    this.getProduct();
  },
  computed: {},
};
</script>
<style lang="less" scope>
.container {
    margin-top: 10rem;
}
</style>