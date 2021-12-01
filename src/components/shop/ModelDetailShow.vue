<template>
    <model-obj
        :src="url"
        :controlsOptions="{
            enablePan,
            enableZoom,
            enableRotate,
        }"
    >
    </model-obj>
</template>
<script>
import { ModelObj } from "vue-3d-model";
export default {
    //example of object
    components: { ModelObj },
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
