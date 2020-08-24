<template>
  <div>
    <div class="header" :class="{ 'fixed-header': headerClass === true }">
      <router-link class="logo" to="/index">
        <img src="../assets/images/header/logo.png"/>
      </router-link>

      <router-link class="link" to="/">關於我們</router-link>
      <router-link class="link" to="/CheckoutOrder">查看訂單</router-link>
      <router-link class="link" to="/ProductsList">所有商品</router-link>
      <router-link class="link" to="/admin">管理員後台</router-link>
      <!-- TODO 如果不是放 header, 改放 home, 能否解決 modal 不出現(被蓋住?)的 bug -->
      <shopping-cart></shopping-cart>
    </div>
  </div>
</template>

<script>
import ShoppingCart from "./ShoppingCart";
export default {
  data() {
    return {
      headerClass: false
    };
  },
  components: {
    ShoppingCart
  },
  methods: {
    initHeader() {
      let vm = this;
      window.onscroll = function(ev) {
        if (window.scrollY > 0) {
          vm.headerClass = true;
          return;
        }
        vm.headerClass = false;
      };
    }
  },
  created() {
    this.initHeader();
  }
};
</script>
<style lang="scss" scoped>
.header {
  height: 7rem;
  padding-right: 2rem;
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: transparent;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  transition: .5s all;

  .logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 6rem;
    }
  }

  .link {
    font-size: 0.8rem;
    color: #000;
    text-decoration: none;
    margin-right: 2rem;
  }
}
.fixed-header {
  position: fixed;
  background: #fff;
}
</style>
