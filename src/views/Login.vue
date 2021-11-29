<template>
    <div class="login">
        <LoginComponent @requestLogin="login"></LoginComponent>
    </div>
</template>

<script>
// @ is an alias to /src
import LoginComponent from "@/components/auth/LoginComponent.vue";
import * as authApi from "@/api/auth";
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
    methods: {
        login(inputData) {
            // console.log("로그인 시도 - 하위 컴포넌트로부터 전달 받은 값 : " + inputData);
            this.userId = inputData[0];
            this.userPsw = inputData[1];
            authApi
                .login(this.userId, this.userPsw)
                // 로그인 결과
                // isSuccess, code, message, result{jwt, userIdx}
                // 할일 : vuex를 사용해서 로그인 성공 시(isSuccess가 true라면) userIdx를 저장시키도록 수정
                .then((response) => {
                    console.log("로그인 결과 : " + response.data.message);
                })
                // 에러 발생 시 (예: 서버 닫힘)
                .catch((error) => {
                    console.log("에러 : " + error);
                });
        },
    },
};
</script>
