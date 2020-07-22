<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>

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
            <h5>First</h5>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="../../assets/images/index/banner2.jpg"
            class="d-block w-100"
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>Second</h5>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="../../assets/images/index/banner3.jpg"
            class="d-block w-100"
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>Third</h5>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </div>
      <a
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
      </a>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      isLoading: false
    };
  },
  components: {},
  methods: {
    initCarousel() {
      $(".carousel").carousel({
        interval: 5000
      });
    }
  },
  created() {},
  computed: {},
  mounted() {
    this.initCarousel();
  }
};
</script>
<style lang="scss" scoped>
.carousel {
  .carousel-inner {
    height: 100vh;
    .carousel-item {
      img {
        width: 100%;
        height: 100vh;
        object-fit: cover;
      }
    }
  }
}
</style>
