<template>
    <model-gltf v-if="modelSrc != null" :src="modelSrc" backgroundColor="#E7E7E7"> </model-gltf>
</template>
<script>

// Gltf 모델 로드
import { ModelGltf } from 'vue-3d-model'
export default {
    components: { ModelGltf },
    computed: {
        modelSrc() {
            return this.$store.state.product.renderModelData; // Shopping Cart 페이지의 캔버스에 로드 된 gltf 파일 불러오기
        },
    },
};
</script>