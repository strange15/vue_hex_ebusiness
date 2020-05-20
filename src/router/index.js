import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from "@/components/HelloWorld";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/pages/Login";
import Products from "@/components/pages/Products";
// import Coupons from '@/components/pages/Coupons'; TODO
// import Orders from '@/components/pages/Orders'; TODO
import CustomerOrder from "@/components/pages/CustomerOrders";

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: "/",
    //   name: "HelloWorld",
    //   component: HelloWorld,
    //   meta: { requiresAuth: true }
    // },
    // 避免用戶直接進入不存在的頁面
    {
      path: '*',
      redirect: 'login',
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/admin",
      name: "Dashboard",
      component: Dashboard,
      children: [
        {
          path: "products",
          name: "Products",
          component: Products,
          meta: { requiresAuth: true },
        },
        // {
        //   path: "coupons",
        //   name: "Coupons",
        //   component: Coupons,
        //   meta: { requiresAuth: true },
        // },
        // {
        //   path: "orders",
        //   name: "Orders",
        //   component: Orders,
        //   meta: { requiresAuth: true },
        // }
      ]
    },
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
      children: [
        {
          path: "customer_order",
          name: "CustomerOrder",
          component: CustomerOrder
        }
      ]
    }
  ]
});
