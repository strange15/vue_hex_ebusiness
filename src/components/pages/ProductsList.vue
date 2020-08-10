<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end">
    <div class="container">
      <div class="p-3 bg-lighter">
        <h1 class="display-3 font-weight-bold">買到剁手手！最後出清</h1>
        <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
      </div>
    </div>
  </div>
  <div class="container main-contant mb-1">
    <div class="row">
      <div class="col-md-3">
        <!-- 左側選單 (List group) -->
        <div class="list-group">
          <a class="list-group-item list-group-item-action active" data-toggle="list" href="#list-gold">
            <i class="fa fa-suitcase" aria-hidden="true"></i> 金牌專賣店</a>
          <a class="list-group-item list-group-item-action" data-toggle="list" href="#list-gift">
            <i class="fa fa-gift" aria-hidden="true"></i> 禮品區</a>
          <a href="#" class="list-group-item list-group-item-action disabled">
            <i class="fa fa-film" aria-hidden="true"></i> 影音商品</a>
          <a href="#" class="list-group-item list-group-item-action disabled">
            <i class="fa fa-paw" aria-hidden="true"></i> 寵物專用</a>
          <a href="#" class="list-group-item list-group-item-action disabled">
            <i class="fa fa-tree" aria-hidden="true"></i> 居家環境</a>
        </div>
      </div>
      <div class="col-md-9">
        <div class="d-flex mb-4">
          <!-- Search bar -->
          <form class="form-inline my-3 my-lg-0">
            <div class="input-group">
              <input class="form-control" type="text" placeholder="Search" aria-label="Search">
              <div class="input-group-append">
                <button class="btn btn-outline-warning" type="submit">
                  <i class="fa fa-search" aria-hidden="true"></i> Search</button>
              </div>
            </div>
          </form>
        </div>
        <!-- 主要商品列表 (Card) -->
        <div class="tab-content">
          <div class="tab-pane active" id="list-gold">
            <div class="row">
              <!-- 金牌 -->
              <div class="col-md-4 mb-4">
                <div class="card border-0 box-shadow text-center h-100">
                  <img class="card-img-top" src="https://images.unsplash.com/photo-1494281258937-45f28753affd?w=1350" alt="Card image cap">
                  <div class="card-body">
                    <h4 class="card-title">金牌西裝</h4>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content
                      is a little bit longer.</p>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content
                      is a little bit longer.</p>
                  </div>
                  <div class="card-footer border-top-0 bg-white">
                    <div class="btn-group btn-group-sm">
                      <a href="shoppingCart-product.html" class="btn btn-outline-secondary">
                        SM
                      </a>
                      <a href="shoppingCart-product.html" class="btn btn-outline-secondary">
                        M
                      </a>
                      <a href="shoppingCart-product.html" class="btn btn-outline-secondary disabled">
                        L
                      </a>
                      <a href="shoppingCart-product.html" class="btn btn-outline-secondary">
                        XL
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-4 mb-4">
                <div class="card border-0 box-shadow text-center h-100">
                  <img class="card-img-top" src="https://images.unsplash.com/photo-1481399124169-87493351c8a1?w=1349" alt="Card image cap">
                  <div class="card-body">
                    <h4 class="card-title">金牌女裝</h4>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content
                      is a little bit longer.</p>
                  </div>
                  <div class="card-footer border-top-0 bg-white">
                    <div class="btn-group btn-group-sm">
                      <a href="#" class="btn btn-outline-secondary">
                        SM
                      </a>
                      <a href="#" class="btn btn-outline-secondary">
                        M
                      </a>
                      <a href="#" class="btn btn-outline-secondary">
                        L
                      </a>
                      <a href="#" class="btn btn-outline-secondary">
                        XL
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-4 mb-4">
                <div class="card border-0 box-shadow text-center h-100">
                  <img class="card-img-top" src="https://images.unsplash.com/photo-1486250944723-86bca2b15b06?w=1351" alt="Card image cap">
                  <div class="card-body">
                    <h4 class="card-title">特工眼鏡</h4>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content
                      is a little bit longer.</p>
                  </div>
                  <div class="card-footer border-top-0 bg-white">
                    <a href="#" class="btn btn-outline-secondary btn-block btn-sm">
                      <i class="fa fa-cart-plus" aria-hidden="true"></i> 搶購去
                    </a>
                  </div>
                </div>
              </div>

              <div class="col-md-4 mb-4">
                <div class="card border-0 box-shadow text-center h-100">
                  <img class="card-img-top" src="https://images.unsplash.com/photo-1497339100210-9e87df79c218?w=1350" alt="Card image cap">
                  <div class="card-body">
                    <h4 class="card-title">特工西裝</h4>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content
                      is a little bit longer.</p>
                  </div>
                  <div class="card-footer border-top-0 bg-white">
                    <a href="#" class="btn btn-outline-secondary btn-block btn-sm">
                      <i class="fa fa-cart-plus" aria-hidden="true"></i> 搶購去
                    </a>
                  </div>
                </div>
              </div>

              <div class="col-md-4 mb-4">
                <div class="card border-0 box-shadow text-center h-100">
                  <img class="card-img-top" src="https://images.unsplash.com/photo-1485373650022-3ed53f62b8f3?w=634" alt="Card image cap">
                  <div class="card-body">
                    <h4 class="card-title">變聲領帶</h4>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content
                      is a little bit longer.</p>
                  </div>
                  <div class="card-footer border-top-0 bg-white">
                    <a href="#" class="btn btn-outline-secondary btn-block btn-sm disabled">
                      缺貨中
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <!-- pagination -->
            <pagination :pagination="pagination" @getProducts="getProducts"></pagination>
          </div>

          <div class="tab-pane" id="list-gift">
            <div class="row align-items-stretch">
              <!-- 禮品 -->
              <div class="col-md-4 mb-4">
                <div class="card border-0 box-shadow text-center h-100">
                  <img class="card-img-top" src="https://images.unsplash.com/photo-1482173074468-5b323335debe?w=1350" alt="Card image cap">
                  <div class="card-body">
                    <h4 class="card-title">超精緻禮物</h4>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content
                      is a little bit longer.</p>
                  </div>
                  <div class="card-footer border-top-0 bg-white">
                    <a href="#" class="btn btn-outline-secondary btn-block btn-sm">
                      <i class="fa fa-cart-plus" aria-hidden="true"></i> 搶購去
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- tab-content end -->

      </div>

    </div>
  </div>
    
    
    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.itemLoading"></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempDelProduct.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { API } from "../../assets/js/api";
import $ from "jquery";
import Pagination from "../Pagination";

export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      tempDelProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        itemLoading: false
      },
      pagination: {},
    };
  },
  components: {Pagination},
  methods: {
    getProducts(page = 1) {
      const vm = this;
      vm.isLoading = true;
      this.$http.get(`${this.API.LIST_ALL_PRODUCTS}?page=${page}`).then(response => {
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
        // this.$bus.$emit("pagination:set", response.data.pagination); // 用 event bus 傳值
        vm.isLoading = false;
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $("#productModal").modal("show");
    },
    updateProduct() {
      const vm = this;
      vm.isLoading = true;
      let api = vm.isNew
        ? `${this.API.UPDATE_PRODUCT}`
        : `${this.API.UPDATE_PRODUCT}/${vm.tempProduct.id}`;
      let httpMethod = vm.isNew ? "post" : "put";
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        $("#productModal").modal("hide");
        vm.getProducts();
        if (!response.data.success) {
          console.log("新增失敗");
        }
        vm.isLoading = false;
      });
    },
    opendelModal(item) {
      this.tempDelProduct = Object.assign({}, item);
      $("#delProductModal").modal("show");
    },
    delProduct() {
      const vm = this;
      vm.isLoading = true;
      let api = `${this.API.DELETE_PRODUCT}/${vm.tempDelProduct.id}`;
      this.$http["delete"](api).then(response => {
        $("#delProductModal").modal("hide");
        vm.getProducts();
        if (!response.data.success) {
          console.log("刪除失敗");
        }
        vm.isLoading = false;
      });
    },
    uploadFile() {
      let vm = this;
      vm.status.itemLoading = true;
      const uploadedFile = this.$refs.files.files[0];
      const formData = new FormData();
      formData.append("file-to-upload", uploadedFile);
      this.$http
        .post(this.API.UPLOAD_IMAGE, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          if (response.data.success) {
            // 需要雙向綁定
            vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl);
          } else {
            this.$bus.$emit("message:push", response.data.message, "danger");
          }
          vm.status.itemLoading = false;
        })
        .catch(function(error) {
          console.log(error);
          vm.status.itemLoading = false;
        });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>
