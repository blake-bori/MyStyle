<template>
    <div class="ShoppingCart">
        <ShoppingCartComponent></ShoppingCartComponent>
    </div>
</template>

<script>
// @ is an alias to /src
import ShoppingCartComponent from "@/components/myPage/ShoppingCartComponent.vue";
export default {
    name: "ShoppingCart",
    components: {
        ShoppingCartComponent,
    },
    created() {
        this.$store.dispatch("getHeartData", this.$store.state.user.user.userIdx);
    },
};
</script>
