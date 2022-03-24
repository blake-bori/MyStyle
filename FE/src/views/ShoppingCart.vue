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
        // 쇼핑카트 페이지를 열 때 찜한 상품 데이터들을 불러옴
        this.$store.dispatch("getHeartData", this.$store.state.user.user.userIdx);
    },
};
</script>
