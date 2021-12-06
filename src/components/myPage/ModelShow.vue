<template>
    <model-gltf v-if="modelSrc != null" :src="modelSrc.model" backgroundColor="#A9A9A9"> </model-gltf>
</template>
<script>
// import { ModelObj } from "vue-3d-model";
import { ModelGltf } from 'vue-3d-model'
export default {
    //example of object
    components: { ModelGltf },
    computed: {
        modelSrc() {
            return this.$store.state.product.renderModelData;
        },
    },
};
</script>

// mtl="object/cube/cube.mtl"
