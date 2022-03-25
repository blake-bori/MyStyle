import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import product from "./modules/product";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user: user,
        product: product,
    },
    // 새로고침 시 유저 idx 등 지워지면 안되는 user store를 설정
    plugins: [createPersistedState({ paths: ["user"] })],
});
