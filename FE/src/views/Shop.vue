<template>
    <div class="shop">
        <ShopComponent></ShopComponent>
    </div>
</template>

<script>
// @ is an alias to /src
import ShopComponent from "@/components/shop/ShopComponent.vue";

export default {
    name: "Shop",
    components: {
        ShopComponent,
    },
    mounted() {
        this.$store.dispatch("getShopData",this.$store.state.user.categoryIdx);
    },
};
</script>
