// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import moment from 'moment';
import VeeValidate, { Validator } from 'vee-validate';
import zh_TW from 'vee-validate/dist/locale/zh_TW';

import App from "./App";
import router from "./router";
import './bus';
import currencyFilter from './filters/currency';
import API from '../src/assets/js/api';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VeeValidate, {
  events: 'input|blur', //這是為了讓使用者離開該欄位時觸發驗證
});
Validator.localize('zh_TW', zh_TW); // VeeValidate 使用中文文檔
/* 自定義驗證格式: mobile */
Validator.extend("mobile", {
  getMessage: field => "手機格式不正確",
  validate: value =>
    value.length === 10 && /^09\d{8}$/.test(value)
});
// 自定義 VeeValidate 空欄位時的提示訊息
const Dictionary = {
  zh_TW: {
    messages: {
      required: field => "请输入" + field
    },
    attributes: {
      tel: "手機號碼",
      address: "地址"
    }
  }
};
Validator.localize(Dictionary);

Vue.component('Loading', Loading); // 全域註冊 component
Vue.filter('currency', currencyFilter); // 全域註冊 Filter
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
