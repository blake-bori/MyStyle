import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            userIdx: 3,
            userId: "",
            password: "",
            userName: "",
        },
    },
    mutations: {},
    actions: {},
    modules: {},
});
