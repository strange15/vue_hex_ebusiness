<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>

    <div class="FavoriteList-container container main-content mb-1">
      <div class="row">
        <div class="col-md-12">
          <div class="d-flex mb-4">
            <label class="h5 text-left order">
              您的願望清單
            </label>
          </div>
          <div class="tab-content">
            <div class>
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
                        @click="addToCart(prod)"
                      >
                        <i class="fa fa-cart-plus" aria-hidden="true"></i> 加入購物車
                        <i
                          class="fas fa-spinner fa-spin"
                          v-if="status.itemLoading === prod.id"
                        ></i>
                      </a>
                      <el-button
                        class="btn btn-outline-secondary btn-block btn-sm btn-remove"
                        :plain="true"
                        @click="favControl({data: prod, show: true})"
                      >
                        <i class="fas fa-heart"></i>移除願望清單
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="9"
                @current-change="nextPage"
                :total="totalCount"
              ></el-pagination>
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
      products: [], // 所有商品
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
    getProducts() {
      const vm = this;
      vm.isLoading = true;
      this.$http
        .get(`${this.API.LIST_ALL_PRODUCTS_NOT_ADMIN}`)
        .then((response) => {
          vm.products = response.data.products;
          vm.initFav(vm.products);
          vm.isLoading = false;
        });
    },
    nextPage(index) {
      this.currentBtnIndex = index;
      let start = 9 * (index - 1);
      let end = start + 9;
      this.tmpPageProducts = this.tmpProducts.slice(start, end);
    },
    // 加入購物車
    addToCart(prod, qty = 1) {
      const vm = this;
      vm.status.itemLoading = prod.id;
      const cart = {
        product_id: prod.id,
        qty,
      };
      this.$http
        .post(`${this.API.ADD_TO_CART}`, { data: cart })
        .then((response) => {
          if(response.data.success){
            this.$bus.$emit("shoppingcart:get");
            vm.favControl({data:prod, show: false});
            vm.$message({
              message: `${prod.title}加入購物車囉！`,
              type: "success",
            });
          }else{
            vm.$message({
              message: "出錯啦！",
              type: "warning",
            });
          }
          vm.status.itemLoading = "";
        });
    },
    // 初始化 願望清單
    initFav(products) {
      let vm = this;
      try {
        vm.favorite = JSON.parse(localStorage["favorite"]);
      } catch (e) {
        localStorage.setItem("favorite", []);
      }
      if (vm.favorite.length !== 0) {
        vm.tmpProducts = products.filter((x) =>
          vm.favorite.some((id) => id === x.id)
        );
        vm.totalCount = vm.tmpProducts.length;
        vm.tmpPageProducts = vm.tmpProducts.slice(0, 9);
      }
    },
    // 願望清單控制
    favControl(obj) {
      /**
       * obj = {
       *  data:prod,
       *  show: true
       * }
       */
      let vm = this;
      vm.favorite.splice(vm.favorite.indexOf(obj.data.id), 1); // 移除願望清單
      localStorage.setItem("favorite", JSON.stringify(vm.favorite));
      vm.initFav(vm.products);
      if( obj.show ){
        vm.$message({
          message: `將 ${obj.data.title} 移除願望清單了！`,
          type: "warning",
        });
      }
    },
  },
  created() {
    this.getProducts();
  },
  computed: {},
};
</script>
<style lang="less" scope>
.FavoriteList-container {
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
    text-align: center;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #022d6d;
    color: #fff;
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