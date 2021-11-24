import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Shop from "../views/Shop.vue";
import Detail from "../views/Shop_Detail.vue";
import MyInfo from "../views/MyInfo.vue";
import Login from "../views/Login.vue";
<<<<<<< HEAD
import Register from "../views/Register.vue";
import ShoppingCart from "../views/ShoppingCart.vue";

=======
>>>>>>> parent of 1f61980 (Update Pages)

Vue.use(VueRouter);

const routes = [
    {
        alias: ["/main"],
        path:"/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
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
        path: "/shoppingcart",
        name: "ShoppingCart",
        component: ShoppingCart,
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
