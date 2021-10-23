<template>
    <div class="register">
        <RegisterInformationComponent v-if="step == 1" @next="nextStep"></RegisterInformationComponent>
        <RegisterBodyComponent v-else @back="previousStep"></RegisterBodyComponent>
    </div>
</template>

<script>
// @ is an alias to /src
import RegisterInformationComponent from "@/components/login/RegisterInformationComponent.vue";
import RegisterBodyComponent from "@/components/login/RegisterBodyComponent.vue";
export default {
    name: "Register",
    components: {
        RegisterInformationComponent,
        RegisterBodyComponent,
    },
    data() {
        return {
            step: 1,
        };
    },
    methods: {
        nextStep() {
            this.step += 1;
        },
        previousStep() {
            this.step -= 1;
        },
    },
};
</script>
