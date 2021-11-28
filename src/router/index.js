import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Shop from "../views/Shop.vue";
import Detail from "../views/Shop_Detail.vue";
import MyInfo from "../views/MyInfo.vue";
import ShoppingCart from "../views/ShoppingCart.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

import Test from "../views/AxiosTest.vue";

Vue.use(VueRouter);

const routes = [
    {
        // 홈 화면은 "/" 또는 "/main"으로 접속 가능
        path: "/",
        alias: ["/main"],
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/shop",
        name: "Shop",
        component: Shop,
    },
    {
        path: "/detail",
        name: "Detail",
        component: Detail,
    },
    {
        path: "/my_info",
        name: "MyInfo",
        component: MyInfo,
    },
    {
        path: "/shopping_cart",
        name: "ShoppingCart",
        component: ShoppingCart,
    },
    {
        path: "/test",
        name: "Test",
        component: Test,
    },
    // {
    //   path: '/about',
    //   name: 'About',
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
