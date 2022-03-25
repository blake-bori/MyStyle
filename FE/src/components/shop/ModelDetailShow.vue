<template>
    <!-- gltf 실행 -->
    <model-gltf
        :src="url"
        :controlsOptions="{
            enablePan,
            enableZoom,
            enableRotate,
        }"
        backgroundColor="#E7E7E7"
    >
    </model-gltf>
</template>
<script>
// gilt 실행을 위한 라이브러리 임포트
import { ModelGltf } from "vue-3d-model";
export default {
    //example of object
    components: { ModelGltf },
    props: {
        enablePan: Boolean,
        enableZoom: Boolean,
        enableRotate: Boolean,
    },
    computed: {
        url() {
            // 선택된 상품이 있으면 해당 상품의 모델을 가져옴
            if (this.$store.state.product.productData != null) {
                return this.$store.state.product.productData.clothes.model;
            } else {
                return "";
            }
        },
    },
};
</script>
