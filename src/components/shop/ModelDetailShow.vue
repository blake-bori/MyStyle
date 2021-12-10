<template>
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
            if (this.$store.state.product.productData != null) {
                return this.$store.state.product.productData.clothes.model;
            } else {
                return "";
            }
        },
    },
};
</script>
