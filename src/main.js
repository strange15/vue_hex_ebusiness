// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import App from "./App";
import router from "./router";
import './bus';
import currencyFilter from './filters/currency';
import API from '../src/assets/js/api';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading); // 全域註冊 component
Vue.filter('currency', currencyFilter); // 全域註冊 Filter
Vue.prototype.API = API; // 全域註冊 export deafult 的 js

axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

router.beforeEach((to, from, next) => {

  // 判斷是否需要驗證
  if (to.meta.requiresAuth) {
    // const api = "https://vue-course-api.hexschool.io/api/user/check";
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
