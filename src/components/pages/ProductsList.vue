<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>

    <div class="container main-content mb-1">
      <div class="row">
        <div class="col-md-3">
          <!-- 左側選單 (List group) -->
          <div class="category-group">
            <div
              class="list-group-item list-group-item-action"
              :class="{ 'active': active === 'all' }"
               @click="changeCategory('all')"
            >
              <i></i> 所有商品
            </div>
            <div class="list-group-item list-group-item-action" @click="changeCategory(category)"
              v-for="(category, index) in categoryTab" :key="index" 
              :class="{ 'active': active === category }">
              <i></i> {{ category }}
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="d-flex mb-4">
            <!-- Search bar TODO -->
            <form class="form-inline my-3 my-lg-0">
              <div class="input-group">
                <input class="form-control" type="text" placeholder="Search" aria-label="Search" />
                <div class="input-group-append">
                  <button class="btn btn-outline-warning" type="submit">
                    <i class="fa fa-search" aria-hidden="true"></i> Search
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="tab-content">
            <div class="">
              <div class="row">
                <div class="col-md-4 mb-4" v-for="prod in tmpProducts" :key="prod.id">
                  <div class="card border-0 box-shadow text-center h-100">
                    <router-link  :to="{ name: 'Product', params: { pid: prod.id }}">
                      <img
                        class="card-img-top"
                        :src="prod.imageUrl"
                        alt="Card image cap"
                      />
                    </router-link>
                    <div class="card-body">
                      <h4 class="card-title">{{ prod.title }}</h4>
                      <p class="card-text">
                        {{ prod.description }}
                      </p>
                      <p class="card-text">
                        {{ prod.content }}
                      </p>
                    </div>
                    <div class="card-footer border-top-0 bg-white">
                      <a class="btn btn-outline-secondary btn-block btn-sm" @click="addToCart(prod.id)">
                        <i class="fa fa-cart-plus" aria-hidden="true"></i> 加入購物車 <i class="fas fa-spinner fa-spin" v-if="status.itemLoading === prod.id"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <!-- pagination -->
              <!-- <pagination :pagination="pagination" @getProducts="getProducts"></pagination> -->
            </div>
          </div>
        </div>
      </div>
    </div>

  
  </div>
</template>

<script>
// import Pagination from "../Pagination";

export default {
  data() {
    return {
      active: "all",
      products: [],
      categoryTab: [], // 類別
      tmpProducts: [],
      isLoading: false,
      status: {
        itemLoading: ""
      },
      pagination: {},
    };
  },
  // components: { Pagination },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      vm.isLoading = true;
      this.$http
        .get(`${this.API.LIST_ALL_PRODUCTS_NOT_ADMIN}`)
        .then((response) => {
          vm.products = response.data.products;
          // vm.pagination = response.data.pagination;
          // TODO 額外用 pagination? element-ui
          vm.filterCategory(vm.products);
          vm.initTab();
          vm.isLoading = false;
        });
    },
    /** 切換要顯示的商品類別 */
    changeCategory(tab) {
      let vm = this;
      vm.active = tab;
      if( tab === "all" ) {
        vm.tmpProducts = vm.products;
        // return;
      }else
        vm.tmpProducts = vm.products.filter(x => x.category === tab);
    },
    /** 整理 categorys */
    filterCategory(categorys) {
      let arr = [];
      categorys.forEach(function(cate){
        arr.push(cate.category);
      });
      this.categoryTab = [...new Set(arr)]; // 過濾重複的值
    },
    initTab() {
      this.changeCategory("all");
    },
    // 加入購物車
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
          console.log('addToCart', response);
          this.$bus.$emit("shoppingcart:get");
          $("#productModal").modal("hide");
          vm.status.itemLoading = "";
        });
    },
  },
  created() {
    this.getProducts();
  },
  computed: {

  },
};
</script>
<style lang="less" scope>
.container {
    margin-top: 10rem;

    .category-group {
      .list-group-item {
        border: 0 !important;
        cursor: pointer;
        padding-left: 2rem;

        &:nth-child(n+2) {
          margin-top: .8rem;
        }

        i::before {
          position: absolute;
          content: '';
          left: .5rem;
          top: 50%;
          transform: translateY(-44%);
          width: 8px;
          height: 15px;
          background: #202f95;
        }
      }
      .list-group-item.active {
        background-color: #202f95;

        i::before {
          position: absolute;
          left: .5rem;
          top: 50%;
          transform: translateY(-44%);
          width: 8px;
          height: 15px;
          background: #fff;
        }
      }
    }

    .btn-outline-secondary:hover {
      background-color: #202f95 !important;
      color: #fff;
    }
}
</style>