<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
         <th width="120">分類</th>
         <th>產品名稱</th>
         <th width="120">原價</th>
         <th width="120">售價</th>
         <td width="100">是否啟用</td>
         <td width="80">編輯</td>
      </thead>
      <tbody>
        <tr v-for="(item, key) in products">
           <td>{{ item.category }}</td>
           <td>{{ item.title }}</td>
           <td class="text-right">{{ item.origin_price }}</td>
           <td class="text-right">{{ item.price }}</td>
           <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
           </td>
           <td>
              <button class="btn btn-outline-primary btn-sm">編輯</button>
           </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: []
    };
  },
  methods: {
    getProducts() {
      const api =
        "https://vue-course-api.hexschool.io/api/strange/admin/products";
      const vm = this;
      this.$http.get(api).then(response => {
        console.log("getProducts", response.data);
        vm.products = response.data.products;
      });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>
