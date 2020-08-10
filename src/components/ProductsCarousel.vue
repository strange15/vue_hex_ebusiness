<template>
  <div style="margin: 5rem auto;">
    <div class="products-slick">
      <div v-for="(product, index) in products" :key="index">
        <!-- TODO router-link -->
        <router-link class="item" to="/index">
          <div
            style="height: 400px; background-size: cover; background-position: center"
            :style="{ backgroundImage: `url(${product.imageUrl})` }"
          ></div>
          <div class="title">{{ product.title }}</div>
          <div class="price" v-if="product.price">{{ product.price }} 元</div>
          <div class="category" v-if="index<4">NEW</div>
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
        slidesToScroll: 3,
        // autoplay: true,
        autoplaySpeed: 5000,
        arrows: false
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
    .title {
      font-weight: bold;
    }
    .price {
      font-weight: bold;
      margin-bottom: .6rem;
    }
    .category {
      color: #333;
      background: #ffd700;
      padding: 0.1rem 0.5rem;
      border-radius: 1rem;
      width: 51px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
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
