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
import AboutUs from "@/components/pages/AboutUs";
import FavoriteList from "@/components/pages/FavoriteList";
import CheckoutOrder from "@/components/pages/CheckoutOrder";
import ProductsList from "@/components/pages/ProductsList";
import Product from "@/components/pages/Product";
import CheckoutStep1 from "@/components/pages/CheckoutStep1";
import CheckoutStep2 from "@/components/pages/CheckoutStep2";
import CheckoutStep3 from "@/components/pages/CheckoutStep3";

Vue.use(Router);

export default new Router({
  routes: [
    // 避免用戶直接進入不存在的頁面
    {
      path: '*',
      redirect: 'index',
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
        {
          path: "AboutUs",
          name: "AboutUs",
          component: AboutUs,
        },
        {
          path: "CheckoutOrder",
          name: "CheckoutOrder",
          component: CheckoutOrder,
        },
        {
          path: "productsList",
          name: "ProductsList",
          component: ProductsList,
        },
        {
          path: "product/:pid",
          name: "Product",
          component: Product,
        },
        {
          path: "checkout_step1",
          name: "CheckoutStep1",
          component: CheckoutStep1,
        },
        {
          path: "checkout_step2/:orderId",
          name: "CheckoutStep2",
          component: CheckoutStep2,
        },
        {
          path: "checkout_step3/:orderId",
          name: "CheckoutStep3",
          component: CheckoutStep3,
        },
        {
          path: "FavoriteList",
          name: "FavoriteList",
          component: FavoriteList,
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
