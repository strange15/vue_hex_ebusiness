<template>
  <div>
    <div class="footer">
      資料、圖片、文章來源皆來自網路，僅用來做為學習用途。
      <!-- <swiper class="swiper" :options="swiperOption">
        <swiper-slide><img
            src="../assets/images/index/banner1.jpg"
            class="w-100"
          /></swiper-slide>
        <swiper-slide><img
            src="../assets/images/index/banner2.jpg"
            class="w-100"
          /></swiper-slide>
        <swiper-slide><img
            src="../assets/images/index/banner3.jpg"
            class="w-100"
          /></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>-->
      <div class="owl-carousel owl-theme">
        <div>Your Content</div>
        <div>Your Content</div>
        <div>Your Content</div>
        <div>Your Content</div>
        <div>Your Content</div>
        <div>Your Content</div>
        <div>Your Content</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Swiper, SwiperSlide } from "vue-awesome-swiper";
// import 'swiper/dist/css/swiper.css'
import $ from "jquery";
export default {
  data() {
    return {
      // swiperOption: {
      //   spaceBetween: 30,
      //   centeredSlides: true,
      //   effect: 'fade',
      //   autoplay: {
      //     delay: 5500,
      //     disableOnInteraction: false
      //   },
      //   speed: 3000,
      //   pagination: {
      //     el: ".swiper-pagination",
      //     clickable: true
      //   },
      //   navigation: {
      //     nextEl: ".swiper-button-next",
      //     prevEl: ".swiper-button-prev"
      //   }
      // }
    };
  },
  components: {
    // Swiper,
    // SwiperSlide
  },
  created() {
    $(".owl-carousel").owlCarousel();
  },
};
</script>
<style lang="less" scoped>
.footer {
}
</style>
