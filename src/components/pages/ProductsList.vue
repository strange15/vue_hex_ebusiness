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
            <div
              class="list-group-item list-group-item-action"
              @click="changeCategory(category)"
              v-for="(category, index) in categoryTab"
              :key="index"
              :class="{ 'active': active === category }"
            >
              <i></i>
              {{ category }}
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="d-flex mb-4">
            <form class="form-inline my-3 my-lg-0">
              <div class="input-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="搜尋商品名稱"
                  v-model="searchProd"
                  aria-label="Search"
                />
                <i
                  v-if="isFilter"
                  class="far fa-times-circle pointer"
                  aria-hidden="true"
                  @click.prevent="clearSearch()"
                ></i>
                <div class="input-group-append">
                  <button class="btn btn-outline-warning" @click.prevent="searchProducts()">
                    <i class="fa fa-search" aria-hidden="true"></i> Search
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="tab-content">
            <div class>
              <div v-if="isFilter">
                <div class="row">
                  <div class="col-md-4 mb-4" v-for="prod in filterProducts" :key="prod.id">
                    <div class="card border-0 box-shadow text-center h-100">
                      <router-link :to="{ name: 'Product', params: { pid: prod.id }}">
                        <img class="card-img-top" :src="prod.imageUrl" alt="Card image cap" />
                      </router-link>
                      <div class="card-body">
                        <h4 class="card-title">{{ prod.title }}</h4>
                        <p class="card-text bold">{{ prod.description }}</p>
                        <p class="card-text">{{ prod.content }}</p>
                      </div>
                      <div class="card-footer border-top-0 bg-white">
                        <a
                          class="btn btn-outline-secondary btn-block btn-sm"
                          @click="addToCart(prod.id)"
                        >
                          <i class="fa fa-cart-plus" aria-hidden="true"></i> 加入購物車
                          <i
                            class="fas fa-spinner fa-spin"
                            v-if="status.itemLoading === prod.id"
                          ></i>
                        </a>
                        <el-button class="btn btn-outline-secondary btn-block btn-sm" :plain="true" v-if="!prod.isFavorite"
                          @click="favControl({control:'add', data: prod})">加入願望清單</el-button>
                        <el-button class="btn btn-outline-secondary btn-block btn-sm btn-remove" :plain="true" v-if="prod.isFavorite"
                          @click="favControl({control:'remove', data: prod})">移除願望清單</el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="row">
                  <div class="col-md-4 mb-4" v-for="prod in tmpPageProducts" :key="prod.id">
                    <div class="card border-0 box-shadow text-center h-100">
                      <router-link :to="{ name: 'Product', params: { pid: prod.id }}">
                        <img class="card-img-top" :src="prod.imageUrl" alt="Card image cap" />
                      </router-link>
                      <div class="card-body">
                        <h4 class="card-title">{{ prod.title }}</h4>
                        <p class="card-text bold">{{ prod.description }}</p>
                        <p class="card-text">{{ prod.content }}</p>
                      </div>
                      <div class="card-footer border-top-0 bg-white">
                        <a
                          class="btn btn-outline-secondary btn-block btn-sm"
                          @click="addToCart(prod.id)"
                        >
                          <i class="fa fa-cart-plus" aria-hidden="true"></i> 加入購物車
                          <i
                            class="fas fa-spinner fa-spin"
                            v-if="status.itemLoading === prod.id"
                          ></i>
                        </a>
                        <el-button class="btn btn-outline-secondary btn-block btn-sm" :plain="true" v-if="!prod.isFavorite"
                          @click="favControl({control:'add', data: prod})">加入願望清單</el-button>
                        <el-button class="btn btn-outline-secondary btn-block btn-sm btn-remove" :plain="true" v-if="prod.isFavorite"
                          @click="favControl({control:'remove', data: prod})">移除願望清單</el-button>
                      </div>
                    </div>
                  </div>
                </div>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :page-size="9"
                  @current-change="nextPage"
                  :total="totalCount">
                </el-pagination>
              </div>
            </div>
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
      active: "all",
      products: [], // 所有商品
      categoryTab: [], // 類別
      tmpProducts: [], // 商品暫存陣列
      filterProducts: [], // 搜尋結果
      searchProd: "", // 搜尋字串
      isFilter: false,
      isLoading: false,
      status: {
        itemLoading: "",
      },
      totalCount: 0,
      currentBtnIndex: 0,
      tmpPageProducts: [], // 商品陣列 for pagination
      favorite: [], // 願望清單
    };
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      vm.isLoading = true;
      this.$http
        .get(`${this.API.LIST_ALL_PRODUCTS_NOT_ADMIN}`)
        .then((response) => {
          vm.products = response.data.products;
          vm.totalCount = vm.products.length;
          vm.filterCategory(vm.products);
          vm.initTab();
          vm.isLoading = false;
        });
    },
    nextPage(index) {
      this.currentBtnIndex = index;
      let start = 9*(index-1);
      let end = start + 9;
      this.tmpPageProducts = this.tmpProducts.slice(start, end);
    },
    /** 切換要顯示的商品類別 */
    changeCategory(tab) {
      let vm = this;
      vm.active = tab;
      vm.clearSearch();
      if (tab === "all") {
        vm.tmpProducts = vm.products;
      } else vm.tmpProducts = vm.products.filter((x) => x.category === tab);
      vm.tmpPageProducts = vm.tmpProducts;
      vm.totalCount = vm.tmpProducts.length;
      vm.initFav(vm.tmpPageProducts);
      if( vm.tmpProducts.length > 10 ){
        vm.tmpPageProducts = vm.tmpProducts.slice(0, 9);
      }
    },
    /** 整理 categorys */
    filterCategory(categorys) {
      let arr = [];
      categorys.forEach(function (cate) {
        arr.push(cate.category);
      });
      this.categoryTab = [...new Set(arr)]; // 過濾重複的值
    },
    initTab() {
      this.changeCategory("all");
    },
    // 搜尋商品
    searchProducts() {
      let vm = this;
      let filterWords = this.searchProd;
      if (filterWords === "") { vm.isFilter = false; return; }
      vm.filterProducts = vm.tmpProducts.filter((x) => x.title.indexOf(filterWords) > -1);
      if (vm.filterProducts.length !== 0) {
        vm.isFilter = true;
        vm.initFav(vm.filterProducts);
      }
      else{
        vm.$alert('請嘗試其他關鍵字', '搜尋不到此項產品', {
          confirmButtonText: '確定',
        });
      }
    },
    // 清除搜尋欄
    clearSearch() {
      this.isFilter = false;
      this.searchProd = "";
      // 清除完以後做初始化
      this.initFav(this.tmpPageProducts);
      this.nextPage(1);
    },
    // 加入購物車
    addToCart(id, qty = 1) {
      const vm = this;
      vm.status.itemLoading = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http
        .post(`${this.API.ADD_TO_CART}`, { data: cart })
        .then((response) => {
          this.$bus.$emit("shoppingcart:get");
          vm.status.itemLoading = "";
        });
    },
    // 初始化/更新 願望清單
    initFav(products) {
      let vm = this;
      try {
        vm.favorite = JSON.parse(localStorage["favorite"]);
      } catch(e) {
        localStorage.setItem("favorite", []);
      }
      if( vm.favorite.length !== 0 ) {
        products.forEach(function(x){ vm.$set(x, 'isFavorite', vm.favorite.indexOf(x.id) > -1) });
      }
    },
    // 願望清單控制
    favControl(obj) {
      /**
       * obj = {
       *  control:'remove' or 'add',
       *  data:prod,
       * }
       */
      let vm = this;
      let alertType = obj.control === 'add' ? 'success' : 'warning';
      let msg = obj.control === 'add' ? `將 ${obj.data.title} 加入願望清單了！` : `將 ${obj.data.title} 移除願望清單了！`;
      if (obj.control === "add") { // 新增願望清單
        vm.favorite.push(obj.data.id);
      }else{ // 移除願望清單
        vm.favorite.splice(vm.favorite.indexOf(obj.data.id), 1);
      }
      localStorage.setItem("favorite", JSON.stringify(vm.favorite));
      vm.initFav(vm.isFilter ? vm.filterProducts : vm.tmpPageProducts);
      vm.$message({
        message: msg,
        type: alertType
      });
    },
  },
  created() {
    this.getProducts();
  },
  computed: {},
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

      &:nth-child(n + 2) {
        margin-top: 0.8rem;
      }

      i::before {
        position: absolute;
        content: "";
        left: 0.5rem;
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
        left: 0.5rem;
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

  .el-pagination {
      margin-bottom: 1rem;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #022d6d;
      color: #FFF;
  }

  .bold {
    font-weight: bold;
  }

  .fa-times-circle {
    position: absolute;
    right: 6.5rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .btn-remove {
    background: #eee;
    border-color: #c5c5c5;
  }
}
</style>