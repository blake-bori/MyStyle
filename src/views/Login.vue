<template>
    <div class="login">
        <LoginComponent></LoginComponent>
    </div>
</template>

<script>
// @ is an alias to /src
import LoginComponent from "@/components/login/LoginComponent.vue";
export default {
    name: "Login",
    components: {
        LoginComponent,
    },
};
</script>
