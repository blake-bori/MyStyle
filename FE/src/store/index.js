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
    plugins: [createPersistedState({ paths: ["user"] })],
});
