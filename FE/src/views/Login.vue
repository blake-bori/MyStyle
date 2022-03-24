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
        // userIdx가 -1이 아닌 값을 가지면(로그인 되어 있으면) 메인 화면으로 리다이렉팅시킨
        if (this.userIdx != -1) {
            location.href="./";
        }
    },
};
</script>
