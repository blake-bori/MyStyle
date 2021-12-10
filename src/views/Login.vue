<template>
    <div class="login">
        <LoginComponent></LoginComponent>
    </div>
</template>

<script>
// @ is an alias to /src
import LoginComponent from "@/components/auth/LoginComponent.vue";
// import * as authApi from "@/api/auth";
export default {
    name: "Login",
    components: {
        LoginComponent,
    },
    data() {
        return {
            userId: "",
            userPsw: "",
        };
    },
    computed: {
        userIdx() {
            return this.$store.state.user.user.userIdx;
        },
    },
    methods: {},
    created() {
        if (this.userIdx != -1) {
            location.href="./";
        }
    },
};
</script>
