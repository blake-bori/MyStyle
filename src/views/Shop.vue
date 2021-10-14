<template>
    <div class="shop">
        <ShopComponent></ShopComponent>
    </div>
</template>

<script>
// @ is an alias to /src
import ShopComponent from "@/components/shop/ShopComponent.vue";
export default {
    name: "Home",
    components: {
        ShopComponent,
    },
};
</script>
