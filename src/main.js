// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import moment from 'moment';
import VeeValidate from './assets/js/veeValidate.js' // vee-validate 統整到 veeValidate.js 內
import jquery from "jquery"
window.$ = window.jQuery = jquery
import App from "./App";
import router from "./router";
import './bus';
import currencyFilter from './filters/currency';
import date from './filters/date';
import API from '../src/assets/js/api';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Message } from 'element-ui';

/** test owl-carousel */
// import 'owl.carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// let owl_carousel = require("owl.carousel"); // fix 一直抓不到 owl_carousel 的 bug, 改用 require 包
// window.fn = owl_carousel;
// import "owl.carousel/dist/assets/owl.carousel.css";
/** test owl-carousel end */
// import slick from 'slick-carousel';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(ElementUI);

Vue.component('Loading', Loading); // 全域註冊 component
Vue.filter('currency', currencyFilter); // 全域註冊 Filter
Vue.filter('date', date); // 全域註冊 Filter
Vue.prototype.API = API; // 全域註冊 export deafult 的 js
Vue.prototype.$moment = moment; //全域註冊 moment

axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

router.beforeEach((to, from, next) => {
  if( !navigator.onLine ){
    Message({
      message: "偵測到沒有網路連線！請確認後重試。",
      type: "error",
    });
    return;
  }
  // 判斷是否需要驗證
  if (to.meta.requiresAuth) {
    axios.post(API.CHECK_IS_LOGIN).then(response => {
      if (response.data.success){
        next();
      }else{
        next({
          path:'/login'
        })
      }
    });
  } else {
    next();
  }
});
