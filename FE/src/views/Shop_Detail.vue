<template>
    <div class="shopDetail">
        <ShopDetailComponent></ShopDetailComponent>
    </div>
</template>

<script>
// @ is an alias to /src
import ShopDetailComponent from "@/components/shop/ShopDetailComponent.vue";

export default {
    name: "ShopDetail",
    components: {
        ShopDetailComponent,
    },
    created() {
        this.$store.dispatch("getProductData", this.$store.state.user.productIdx);
    },
};
</script>
