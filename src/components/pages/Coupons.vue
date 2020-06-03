<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <th width="120">名稱</th>
        <th width="120">折扣百分比</th>
        <th width="120">到期日</th>
        <th width="100">是否啟用</th>
        <th width="140">編輯</th>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $moment(item.due_date).format("YYYY/MM/DD") }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openModal(false, item)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="opendelModal(item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pagination="pagination" @getCoupons="getCoupons"></pagination>

    <!-- Modal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增優惠券</span>
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
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempCoupon.title"
                    placeholder="請輸入標題"
                  />
                </div>
                <div class="form-group">
                  <label for="code">優惠碼</label>
                  <input
                    type="text"
                    class="form-control"
                    id="code"
                    v-model="tempCoupon.code"
                    placeholder="請輸入優惠碼"
                  />
                </div>
                <div class="form-group">
                  <label for="due_date">到期日</label>
                  <!-- TODO tempCoupon.due_date 轉為 YYYY/MM/DD 正常顯示 -->
                  <input
                    type="date"
                    class="form-control"
                    id="due_date"
                    v-model="tempCoupon.due_date"
                    placeholder="請輸入到期日"
                  />
                </div>
                <div class="form-group">
                  <label for="percent">折扣百分比</label>
                  <input
                    type="number"
                    class="form-control"
                    id="percent"
                    v-model="tempCoupon.percent"
                    placeholder="請輸入折扣百分比"
                  />
                </div>

                <hr />

                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempCoupon.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled"
                      >是否啟用</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="delCouponModal"
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
            <strong class="text-danger">{{ tempDelCoupon.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "../Pagination";

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      tempDelCoupon: {},
      isNew: false,
      isLoading: false,
      status: {
        itemLoading: false
      },
      pagination: {}
    };
  },
  components: { Pagination },
  methods: {
    getCoupons(page = 1) {
      const vm = this;
      vm.isLoading = true;
      this.$http
        .get(`${this.API.LIST_ALL_COUPONS}?page=${page}`)
        .then(response => {
          vm.coupons = response.data.coupons;
          vm.pagination = response.data.pagination;
          vm.isLoading = false;
        });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempCoupon = {};
        this.isNew = true;
      } else {
        this.tempCoupon = Object.assign({}, item);
        this.tempCoupon.due_date = this.$moment(this.tempCoupon.due_date).format("YYYY-MM-DD"); // 轉換時間格式以正常顯示
        this.isNew = false;
      }
      $("#couponModal").modal("show");
    },
    updateCoupon() {
      const vm = this;
      vm.isLoading = true;
      let api = vm.isNew
        ? `${this.API.UPDATE_COUPON}`
        : `${this.API.UPDATE_COUPON}/${vm.tempCoupon.id}`;
      let httpMethod = vm.isNew ? "post" : "put";
      let dateTimestamp = this.$moment(vm.tempCoupon.due_date).valueOf();
      vm.tempCoupon.due_date = dateTimestamp;
      this.$http[httpMethod](api, { data: vm.tempCoupon }).then(response => {
        $("#couponModal").modal("hide");
        vm.getCoupons();
        if (!response.data.success) {
          console.log("新增失敗");
        }
        vm.isLoading = false;
      });
    },
    opendelModal(item) {
      this.tempDelCoupon = Object.assign({}, item);
      $("#delCouponModal").modal("show");
    },
    delCoupon() {
      const vm = this;
      vm.isLoading = true;
      let api = `${this.API.DELETE_COUPON}/${vm.tempDelCoupon.id}`;
      this.$http["delete"](api).then(response => {
        $("#delCouponModal").modal("hide");
        vm.getCoupons();
        if (!response.data.success) {
          console.log("刪除失敗");
        }
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.getCoupons();
    // console.log('test', this.$moment("2020-06-01").valueOf());
  }
};
</script>
