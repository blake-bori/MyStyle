<template>
    <div class="register">
        <RegisterInformationComponent v-if="step == 1" @next="nextStep"></RegisterInformationComponent>
        <RegisterBodyComponent v-else @back="previousStep" @requestRegister="register"></RegisterBodyComponent>
    </div>
</template>

<script>
// @ is an alias to /src
import RegisterInformationComponent from "@/components/auth/RegisterInformationComponent.vue";
import RegisterBodyComponent from "@/components/auth/RegisterBodyComponent.vue";
import * as authApi from "@/api/auth";

// 할일 : 기본 정보, 신체 사이즈 정보를 하위컴포넌트와 양방향 통신하도록 수정
export default {
    name: "Register",
    components: {
        RegisterInformationComponent,
        RegisterBodyComponent,
    },
    data() {
        return {
            step: 1,
            userId: "",
            userPsw: "",
            userName: "",
            userBodysize: {},
        };
    },
    methods: {
        nextStep(inputInfoData) {
            this.userId = inputInfoData[0];
            this.userPsw = inputInfoData[1];
            this.userName = inputInfoData[2];
            this.step += 1;
        },
        previousStep() {
            this.step -= 1;
        },
        register(inputBodySizeData) {
            this.userBodySize = inputBodySizeData;

            // console.log("회원가입 시도 - 하위 컴포넌트로부터 전달 받은 값들(기본 정보) : " + this.userId + "," + this.userPsw + "," + this.userName);
            // console.log(
            //     "회원가입 시도 - 하위 컴포넌트로부터 전달 받은 값들(신체 정보) : " +
            //         this.userBodysize.gender +
            //         "," +
            //         this.userBodySize.height +
            //         "," +
            //         this.userBodySize.weight +
            //         "," +
            //         this.userBodysize.proportions +
            //         "," +
            //         this.userBodysize.muscle
            // );

            authApi
                .register(this.userId, this.userPsw, this.userName, this.userBodySize)
                // 회원가입 결과
                // 회원가입 성공 시(isSuccess=true)로그인 페이지로 이동
                .then((response) => {
                    console.log("회원가입 결과 : " + response.data.code + "," + response.data.message);
                })
                // 에러 발생 시
                .catch((error) => {
                    console.log("에러 : " + error);
                });
        },
    },
};
</script>
