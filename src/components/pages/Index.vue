<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <!-- bootstrap carousel -->
    <div
      id="carouselExampleIndicators"
      class="carousel slide carousel-fade"
      data-ride="carousel"
    >
      <ol class="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          class="active"
        ></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="../../assets/images/index/banner1.jpg"
            class="d-block w-100"
          />
          <div class="carousel-caption d-none d-md-block">
            <p>Lorem ipsum dolor.</p>
            <h5>Lorem, ipsum.</h5>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="../../assets/images/index/banner2.jpg"
            class="d-block w-100"
          />
          <div class="carousel-caption d-none d-md-block">
            <p>Lorem ipsum dolor.</p>
            <h5>Lorem, ipsum dolor.</h5>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="../../assets/images/index/banner3.jpg"
            class="d-block w-100"
          />
          <div class="carousel-caption d-none d-md-block">
            <p>Lorem ipsum dolor.</p>
            <h5>Lorem ipsum dolor sit.</h5>
          </div>
        </div>
      </div>
    </div>

    <!-- 廢文 -->
    <h2 style="text-align: center; margin: 5rem 0;">
      <span style="font-size: 36px;font-weight: bold;">
        The day I met you like a gift.
        <br />With the hope that every day will be a gift.
      </span>
    </h2>

    <!-- Event -->
    <div class="event flex-row">
      <!-- TODO 放 event 字樣 -->
      <img src="../../assets/images/index/event1.jpg" />
      <!-- TODO 放個影片連結 or 假影片 start 按鈕 -->
      <img src="../../assets/images/index/event2.jpg" />
    </div>

    <!-- 優惠活動 -->
    <div class="article section1 flex-row">
      <div class="mask"></div>
      <div class="MsoNormal flex-column">
        <span lang="EN-US">
          ON SALE 30% OFF
        </span>
        <router-link class="enter-btn" to="/index"
          ><!-- TODO link -->
          ENTER
        </router-link>
      </div>
    </div>

    <ProductsCarousel></ProductsCarousel>
  </div>
</template>

<script>
import ProductsCarousel from "../ProductsCarousel";
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  components: { ProductsCarousel },
  methods: {
    initBootstrapCarousel() {
      $(".carousel").carousel({
        interval: 5000
      });
    },
    initOwlCarousel() {
      // owl-carousel
      // $(".owl-carousel").owlCarousel({
      //   loop: true,
      //   // autoWidth: true,
      //   // animateOut: "fadeOut",
      //   // animateIn: "fadeIn",
      //   // autoplay: true,
      //   items: 1,
      //   smartSpeed: 450
      // });
      // $('.owl-carousel').owlCarousel({
      //     loop:true,
      //     margin:10,
      //     dots:true,
      //     responsive:{
      //         0:{
      //             items:1
      //         },
      //         600:{
      //             items:2
      //         },
      //         1000:{
      //             items:3
      //         }
      //     }
      // })
    },
    getProducts() {
      const vm = this;
      vm.isLoading = true;
      this.$http
        .get(`${this.API.LIST_ALL_PRODUCTS_NOT_ADMIN}`)
        .then(response => {
          vm.products = response.data.products;
          vm.isLoading = false;
        });
    }
  },
  created() {
    this.initBootstrapCarousel();
  },
  computed: {},
  mounted() {
    
  }
};
</script>
<style lang="scss" scoped>
.section1 {
  width: 100%;
  margin: 0 auto;
  height: 400px;
  font: 6rem "Arial";
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  background-size: cover;
  color: #fff;
  background-image: url("../../assets/images/index/activity.jpg");
  font-weight: bold;
  position: relative;

  .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(2, 45, 109, 0.5);
  }

  .enter-btn {
    color: #fff;
    text-decoration: none;
    background: #ffd700;
    font-size: 2rem;
    padding: 0.7rem 2rem 0.56rem 2rem;
    margin-top: 1rem;
    z-index: 10;
  }
}

.event {
  width: 90%;
  margin: 0 auto 5rem auto;
  img {
    width: 35rem;

    &:nth-child(2) {
      margin-left: 4rem;
    }
  }
}

.carousel {
  .carousel-inner {
    height: 100vh;

    .carousel-item {
      .carousel-caption {
        top: 30%;
        left: 0;
        right: 0;

        p {
          font-size: 8rem;
          font-weight: bold;
        }
        h5,
        .h5 {
          font-size: 2.25rem;
        }
      }
      img {
        width: 100%;
        height: 100vh;
        object-fit: cover;
      }
    }
  }
}
</style>
