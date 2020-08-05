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
      <!-- <a
        class="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a> -->
    </div>

    <div class="article section1">
      &nbsp;
      <p>&nbsp;</p>
      <p class="MsoNormal">
        <span lang="EN-US">
          &nbsp;&nbsp;&nbsp; Test
          <br />
        </span>
      </p>
      <p class="MsoNormal">
        <span lang="EN-US">
          &nbsp; &nbsp; Test
          <br />
        </span>
      </p>
      <p class="MsoNormal">
        <span lang="EN-US">&nbsp;&nbsp;&nbsp; Test</span>
      </p>
      <p class="MsoNormal">&nbsp;</p>
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
// import $ from "jquery";
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
/** test background-attachment: fixed  */
.section1 {
  color: #fff;
  background-image: url("https://www.webdesigns.com.tw/img/upload/pic-4.jpg");
  text-shadow: 5px 4px 5px #575353;
  font-weight: bold;
}
.article {
  width: 100%;
  margin: 0 auto;
  height: 400px;
  padding: 40px;
  font: 24px "Arial";
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  background-size: cover;
  line-height: 28px;
}
/** test background-attachment: fixed end */


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
        h5, .h5 {
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
