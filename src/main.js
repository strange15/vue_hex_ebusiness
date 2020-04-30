// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import 'bootstrap';

import App from "./App";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

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
    // TODO 把 API 路徑拉出去統一成一個檔案
    const api = "https://vue-course-api.hexschool.io/api/user/check";
    axios.post(api).then(response => {
      console.log('check', response.data);
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
