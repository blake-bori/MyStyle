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
        // 상품 정보 페이지 열 때 해당 정보를 불러옴
        this.$store.dispatch("getProductData", this.$store.state.user.productIdx);
    },
};
</script>
