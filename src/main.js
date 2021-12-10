import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios; // axios를 전역적으로 사용(매번 import할 필요x)

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
