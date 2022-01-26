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
            this.$store.dispatch("requestRegister", [this.userId, this.userPsw, this.userName, inputBodySizeData]);
        },
    },
};
</script>
