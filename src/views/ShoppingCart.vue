<template>
    <div class="ShoppingCart">
        <ShoppingCartComponent></ShoppingCartComponent>
    </div>
</template>

<script>
// @ is an alias to /src
import ShoppingCartComponent from "@/components/myPage/ShoppingCartComponent.vue";
export default {
    name: "Home",
    components: {
        ShoppingCartComponent,
    },
};
</script>
