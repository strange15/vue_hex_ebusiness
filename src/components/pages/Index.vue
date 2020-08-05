<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <!-- bootstrap carousel -->
    <div id="carouselExampleIndicators" class="carousel slide carousel-fade" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../../assets/images/index/banner1.jpg" class="d-block w-100" />
          <div class="carousel-caption d-none d-md-block">
            <p>Lorem ipsum dolor.</p>
            <h5>Lorem, ipsum.</h5>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../../assets/images/index/banner2.jpg" class="d-block w-100" />
          <div class="carousel-caption d-none d-md-block">
            <p>Lorem ipsum dolor.</p>
            <h5>Lorem, ipsum dolor.</h5>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../../assets/images/index/banner3.jpg" class="d-block w-100" />
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
      <img src="../../assets/images/index/event1.jpg"/>
      <!-- TODO 放個影片連結 or 假影片 start 按鈕 -->
      <img src="../../assets/images/index/event2.jpg"/>
    </div>

    <!-- 優惠活動 -->
    <div class="article section1 flex-row">
      <div class="mask"></div>
      <div class="MsoNormal flex-column">
        <span lang="EN-US">
          ON SALE 30% OFF
        </span>
        <router-link class="enter-btn" to="/index"><!-- TODO link -->
          ENTER
        </router-link>
      </div>
    </div>

    <!-- owl-carousel  -->
    <!-- <div class="owl-carousel owl-theme animated">
        <div>
          <img src="../../assets/images/index/banner1.jpg" class />
        </div>
        <div>
          <img src="../../assets/images/index/banner2.jpg" class />
        </div>
        <div>
          <img src="../../assets/images/index/banner3.jpg" class />
        </div>
        <div class="owl-controls">
          <div class="owl-dots">
            <div class="owl-dot active">
              <span></span>
            </div>
            <div class="owl-dot">
              <span></span>
            </div>
            <div class="owl-dot">
              <span></span>
            </div>
          </div>
        </div>
    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  components: {},
  methods: {
    initCarousel() {
      // bootstrap carousel
      $(".carousel").carousel({
        interval: 5000,
      });

      // owl-carousel
      // $(".owl-carousel").owlCarousel({
      //   loop: true,
      //   autoWidth: true,
      //   animateOut: "fadeOut",
      //   animateIn: "fadeIn",
      //   autoplay: true,
      //   items: 1,
      //   smartSpeed: 450,
      // });
    },
  },
  created() {},
  computed: {},
  mounted() {
    this.initCarousel();
  },
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
    background: rgba(2, 45, 109, .5);
  }

  .enter-btn {
    color: #fff;
    text-decoration: none;
    background: #ffd700;
    font-size: 2.0rem;
    padding: .7rem 2rem .56rem 2rem;
    margin-top: 1rem;
    z-index: 10;
  }
}

.event {
  width:90%;
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

// .owl-carousel .owl-item img {
//     height: 100vh;
//     object-fit: cover;

//     .owl-controls .owl-dots {
//       position: absolute !important;
//       bottom: 1rem;
//       left: 50%;
//       transform: translateX(-50%);

//     }
// }
</style>
