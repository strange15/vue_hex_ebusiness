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
            <span class="badge badge-secondary float-right ml-2">{{
              item.category
            }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">
                原價 {{ item.origin_price }} 元
              </div>
              <del class="h6" v-if="item.price"
                >原價 {{ item.origin_price }} 元</del
              >
              <div class="h5" v-if="item.price">
                現在只要 {{ item.price }} 元
              </div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.itemLoading === item.id"
              ></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.itemLoading === item.id"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
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
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="">
            <blockquote class="blockqoute mt-3">
               <p class="mb-0">{{ product.content }}</p>
               <footer class="blockqoute-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
               <div class="h4" v-if="!product.price">
                原價 {{ product.origin_price }} 元
              </div>
              <del class="h6" v-if="product.price"
                >原價 {{ product.origin_price }} 元</del
              >
              <div class="h4" v-if="product.price">
                現在只要 {{ product.price }} 元
              </div>
            </div>
          </div>
          <select name="" class="form-control mt-3" v-model="product.num">
             <!-- TODO -->
             <option value="1">選購1件</option>
          </select>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
               小計 <strong>{{ product.num * product.price }}</strong>
            </div>
            <button type="button" class="btn btn-primary">
              加到購物車
            </button>
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
      status: {
        itemLoading: ""
      }
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
      this.$http.get(`${this.API.LIST_PRODUCT_NOT_ADMIN}/${id}`).then(response => {
        vm.product = response.data.product;
        $('#productModal').modal('show');
        vm.status.itemLoading = "";
      });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

<style scoped></style>
