<template>
  <div style="margin: 5rem auto;">
    <div class="products-slick">
      <div v-for="(product, index) in products" :key="index">
        <!-- TODO router-link -->
        <router-link class="item" to="/index" v-if="index < 7">
          <div
            style="height: 400px; background-size: cover; background-position: center"
            :style="{ backgroundImage: `url(${product.imageUrl})` }"
          ></div>
          {{ product.title }}
          <div class="" v-if="product.price">{{ product.price }} 元</div>
          <span class="category">{{ product.category }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import slick from "slick-carousel";
export default {
  name: "ProductsCarousel",
  props: {},
  data() {
    return {
      products: [],
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
          setTimeout(() => { // fix can't init after callback
            vm.initSlick();
          }, 0);
          
          vm.isLoading = false;
        });
    },
    initSlick() {
      $(".products-slick").slick({
        dots: true,
        speed: 500,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000
      });
    }
  },
  created() {},
  mounted() {
    this.getProducts();
  }
};
</script>

<style lang="less" scope>
.products-slick {
  width: 80%;
  margin: 0 auto;
  .item {
    font-weight: normal;
    color: #3d3d3d;
    text-decoration: none;

    .category {
      color: #fff;
      background: #022d6d;
      padding: .1rem .5rem;
      border-radius: 1rem;
    }
  }
  
  .slick-slide {
    margin: 0 1rem;
  }
  // 上、下箭頭的樣式設定
  .slick-prev,
  .slick-next {
    display: none;
  }
  // 項目點點的樣式設定
  .slick-dots {
    li {
      button {
        width: 30px;
        &:before {
          opacity: 1;
          color: #eee;
        }
      }
      &.slick-active button {
        &:before {
          opacity: 1;
          background: #022d6d;
          color: transparent;
          height: 10px;
          top: 50%;
          transform: translateY(-57%);
          border-radius: .5rem;
        }
      }
    }
  }
}
</style>
