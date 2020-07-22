import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/pages/Login";
import Products from "@/components/pages/Products";
import Coupons from '@/components/pages/Coupons';
import Orders from '@/components/pages/Orders';
import CustomerOrder from "@/components/pages/CustomerOrders";
import CustomerCheckout from "@/components/pages/CustomerCheckout";
import Home from "@/components/Home";
import Index from "@/components/pages/Index";

Vue.use(Router);

export default new Router({
  routes: [
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
        {
          path: "coupons",
          name: "Coupons",
          component: Coupons,
          meta: { requiresAuth: true },
        },
        {
          path: "orders",
          name: "Orders",
          component: Orders,
          meta: { requiresAuth: true },
        }
      ]
    },
    {
      path: "/",
      name: "Home",
      component: Home,
      redirect:'/index',
      children: [
        {
          path: "index",
          name: "Index",
          component: Index,
        },

      ]
    },
    // {
    //   path: "/",
    //   name: "Dashboard",
    //   component: Dashboard,
    //   children: [
    //     {
    //       path: "customer_order",
    //       name: "CustomerOrder",
    //       component: CustomerOrder
    //     },
    //     {
    //       path: "customer_checkout/:orderId",
    //       name: "CustomerCheckout",
    //       component: CustomerCheckout
    //     }
    //   ]
    // }
  ]
});
