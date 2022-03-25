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
        // 쇼핑 페이지를 열 때 상품 리스트 정보 필터링 인덱스를 통해 불러옴
        this.$store.dispatch("getShopData",this.$store.state.user.categoryIdx);
    },
};
</script>
